# Shantanu Shastri - Software Engineering Resume (SDE-2)

**EDUCATION**
**Carnegie Mellon University** | Master of Information Systems Management (Dec 2026) | GPA: 3.85
**Manipal Institute of Technology** | Bachelor of Engineering in Electronics & Comm. (Aug 2022) | GPA: 3.99
**Relevant Coursework:** Data Structures & Algorithms, Distributed Systems, Object Oriented Programming

**SKILLS**
**Languages:** Java, Python, C++, TypeScript, JavaScript, SQL, Bash/Shell
**Backend & Architecture:** Spring Boot, FastAPI, gRPC, Node.js, System Design, REST APIs, Microservices, ETL
**Databases & Caching:** PostgreSQL, MySQL, Redis, Ignite, Azure Blob, Neo4j, Milvus, Sybase, MongoDB
**Infrastructure & DevOps:** Kafka, Zookeeper, Docker, Kubernetes, AWS, Azure, CI/CD, SonarQube, Prometheus

**EXPERIENCE**

**BlackRock** | AI Engineer Internship | June 2026 – August 2026
* **Multi-Service ETL & Backend:** Built a production ETL & multi-service backend processing ~500 post-trade settlement exceptions/week from Sybase using FastAPI, Neo4j, Milvus, PostgreSQL, and Kafka, with a live-polling pipeline for real-time ingestion into a knowledge graph.
* **Vector-Graph Hybrid Architecture:** Architected a hybrid system linking Milvus semantic embeddings to Neo4j knowledge graph nodes via a PostgreSQL VectorAnchor bridge, enabling auditable, provenance-rich exception search with structured graph traversal and vector similarity in a single hybrid query.
* **API & Orchestration Platform:** Engineered a multi-agent orchestration platform (RockAI ADK SequentialAgent) backed by 10+ REST endpoints, advancing BlackRock's Straight-Through Processing rate from 80% toward 100% for settlement failure automation.

**BlackRock** | Software Developer 2 - Associate | January 2025 – July 2025
* **System Scalability & Optimization:** Architected a central data framework and TTL Azure Blob microservices to resolve legacy bottlenecks, successfully automating 1.5M+ touchpoints across 117 clients while reducing infrastructure storage costs by 40%.
* **Distributed Caching & gRPC APIs:** Engineered a distributed read-through Ignite cache to address high-latency APIs, scaling concurrent request handling and cutting API response times by 3x (e.g., from 450ms to 150ms).

**BlackRock** | Software Developer 1 - Analyst | July 2022 – December 2024
* **Distributed Systems Architecture:** Resolved critical singleton bottlenecks by engineering a sharded, multi-instance server environment with Zookeeper leader election, effectively distributing load and boosting overall system throughput by 24%.
* **Database Optimization:** Achieved a 37% reduction in query latency on legacy tables exceeding 50M+ rows by refactoring schemas and leveraging composite indexes for faster data retrieval.
* **DevOps & Quality Engineering:** Built comprehensive CI/CD pipelines using Azure DevOps with integrated JUnit/Jacoco testing suites, reducing time-to-market by 40% while maintaining SONAR quality scores >90%.

**BlackRock** | Software Developer Internship | January 2022 – June 2022
* **Application Modernization:** Re-architected monolithic legacy Pearl/Tomcat applications into a modular Java REST environment and Angular UI, drastically reducing technical debt and deployment time.

**PROJECTS**

**High-Performance Modular Booking Architecture**
* **Backend Scalability:** Engineered a decoupled microservices architecture using Apache Kafka, successfully handling bursts of 100,000+ real-time requests with minimal latency spikes.
* **Infrastructure:** Orchestrated containerized deployments using Docker to ensure environment consistency and enable seamless horizontal scaling across production systems.

**Zulip Open-Source Engine Extensions**
* **Real-time Processing:** Built a high-throughput message engine using Tornado, Redis, and RabbitMQ to process data streams into concise summaries with zero message loss.
