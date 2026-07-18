# SWE Resume Feedback for SDE-2 Roles

Targeting a mid-level Software Engineer 2 role requires demonstrating strong system design, architecture, scalability, latency optimization, and ownership of complex backend components.

Below is a detailed breakdown of your experience with specific, actionable feedback to mold your resume for Backend/Software Engineering roles.

## 1. BlackRock - AI Engineer Internship (June 2026 – August 2026)
> [!IMPORTANT]
> **Action:** Update your internship section to use the backend-heavy, architectural points provided.

**Proposed Bullets:**
- Built a production ETL & multi-service backend at BlackRock processing ~500 post-trade settlement exceptions/week from Sybase using FastAPI, Neo4j, Milvus, PostgreSQL, and Kafka, with a live-polling pipeline for real-time ingestion into a knowledge graph.
- Architected a Vector-Graph Hybrid system linking Milvus semantic embeddings to Neo4j knowledge graph nodes via a PostgreSQL VectorAnchor bridge, enabling auditable, provenance-rich exception search with structured graph traversal and vector similarity in a single hybrid query.
- Engineered a multi-agent orchestration platform (RockAI ADK SequentialAgent) composed of 4 specialized agents (Mode, Retrieval, Reasoning, Decision) backed by 10+ REST endpoints, advancing BlackRock's Straight-Through Processing rate from 80% toward 100% for settlement failure automation.

**Improvement Feedback:**
- **Highlight Throughput and Resiliency:** In point 1, while 500 exceptions/week sounds low in pure volume, emphasize the *complexity* of the ETL and the real-time stream processing capabilities of Kafka. Mention any fault-tolerance or retry mechanisms implemented.
- **Latency and Optimization:** In point 2, highlight the performance of the VectorAnchor bridge. What was the query latency? How did you optimize the bridge to prevent data inconsistencies between PostgreSQL, Milvus, and Neo4j?
- **API Design & Scale:** In point 3, focus on the architecture of the 10+ REST endpoints. Mention the peak Requests Per Second (RPS) handled by the orchestration platform and any rate-limiting or load-balancing applied.

## 2. BlackRock - Software Developer 2 (January 2025 – July 2025)
> [!TIP]
> **Action:** Maximize the impact of your distributed systems and caching work.

**Current Bullets:**
- System Scalability & Optimization: Architected a central data framework and TTL Azure Blob microservices to resolve legacy bottlenecks, successfully automating 1.5M+ touchpoints across 117 clients while significantly reducing infrastructure storage costs.
- gRPC API & Caching: Engineered a distributed read-through Ignite cache to address high-latency APIs, cutting response times by 3x.

**Improvement Feedback:**
- **Quantify Cost and Frameworks:** For point 1, quantify the storage cost reduction (e.g., "reducing costs by 40%"). Mention the specific backend frameworks used (e.g., Spring Boot, Java) for the microservices.
- **Contextualize the Latency Win:** For point 2, a 3x reduction is excellent. Provide the absolute numbers for context (e.g., "reducing response time from 450ms to 150ms"). Highlight the cache eviction policies or consistency models used in Ignite.

## 3. BlackRock - Software Developer 1 (July 2022 – December 2024)
> [!TIP]
> **Action:** Emphasize backend optimization, concurrency, and robust CI/CD practices.

**Current Bullets:**
- Database Optimization: Achieved 37% reduction in query latency by refactoring critical legacy database tables and leveraging composite indexes...
- Full-stack Development: Spearheaded end-to-end development of responsive, high-performance Angular-based UI...
- Distributed Systems Architecture: Resolved critical singleton bottlenecks by engineering a sharded, multi-instance server environment with Zookeeper leader election, effectively distributing load and boosting system performance by 24%.
- DevOps & Quality Engineering: Built comprehensive CI/CD pipelines using Azure DevOps...

**Improvement Feedback:**
- **Database Scale:** In point 1, name the relational database (e.g., PostgreSQL, SQL Server) and indicate the table size (e.g., "on tables exceeding 50 million rows") to prove you can handle enterprise scale.
- **Keep UI concise:** For backend-heavy SDE2 roles, keep the Angular UI point concise. Emphasize the integration of Azure LLM APIs and the backend systems supporting real-time AI.
- **Concurrency & Distributed Systems:** Point 3 is your strongest SDE bullet. Highlight the specific RPS or throughput increase. Discuss the challenge of Zookeeper leader election (e.g., handling split-brain scenarios or node failures).

## 4. BlackRock - Software Developer Internship (January 2022 – June 2022)
> [!TIP]
> **Action:** Demonstrate modernization and code quality.

**Current Bullets:**
- Application Modernization: Re-architected legacy Pearl/Tomcat applications into a modular Angular & Java REST environment...

**Improvement Feedback:**
- **Scope and Impact:** How many monolithic applications or endpoints were migrated? Mention improvements in deployment speed, code coverage, or reduction in technical debt.

---
> [!NOTE]
> **General Formatting Tip for SWE Roles:** Ensure your Skills section leads with Backend Languages (Java, Python, C++) and Developer Tools/Infra (System Design, gRPC, Kafka, Kubernetes, Docker, SQL/NoSQL databases). 
