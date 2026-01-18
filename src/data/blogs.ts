export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string; // HTML string or plain text for now
    githubUrl?: string; // Optional
    linkedinUrl?: string; // Optional
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'zulip-threading-architecture',
        title: 'The Heavy Cost of Threading: How Zulip Scales a "One Row Per Message" Architecture',
        date: 'Jan 18, 2026',
        excerpt: 'Zulip\'s unique topic-based threading model requires tracking the read state of every individual message. This post explores the "heavy" architecture and optimizations like "Soft Deactivation" that make it possible.',
        linkedinUrl: 'https://linkedin.com/in/shantanushastri',
        content: `
            <p>In the world of real-time chat architecture, there is a standard, highly efficient way to track what a user has read. It is called a "cursor" or a "pointer."</p>
            
            <p>Applications like Slack, Discord, or WhatsApp generally view a channel as a single, linear timeline. If you have read message #500, the system safely assumes you have scrolled past messages #1 through #499. To track your state, the database only needs to store one integer: <code>last_read_id = 500</code>. It is elegant, cheap, and scales incredibly well.</p>
            
            <p>But what happens when your product’s core feature breaks that linear assumption?</p>
            
            <p>Zulip is unique among chat platforms because of its topic-based threading model. In a Zulip stream, conversations happen in parallel. You might read the latest messages in the "Design Review" topic while completely ignoring the "Lunch Plans" topic in the same stream. Furthermore, you might read messages #10 and #12, but deliberately "mark as unread" message #11 to return to it later.</p>
            
            <p>Because reading in Zulip is non-linear, a simple cursor fails. To support this powerful product feature, Zulip makes an expensive engineering trade-off: it tracks the read state of every individual message for every individual user.</p>
            
            <p>This post dives into why Zulip chose this "heavy" architecture and the clever "Soft Deactivation" mechanism designed to keep it from crushing their servers.</p>

            <h3>The Database Design: The UserMessage Table</h3>
            <p>To allow users to cherry-pick which topics they read, Zulip’s backend relies on a crucial Postgres table called <code>UserMessage</code>.</p>
            <p>Every time a message is sent to a stream, the system doesn't just write the message content once. It also generates a row in the UserMessage table for every subscriber to that stream.</p>
            <p>A simplified view of this table looks like this:</p>
            
            <table>
                <thead>
                    <tr>
                        <th>user_id</th>
                        <th>message_id</th>
                        <th>flags (bitfield)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>101 (Alice)</td>
                        <td>500</td>
                        <td>read: true, starred: false</td>
                    </tr>
                    <tr>
                        <td>102 (Bob)</td>
                        <td>500</td>
                        <td>read: false, mentioned: true</td>
                    </tr>
                </tbody>
            </table>

            <h3>Why Pointers Won't Work</h3>
            <p>You might ask: Why not just keep a pointer for every topic?</p>
            <p>It seems cheaper, but it breaks due to three edge cases:</p>
            <ul>
                <li><strong>Holes:</strong> If you read messages 1 through 10, but "Mark as Unread" on message 5, a single integer pointer cannot represent that state.</li>
                <li><strong>Mutability:</strong> Messages can be moved between topics. If a message you read in "General" is moved to "Design," your pointers in both topics would become invalid.</li>
                <li><strong>Topic Explosion:</strong> Topics are just strings, not database IDs. Indexing pointers against dynamic strings is often slower than the integer-based UserMessage join.</li>
            </ul>

            <h3>The Scalability Challenge: The "Thundering Herd"</h3>
            <p>The UserMessage table provides O(1) truth about the state of any message, but it causes massive Write Amplification.</p>
            <p>Imagine an open-source community with 20,000 users in a "General" stream. When one user sends a message saying "Hello world," the application server needs to execute 20,001 database inserts instantly:</p>
            <ol>
                <li>One insert into the Message table (Content).</li>
                <li>20,000 inserts into the UserMessage table (Unread counts).</li>
            </ol>
            <p>Doing this synchronously would lock up the database. Zulip solves this using an asynchronous architecture involving Tornado, Redis, and RabbitMQ.</p>



            <h3>The Nuance: Active vs. Connected</h3>
            <p>A key detail in this architecture is the distinction between a user being Active and Connected.</p>
            <p>When a message is sent, it is pushed to Redis immediately, regardless of whether the user is currently online. Redis acts as a temporary "Mailbox."</p>
            <ul>
                <li><strong>If the user is Connected:</strong> Tornado pulls the message from the Redis mailbox and pushes it down the WebSocket instantly.</li>
                <li><strong>If the user is Disconnected:</strong> The message sits in the Redis mailbox. If the user reconnects 10 seconds later, Tornado can serve the missed message instantly from Redis memory without touching the slow database.</li>
            </ul>

            <h3>The Optimization: Soft Deactivation</h3>
            <p>Even with RabbitMQ deferring the work, writing 20,000 rows for every single message is unsustainable. In large communities, most users are inactive. It is wasteful to burn database I/O creating "unread" rows for a user who hasn't logged in for six months.</p>
            <p>Zulip’s solution is Soft Deactivation.</p>
            <p>The system tracks when a user last interacted with the platform. If they cross an inactivity threshold, they are marked as "soft deactivated." When a new message is sent:</p>
            <ul>
                <li><strong>For Active Users:</strong> The system generates UserMessage rows and pushes to Redis/RabbitMQ.</li>
                <li><strong>For Soft Deactivated Users:</strong> The system skips the database write entirely.</li>
            </ul>
            <p>This drastically reduces load. A message sent to 20,000 users might only trigger 500 writes if only 500 users are active.</p>

            <img src="/ZulipsMessagingFlow.png" alt="Zulip Messaging Architecture and Soft Deactivation Flow" style="width: 100%; border-radius: 8px; margin: 30px 0;" />

            <h3>The Catch-Up Mechanism (The Backfill)</h3>
            <p>What happens when a soft-deactivated user finally returns? They have no UserMessage rows for the last six months.</p>
            <p>The system detects this "gap" and performs a Backfill.</p>
            <p>Crucially, this backfill is a Bulk Database Operation. It does not re-trigger the RabbitMQ or Redis pipeline. The system runs a high-efficiency SQL query:</p>
            <pre><code>INSERT INTO UserMessage ...
SELECT id FROM Message
WHERE id > last_known_id AND stream_id IN (user_subscriptions)</code></pre>
            <p>By doing this directly in the database and skipping the event fan-out (Redis/RabbitMQ), Zulip can "catch up" a user who missed 10,000 messages in milliseconds, without clogging the message queues for everyone else.</p>

            <h3>Conclusion</h3>
            <p>Zulip's architecture is a fascinating example of product requirements dictating engineering constraints. To gain the powerful feature of topic-based threading, they had to abandon the efficient "cursor" model.</p>
            <p>By accepting the heavy requirement of tracking every message state individually, and then engineering a clever optimization around user inactivity, Zulip managed to build a unique product that scales to massive communities without compromising on its core feature set.</p>
        `
    }
];
