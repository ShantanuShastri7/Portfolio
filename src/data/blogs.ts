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

            <img src="/Portfolio/ZulipsMessagingFlow.png" alt="Zulip Messaging Architecture and Soft Deactivation Flow" style="width: 100%; border-radius: 8px; margin: 30px 0;" />

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
    },
    {
        slug: 'uber-mysql-migration',
        title: 'Uber’s MySQL Migration: Why "High Availability" is an Architectural Illusion',
        date: 'Jan 19, 2026',
        excerpt: 'Uber moved from standard MySQL replication to a Consensus-based model. This post explores the trade-offs, the irony of choosing Paxos over Raft, and the high cost of consistent reads.',
        linkedinUrl: 'https://linkedin.com/in/shantanushastri',
        content: `
            <p>When you operate at the scale of Uber—millions of queries per second and petabytes of data—textbook definitions of "reliability" stop working.</p>
            <p>Recently, Uber Engineering revealed a massive architectural shift in their database layer, moving from standard MySQL replication to a Consensus-based model. On the surface, this looks like a standard upgrade. But dig deeper, and you find a fascinating case study on distributed systems trade-offs, the irony of choosing Paxos over Raft, and the high cost of consistent reads.</p>
            <p>Here is the deep dive into why Uber broke MySQL to fix it.</p>

            <h3>The "Old World": Reactive Failover</h3>
            <p>For years, Uber ran the industry-standard MySQL setup: Asynchronous Replication with an External Orchestrator.</p>
            <p><strong>The Setup:</strong> A Primary node takes writes and asynchronously copies them to Secondary nodes. An external "Controller" watches the Primary.</p>
            <p><strong>The Failure Mode:</strong> If the Primary dies, the Controller notices (eventually), promotes a Secondary, and rewires the application.</p>
            <p><strong>The Problem?</strong> Physics. Because replication was asynchronous, the Primary would confirm a write to the user before the Secondary received it. If the Primary crashed in that split second, the data was lost forever. Furthermore, the failover was "reactive"—it required detection, decision, and action, resulting in roughly 30 seconds of downtime. At Uber's scale, 30 seconds is an eternity.</p>

            <h3>The "New World": Consensus (MySQL Group Replication)</h3>
            <p>Uber moved to MySQL Group Replication (MGR). This replaces the "Dictator and Followers" model with a "Committee."</p>
            <p>Using a Paxos-based consensus algorithm, nodes now form a group. A write is only committed if a majority (quorum) of nodes agree they have received it.</p>
            <ul>
                <li><strong>Zero Data Loss:</strong> If the Primary dies, the data is guaranteed to exist on the majority.</li>
                <li><strong>Instant Failover:</strong> The group detects the silence immediately and reconfigures itself without an external manager.</li>
            </ul>

            <h3>The Engineering Reality: Dealing with "Flapping"</h3>
            <p>Here is the part most engineering blogs leave out: Consensus is sensitive.</p>
            <p>Uber found that simple network jitters (50ms lag) caused nodes to be kicked out of the group, only to rejoin seconds later. This "flapping" destroyed performance.</p>
            <p>To fix this, Uber built a custom layer on top of MGR:</p>
            <ul>
                <li><strong>Strict Single-Primary:</strong> They disabled MGR's native "Multi-Primary" feature to avoid conflict logic.</li>
                <li><strong>Blip Detection:</strong> They added logic to distinguish between a "crash" and a "network blip," preventing unnecessary leadership changes.</li>
            </ul>

            <h3>The Great Irony: Paxos vs. Raft</h3>
            <p>A common question in distributed systems is: "Why didn't they just use Raft?"</p>
            <p>Raft is the modern standard for consensus (used by Etcd, CockroachDB). It is designed around a Strong Leader. MySQL, however, chose Paxos (XCom/Mencius) because they wanted to support Multi-Primary (active-active) setups where any node can accept writes.</p>
            <p><strong>The Irony:</strong> Uber adopted MySQL's Paxos engine—which was chosen specifically for Multi-Primary flexibility—and then strictly enforced Single-Primary mode.</p>
            <p>Effectively, Uber is running a Raft-like topology (Single Leader) on top of a Paxos engine, because rewriting MySQL to use Raft would be infinitely more expensive than just "taming" Paxos.</p>
            <img src="/Portfolio/UbersIrony.png" alt="Paxos vs Raft Irony" style="width: 100%; border-radius: 8px; margin: 30px 0;" />

            <h3>The Hidden Cost: Why "Reading from Followers" is a Trap</h3>
            <p>If we have a cluster of 5 nodes, why can't we just read from the 4 followers to scale out?</p>
            <p>You can, but it breaks Linearizability. A follower might be lagging behind the leader by a few milliseconds. If a user writes data and immediately reads it back from a lagging follower, they won't see their update.</p>
            <p>To fix this, you have to perform a "Safe Read" (or ReadIndex):</p>
            <ol>
                <li>Client asks Follower for data.</li>
                <li>Follower asks Leader: "Is my data current?"</li>
                <li>Leader confirms.</li>
                <li>Follower returns data.</li>
            </ol>
            <p>The Catch: This introduces a network round-trip for every single read, doubling the latency.</p>
            <p>Real-world systems (like Uber's) often have to choose between:</p>
            <ul>
                <li><strong>Lease Reads:</strong> The Leader assumes it is safe to read locally as long as its clock is synced (Fast, but relies on clocks).</li>
                <li><strong>Stale Reads:</strong> Reading from followers immediately and accepting the risk of old data (Fast, but "eventually" consistent).</li>
            </ul>
            <img src="/Portfolio/StaleRead.png" alt="Stale Read Problem" style="width: 100%; border-radius: 8px; margin: 30px 0;" />

            <h3>Conclusion</h3>
            <p>Uber's migration teaches us that "High Availability" isn't a toggle you switch on. It is a sliding scale of trade-offs. You can have Latency, Consistency, or Simplicity—but usually, you have to sacrifice one to get the others. Uber chose to sacrifice Simplicity (by adopting complex Consensus) to buy Reliability.</p>
        `
    },
    {
        slug: 'postgresql-replication-mvcc',
        title: 'Under the Hood: PostgreSQL Replication, Consistency, and the Cost of MVCC',
        date: 'Jan 24, 2026',
        excerpt: 'In distributed systems, terms like "Replication" and "Sharding" are often thrown around interchangeably, but they solve fundamentally different problems. This post explores how PostgreSQL implements data distribution, how it handles the "stale read" phenomenon, and why its concurrency model (MVCC) can become a double-edged sword under heavy write loads.',
        linkedinUrl: 'https://linkedin.com/in/shantanushastri',
        content: `
            <p>In distributed systems, terms like "Replication" and "Sharding" are often thrown around interchangeably, but they solve fundamentally different problems. As I’ve dived deeper into database internals, specifically PostgreSQL, I've found that understanding the distinction—and the specific mechanics of data flow—is critical for designing resilient systems.</p>
            <p>This post explores how PostgreSQL implements data distribution, how it handles the "stale read" phenomenon, and why its concurrency model (MVCC) can become a double-edged sword under heavy write loads.</p>

            <h3>1. Replication vs. Sharding: Clearing the Confusion</h3>
            <p>First, a necessary architectural distinction. A setup with one primary writer node and multiple read replicas is Replication, not Sharding.</p>
            <p><strong>Replication (Read Scalability):</strong> We copy all data from one Primary to multiple Replicas. This scales read throughput but does nothing for write throughput or storage capacity.</p>
            <p><strong>Sharding (Write Scalability):</strong> We split data horizontally (e.g., Users 1–1000 on Node A, 1001–2000 on Node B). This scales writes and storage.</p>
            <p>For the rest of this deep dive, we are focusing on Primary-Replica Replication—the standard topology for high-availability PostgreSQL.</p>

            <h3>2. The Mechanism: How Data Moves (The WAL Stream)</h3>
            <p>PostgreSQL does not replicate by sending raw SQL queries (INSERT INTO...) to its followers. Instead, it relies on the Write-Ahead Log (WAL).</p>
            <h4>The Write Query Flow (The "Hard" Path)</h4>
            <p>When an application writes data, the flow is strictly controlled to ensure durability:</p>
            <ul>
                <li><strong>WAL Generation:</strong> The Primary parses the query and writes the change to the WAL buffer in memory.</li>
                <li><strong>Flush to Disk:</strong> Upon COMMIT, the Primary forces the buffer to the physical disk (fsync). The transaction is now "safe" on the Primary.</li>
                <li><strong>Streaming:</strong> A walsender process pushes these binary log records over the network to the Replicas.</li>
                <li><strong>Replay:</strong> The Replicas receive the logs and physically apply the changes to their own data files.</li>
            </ul>
            <h4>The Read Query Flow</h4>
            <p>To reduce load, read traffic is often routed via a load balancer (like PgBouncer or HAProxy) to the Replicas. While the Primary handles the writes, the Replicas serve the reads.</p>
            <p>However, this separation introduces a classic distributed systems problem: Replication Lag.</p>

            <h3>3. The Phenomenon of Stale Reads</h3>
            <p>In most default asynchronous replication setups, a query to a replica can return stale data.</p>
            <p>This happens because the Replica cannot serve new data until it has not only received the WAL but also successfully replayed those changes into its storage engine.</p>
            <h4>The Race Condition</h4>
            <ul>
                <li><strong>Primary Commit:</strong> The primary writes to its WAL, updates its state, and sends a "Success" ACK to the client.</li>
                <li><strong>Transmission:</strong> The primary asynchronously pushes the WAL to the secondary.</li>
                <li><strong>The Gap:</strong> If a read request hits the secondary while the data is still in transit or being replayed, the secondary looks at its current state and returns the old value. It has no knowledge that a "future" version exists on the primary.</li>
            </ul>

            <h4>Mechanisms to Prevent Stale Reads</h4>
            <p>To solve this, we must trade off latency or availability for consistency.</p>
            <p><strong>A. Synchronous Replication</strong></p>
            <p>The Primary does not acknowledge the write to the client until the Replica confirms it has written the WAL.</p>
            <p>Trade-off: This guarantees Zero Data Loss (RPO=0), but the write latency now includes the network Round Trip Time (RTT). If the replica goes down, the primary cannot accept writes.</p>
            <p><strong>B. Read-Your-Own-Writes (Session Consistency)</strong></p>
            <p>This ensures that if you update data, you immediately see it, even if others don't.</p>
            <p>Mechanism: The client tracks the Log Sequence Number (LSN) of its last write. When reading from a secondary, it includes this token.</p>
            <p>The Check: If the Secondary’s replayed LSN is lower than the client’s token (e.g., Secondary is at 1040, Client needs 1050), the Secondary blocks the read until it catches up.</p>
            <p><strong>C. Quorum Reads ($R + W > N$)</strong></p>
            <p>Common in leaderless systems (like Cassandra), but applicable to Postgres via Quorum Commit.</p>
            <p>Configuration: <code>synchronous_standby_names = 'ANY 2 (r1, r2, r3)'</code>.</p>
            <p>Logic: The Primary waits for ACKs from any 2 of the 3 replicas. This ensures durability without being blocked by a single slow node.</p>

            <img src="/Portfolio/PostGreSQLWriteStrat.png" alt="PostgreSQL Write Strategies" style="width: 100%; border-radius: 8px; margin: 30px 0;" />
            
            <table>
                <thead>
                    <tr>
                        <th>Replication Mode</th>
                        <th>Secondary Read Behavior</th>
                        <th>Trade-off</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Async (Default)</td>
                        <td>Stale (Eventual Consistency)</td>
                        <td>Lowest latency, high availability.</td>
                    </tr>
                    <tr>
                        <td>Sync</td>
                        <td>Fresh (Strong Consistency)</td>
                        <td>High write latency, lower write availability.</td>
                    </tr>
                    <tr>
                        <td>Session Consistent</td>
                        <td>Fresh for Writer / Stale for others</td>
                        <td>Requires complex client-side implementation.</td>
                    </tr>
                </tbody>
            </table>

            <h3>4. When Things Go Wrong: Split Brain & Timelines</h3>
            <p>What happens if the cluster breaks into two isolated pieces, and both believe they are the Primary? This is a Split Brain scenario.</p>
            <p>PostgreSQL handles this using Timeline IDs. Every WAL record is identified by a tuple: (TimelineID, LSN).</p>
            <p>When a Replica is promoted to Primary, it increments the Timeline ID (e.g., from 1 to 2).</p>
            <p>If the "Old Primary" comes back online, it tries to communicate on Timeline 1. The cluster rejects it, preventing data divergence. We can then use tools like pg_rewind to fix the old node by rewinding it to the fork point and replaying the new timeline.</p>

            <h3>5. The Hidden Cost: MVCC and "Dead Tuples"</h3>
            <p>While PostgreSQL scales reads well, high write traffic reveals the cost of its concurrency model: Multiversion Concurrency Control (MVCC).</p>
            <p>In Postgres, an UPDATE is a lie. The engine does not overwrite data in place.</p>
            <ul>
                <li><strong>Mark for Death:</strong> It finds the existing row and marks it as "dead" to future transactions.</li>
                <li><strong>Insert New:</strong> It creates a brand new row version and appends it to the table.</li>
            </ul>
            <h4>The "Linked List of Doom"</h4>
            <p>If a row is updated 100 times, you have 100 "dead" tuples and 1 "live" tuple linked together on disk. When you run a query like <code>SELECT * FROM users WHERE id=1</code>, the engine may have to scan through this chain of dead tuples, checking visibility rules for each one, just to find the single live version.</p>
            <p>This results in:</p>
            <ul>
                <li><strong>Write Amplification:</strong> Every update creates new data and potentially updates every index to point to the new row location.</li>
                <li><strong>Read Amplification:</strong> Queries burn CPU and I/O scanning obsolete data.</li>
            </ul>
            <p>To combat this, PostgreSQL uses Vacuuming (specifically Autovacuum) to clean up dead tuples and HOT (Heap Only Tuples) to optimize updates that don't modify indexed columns.</p>

            <h3>Conclusion</h3>
            <p>PostgreSQL is a robust system, but "it just works" is rarely true at scale. Whether it's choosing between Sync and Async replication to manage the "Stale Read" trade-off, or tuning Autovacuum to handle MVCC bloat, understanding the internal data flow is the key to maintaining a healthy distributed system.</p>
        `
    }
];
