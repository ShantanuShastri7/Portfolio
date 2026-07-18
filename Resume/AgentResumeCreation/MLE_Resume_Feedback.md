# MLE Resume Feedback for SDE-2 / MLE-2 Roles

Targeting a mid-level (SDE-2/MLE-2) role requires demonstrating end-to-end ownership of ML systems, from data engineering and model training to MLOps, deployment, and measurable business impact. 

Below is a detailed breakdown of your experience with specific, actionable feedback to mold your resume for Machine Learning Engineering roles.

## 1. BlackRock - AI Engineer Internship (June 2026 – August 2026)
> [!IMPORTANT]
> **Action:** Add this section to your MLE resume using the ML-focused points below.

**Proposed Bullets:**
- Designed a self-evolving learning engine with weekly batch pattern extraction, LLM-based L3 action classification (PatternNode -> remediation action), and daily confidence calibration, enabling continuously improving AI recommendations for post-trade exception resolution at scale.
- Built a 7-step hybrid graph search pipeline combining vector similarity (Milvus) with Cypher graph traversal (Neo4j) and Experience Spine intent classification to rank remediation paths (Loan Recall, Depot Switch, Collateral Substitution) for Lack of Securities exceptions, ~20K/week during MSCI rebalances.
- Implemented closed-loop agentic decision capture with structured DecisionTrace / DecisionStep / Outcome / Feedback primitives, enabling a feedback-driven learning loop that traces every agent decision from embedding space to graph relationships and feeds into confidence recalibration.

**Improvement Feedback:**
- **Quantify ML metrics:** In point 1, what was the precision/recall of the LLM classification? Mention the specific LLM used (e.g., Llama-3, GPT-4) to show familiarity with state-of-the-art models.
- **Highlight latency and scale:** In point 2, a 7-step hybrid pipeline can be computationally heavy. Detail the latency of this pipeline (e.g., "achieving <200ms P95 latency") and name the embedding model used.
- **Show business/model impact:** In point 3, quantify the improvement driven by the feedback loop. For example, "improved recommendation accuracy by X% over 8 weeks."

## 2. BlackRock - Software Developer 2 (January 2025 – July 2025)
> [!TIP]
> **Action:** Refine the Generative AI and RAG points to highlight technical depth in ML.

**Current Bullets:**
- Engineered a pluggable micro-frontend interface using Azure LLM APIs to translate natural language into Java Query Language (JQL), fine-tuning models on a 40,000+ record corpus for high-precision code generation.
- Implemented a Retrieval-Augmented Generation (RAG) pipeline using vector stores to enhance prompt context, boosting user acceptance rates from 68% to 82% and reducing query formulation time by 91%.

**Improvement Feedback:**
- **Detail the Fine-Tuning:** Specify the technique (e.g., LoRA, QLoRA, full fine-tuning) and the base model used. Replace "high-precision" with a concrete metric like Exact Match (EM) rate or BLEU/ROUGE score.
- **Deepen the RAG Architecture:** Name the vector database used (e.g., Milvus, FAISS). Mention your retrieval strategy (e.g., semantic search, hybrid search, re-ranking with Cohere) to show advanced RAG knowledge.

## 3. BlackRock - Software Developer 1 (July 2022 – December 2024)
> [!TIP]
> **Action:** Frame software engineering achievements around MLOps, scalable model serving, and data pipelines.

**Current Bullets:**
- Targeted routing inefficiencies across 60+ global markets by analyzing and cleaning complex transactional data with Python and Pandas, uncovering latent patterns that optimized downstream routing efficiency.
- Addressed high manual configuration costs by building a scalable XGBoost recommender workflow, achieving high-80% accuracy and reducing manual intervention by 60%.
- Resolved critical singleton bottlenecks by engineering a sharded, multi-instance server environment with Zookeeper leader election, effectively distributing load and boosting system performance by 24%.
- Built comprehensive CI/CD pipelines using Azure DevOps...

**Improvement Feedback:**
- **Data Pipeline Scale:** For the first point, quantify the volume of data processed (e.g., "Processed 5TB of daily transactional data"). Was this a batch or streaming pipeline? Mention orchestration tools like Airflow if used.
- **Model Deployment (MLOps):** For the XGBoost point, elaborate on how the model was served in production (e.g., FastAPI, Docker, Kubernetes) and its inference latency. Precision is key—replace "high-80% accuracy" with "88% precision and 85% recall".
- **Distributed Systems for ML:** The Zookeeper/sharding point is excellent for showcasing backend strength. Frame it around how it supports ML workloads (e.g., scalable inference, high-throughput data processing).

## 4. Shunya - Data Science Intern (June 2020 – September 2020)
> [!TIP]
> **Action:** Highlight core ML frameworks and tangible results.

**Current Bullets:**
- Computer Vision Automation: Targeted inefficiencies in manual grading by engineering a GPU-accelerated OpenCV workflow in Python to analyze answer sheets...
- Adaptive Learning Algorithms: Addressed learning gaps using K-means clustering to recommend targeted practice questions.

**Improvement Feedback:**
- **Frameworks and Speedup:** Mention if PyTorch or TensorFlow were used. Quantify the "rapid feedback" (e.g., "reduced grading time by 90% or saving X manual hours per week").
- **Clustering Impact:** Mention the dimensionality of the data used for K-means and how the clustering improved student engagement or test scores, if data is available.

---
> [!NOTE]
> **General Formatting Tip for MLE Roles:** Make sure your Skills section prioritizes ML Frameworks (PyTorch, TensorFlow, Hugging Face, LangChain) and MLOps tools (MLflow, Prometheus, Docker) at the very top.
