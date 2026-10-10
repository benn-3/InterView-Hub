// Centralized Master Dataset for Company-Wise Interview Preparation
// Covers 35+ top companies across 5 strategic tiers with realistic hiring workflows,
// round breakdowns, role-specific questions, and interactive checklist items.

export const COMPANY_CATEGORIES = [
  { id: 'product-tech', name: 'Product & Big Tech', count: 10 },
  { id: 'it-services', name: 'IT Services & Consulting', count: 8 },
  { id: 'cloud-infra', name: 'Cloud, DevOps & Infrastructure', count: 7 },
  { id: 'data-ai', name: 'Data & AI Pioneers', count: 7 },
  { id: 'saas-product', name: 'SaaS & Enterprise Product', count: 6 },
];

export const STANDARDIZED_ROLES = [
  { id: 'swe', name: 'Software Engineer', short: 'SWE' },
  { id: 'backend', name: 'Backend Developer', short: 'Backend' },
  { id: 'frontend', name: 'Frontend Developer', short: 'Frontend' },
  { id: 'fullstack', name: 'Full-Stack Developer', short: 'Full-Stack' },
  { id: 'devops', name: 'DevOps Engineer', short: 'DevOps' },
  { id: 'cloud', name: 'Cloud Engineer', short: 'Cloud' },
  { id: 'data-eng', name: 'Data Engineer', short: 'Data Eng' },
  { id: 'data-sci', name: 'Data Scientist', short: 'Data Sci' },
  { id: 'mle', name: 'Machine Learning Engineer', short: 'MLE' },
  { id: 'ai-llm', name: 'AI / LLM Engineer', short: 'AI / LLM' },
  { id: 'sre', name: 'Site Reliability Engineer', short: 'SRE' },
  { id: 'qa', name: 'QA / Automation Engineer', short: 'QA' },
];

export const companiesData = [
  // ==================== 1. PRODUCT & BIG TECH ====================
  {
    id: 'google',
    name: 'Google',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'G',
    color: '#4285F4',
    website: 'https://careers.google.com',
    industry: 'Internet, Cloud, AI & Consumer Electronics',
    headquarters: 'Mountain View, CA',
    products: ['Google Search', 'Google Cloud Platform (GCP)', 'Android', 'YouTube', 'Gemini AI', 'Chrome'],
    description: 'Global technology leader known for rigorous engineering standards, algorithmic problem-solving at planetary scale, distributed systems, and Googleyness behavioral evaluations.',
    hiringProcessNote: 'Standard process includes recruiter screen, 1-2 phone/technical screens, followed by 4-5 virtual on-site rounds covering DSA, System Design, and Googlyness.',
    rolesSupported: ['swe', 'backend', 'frontend', 'sre', 'mle', 'ai-llm', 'data-sci', 'data-eng'],
    rounds: [
      {
        id: 'r1',
        title: 'Round 1: Recruiter & Technical Screening',
        duration: '45 mins',
        focus: 'DSA Problem Solving & CS Fundamentals',
        description: 'Single LeetCode Medium/Hard algorithmic question on Google Docs or CoderPad without autocomplete. Focus on communication, edge cases, and Big-O efficiency.'
      },
      {
        id: 'r2',
        title: 'Round 2: Onsite Coding Round 1',
        duration: '45 mins',
        focus: 'Data Structures, Trees, Graphs, DP',
        description: 'Complex algorithmic puzzle. Requires explaining initial thought process, analyzing trade-offs, and writing clean, syntactically valid code.'
      },
      {
        id: 'r3',
        title: 'Round 3: Onsite Coding Round 2',
        duration: '45 mins',
        focus: 'Algorithms & Advanced Data Structures',
        description: 'Second algorithmic interview often involving multi-step optimization, dynamic programming, or customized graph traversal.'
      },
      {
        id: 'r4',
        title: 'Round 4: Large-Scale System Design',
        duration: '45 mins',
        focus: 'Distributed Systems & Scalability (L4+ roles)',
        description: 'Open-ended distributed system design (e.g., Design Google Drive, Global Rate Limiter, or YouTube Video Processing Pipeline). Covers RPCs, storage engines, caching, and CAP theorem.'
      },
      {
        id: 'r5',
        title: 'Round 5: Googlyness & Leadership',
        duration: '45 mins',
        focus: 'Behavioral, Culture & Navigating Ambiguity',
        description: 'Structured behavioral interview focusing on intellectual humility, handling ethical dilemmas, teamwork, receiving feedback, and pushing for inclusivity.'
      }
    ],
    preparationTips: [
      'Focus heavily on Graph algorithms (BFS, DFS, Dijkstra), Heaps, and Dynamic Programming.',
      'Google interviewers care deeply about test cases: dry-run your solution with edge cases before saying you are done.',
      'In System Design, state clear estimations (QPS, storage, bandwidth) and justify technology choices from first principles.',
      'Prepare STAR-method examples demonstrating how you embraced ambiguous requirements.'
    ],
    questions: [
      {
        id: 'goog_q1',
        roleId: 'swe',
        topic: 'Data Structures & Algorithms',
        difficulty: 'hard',
        round: 'Technical Interview',
        question: 'How do you design a thread-safe LRU Cache with O(1) get and put operations in Java or C++?',
        answer: 'Combine a Hash Map with a custom Doubly Linked List. The hash map maps keys to Node pointers for O(1) lookup. The doubly linked list maintains access order (most recently used at head, least recently used at tail). For thread-safety, use ReadWriteLock (fine-grained lock striping like ConcurrentHashMap) rather than a single synchronized lock to prevent high-concurrency contention.',
        followUp: 'How do you extend this to a distributed LRU cache across 10 servers with cache stampede protection?'
      },
      {
        id: 'goog_q2',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Design a globally distributed Rate Limiter for Google APIs that scales to 10 million requests per second.',
        answer: 'Use the Token Bucket or Sliding Window Counter algorithm. For low latency (<2ms), implement local memory token buckets on Envoy reverse proxies that periodically synchronize token batches (e.g. 100 tokens at a time) with a centralized Redis cluster via atomic Lua scripts or Google Spanner. Use consistent hashing to shard user keys evenly across rate limiter nodes.',
        followUp: 'What happens if the centralized Redis cluster suffers a network partition?'
      },
      {
        id: 'goog_q3',
        roleId: 'ai-llm',
        topic: 'AI & Machine Learning',
        difficulty: 'hard',
        round: 'Technical Interview',
        question: 'How does FlashAttention optimize the standard Transformer attention computation on modern GPU architectures?',
        answer: 'Standard attention writes huge intermediate N×N attention matrices to high-bandwidth memory (HBM), which is I/O memory bandwidth bound. FlashAttention uses GPU SRAM tiling (dividing Q, K, V into blocks) and computes softmax incrementally using online softmax normalization, fusing operations so the full N×N matrix is never materialized in HBM, speeding up attention by 2–4x and reducing memory to linear O(N).',
        followUp: 'How does FlashAttention-2 further increase GPU thread occupancy?'
      }
    ],
    checklist: [
      { id: 'g_c1', title: 'Master Graph Algorithms (Dijkstra, Topological Sort, Union-Find)', category: 'DSA' },
      { id: 'g_c2', title: 'Solve 50+ LeetCode Medium/Hard problems under 35-minute time limits', category: 'DSA' },
      { id: 'g_c3', title: 'Review Distributed Systems Fundamentals (CAP Theorem, Raft, Consistent Hashing)', category: 'System Design' },
      { id: 'g_c4', title: 'Practice 5 complete end-to-end System Design architectures on excalidraw', category: 'System Design' },
      { id: 'g_c5', title: 'Draft 5 Googlyness STAR behavioral stories (handling conflict, ambiguity)', category: 'Behavioral' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'MS',
    color: '#00A4EF',
    website: 'https://careers.microsoft.com',
    industry: 'Enterprise Software, Cloud (Azure), AI & Gaming',
    headquarters: 'Redmond, WA',
    products: ['Microsoft Azure', 'Microsoft 365', 'Windows', 'GitHub', 'LinkedIn', 'Xbox', 'Copilot'],
    description: 'Cloud and productivity juggernaut with emphasis on developer tooling, cloud-native microservices, object-oriented design patterns, and growth mindset culture.',
    hiringProcessNote: 'Typically consists of an initial Codility/Hackerrank online assessment, a technical phone screen, followed by a 4-round "loop" including an AA (As Appropriate) bar-raiser round.',
    rolesSupported: ['swe', 'backend', 'frontend', 'fullstack', 'cloud', 'devops', 'data-eng', 'data-sci', 'mle'],
    rounds: [
      { id: 'ms_r1', title: 'Round 1: Online Assessment (Codility)', duration: '60-90 mins', focus: '2-3 DSA & Debugging problems', description: 'Assesses edge-case handling, clean coding standards, and algorithmic correctness under test suites.' },
      { id: 'ms_r2', title: 'Round 2: Technical Phone Screen', duration: '45-60 mins', focus: 'DSA + Resume Deep Dive', description: 'Live coding on Teams/CoderPad with detailed inquiry into past architecture achievements.' },
      { id: 'ms_r3', title: 'Round 3: Onsite Loop - OOP & Low-Level Design', duration: '60 mins', focus: 'SOLID Principles & Design Patterns', description: 'Object-oriented modeling (e.g. Design Parking Lot, Elevator System, or In-Memory File System) demonstrating clean code separation.' },
      { id: 'ms_r4', title: 'Round 4: Onsite Loop - Cloud & System Design', duration: '60 mins', focus: 'Azure / Scalable Architecture', description: 'Designing multi-region microservices, resilient messaging with Kafka/Service Bus, and SQL vs NoSQL trade-offs.' },
      { id: 'ms_r5', title: 'Round 5: "As Appropriate" (AA) Bar Raiser Round', duration: '60 mins', focus: 'Leadership, Growth Mindset & Vision', description: 'Conducted by a Partner Engineer or Director evaluating long-term potential, handling setbacks, and cross-team collaboration.' }
    ],
    preparationTips: [
      'Focus on Trees, Linked Lists, Matrix traversal, and String manipulation.',
      'Be prepared for OOP design questions; know SOLID principles and Factory/Strategy/Observer patterns thoroughly.',
      'Understand Azure core concepts: App Services, Cosmos DB consistency levels, Azure Functions, and Blob Storage.',
      'Emphasize Microsoft’s core cultural philosophy: "Learn-it-all, not know-it-all".'
    ],
    questions: [
      {
        id: 'ms_q1',
        roleId: 'swe',
        topic: 'Object-Oriented Design',
        difficulty: 'medium',
        round: 'Technical Loop',
        question: 'Design an in-memory File System supporting mkdir, addContentToFile, and readContentFromFile.',
        answer: 'Create a composite tree structure with a base `Node` class containing `name` and `isDirectory`. `File` subclass holds string `content`. `Directory` subclass holds a `Map<String, Node> children`. Navigate path strings by splitting on "/" and traversing directory nodes.',
        followUp: 'How would you add file permission checks and multi-threaded synchronization?'
      },
      {
        id: 'ms_q2',
        roleId: 'cloud',
        topic: 'Cloud Architecture',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Explain the 5 consistency levels in Azure Cosmos DB and how they balance performance vs. correctness.',
        answer: 'Cosmos DB offers 5 well-defined consistency levels along the PACELC spectrum: 1. Strong (linearizable, highest latency), 2. Bounded Staleness (guarantees lag < K versions or T seconds), 3. Session (consistent read-your-own-writes per client session, default), 4. Consistent Prefix (reads never see out-of-order writes), 5. Eventual (weakest, highest throughput, lowest latency).',
        followUp: 'Which consistency level would you recommend for an e-commerce shopping cart vs a social media likes counter?'
      }
    ],
    checklist: [
      { id: 'ms_c1', title: 'Practice Object-Oriented Low-Level Design (SOLID principles)', category: 'LLD' },
      { id: 'ms_c2', title: 'Study Azure Cosmos DB consistency levels and storage tiers', category: 'Cloud' },
      { id: 'ms_c3', title: 'Prepare 3 stories demonstrating the Growth Mindset philosophy', category: 'Behavioral' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'AMZN',
    color: '#FF9900',
    website: 'https://amazon.jobs',
    industry: 'E-Commerce, Cloud Computing (AWS), Logistics & Streaming',
    headquarters: 'Seattle, WA',
    products: ['AWS', 'Amazon.com Marketplace', 'Prime Video', 'Alexa', 'Kindle', 'Amazon Logistics'],
    description: 'Customer-obsessed technology pioneer famous for rigorous evaluation against the 16 Leadership Principles (LPs), Bar Raiser mechanism, and high-scale operational excellence.',
    hiringProcessNote: 'Includes online assessment (OA1 debugging, OA2 coding, OA3 work simulation), followed by a 4-5 round virtual on-site loop with dedicated LP questions in every single round.',
    rolesSupported: ['swe', 'backend', 'fullstack', 'devops', 'cloud', 'data-eng', 'data-sci', 'sre', 'qa'],
    rounds: [
      { id: 'amz_r1', title: 'Round 1: Online Assessment (OA)', duration: '90 mins', focus: '2 LeetCode Mediums + Work Simulation', description: 'Algorithmic assessment on Hackerrank followed by situational judgment evaluating Amazon Leadership Principles.' },
      { id: 'amz_r2', title: 'Round 2: Onsite Coding Round 1', duration: '60 mins', focus: '20m LPs + 40m Data Structures', description: 'STAR behavioral stories on Customer Obsession / Deliver Results, followed by Trees, Graphs, or Heaps coding.' },
      { id: 'amz_r3', title: 'Round 3: Onsite Coding Round 2', duration: '60 mins', focus: '20m LPs + 40m Dynamic Programming / Graphs', description: 'Behavioral questions on Bias for Action / Ownership, followed by complex problem solving.' },
      { id: 'amz_r4', title: 'Round 4: High-Scale System Design', duration: '60 mins', focus: 'Distributed Systems & Scalability', description: 'Design Amazon Locker system, TinyURL, or Black Friday Checkout pipeline using SQS, DynamoDB, and Lambda.' },
      { id: 'amz_r5', title: 'Round 5: Bar Raiser Round', duration: '60 mins', focus: 'Deep Dive into Leadership Principles', description: 'Conducted by an independent Bar Raiser from a separate organization with veto power, evaluating long-term engineering caliber.' }
    ],
    preparationTips: [
      'Every single Amazon interview round allocates 15-20 minutes to Leadership Principles. Do not neglect LPs.',
      'Write down 2 distinct STAR stories for all 16 Leadership Principles beforehand.',
      'In System Design, master AWS primitives: DynamoDB (single-table design), SQS, S3, Kinesis, and Aurora.',
      'Focus on HashMaps, Two-Pointers, BFS/DFS, PriorityQueue, and Top-K element problems.'
    ],
    questions: [
      {
        id: 'amz_q1',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Design the Amazon Flash Sale (Lightning Deals) inventory reservation service under 100,000 concurrent checkout attempts.',
        answer: 'Decouple inventory reservation from payment processing. Use Redis with atomic Lua scripts for inventory decrements (`DECRBY item_count 1`). If positive, push reservation token with 10-minute TTL into Amazon SQS for asynchronous payment processing. Use idempotency keys to ensure orders are not charged twice if network timeouts occur.',
        followUp: 'How do you prevent bots from draining inventory using distributed denial of inventory attacks?'
      },
      {
        id: 'amz_q2',
        roleId: 'swe',
        topic: 'Leadership Principles',
        difficulty: 'medium',
        round: 'Behavioral / Bar Raiser',
        question: 'Tell me about a time when you had to make a high-stakes decision without sufficient data (Bias for Action).',
        answer: 'Provide a structured STAR story: Describe an outage or launch deadline where waiting for complete metrics would have cost the business revenue. Explain the calculated risk taken, the two-way door decision framework used to allow rollback, and the quantifiable outcome achieved.',
        followUp: 'If the decision had failed, how would you have handled accountability?'
      }
    ],
    checklist: [
      { id: 'amz_c1', title: 'Prepare 10+ STAR stories covering all Amazon Leadership Principles', category: 'Behavioral' },
      { id: 'amz_c2', title: 'Practice DynamoDB Single Table Design and partitioning schemes', category: 'System Design' },
      { id: 'amz_c3', title: 'Master Top-K Frequent Elements and PriorityQueue patterns', category: 'DSA' }
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'META',
    color: '#0668E1',
    website: 'https://metacareers.com',
    industry: 'Social Media, Virtual Reality, AI & Advertising',
    headquarters: 'Menlo Park, CA',
    products: ['Facebook', 'Instagram', 'WhatsApp', 'Meta Quest', 'Llama 3 AI', 'PyTorch'],
    description: 'Fast-moving engineering culture emphasizing rapid coding speed, scalable real-time feed architectures, and open-source AI innovation.',
    hiringProcessNote: 'Famous for requiring candidates to solve 2 complete LeetCode Medium problems in a single 45-minute technical screen.',
    rolesSupported: ['swe', 'frontend', 'backend', 'fullstack', 'mle', 'ai-llm', 'data-sci', 'data-eng'],
    rounds: [
      { id: 'meta_r1', title: 'Round 1: Initial Technical Screen', duration: '45 mins', focus: '2 LeetCode Medium Coding Problems', description: 'Speed and bug-free code are paramount. Expect 2 distinct algorithmic questions in 40 minutes.' },
      { id: 'meta_r2', title: 'Round 2: Onsite Coding Round 1', duration: '45 mins', focus: '2 Medium Problems (Trees, Graphs, Arrays)', description: 'Fast implementation with optimal Big-O time and space complexity.' },
      { id: 'meta_r3', title: 'Round 3: Onsite Coding Round 2', duration: '45 mins', focus: 'String manipulation, Recursion, Binary Search', description: 'Second fast-paced coding interview.' },
      { id: 'meta_r4', title: 'Round 4: System Design / Product Architecture', duration: '45 mins', focus: 'Large-scale Feed / Messaging Design', description: 'Design Facebook News Feed, Instagram Stories, or WhatsApp End-to-End Encryption architecture.' },
      { id: 'meta_r5', title: 'Round 5: Behavioral (Jedi) Round', duration: '45 mins', focus: 'Impact, Conflict Resolution & Adaptability', description: 'Evaluates alignment with Meta core values: Move Fast, Focus on Long-Term Impact, and Live in the Future.' }
    ],
    preparationTips: [
      'Speed is the key differentiator at Meta: aim to code a bug-free LeetCode Medium in under 18 minutes.',
      'Practice Meta-tagged problems on LeetCode: Binary Search variants, Trees, Graph traversals, and Subarray sums.',
      'In System Design, master fan-out-on-write vs fan-out-on-read trade-offs for social feeds.'
    ],
    questions: [
      {
        id: 'meta_q1',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Design Instagram News Feed: Compare Fan-Out-on-Write vs Fan-Out-on-Read for 1 billion users.',
        answer: 'Fan-Out-on-Write (Push): When user posts, append post ID directly to all followers’ timeline caches in Redis. Fast reads O(1), but expensive for celebrities with 100M followers (write amplification). Fan-Out-on-Read (Pull): When user opens app, query latest posts from all followed accounts and merge-sort. Slow reads O(N), fast writes. Hybrid Meta Solution: Push for normal users; Pull for celebrity accounts and merge at read time.',
        followUp: 'How do you rank feed items using real-time ML feature scoring?'
      }
    ],
    checklist: [
      { id: 'meta_c1', title: 'Practice solving 2 LeetCode Mediums under 40 minutes strictly', category: 'DSA' },
      { id: 'meta_c2', title: 'Study Feed architecture: Fan-out on write vs read hybrid trade-offs', category: 'System Design' }
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'AAPL',
    color: '#A2AAAD',
    website: 'https://jobs.apple.com',
    industry: 'Consumer Electronics, Operating Systems & Cloud Services',
    headquarters: 'Cupertino, CA',
    products: ['iPhone', 'MacBook', 'iOS/macOS', 'Apple Silicon (M-series)', 'Apple Vision Pro', 'iCloud'],
    description: 'Renowned for privacy, hardware-software integration, low-level OS optimization, and team-specific hiring processes.',
    hiringProcessNote: 'Hiring is decentralized by team. Expect domain-specific questions tailored closely to the specific group (e.g. CoreOS, iCloud, Siri).',
    rolesSupported: ['swe', 'backend', 'frontend', 'sre', 'devops', 'qa', 'mle'],
    rounds: [
      { id: 'app_r1', title: 'Round 1: Team Recruiter & Tech Screen', duration: '45 mins', focus: 'CS Fundamentals & Experience', description: 'Technical discussion on past projects and relevant domain knowledge.' },
      { id: 'app_r2', title: 'Round 2: Algorithmic Coding', duration: '60 mins', focus: 'Data structures & Memory efficiency', description: 'Coding problems focusing on space complexity, memory pointers, and algorithmic trade-offs.' },
      { id: 'app_r3', title: 'Round 3: Deep Domain & Low-Level Round', duration: '60 mins', focus: 'Concurrency, Memory, OS & Systems', description: 'Multi-threading, cache locality, CPU memory registers, and lock contention.' },
      { id: 'app_r4', title: 'Round 4: System Architecture', duration: '60 mins', focus: 'iCloud scale distributed design', description: 'Privacy-first distributed data storage, zero-knowledge encryption, and high-availability caching.' },
      { id: 'app_r5', title: 'Round 5: Managerial & Cultural Fit', duration: '45 mins', focus: 'Attention to detail and excellence', description: 'Deep probe into engineering craftsmanship, obsession with quality, and cross-functional collaboration.' }
    ],
    preparationTips: [
      'Apple emphasizes memory efficiency and clean code structure over clever one-liners.',
      'Understand low-level concepts: virtual memory, threads, cache invalidation, and concurrency primitives.',
      'Review Apple’s privacy architecture and local edge-compute principles.'
    ],
    questions: [
      {
        id: 'appl_q1',
        roleId: 'swe',
        topic: 'Operating Systems & Concurrency',
        difficulty: 'hard',
        round: 'Domain Technical Round',
        question: 'What is Priority Inversion in multi-threaded systems and how does Priority Inheritance resolve it?',
        answer: 'Priority Inversion occurs when a low-priority thread holds a shared lock needed by a high-priority thread, and a medium-priority thread preempts the low-priority thread, preventing the high-priority thread from making progress. Priority Inheritance solves this by temporarily elevating the low-priority thread to the priority level of the waiting high-priority thread until it releases the lock.',
        followUp: 'How was Priority Inversion famously discovered on the Mars Pathfinder spacecraft?'
      }
    ],
    checklist: [
      { id: 'appl_c1', title: 'Review OS Concurrency (Deadlocks, Mutexes, Memory Barricades)', category: 'CS Fundamentals' },
      { id: 'appl_c2', title: 'Master Space-Optimal Algorithms with O(1) auxiliary memory', category: 'DSA' }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'NFLX',
    color: '#E50914',
    website: 'https://jobs.netflix.com',
    industry: 'Streaming Entertainment & Production',
    headquarters: 'Los Gatos, CA',
    products: ['Netflix Streaming Platform', 'Open Connect CDN', 'Chaos Monkey / Simian Army', 'Spinnaker'],
    description: 'Pioneers of cloud-native microservices, chaos engineering, and high-autonomy "Freedom and Responsibility" engineering culture.',
    hiringProcessNote: 'Hires predominantly senior engineers. Heavy emphasis on cultural memo (Freedom and Responsibility, Keeper Test, context not control).',
    rolesSupported: ['swe', 'backend', 'fullstack', 'devops', 'sre', 'data-eng', 'mle'],
    rounds: [
      { id: 'nflx_r1', title: 'Round 1: Recruiter & Culture Screen', duration: '45 mins', focus: 'Freedom & Responsibility alignment', description: 'In-depth assessment of ownership, transparency, and self-direction.' },
      { id: 'nflx_r2', title: 'Round 2: Technical Screen', duration: '60 mins', focus: 'System Architecture & Practical Coding', description: 'High-level discussion on practical microservice resiliency and concurrency.' },
      { id: 'nflx_r3', title: 'Round 3: Onsite System Design 1', duration: '60 mins', focus: 'High-Throughput Video Ingestion/Encoding', description: 'Designing distributed encoding pipelines with chunked uploads and event-driven architectures.' },
      { id: 'nflx_r4', title: 'Round 4: Onsite System Design 2', duration: '60 mins', focus: 'Resiliency, Chaos Engineering & Caching', description: 'Circuit breakers, fallback mechanisms, and zero-downtime multi-region deployments.' },
      { id: 'nflx_r5', title: 'Round 5: Executive Culture Interview', duration: '45 mins', focus: 'Keeper Test, High Performance Culture', description: 'Interview with Engineering Director assessing independence, direct feedback handling, and business acumen.' }
    ],
    preparationTips: [
      'Read and internalize the Netflix Culture Memo: "Freedom and Responsibility".',
      'Master Chaos Engineering principles, Circuit Breaker patterns (Resilience4j/Hystrix), and Open Connect CDN caching.',
      'Be ready to discuss real-world architectural mistakes and how you handled root-cause post-mortems.'
    ],
    questions: [
      {
        id: 'nflx_q1',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Design a distributed video chunking and parallel encoding pipeline processing 4K video uploads.',
        answer: 'Ingest raw video into S3 via multipart presigned URLs. An S3 event triggers an AWS Step Functions workflow that inspects keyframes and splits video into 10-second GOP (Group of Pictures) chunks. Chunks are dispatched across a fleet of auto-scaled worker nodes (using Spot instances) encoding into multiple bitrates/codecs (H.264, AV1). Chunks are assembled into dynamic manifest files (HLS/DASH) and distributed to Open Connect edge appliances.',
        followUp: 'How do you handle worker node crashes during chunk encoding without restarting the whole movie?'
      }
    ],
    checklist: [
      { id: 'nflx_c1', title: 'Read the Netflix Freedom & Responsibility Culture Document', category: 'Culture' },
      { id: 'nflx_c2', title: 'Master Circuit Breakers, Bulkheading, and Chaos Engineering', category: 'System Design' }
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'ADBE',
    color: '#FF0000',
    website: 'https://careers.adobe.com',
    industry: 'Digital Media, Creative Cloud & Enterprise Experience Platform',
    headquarters: 'San Jose, CA',
    products: ['Photoshop', 'Adobe Creative Cloud', 'Acrobat / PDF', 'Adobe Experience Platform', 'Firefly AI'],
    description: 'Creative and digital marketing leader combining high-performance desktop graphics algorithms with large-scale cloud document collaboration.',
    hiringProcessNote: 'Standard rounds include HackerRank OA, 2 technical interviews covering DSA and OS/OOP, and a hiring manager round.',
    rolesSupported: ['swe', 'frontend', 'backend', 'fullstack', 'mle', 'qa'],
    rounds: [
      { id: 'adbe_r1', title: 'Round 1: HackerRank Online Assessment', duration: '90 mins', focus: 'DSA + Mathematical Logic', description: 'Assesses algorithms, matrix transformations, and string parsing.' },
      { id: 'adbe_r2', title: 'Round 2: Technical Interview 1', duration: '60 mins', focus: 'Data Structures & Algorithms', description: 'Trees, Linked Lists, Matrix manipulations, and Big-O trade-offs.' },
      { id: 'adbe_r3', title: 'Round 3: Technical Interview 2', duration: '60 mins', focus: 'CS Fundamentals & Low-Level Design', description: 'Object-oriented patterns, Memory management (C++/Java), and OS processes.' },
      { id: 'adbe_r4', title: 'Round 4: Cloud / Document System Design', duration: '60 mins', focus: 'Collaborative Document Editing', description: 'Design real-time collaborative document editing (Operational Transformation / CRDTs).' },
      { id: 'adbe_r5', title: 'Round 5: HR & Managerial Round', duration: '45 mins', focus: 'Behavioral, Innovation & Team Collaboration', description: 'Discussion of past projects, customer focus, and cultural fit.' }
    ],
    preparationTips: [
      'Focus on Matrix problems, 2D geometry, Trees, and Object-Oriented design.',
      'Understand real-time collaboration algorithms: Operational Transformation (OT) vs Conflict-free Replicated Data Types (CRDTs).',
      'Brush up on C++ / Java fundamentals: memory allocation, pointers, and garbage collection.'
    ],
    questions: [
      {
        id: 'adbe_q1',
        roleId: 'frontend',
        topic: 'Collaborative Systems',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Explain how Conflict-Free Replicated Data Types (CRDTs) enable real-time concurrent document editing without a central server lock.',
        answer: 'CRDTs are data structures that can be replicated across multiple nodes and updated concurrently without central coordination. Operations satisfy commutativity and idempotency: applying updates in any order produces the exact same final document state. State-based (CvRDT) merge states using semilattices; Operation-based (CmRDT) transmit commutative delta operations.',
        followUp: 'How do CRDTs compare with Google Docs Operational Transformation (OT)?'
      }
    ],
    checklist: [
      { id: 'adbe_c1', title: 'Review CRDT vs Operational Transformation collaborative algorithms', category: 'System Design' },
      { id: 'adbe_c2', title: 'Practice Matrix 2D manipulation and Tree traversal problems', category: 'DSA' }
    ]
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'NVDA',
    color: '#76B900',
    website: 'https://www.nvidia.com/careers',
    industry: 'Accelerated Computing, GPUs, AI Hardware & Omniverse',
    headquarters: 'Santa Clara, CA',
    products: ['CUDA', 'H100/B200 Tensor Core GPUs', 'TensorRT', 'Triton Inference Server', 'Omniverse', 'GeForce'],
    description: 'The world leader in accelerated computing and AI infrastructure, requiring exceptional proficiency in CUDA C++, computer architecture, and distributed GPU training.',
    hiringProcessNote: 'Highly technical interviews covering GPU memory hierarchies, CUDA thread blocks, parallel programming, and low-level C++.',
    rolesSupported: ['swe', 'mle', 'ai-llm', 'sre', 'devops'],
    rounds: [
      { id: 'nvda_r1', title: 'Round 1: Technical Screening', duration: '60 mins', focus: 'C++, Concurrency & Algorithms', description: 'Deep probe into modern C++ (smart pointers, move semantics) and parallel data structures.' },
      { id: 'nvda_r2', title: 'Round 2: Computer Architecture & Systems', duration: '60 mins', focus: 'CPU/GPU Memory Hierarchy, Caches', description: 'L1/L2 cache lines, memory coalescing, warp divergence, and PCIe/NVLink bandwidth limits.' },
      { id: 'nvda_r3', title: 'Round 3: CUDA & Parallel Programming', duration: '60 mins', focus: 'CUDA Kernels & Shared Memory', description: 'Write or optimize a parallel CUDA kernel (e.g., Matrix Multiplication or Reduction).' },
      { id: 'nvda_r4', title: 'Round 4: AI Systems & Performance Engineering', duration: '60 mins', focus: 'TensorRT, PyTorch C++ Extensions', description: 'Optimizing inference throughput, kernel fusion, and mixed-precision arithmetic (FP8/INT8).' },
      { id: 'nvda_r5', title: 'Round 5: Hiring Manager & Culture', duration: '45 mins', focus: 'First-principles thinking & craftsmanship', description: 'Discussion of complex debugging challenges and ownership.' }
    ],
    preparationTips: [
      'Master CUDA programming: Threads, Warps (32 threads), Blocks, Grids, and Shared Memory.',
      'Understand GPU memory coalescing and how to eliminate warp divergence.',
      'Study NVIDIA inference software stack: TensorRT, Triton, and DeepStream.'
    ],
    questions: [
      {
        id: 'nvda_q1',
        roleId: 'mle',
        topic: 'Accelerated Computing',
        difficulty: 'hard',
        round: 'CUDA Technical Round',
        question: 'What is GPU Memory Coalescing in CUDA and why is it essential for memory bandwidth efficiency?',
        answer: 'Memory coalescing occurs when all 32 threads in a CUDA warp access contiguous 32-byte, 64-byte, or 128-byte memory addresses simultaneously. The GPU memory controller bundles these requests into a single memory transaction. If access patterns are strided or random (uncoalesced), the controller must issue 32 separate transactions, cutting effective memory throughput by over 90%.',
        followUp: 'How do you use CUDA Shared Memory to coalesce strided matrix transpose operations?'
      }
    ],
    checklist: [
      { id: 'nvda_c1', title: 'Study CUDA Memory Hierarchy (Global, Shared, Registers, Constant)', category: 'Parallel Computing' },
      { id: 'nvda_c2', title: 'Implement parallel reduction using CUDA Shared Memory and tree folding', category: 'CUDA' }
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'CRM',
    color: '#00A1E0',
    website: 'https://careers.salesforce.com',
    industry: 'Enterprise Cloud, CRM & Platform-as-a-Service',
    headquarters: 'San Francisco, CA',
    products: ['Sales Cloud', 'Service Cloud', 'MuleSoft', 'Tableau', 'Slack', 'Einstein 1 Platform'],
    description: 'Enterprise cloud pioneer known for multi-tenant database architectures, metadata-driven frameworks, and the Ohana cultural values.',
    hiringProcessNote: 'Standard technical interviews evaluate Java/C++, multitenancy, REST API design, and cultural alignment.',
    rolesSupported: ['swe', 'backend', 'fullstack', 'devops', 'cloud', 'qa'],
    rounds: [
      { id: 'crm_r1', title: 'Round 1: Online Assessment', duration: '60 mins', focus: 'DSA & Object-Oriented Questions', description: 'Assesses standard algorithmic problem solving on HackerRank.' },
      { id: 'crm_r2', title: 'Round 2: Technical Screen', duration: '60 mins', focus: 'DSA + Core Java/OOP', description: 'Coding on data structures with focus on clean abstraction and interfaces.' },
      { id: 'crm_r3', title: 'Round 3: System Design & Multitenancy', duration: '60 mins', focus: 'Multi-Tenant Architecture', description: 'Designing multi-tenant database schemas with tenant isolation and metadata catalogs.' },
      { id: 'crm_r4', title: 'Round 4: Low-Level Design & Code Quality', duration: '60 mins', focus: 'Design Patterns & API Contracts', description: 'Writing extensible classes, unit testing, and SOLID design patterns.' },
      { id: 'crm_r5', title: 'Round 5: Managerial & Ohana Culture', duration: '45 mins', focus: 'Trust, Customer Success & Equality', description: 'Evaluating teamwork, empathy, and customer-first mindset.' }
    ],
    preparationTips: [
      'Understand how multi-tenant database architectures work (shared database, shared schema with Tenant ID vs separate schemas).',
      'Review Java concurrency, Spring Boot, and enterprise design patterns.',
      'Demonstrate alignment with Salesforce’s 4 core values: Trust, Customer Success, Innovation, Equality.'
    ],
    questions: [
      {
        id: 'crm_q1',
        roleId: 'backend',
        topic: 'Architecture',
        difficulty: 'medium',
        round: 'System Design Round',
        question: 'Compare the 3 primary multi-tenant database architectures for enterprise SaaS.',
        answer: '1. Separate Database per Tenant: Highest isolation and security; highest cost and operational overhead.\n2. Shared Database, Separate Schemas: Moderate isolation; schema migrations become complex across thousands of tenants.\n3. Shared Database, Shared Schema (Salesforce Model): All tenants share tables with `tenant_id` column. Governed by a unified metadata layer and strict query filters. Lowest hardware cost and infinite elasticity, but requires bulletproof application-level row isolation.',
        followUp: 'How do you prevent a single tenant from exhausting shared database resources (noisy neighbor problem)?'
      }
    ],
    checklist: [
      { id: 'crm_c1', title: 'Study SaaS Multi-Tenant architecture and noisy-neighbor mitigation', category: 'System Design' },
      { id: 'crm_c2', title: 'Review Core Java Concurrency and Collections framework', category: 'CS Fundamentals' }
    ]
  },
  {
    id: 'oracle',
    name: 'Oracle',
    tier: 'Product & Big Tech',
    tierId: 'product-tech',
    logoText: 'ORCL',
    color: '#F80000',
    website: 'https://www.oracle.com/careers',
    industry: 'Enterprise Databases, Cloud Infrastructure (OCI) & Enterprise Software',
    headquarters: 'Austin, TX',
    products: ['Oracle Database', 'Oracle Cloud Infrastructure (OCI)', 'Java SE', 'MySQL', 'ERP Cloud'],
    description: 'Database and cloud infrastructure powerhouse emphasizing deep DBMS internals, ACID concurrency control, and high-performance OCI networking.',
    hiringProcessNote: 'Interviews probe deeply into operating systems, database ACID internals, transactions, and distributed networking.',
    rolesSupported: ['swe', 'backend', 'cloud', 'devops', 'sre', 'data-eng'],
    rounds: [
      { id: 'orcl_r1', title: 'Round 1: Online Coding Test', duration: '90 mins', focus: 'DSA & Database Queries', description: 'Coding problems along with complex SQL queries and algorithmic trade-offs.' },
      { id: 'orcl_r2', title: 'Round 2: DSA & Problem Solving', duration: '60 mins', focus: 'Trees, Heaps, Graph algorithms', description: 'Clean algorithmic implementation on HackerRank CoderPad.' },
      { id: 'orcl_r3', title: 'Round 3: Database Internals & OS', duration: '60 mins', focus: 'ACID, B+ Trees, WAL, Concurrency', description: 'Deep dive into database storage engines, locking, isolation levels, and paging.' },
      { id: 'orcl_r4', title: 'Round 4: OCI Cloud / Distributed Systems', duration: '60 mins', focus: 'Infrastructure & High Availability', description: 'Designing fault-tolerant storage, block volumes, and distributed consensus.' },
      { id: 'orcl_r5', title: 'Round 5: Hiring Manager Round', duration: '45 mins', focus: 'Project deep dive and leadership', description: 'Detailed inquiry into architecture trade-offs in candidate\'s past projects.' }
    ],
    preparationTips: [
      'Master Database Internals: B+ Tree indexing, Write-Ahead Logging (WAL), MVCC, and Isolation Levels.',
      'Understand OCI infrastructure concepts: Off-box virtualization, RDMA networking, and Autonomous Database.',
      'Be prepared for deep OS questions: Page faults, fork vs vfork, semaphores vs spinlocks.'
    ],
    questions: [
      {
        id: 'orcl_q1',
        roleId: 'backend',
        topic: 'Database Internals',
        difficulty: 'hard',
        round: 'Database Systems Round',
        question: 'How does Multi-Version Concurrency Control (MVCC) eliminate read-write locking conflicts in high-throughput databases?',
        answer: 'Instead of acquiring shared read locks that block write operations, MVCC creates a new timestamped version of a row whenever an update occurs. Readers read the snapshot version that was committed prior to their transaction start timestamp. Writers append new row versions with undo logs. Readers never block writers, and writers never block readers.',
        followUp: 'How does the database garbage collect stale row versions in undo tablespaces?'
      }
    ],
    checklist: [
      { id: 'orcl_c1', title: 'Master B+ Tree Indexing vs LSM Trees storage mechanics', category: 'DBMS' },
      { id: 'orcl_c2', title: 'Review MVCC, 2-Phase Locking (2PL), and ACID Transaction Isolation Levels', category: 'DBMS' }
    ]
  },

  // ==================== 2. IT SERVICES & CONSULTING ====================
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'TCS',
    color: '#002B49',
    website: 'https://www.tcs.com/careers',
    industry: 'IT Services, Consulting & Business Solutions',
    headquarters: 'Mumbai, India',
    products: ['TCS BaNCS', 'Ignio AI', 'TCS iON', 'Enterprise Modernization'],
    description: 'India\'s largest multinational IT services provider with massive global delivery across banking, healthcare, retail, and manufacturing.',
    hiringProcessNote: 'Conducted primarily via TCS NQT (National Qualifier Test) featuring Aptitude, Reasoning, Verbal, and Hands-on Coding, followed by Technical and HR interviews.',
    rolesSupported: ['swe', 'fullstack', 'qa', 'devops', 'cloud', 'data-eng'],
    rounds: [
      { id: 'tcs_r1', title: 'Round 1: TCS NQT (Cognitive & Coding)', duration: '120 mins', focus: 'Aptitude, Logical Reasoning, Coding', description: 'Section A: Numerical & Verbal ability. Section B: 2 Hands-on programming problems (C/Java/Python).' },
      { id: 'tcs_r2', title: 'Round 2: Technical Interview', duration: '30-45 mins', focus: 'OOP, DBMS, SQL & Final Year Project', description: 'Assesses Java/C++ basics, SQL Joins, normal forms, and in-depth explanation of college projects.' },
      { id: 'tcs_r3', title: 'Round 3: Managerial & HR Round', duration: '20-30 mins', focus: 'Communication, Relocation, Shift Readiness', description: 'Evaluates adaptability, professional communication, and willingness to work across domains/locations.' }
    ],
    preparationTips: [
      'Practice quantitative aptitude and logical reasoning speed tests thoroughly for NQT.',
      'Be prepared to write clean code for classic problems: Palindrome, Armstrong numbers, Matrix rotation, String anagrams.',
      'Know your final year project inside-out: architecture, database schema, and personal contribution.'
    ],
    questions: [
      {
        id: 'tcs_q1',
        roleId: 'swe',
        topic: 'Core CS & OOP',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'Explain the difference between Method Overloading and Method Overriding with code.',
        answer: 'Overloading occurs within the same class with identical method names but different parameter lists (compile-time polymorphism). Overriding occurs across parent and child classes where child provides specific implementation of an inherited method (runtime polymorphism).',
        followUp: 'Can we override a static method in Java?'
      }
    ],
    checklist: [
      { id: 'tcs_c1', title: 'Practice Quantitative Aptitude (Time & Work, Probability, Percentages)', category: 'Aptitude' },
      { id: 'tcs_c2', title: 'Prepare a 3-minute structured walkthrough of your academic project', category: 'Project' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'INFY',
    color: '#007CC3',
    website: 'https://www.infosys.com/careers',
    industry: 'Digital Services & Consulting',
    headquarters: 'Bengaluru, India',
    products: ['Finacle Banking', 'Infosys Topaz (AI)', 'Infosys Cobalt (Cloud)', 'Enterprise Cloud Transformation'],
    description: 'Pioneering IT consulting leader famous for its world-class corporate training university in Mysuru and global enterprise delivery.',
    hiringProcessNote: 'Conducted via InfyTQ / Campus Recruitment. High focus on Python/Java, database normalization, and structured pseudo-code reasoning.',
    rolesSupported: ['swe', 'fullstack', 'cloud', 'qa', 'data-eng'],
    rounds: [
      { id: 'infy_r1', title: 'Round 1: Online Assessment', duration: '100 mins', focus: 'Mathematical Ability, Reasoning, Verbal', description: 'Time-pressured aptitude and reasoning test with sectional cutoffs.' },
      { id: 'infy_r2', title: 'Round 2: Technical Interview', duration: '30-45 mins', focus: 'DSA, SQL, Web Basics & Project', description: 'Checks core coding fundamentals, basic data structures (Arrays, Linked Lists), and SQL queries.' },
      { id: 'infy_r3', title: 'Round 3: HR Round', duration: '20 mins', focus: 'Cultural fit and communication', description: 'Assesses career goals, teamwork examples, and learning orientation.' }
    ],
    preparationTips: [
      'Focus on pseudo-code output prediction questions for the online assessment.',
      'Be prepared to write SQL queries involving `GROUP BY`, `HAVING`, and `INNER / LEFT JOIN`.',
      'Explain your thought process clearly in fluent, structured English.'
    ],
    questions: [
      {
        id: 'infy_q1',
        roleId: 'swe',
        topic: 'SQL & DBMS',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'Write a query to find the second highest salary from an Employee table without using LIMIT/TOP.',
        answer: '`SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`\nAlternative using window function: `SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) WHERE rnk = 2;`',
        followUp: 'Why is DENSE_RANK preferred over RANK when salaries have duplicate ties?'
      }
    ],
    checklist: [
      { id: 'infy_c1', title: 'Practice 20 essential SQL query patterns (2nd Highest Salary, Self Joins)', category: 'SQL' },
      { id: 'infy_c2', title: 'Review Object-Oriented Programming definitions and examples', category: 'OOP' }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'WIPRO',
    color: '#343434',
    website: 'https://careers.wipro.com',
    industry: 'IT Services, Digital Transformation & Cyber Security',
    headquarters: 'Bengaluru, India',
    products: ['Wipro ai360', 'Cloud Car Ecosystem', 'Enterprise Cyber Defense'],
    description: 'Global IT and engineering consultancy with large practices in healthcare, banking, telecommunications, and cybersecurity.',
    hiringProcessNote: 'Conducted via National Level Talent Hunt (NLTH) featuring Aptitude, Written Communication, and Coding.',
    rolesSupported: ['swe', 'fullstack', 'cloud', 'devops', 'qa'],
    rounds: [
      { id: 'wpr_r1', title: 'Round 1: Elite National Talent Hunt (NLTH)', duration: '128 mins', focus: 'Aptitude, Essay Writing, 2 Coding Qs', description: 'Online assessment assessing quantitative skills, automated essay evaluation, and coding.' },
      { id: 'wpr_r2', title: 'Round 2: Technical Interview', duration: '30 mins', focus: 'C/Java/Python fundamentals & Projects', description: 'Review of coding concepts, memory allocation, and database schema.' },
      { id: 'wpr_r3', title: 'Round 3: HR Interview', duration: '15 mins', focus: 'Flexibility, career plans & communication', description: 'Assesses shift willingness and interpersonal readiness.' }
    ],
    preparationTips: [
      'Practice typing and grammar for the automated written essay evaluation section.',
      'Be clear on fundamental coding constructs: loops, recursion, and string manipulation.'
    ],
    questions: [
      {
        id: 'wpr_q1',
        roleId: 'swe',
        topic: 'Programming Fundamentals',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'What is the difference between a Process and a Thread in operating systems?',
        answer: 'A Process is an executing instance of a program with its own independent virtual address space and resources. A Thread is a lightweight unit of execution within a process that shares memory and file descriptors with peer threads, enabling fast context switching.',
        followUp: 'What are the main causes of Deadlock in multi-threaded programs?'
      }
    ],
    checklist: [
      { id: 'wpr_c1', title: 'Practice automated Essay writing with proper paragraph structure', category: 'Communication' }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'ACN',
    color: '#A100FF',
    website: 'https://www.accenture.com/careers',
    industry: 'Strategy, Consulting, Cloud & Technology Services',
    headquarters: 'Dublin, Ireland',
    products: ['SynOps Platform', 'myNav Cloud Advisory', 'AI Enterprise Transformation'],
    description: 'Fortune Global 500 consulting firm known for innovative technology advisory, cloud migrations, and structured hiring pipelines.',
    hiringProcessNote: 'Features a Cognitive and Technical assessment followed by a Coding round and an automated Virtual Interview.',
    rolesSupported: ['swe', 'fullstack', 'devops', 'cloud', 'data-eng', 'data-sci'],
    rounds: [
      { id: 'acn_r1', title: 'Round 1: Cognitive & Technical Assessment', duration: '90 mins', focus: 'Critical Thinking, Pseudocode, Cloud & Security', description: 'Tests logical reasoning, verbal ability, pseudo-code analysis, and cloud computing fundamentals.' },
      { id: 'acn_r2', title: 'Round 2: Coding Assessment', duration: '45 mins', focus: '2 Programming Challenges', description: 'Requires passing test cases using C++, Java, or Python.' },
      { id: 'acn_r3', title: 'Round 3: Communication Assessment', duration: '20 mins', focus: 'Spoken English & Listening', description: 'Automated test assessing pronunciation, sentence mastery, and listening comprehension.' },
      { id: 'acn_r4', title: 'Round 4: Technical & HR Virtual Interview', duration: '30-40 mins', focus: 'Project Discussion & Behavioral Fit', description: 'Discusses candidate achievements, cloud interest, and client-facing skills.' }
    ],
    preparationTips: [
      'Practice predicting pseudo-code outputs: variable scope, bitwise operations, and recursive calls.',
      'Prepare for the automated audio assessment with a clear headset and quiet background.'
    ],
    questions: [
      {
        id: 'acn_q1',
        roleId: 'cloud',
        topic: 'Cloud Fundamentals',
        difficulty: 'medium',
        round: 'Technical Assessment',
        question: 'Compare IaaS, PaaS, and SaaS cloud service models with real-world examples.',
        answer: '• IaaS (Infrastructure as a Service): Cloud provider manages hardware/virtualization; you manage OS, middleware, and apps (e.g. AWS EC2, Azure VM).\n• PaaS (Platform as a Service): Provider manages OS and runtime; you manage application code and data (e.g. AWS Elastic Beanstalk, Heroku).\n• SaaS (Software as a Service): Complete end-user application delivered over the web (e.g. Google Workspace, Salesforce).',
        followUp: 'What is Shared Responsibility model in cloud security?'
      }
    ],
    checklist: [
      { id: 'acn_c1', title: 'Review Cloud Service Models (IaaS, PaaS, SaaS) and deployment types', category: 'Cloud' }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'CTSH',
    color: '#0033A0',
    website: 'https://careers.cognizant.com',
    industry: 'Digital Transformation & Enterprise IT',
    headquarters: 'Teaneck, NJ',
    products: ['TriZetto Healthcare', 'Cognizant Neuro AI', 'Cloud Modernization'],
    description: 'Global IT and digital engineering service provider with top-tier domain leadership in healthcare, life sciences, and financial services.',
    hiringProcessNote: 'Conducted through GenC and GenC Next tracks with differing coding difficulty bars.',
    rolesSupported: ['swe', 'fullstack', 'qa', 'cloud', 'data-eng'],
    rounds: [
      { id: 'cts_r1', title: 'Round 1: Aptitude & Skill Assessment', duration: '80 mins', focus: 'Quantitative, Verbal, Automata Coding', description: 'Sectional tests measuring analytical aptitude and basic programming syntax.' },
      { id: 'cts_r2', title: 'Round 2: Technical Interview', duration: '30-45 mins', focus: 'Java, SQL, Data Structures & Project', description: 'Evaluation of candidate code, SQL queries, and fundamental computer science subjects.' },
      { id: 'cts_r3', title: 'Round 3: HR Discussion', duration: '20 mins', focus: 'Cultural fit and location preferences', description: 'Communication and willingness to learn new technologies.' }
    ],
    preparationTips: [
      'Focus on basic data structures: Arrays, Strings, Linked Lists, and Stacks.',
      'Be prepared to write code on a notepad or online whiteboard during technical rounds.'
    ],
    questions: [
      {
        id: 'cts_q1',
        roleId: 'swe',
        topic: 'Data Structures',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'How do you detect a cycle in a Singly Linked List without extra memory?',
        answer: 'Use Floyd’s Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers: a slow pointer moving 1 step at a time and a fast pointer moving 2 steps. If a cycle exists, the fast pointer will eventually lap and meet the slow pointer. If the fast pointer reaches null, there is no cycle. Time complexity: O(N), Space complexity: O(1).',
        followUp: 'How do you find the exact node where the cycle begins?'
      }
    ],
    checklist: [
      { id: 'cts_c1', title: 'Master Two-Pointer Linked List techniques (Floyd\'s Cycle, Midpoint)', category: 'DSA' }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'CAP',
    color: '#0070AD',
    website: 'https://www.capgemini.com/careers',
    industry: 'Consulting, Technology Services & Digital Engineering',
    headquarters: 'Paris, France',
    products: ['Capgemini Engineering', 'Cloud Native Platforms', 'Intelligent Industry'],
    description: 'European consulting powerhouse focusing on digital manufacturing, automotive software, and cloud transformation.',
    hiringProcessNote: 'Includes pseudo-code, behavioral competency test, English communication, and technical interview.',
    rolesSupported: ['swe', 'fullstack', 'qa', 'devops', 'cloud'],
    rounds: [
      { id: 'cap_r1', title: 'Round 1: Technical & Pseudo-code Assessment', duration: '60 mins', focus: 'Pseudocode, Data Structures, Networking', description: 'Assesses algorithm tracing, code snippets, and basic CS logic.' },
      { id: 'cap_r2', title: 'Round 2: Spoken English Test', duration: '30 mins', focus: 'Communication & Comprehension', description: 'Automated test assessing grammar, fluency, and vocabulary.' },
      { id: 'cap_r3', title: 'Round 3: Technical & HR Interview', duration: '30 mins', focus: 'Core Concepts & Motivation', description: 'Discussion covering Java/C++ basics, web technologies, and resume achievements.' }
    ],
    preparationTips: ['Practice tracing recursion trees in pseudo-code questions.'],
    questions: [
      {
        id: 'cap_q1',
        roleId: 'swe',
        topic: 'Web Basics',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'What is the difference between GET and POST HTTP methods in RESTful APIs?',
        answer: 'GET is used to retrieve data from a server; parameters are appended in URL query string, responses can be cached, and operations must be idempotent. POST is used to send data to create resources; payload is sent in request body, not cached by default, and non-idempotent.',
        followUp: 'Why should sensitive data like passwords never be sent via GET?'
      }
    ],
    checklist: [
      { id: 'cap_c1', title: 'Review REST API HTTP Verbs (GET, POST, PUT, DELETE, PATCH)', category: 'Web Dev' }
    ]
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'HCL',
    color: '#00529B',
    website: 'https://www.hcltech.com/careers',
    industry: 'Digital Engineering & Cloud Services',
    headquarters: 'Noida, India',
    products: ['HCL Software', 'DRYiCE AI', 'CloudSMART'],
    description: 'Leading technology services company renowned for engineering R&D services and hybrid cloud infrastructure management.',
    hiringProcessNote: 'Aptitude test, technical interview on fundamentals, followed by HR interview.',
    rolesSupported: ['swe', 'fullstack', 'devops', 'qa', 'sre'],
    rounds: [
      { id: 'hcl_r1', title: 'Round 1: Aptitude & Coding Test', duration: '75 mins', focus: 'Quant, Logical & 2 Basic Coding Qs', description: 'Initial screening on analytical and basic algorithmic abilities.' },
      { id: 'hcl_r2', title: 'Round 2: Technical Interview', duration: '30-40 mins', focus: 'Programming languages, SQL & Project', description: 'Review of fundamentals, basic database design, and candidate contributions.' },
      { id: 'hcl_r3', title: 'Round 3: HR Round', duration: '20 mins', focus: 'Interpersonal skills and readiness', description: 'Assesses professional attitude and willingness to learn.' }
    ],
    preparationTips: ['Review basic SQL queries, joins, and primary/foreign key constraints.'],
    questions: [
      {
        id: 'hcl_q1',
        roleId: 'swe',
        topic: 'DBMS',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'What are the ACID properties in database management systems?',
        answer: 'Atomicity (all operations succeed or entire transaction rolls back), Consistency (data transitions from one valid state to another satisfying all invariants), Isolation (concurrent transactions execute without interference), and Durability (committed changes persist permanently even after hardware crashes).',
        followUp: 'Which ACID property does the Write-Ahead Log primarily enforce?'
      }
    ],
    checklist: [{ id: 'hcl_c1', title: 'Review ACID Properties and Database Normalization (1NF to 3NF)', category: 'DBMS' }]
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    tier: 'IT Services & Consulting',
    tierId: 'it-services',
    logoText: 'TECHM',
    color: '#D71921',
    website: 'https://careers.techmahindra.com',
    industry: 'Digital Transformation, 5G & Telecom IT Services',
    headquarters: 'Pune, India',
    products: ['NetOps 5G', 'Makers Lab AI', 'Telecom BSS/OSS Platforms'],
    description: 'Global IT and networking solutions specialist with deep leadership in telecommunications, 5G networks, and enterprise IT.',
    hiringProcessNote: 'Conducted via online aptitude and psychometric test, followed by technical and HR discussions.',
    rolesSupported: ['swe', 'fullstack', 'cloud', 'devops', 'qa'],
    rounds: [
      { id: 'tm_r1', title: 'Round 1: Aptitude & Technical Test', duration: '75 mins', focus: 'Quantitative, Logical, Basic Programming', description: 'Assesses math skills, flowcharts, and programming syntax.' },
      { id: 'tm_r2', title: 'Round 2: Technical Interview', duration: '30 mins', focus: 'Core Programming, OOP & SQL', description: 'Evaluation of programming concepts, final year project, and basic computer networks.' },
      { id: 'tm_r3', title: 'Round 3: HR Interview', duration: '15 mins', focus: 'Communication & Relocation', description: 'Discussion of willingness to travel and shift patterns.' }
    ],
    preparationTips: ['Brush up on computer networking basics (OSI model, TCP/IP, IP addressing) along with coding.'],
    questions: [
      {
        id: 'tm_q1',
        roleId: 'swe',
        topic: 'Computer Networks',
        difficulty: 'easy',
        round: 'Technical Interview',
        question: 'Compare TCP and UDP protocols. When would you choose UDP over TCP?',
        answer: 'TCP is connection-oriented, reliable (guarantees packet arrival and in-order delivery via acknowledgments), but incurs higher latency. UDP is connectionless, unreliable (fire-and-forget, no retransmissions), but provides ultra-low latency. Choose UDP for live streaming, DNS lookups, and multiplayer gaming where dropping an occasional frame is better than buffering.',
        followUp: 'How does the TCP 3-Way Handshake establish a connection?'
      }
    ],
    checklist: [{ id: 'tm_c1', title: 'Review Computer Networks: OSI 7-layer model and TCP 3-way handshake', category: 'Networking' }]
  },

  // ==================== 3. CLOUD, DEVOPS & INFRASTRUCTURE ====================
  {
    id: 'aws',
    name: 'AWS (Amazon Web Services)',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'AWS',
    color: '#FF9900',
    website: 'https://aws.amazon.com/careers',
    industry: 'Cloud Computing, Distributed Systems & Infrastructure',
    headquarters: 'Seattle, WA',
    products: ['EC2', 'S3', 'Lambda', 'DynamoDB', 'EKS', 'Aurora', 'Bedrock'],
    description: 'The world\'s leading cloud provider, powering global internet infrastructure with unmatched scale, operational excellence, and distributed system innovation.',
    hiringProcessNote: 'Evaluated heavily on distributed systems primitives, operational resilience, and the 16 Leadership Principles.',
    rolesSupported: ['cloud', 'devops', 'sre', 'backend', 'swe', 'data-eng'],
    rounds: [
      { id: 'aws_r1', title: 'Round 1: Technical & Leadership Phone Screen', duration: '60 mins', focus: 'Distributed Systems & LPs', description: 'Exploration of Linux internals, network stacks, and Leadership Principles.' },
      { id: 'aws_r2', title: 'Round 2: Coding & Data Structures', duration: '60 mins', focus: 'Concurrency & Algorithmic Design', description: 'Thread-safe data structures, queue implementations, and algorithmic problems.' },
      { id: 'aws_r3', title: 'Round 3: Large-Scale Cloud System Design', duration: '60 mins', focus: 'Multi-Region High Availability', description: 'Design Amazon S3 object store or DynamoDB partition router with 99.999% availability.' },
      { id: 'aws_r4', title: 'Round 4: Operations & Troubleshooting', duration: '60 mins', focus: 'Incident Post-Mortems & Debugging', description: 'Live outage scenario: Debugging high p99 latency in a multi-tier microservice.' },
      { id: 'aws_r5', title: 'Round 5: Bar Raiser', duration: '60 mins', focus: 'Leadership Principles Mastery', description: 'Independent evaluation of candidate excellence and culture alignment.' }
    ],
    preparationTips: [
      'Master AWS core building blocks: VPC, IAM, DynamoDB, SQS, S3, and Route 53.',
      'Understand Paxos / Raft distributed consensus and write-ahead log replication.',
      'Prepare concrete examples of how you operated systems under load and debugged production outages.'
    ],
    questions: [
      {
        id: 'aws_q1',
        roleId: 'cloud',
        topic: 'Distributed Storage',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'How does Amazon DynamoDB achieve single-digit millisecond latency at petabyte scale using Consistent Hashing and Virtual Nodes?',
        answer: 'DynamoDB partitions data across storage nodes using a 128-bit MD5 hash ring of the partition key. To prevent hot spots when node counts change, each physical storage server is assigned multiple Virtual Nodes (v-nodes) distributed randomly across the ring. Requests are routed directly to storage node replicas via Request Routers in O(1) time without centralized metadata lookups.',
        followUp: 'How does DynamoDB handle write conflicts during cross-region replication?'
      }
    ],
    checklist: [
      { id: 'aws_c1', title: 'Master DynamoDB Consistent Hashing, Virtual Nodes, and Partitioning', category: 'Distributed Systems' },
      { id: 'aws_c2', title: 'Review AWS VPC Subnets, Route Tables, NAT Gateways, and Security Groups', category: 'Cloud' }
    ]
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'AZURE',
    color: '#0089D6',
    website: 'https://careers.microsoft.com',
    industry: 'Enterprise Cloud, Virtualization & Hybrid Infrastructure',
    headquarters: 'Redmond, WA',
    products: ['Azure Compute', 'Azure Kubernetes Service (AKS)', 'Cosmos DB', 'Azure DevOps', 'Azure OpenAI'],
    description: 'Fastest-growing enterprise cloud platform integrating enterprise IT, hybrid cloud capabilities, and bleeding-edge OpenAI supercomputing infrastructure.',
    hiringProcessNote: 'Evaluates systems programming, Kubernetes orchestration, virtual network overlays, and microservice resiliency.',
    rolesSupported: ['cloud', 'devops', 'sre', 'backend', 'swe'],
    rounds: [
      { id: 'azr_r1', title: 'Round 1: Screening & Systems Coding', duration: '60 mins', focus: 'Algorithms & Concurrency', description: 'Coding on data structures with focus on multi-threaded correctness.' },
      { id: 'azr_r2', title: 'Round 2: Cloud Infrastructure & Networking', duration: '60 mins', focus: 'SDN, BGP, Overlay Networks', description: 'Virtual networks, load balancers, VNet peering, and ExpressRoute.' },
      { id: 'azr_r3', title: 'Round 3: Distributed System Design', duration: '60 mins', focus: 'High-Scale Cloud Control Plane', description: 'Design an automated container orchestration control plane or globally replicated blob service.' },
      { id: 'azr_r4', title: 'Round 4: SRE & Incident Management', duration: '60 mins', focus: 'Fault Tolerance & Observability', description: 'Metrics, Prometheus/Grafana alerting, and automated failover mechanics.' },
      { id: 'azr_r5', title: 'Round 5: As Appropriate (AA) Round', duration: '60 mins', focus: 'Leadership & Growth Mindset', description: 'Long-term vision and technical leadership.' }
    ],
    preparationTips: ['Understand Kubernetes internal architecture: kube-apiserver, etcd, kube-scheduler, and kubelet.'],
    questions: [
      {
        id: 'azr_q1',
        roleId: 'devops',
        topic: 'Kubernetes & Containers',
        difficulty: 'hard',
        round: 'Infrastructure Technical Round',
        question: 'Explain how the Kubernetes Control Plane maintains desired state using etcd and Informer reconciliation loops.',
        answer: 'The controller manager uses Informers to watch for resource updates in etcd via the kube-apiserver. Informers maintain a local in-memory cache and trigger reconciliation loops whenever actual state diverges from desired spec. The controller issues atomic mutations to converge real-world infrastructure toward the declared target state without polling.',
        followUp: 'What happens to running pods if the etcd cluster temporarily loses quorum?'
      }
    ],
    checklist: [{ id: 'azr_c1', title: 'Study Kubernetes Architecture (etcd quorum, controllers, CNI networking)', category: 'DevOps' }]
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud (GCP)',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'GCP',
    color: '#4285F4',
    website: 'https://careers.google.com',
    industry: 'Cloud Computing, Big Data & Enterprise Infrastructure',
    headquarters: 'Sunnyvale, CA',
    products: ['Google Kubernetes Engine (GKE)', 'BigQuery', 'Spanner', 'Vertex AI', 'Compute Engine'],
    description: 'Cloud provider renowned for pioneering foundational infrastructure: Kubernetes, Borg, BigQuery, Spanner, and TPU AI supercomputing clusters.',
    hiringProcessNote: 'Standard Google engineering interview loop with specialized cloud infrastructure, networking, or distributed systems questions.',
    rolesSupported: ['cloud', 'sre', 'devops', 'backend', 'swe', 'data-eng'],
    rounds: [
      { id: 'gcp_r1', title: 'Round 1: Technical Coding Screen', duration: '45 mins', focus: 'DSA & Algorithmic Optimization', description: 'Standard LeetCode Medium/Hard algorithmic question.' },
      { id: 'gcp_r2', title: 'Round 2: Systems Coding', duration: '45 mins', focus: 'Linux, File systems & Memory', description: 'Systems-level implementation: ring buffers, memory allocators, or network parsers.' },
      { id: 'gcp_r3', title: 'Round 3: Distributed System Design', duration: '45 mins', focus: 'Spanner / BigQuery scale architectures', description: 'Designing planet-scale distributed databases with TrueTime API synchronization.' },
      { id: 'gcp_r4', title: 'Round 4: SRE & Resilience', duration: '45 mins', focus: 'SLI, SLO, SLA & Error Budgets', description: 'SRE principles: establishing service level indicators and handling cascading failures.' },
      { id: 'gcp_r5', title: 'Round 5: Googlyness & Leadership', duration: '45 mins', focus: 'Culture, Teamwork & Humility', description: 'Evaluating behavioral adaptability and communication.' }
    ],
    preparationTips: ['Read the Google SRE Book: Understand Error Budgets, SLIs, SLOs, and Eliminating Toil.'],
    questions: [
      {
        id: 'gcp_q1',
        roleId: 'sre',
        topic: 'Site Reliability Engineering',
        difficulty: 'medium',
        round: 'SRE Technical Round',
        question: 'Explain the relationship between SLI, SLO, SLA, and Error Budgets in Google SRE philosophy.',
        answer: '• SLI (Service Level Indicator): A quantifiable metric of performance (e.g. % of requests returning 200 OK in <200ms).\n• SLO (Service Level Objective): Target goal set by engineering (e.g. 99.9% uptime over 30 days).\n• SLA (Service Level Agreement): Contractual commitment with customers with financial penalties for breach (e.g. 99.5%).\n• Error Budget: 100% - SLO (e.g. 0.1% downtime). The allowable room for failure used to ship risky features fast without breaching reliability agreements.',
        followUp: 'What automated policy actions should trigger when an Error Budget is 100% exhausted?'
      }
    ],
    checklist: [{ id: 'gcp_c1', title: 'Read chapters 1-5 of the Google Site Reliability Engineering (SRE) book', category: 'SRE' }]
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'CF',
    color: '#F38020',
    website: 'https://www.cloudflare.com/careers',
    industry: 'Edge Computing, CDN, DNS & Internet Security',
    headquarters: 'San Francisco, CA',
    products: ['Cloudflare Workers', 'Cloudflare Pages', 'DDoS Protection', '1.1.1.1 DNS', 'Cloudflare One (Zero Trust)'],
    description: 'Mission-driven edge computing leader running Anycast BGP networking across 300+ cities to build a faster, more secure internet.',
    hiringProcessNote: 'Evaluates systems programming (Rust/Go/C++), HTTP/3, TLS handshakes, Linux kernel bypass (eBPF, XDP), and edge serverless runtimes (V8 isolates).',
    rolesSupported: ['swe', 'sre', 'devops', 'backend', 'cloud'],
    rounds: [
      { id: 'cf_r1', title: 'Round 1: Recruiter & Technical Screen', duration: '45 mins', focus: 'Systems & Networking Fundamentals', description: 'TCP/IP, DNS routing, HTTP protocol internals, and candidate background.' },
      { id: 'cf_r2', title: 'Round 2: Practical Coding Assessment', duration: '60 mins', focus: 'Systems Coding (Go / Rust / C++)', description: 'Building concurrent network proxies, rate limiters, or high-performance parsers.' },
      { id: 'cf_r3', title: 'Round 3: Internet Systems Architecture', duration: '60 mins', focus: 'Anycast, CDN & DDoS Mitigation', description: 'Designing global DNS resolution and mitigating 100 Gbps volumetric SYN flood attacks.' },
      { id: 'cf_r4', title: 'Round 4: Edge Runtime & Concurrency', duration: '60 mins', focus: 'V8 Isolates vs Containers, WebAssembly', description: 'Architecture of serverless edge workers, memory safety, and sub-millisecond cold starts.' },
      { id: 'cf_r5', title: 'Round 5: Culture & Values', duration: '45 mins', focus: 'Help build a better Internet', description: 'Curiosity, open-source contribution, and collaborative problem-solving.' }
    ],
    preparationTips: [
      'Understand Anycast BGP routing vs Unicast.',
      'Know why V8 Isolates achieve <5ms cold starts compared to Docker container VMs (>500ms).',
      'Study Linux networking optimizations: eBPF, XDP, and `SO_REUSEPORT`.'
    ],
    questions: [
      {
        id: 'cf_q1',
        roleId: 'backend',
        topic: 'Edge Computing',
        difficulty: 'hard',
        round: 'Edge Architecture Round',
        question: 'Why do V8 Isolates (used in Cloudflare Workers) achieve sub-millisecond cold starts compared to traditional container-based serverless functions?',
        answer: 'Containers require spinning up a virtualized Linux userspace, initializing cgroups, running an init process, and allocating dedicated memory blocks (>500ms). V8 Isolates run as lightweight sandboxed execution threads inside a single pre-warmed multithreaded process. Multiple isolates share the same runtime and JIT compiler while maintaining strict memory isolation, starting in <5ms with 1/100th the RAM footprint.',
        followUp: 'How do you prevent malicious user code from freezing the thread via an infinite loop inside an isolate?'
      }
    ],
    checklist: [{ id: 'cf_c1', title: 'Study BGP Anycast Routing, HTTP/3 QUIC, and V8 Isolates mechanics', category: 'Networking' }]
  },
  {
    id: 'redhat',
    name: 'Red Hat',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'RHT',
    color: '#EE0000',
    website: 'https://www.redhat.com/careers',
    industry: 'Enterprise Open Source, Linux & Hybrid Cloud',
    headquarters: 'Raleigh, NC',
    products: ['Red Hat Enterprise Linux (RHEL)', 'OpenShift (Kubernetes)', 'Ansible Automation Platform', 'Quarkus'],
    description: 'The world\'s leading open-source enterprise software company, driving Linux kernel development and Kubernetes platform engineering.',
    hiringProcessNote: 'Evaluates Linux kernel concepts, systemd, shell scripting, Ansible automation, and open-source contribution ethos.',
    rolesSupported: ['devops', 'sre', 'cloud', 'swe', 'backend'],
    rounds: [
      { id: 'rht_r1', title: 'Round 1: Screening & Open Source Discussion', duration: '45 mins', focus: 'Linux & Open Source Experience', description: 'Technical background and familiarity with upstream open source communities.' },
      { id: 'rht_r2', title: 'Round 2: Linux Internals & Shell Coding', duration: '60 mins', focus: 'File permissions, Bash, systemd', description: 'Diagnosing Linux performance bottlenecks using strace, top, lsof, and vmstat.' },
      { id: 'rht_r3', title: 'Round 3: OpenShift & Kubernetes Architecture', duration: '60 mins', focus: 'CRDs, Operators & Pod Lifecycle', description: 'Writing Kubernetes Operators in Go and managing multi-tenant cluster rollouts.' },
      { id: 'rht_r4', title: 'Round 4: Ansible & Infrastructure as Code', duration: '60 mins', focus: 'Idempotent Playbooks & Automation', description: 'Automating fleet configuration and security compliance using Ansible.' },
      { id: 'r5_rht', title: 'Round 5: Managerial & Open Culture', duration: '45 mins', focus: 'Open Decision Framework & Collaboration', description: 'Evaluates transparency, giving peer feedback, and meritocracy.' }
    ],
    preparationTips: ['Master Linux diagnostics: `top`, `vmstat`, `iostat`, `netstat`, `strace`, and `/proc` filesystem.'],
    questions: [
      {
        id: 'rht_q1',
        roleId: 'devops',
        topic: 'Linux & Containers',
        difficulty: 'medium',
        round: 'Linux Technical Round',
        question: 'What are Linux Namespaces and cgroups, and how do they form the foundation of containers (Docker/Podman)?',
        answer: 'Containers are not virtual machines; they are standard Linux processes isolated by two kernel primitives:\n• Namespaces: Provide isolation of WHAT A PROCESS CAN SEE (PID, Mount, Network, IPC, UTS, User).\n• cgroups (Control Groups): Enforce limits on HOW MUCH RESOURCES A PROCESS CAN CONSUME (CPU quotas, memory limits, disk I/O, device access).',
        followUp: 'What happens to a container process when it exceeds its cgroup memory limit?'
      }
    ],
    checklist: [{ id: 'rht_c1', title: 'Master Linux kernel primitives: Namespaces, cgroups, systemd, and strace', category: 'Linux' }]
  },
  {
    id: 'cisco',
    name: 'Cisco',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'CSCO',
    color: '#049FD9',
    website: 'https://jobs.cisco.com',
    industry: 'Networking Hardware, Cybersecurity & Enterprise Collaboration',
    headquarters: 'San Jose, CA',
    products: ['Catalyst Switches', 'Cisco IOS-XE', 'Webex', 'Duo Security', 'AppDynamics / Splunk'],
    description: 'Global networking pioneer building the routing, switching, observability, and cybersecurity backbone of global telecommunications.',
    hiringProcessNote: 'Evaluates packet routing, socket programming, BGP/OSPF protocols, and multithreaded network software.',
    rolesSupported: ['swe', 'sre', 'devops', 'backend', 'qa'],
    rounds: [
      { id: 'csco_r1', title: 'Round 1: Online Technical Screening', duration: '60 mins', focus: 'DSA & Networking MCQ', description: 'Assesses routing algorithms, bitwise manipulation, and data structures.' },
      { id: 'csco_r2', title: 'Round 2: Technical Interview 1', duration: '60 mins', focus: 'C/C++, Pointers & Socket Programming', description: 'Writing socket code, memory buffers, and packet serialization.' },
      { id: 'csco_r3', title: 'Round 3: Network Protocols & Distributed Design', duration: '60 mins', focus: 'OSPF, BGP, SDN & Load Balancing', description: 'Designing software-defined networks and resilient failover topologies.' },
      { id: 'csco_r4', title: 'Round 4: Managerial Round', duration: '45 mins', focus: 'Teamwork, Problem Solving & Motivation', description: 'Discussion of past networking projects and adaptability.' }
    ],
    preparationTips: ['Review socket programming (`socket`, `bind`, `listen`, `accept`), select/poll/epoll, and OSI model.'],
    questions: [
      {
        id: 'csco_q1',
        roleId: 'backend',
        topic: 'Network Programming',
        difficulty: 'medium',
        round: 'Technical Interview',
        question: 'Compare epoll with select and poll for handling 100,000 concurrent network connections in Linux.',
        answer: '`select` and `poll` iterate through the entire file descriptor list O(N) on every call, becoming slow when scaling past a few thousand connections (select is also limited to 1024 FDs). `epoll` is event-driven O(1): it registers descriptors with the kernel once and uses a ready list in kernel space, waking the process only with active descriptors that have I/O events, enabling the C10K/C100K problem to be solved efficiently.',
        followUp: 'What is the difference between Edge-Triggered and Level-Triggered mode in epoll?'
      }
    ],
    checklist: [{ id: 'csco_c1', title: 'Study Linux I/O Multiplexing: select, poll, and epoll mechanics', category: 'Networking' }]
  },
  {
    id: 'ibm',
    name: 'IBM',
    tier: 'Cloud, DevOps & Infrastructure',
    tierId: 'cloud-infra',
    logoText: 'IBM',
    color: '#1F70C1',
    website: 'https://www.ibm.com/careers',
    industry: 'Hybrid Cloud, Quantum Computing & Enterprise AI',
    headquarters: 'Armonk, NY',
    products: ['Red Hat OpenShift', 'watsonx AI', 'IBM Cloud', 'Mainframe Z-Systems'],
    description: 'Historic technology giant focused on hybrid cloud enterprise transformation, quantum computing, and ethical enterprise AI.',
    hiringProcessNote: 'Cognitive cognitive ability test, coding challenge, and structured technical/managerial interviews.',
    rolesSupported: ['swe', 'cloud', 'devops', 'backend', 'data-eng', 'data-sci'],
    rounds: [
      { id: 'ibm_r1', title: 'Round 1: Cognitive Assessment & Coding', duration: '90 mins', focus: 'IPAT Pattern Reasoning & Coding', description: 'Assesses logic puzzles, cognitive pattern recognition, and standard coding.' },
      { id: 'ibm_r2', title: 'Round 2: Technical Interview 1', duration: '45-60 mins', focus: 'OOP, DSA & Database Design', description: 'Clean object-oriented design and relational schema normalization.' },
      { id: 'ibm_r3', title: 'Round 3: Hybrid Cloud Architecture', duration: '60 mins', focus: 'Microservices & Containerization', description: 'Designing containerized microservices and hybrid cloud integrations.' },
      { id: 'ibm_r4', title: 'Round 4: Values & Cultural Fit', duration: '30 mins', focus: 'Dedication to Client Success & Trust', description: 'Evaluating teamwork and integrity.' }
    ],
    preparationTips: ['Prepare for pattern-based logic games in the initial cognitive screening.'],
    questions: [
      {
        id: 'ibm_q1',
        roleId: 'cloud',
        topic: 'Microservices',
        difficulty: 'medium',
        round: 'Architecture Round',
        question: 'What is the Saga Pattern in distributed microservices and how does it manage distributed transactions without 2-Phase Commit?',
        answer: 'Two-Phase Commit (2PC) blocks resources across services, failing at cloud scale. The Saga pattern executes a series of local transactions across microservices. Each service updates its own database and emits an event. If a step fails, the Saga executes compensating transactions backwards to undo earlier changes.\n• Choreography: Services listen to domain events and execute local transactions independently.\n• Orchestration: A centralized Saga orchestrator coordinates step execution and compensation.',
        followUp: 'How do you handle idempotency during compensating transaction retries?'
      }
    ],
    checklist: [{ id: 'ibm_c1', title: 'Review Distributed Transactions: 2PC vs Saga Orchestration and Choreography', category: 'System Design' }]
  },

  // ==================== 4. DATA & AI-FOCUSED ====================
  {
    id: 'databricks',
    name: 'Databricks',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'DBX',
    color: '#FF3621',
    website: 'https://www.databricks.com/company/careers',
    industry: 'Data Lakehouse, Apache Spark, MLflow & Distributed AI',
    headquarters: 'San Francisco, CA',
    products: ['Databricks Lakehouse', 'Apache Spark', 'Delta Lake', 'MLflow', 'Unity Catalog', 'DBRX LLM'],
    description: 'Founded by the original creators of Apache Spark and MLflow, pioneering the Data Lakehouse architecture and enterprise AI platform.',
    hiringProcessNote: 'Extremely rigorous technical bar covering distributed algorithms, query optimization, Spark internals, and concurrency.',
    rolesSupported: ['swe', 'backend', 'data-eng', 'mle', 'ai-llm'],
    rounds: [
      { id: 'dbx_r1', title: 'Round 1: Technical Coding Screen', duration: '60 mins', focus: 'Algorithms & Edge-case Rigor', description: 'Hard algorithmic problem solving on CoderPad with emphasis on time and memory optimality.' },
      { id: 'dbx_r2', title: 'Round 2: Systems Coding', duration: '60 mins', focus: 'Multi-threading & Memory management', description: 'Writing concurrent queues, lock-free data structures, or custom memory allocators in C++/Java.' },
      { id: 'dbx_r3', title: 'Round 3: Distributed Data System Design', duration: '60 mins', focus: 'Query Engines & Lakehouse Architecture', description: 'Designing a distributed columnar execution engine or scalable metadata catalog.' },
      { id: 'dbx_r4', title: 'Round 4: Deep Domain & Past Project Deep Dive', duration: '60 mins', focus: 'Technical Rigor & Complexity', description: 'Dissecting candidate’s most complex project down to kernel/network level.' },
      { id: 'dbx_r5', title: 'Round 5: Culture & Leadership', duration: '45 mins', focus: 'Customer Obsession & First Principles', description: 'Evaluating passion for developer tools and technical excellence.' }
    ],
    preparationTips: [
      'Master Apache Spark internals: Catalyst Optimizer, Tungsten execution engine, Whole-Stage Code Generation, and Shuffles.',
      'Understand Delta Lake: Parquet columnar format, Delta transaction logs, and Optimistic Concurrency Control.',
      'Be prepared to code thread-safe and lock-free concurrency primitives.'
    ],
    questions: [
      {
        id: 'dbx_q1',
        roleId: 'data-eng',
        topic: 'Distributed Query Engines',
        difficulty: 'hard',
        round: 'Systems Architecture Round',
        question: 'Explain how Apache Spark Tungsten’s Whole-Stage Code Generation accelerates query performance over traditional iterator volcano models.',
        answer: 'The traditional Volcano model executes queries by calling `.next()` on every operator for every row, resulting in virtual function dispatch overhead, poor instruction cache locality, and register spilling. Tungsten’s Whole-Stage Code Generation flattens the execution pipeline: it compiles the entire multi-operator query plan into a single tight loop in Java bytecode using Sun JDK Unsafe memory access, keeping all loop variables inside CPU L1 registers.',
        followUp: 'How does off-heap memory management in Tungsten avoid JVM Garbage Collection pauses?'
      }
    ],
    checklist: [
      { id: 'dbx_c1', title: 'Study Apache Spark Tungsten Engine and Catalyst Optimizer phases', category: 'Big Data' },
      { id: 'dbx_c2', title: 'Understand Delta Lake ACID transaction log protocol and OCC', category: 'Lakehouse' }
    ]
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'SNOW',
    color: '#29B5E8',
    website: 'https://careers.snowflake.com',
    industry: 'Cloud Data Warehouse, Data Cloud & AI Analytics',
    headquarters: 'Bozeman, MT',
    products: ['Snowflake Data Cloud', 'Snowpark', 'Cortex AI', 'Streamlit'],
    description: 'Pioneered the true separation of compute and storage for modern cloud data warehouses with multi-cluster shared data architecture.',
    hiringProcessNote: 'Evaluates C++ systems programming, distributed storage, database query planning, and cloud infrastructure.',
    rolesSupported: ['swe', 'backend', 'data-eng', 'mle'],
    rounds: [
      { id: 'snow_r1', title: 'Round 1: Screening & Systems Coding', duration: '60 mins', focus: 'C++ / Java Algorithmic Problem Solving', description: 'Assesses memory-safe implementations, hash tables, and string algorithms.' },
      { id: 'snow_r2', title: 'Round 2: Systems Programming', duration: '60 mins', focus: 'Concurrency & Distributed Primitives', description: 'Building thread-safe locks, buffer pools, or memory-mapped files.' },
      { id: 'snow_r3', title: 'Round 3: Cloud Database Architecture', duration: '60 mins', focus: 'Storage-Compute Decoupling', description: 'Designing virtual warehouse scaling, micro-partition indexing, and metadata transaction managers.' },
      { id: 'snow_r4', title: 'Round 4: Low-Level Performance & Diagnostics', duration: '60 mins', focus: 'Profiling, Latency & Optimization', description: 'Diagnosing CPU bottlenecks, memory leaks, and distributed network delays.' },
      { id: 'snow_r5', title: 'Round 5: Executive Culture Round', duration: '45 mins', focus: 'Customer First & Integrity', description: 'Assesses cultural fit and cross-team collaboration.' }
    ],
    preparationTips: ['Study Snowflake’s Multi-Cluster Shared Data architecture and micro-partitioning model.'],
    questions: [
      {
        id: 'snow_q1',
        roleId: 'backend',
        topic: 'Cloud Data Architecture',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'How do Snowflake Micro-Partitions work and how do they eliminate the need for manual database indexing?',
        answer: 'Snowflake automatically divides tables into immutable, contiguous columnar micro-partitions (50MB–500MB uncompressed). Each micro-partition stores min/max statistics for every column in the Cloud Services metadata layer. When a query with a WHERE clause runs, Snowflake performs Partition Pruning at the metadata layer before reading any storage, skipping irrelevant micro-partitions entirely without B-Tree indexes.',
        followUp: 'How does clustering key selection optimize pruning for high-cardinality queries?'
      }
    ],
    checklist: [{ id: 'snow_c1', title: 'Review Snowflake Micro-Partitioning and Metadata-Driven Query Pruning', category: 'Data Warehousing' }]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'OAI',
    color: '#10A37F',
    website: 'https://openai.com/careers',
    industry: 'Artificial General Intelligence, LLMs & Foundation Models',
    headquarters: 'San Francisco, CA',
    products: ['ChatGPT', 'GPT-4 / GPT-4o', 'DALL-E 3', 'Sora', 'OpenAI API'],
    description: 'Frontier AI research and deployment lab dedicated to creating safe and beneficial Artificial General Intelligence (AGI).',
    hiringProcessNote: 'Exceptional bar on transformer architectures, GPU distributed training at supercomputing scale, alignment (RLHF/DPO), and systems engineering.',
    rolesSupported: ['ai-llm', 'mle', 'swe', 'backend', 'data-sci', 'sre'],
    rounds: [
      { id: 'oai_r1', title: 'Round 1: Technical Screening', duration: '60 mins', focus: 'Algorithmic Problem Solving & PyTorch', description: 'Coding on data structures or PyTorch tensor operations under time limits.' },
      { id: 'oai_r2', title: 'Round 2: Deep Learning Internals', duration: '60 mins', focus: 'Transformer Architecture & Math', description: 'Deriving attention equations, RoPE embeddings, and scaling laws mathematically.' },
      { id: 'oai_r3', title: 'Round 3: Large-Scale Distributed Training', duration: '60 mins', focus: 'Megatron-LM, FSDP, 3D Parallelism', description: 'Scaling models across 10,000 GPUs: Megatron tensor parallelism, pipeline bubbles, and NCCL bandwidth.' },
      { id: 'oai_r4', title: 'Round 4: High-Throughput Inference Serving', duration: '60 mins', focus: 'vLLM, PagedAttention, Speculative Decoding', description: 'Designing production serving systems with low TTFT and high batch concurrency.' },
      { id: 'oai_r5', title: 'Round 5: Mission & Safety Alignment', duration: '45 mins', focus: 'Responsible AGI & Safety Ethos', description: 'Discussions on AI safety, alignment challenges, and high-impact decision making.' }
    ],
    preparationTips: [
      'Master Transformer decoder mechanics: KV cache, Rotary Position Embeddings (RoPE), SwiGLU, and RMSNorm.',
      'Understand 3D Parallelism: Data Parallelism (FSDP), Tensor Parallelism (Megatron), and Pipeline Parallelism.',
      'Be able to write custom PyTorch modules and training loops from scratch.'
    ],
    questions: [
      {
        id: 'oai_q1',
        roleId: 'ai-llm',
        topic: 'LLM Systems',
        difficulty: 'hard',
        round: 'Distributed Systems Round',
        question: 'Explain 3D Parallelism for training a 70B parameter model across 512 GPUs: How do TP, PP, and DP combine?',
        answer: '• Tensor Parallelism (TP=8): Splits linear matrices (QKV and MLP layers) across the 8 GPUs inside a single server node, communicating over ultra-fast NVLink (900 GB/s).\n• Pipeline Parallelism (PP=4): Splits the model’s 80 layers across 4 nodes sequentially, using 1F1B scheduling to minimize pipeline bubbles.\n• Data Parallelism / FSDP (DP=16): Replicates the combined TP×PP model across remaining nodes (512 / (8×4) = 16), sharding optimizer states and synchronizing gradients via All-Reduce over InfiniBand.',
        followUp: 'How do you calculate activation memory overhead and when should you enable activation checkpointing?'
      }
    ],
    checklist: [
      { id: 'oai_c1', title: 'Derive FlashAttention, Multi-Query Attention (MQA), and GQA mathematically', category: 'Deep Learning' },
      { id: 'oai_c2', title: 'Master 3D Distributed Parallelism: FSDP, Megatron TP, and Pipeline Parallelism', category: 'AI Infrastructure' }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'ANT',
    color: '#D97706',
    website: 'https://www.anthropic.com/careers',
    industry: 'AI Safety, Frontier LLMs & Constitutional AI',
    headquarters: 'San Francisco, CA',
    products: ['Claude 3.5 Sonnet / Opus', 'Constitutional AI', 'Model Context Protocol (MCP)'],
    description: 'AI safety and research company focused on building steerable, interpretable, and aligned AI systems.',
    hiringProcessNote: 'Emphasizes interpretability (mechanistic interpretability), safety alignment (Constitutional AI), and scalable Python/Rust engineering.',
    rolesSupported: ['ai-llm', 'mle', 'swe', 'backend', 'data-sci'],
    rounds: [
      { id: 'ant_r1', title: 'Round 1: Technical Coding Screen', duration: '60 mins', focus: 'Clean, bug-free Python / Rust', description: 'Practical coding with emphasis on edge cases, readability, and defensive programming.' },
      { id: 'ant_r2', title: 'Round 2: Machine Learning Foundations', duration: '60 mins', focus: 'Optimization, Loss functions & Scaling', description: 'In-depth discussion of LLM pretraining dynamics, loss curves, and perplexity.' },
      { id: 'ant_r3', title: 'Round 3: LLM Alignment & Architecture', duration: '60 mins', focus: 'Constitutional AI & DPO', description: 'Designing self-correction loops, preference optimization, and tool-use agents.' },
      { id: 'ant_r4', title: 'Round 4: Systems Engineering for AI', duration: '60 mins', focus: 'Distributed Datastores & MCP', description: 'Designing real-time context streaming systems and Model Context Protocol servers.' },
      { id: 'ant_r5', title: 'Round 5: Culture & AI Safety Philosophy', duration: '45 mins', focus: 'Safe AGI Deployment', description: 'Evaluating intellectual honesty, cautious risk management, and alignment.' }
    ],
    preparationTips: [
      'Read Anthropic’s research papers: "Constitutional AI" and "Towards Monosemanticity".',
      'Understand the Model Context Protocol (MCP) and how structured tool calls integrate into agentic loops.'
    ],
    questions: [
      {
        id: 'ant_q1',
        roleId: 'ai-llm',
        topic: 'AI Alignment',
        difficulty: 'hard',
        round: 'Alignment Technical Round',
        question: 'How does Constitutional AI (RLAIF) replace human crowdworkers with automated AI self-critique during model alignment?',
        answer: 'Constitutional AI uses two phases: 1. Supervised Learning (Critique and Revision): The model generates responses to harmful prompts, is prompted to critique its own response according to explicit constitutional principles (e.g. "Choose response that is most harmless and honest"), and revises the response. The base model is fine-tuned on revised responses. 2. RLAIF (RL from AI Feedback): A separate feedback model evaluates pairs of responses according to the constitution, generating preference labels used to train the policy without human contractors.',
        followUp: 'How do you prevent the critique model from hallucinating or becoming sycophantic?'
      }
    ],
    checklist: [{ id: 'ant_c1', title: 'Study Constitutional AI principles and Mechanistic Interpretability concepts', category: 'AI Alignment' }]
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'HF',
    color: '#FFD21E',
    website: 'https://huggingface.co/join-us',
    industry: 'Open Source AI, Model Hub & Transformers',
    headquarters: 'New York, NY',
    products: ['Transformers', 'Hugging Face Hub', 'Diffusers', 'Datasets', 'PEFT', 'TGI (Text Generation Inference)'],
    description: 'The community hub of open-source artificial intelligence, democratizing machine learning models, datasets, and lightweight deployment tools.',
    hiringProcessNote: 'Heavy focus on open-source code craftsmanship, PyTorch fluency, Hugging Face ecosystem libraries, and community contribution.',
    rolesSupported: ['mle', 'ai-llm', 'swe', 'backend', 'fullstack'],
    rounds: [
      { id: 'hf_r1', title: 'Round 1: Screening & Open Source Review', duration: '45 mins', focus: 'GitHub & PyTorch Contributions', description: 'Deep walkthrough of public open-source code and pull requests.' },
      { id: 'hf_r2', title: 'Round 2: Hands-on Machine Learning Coding', duration: '60 mins', focus: 'PyTorch / Transformers implementation', description: 'Live coding: Implementing a custom attention layer, tokenizer, or PEFT adapter.' },
      { id: 'hf_r3', title: 'Round 3: Open-Source System Design', duration: '60 mins', focus: 'Hub Scalability & TGI Architecture', description: 'Designing high-throughput model weight streaming or Hugging Face Hub git-lfs backend.' },
      { id: 'hf_r4', title: 'Round 4: Culture & Community', duration: '45 mins', focus: 'Open Source Community Ethos', description: 'Evaluating transparency, documentation skills, and empathy toward developers.' }
    ],
    preparationTips: ['Familiarize yourself with Hugging Face core repos: `transformers`, `accelerate`, `peft`, and `safetensors`.'],
    questions: [
      {
        id: 'hf_q1',
        roleId: 'mle',
        topic: 'Model Optimization',
        difficulty: 'medium',
        round: 'Technical Interview',
        question: 'Why did Hugging Face develop the `safetensors` format to replace Python `pickle` for model weight distribution?',
        answer: '1. Security: Python `pickle` deserialization can execute arbitrary malicious code via the `__reduce__` hook, posing severe risks when downloading public weights. `safetensors` contains only raw numeric tensor buffers with zero executable code.\n2. Speed: Supports zero-copy memory mapping (`mmap`), allowing model weights to be mapped directly from disk into GPU memory without extra CPU RAM copies.',
        followUp: 'How does safetensors handle heterogeneous precision formats (e.g. BF16 mixed with FP8)?'
      }
    ],
    checklist: [{ id: 'hf_c1', title: 'Review PEFT (LoRA/QLoRA) and Hugging Face Accelerate library internals', category: 'Open Source AI' }]
  },
  {
    id: 'palantir',
    name: 'Palantir',
    tier: 'Data & AI Pioneers',
    tierId: 'data-ai',
    logoText: 'PLTR',
    color: '#000000',
    website: 'https://www.palantir.com/careers',
    industry: 'Big Data Analytics, Defense & Enterprise AI Operations',
    headquarters: 'Denver, CO',
    products: ['Palantir Foundry', 'Palantir Gotham', 'Palantir AIP (Artificial Intelligence Platform)'],
    description: 'High-impact enterprise data platform enabling governments and Fortune 500 corporations to integrate complex data silos into operational ontologies.',
    hiringProcessNote: 'Famous for the "Decomposition" round, testing how candidates break down ambiguous, real-world customer problems into actionable code.',
    rolesSupported: ['swe', 'fullstack', 'backend', 'data-eng', 'devops'],
    rounds: [
      { id: 'pltr_r1', title: 'Round 1: HackerRank Coding Assessment', duration: '60 mins', focus: 'DSA & Algorithmic Problem Solving', description: 'Two medium-to-hard algorithmic questions.' },
      { id: 'pltr_r2', title: 'Round 2: Technical Phone Screen', duration: '60 mins', focus: 'DSA + Architecture', description: 'Graph algorithms, memory structures, and problem breakdown.' },
      { id: 'pltr_r3', title: 'Round 3: Decomposition Round', duration: '60 mins', focus: 'Real-World System Breakdown', description: 'Deconstruct a complex enterprise scenario (e.g. Vaccine distribution tracking or airline fleet rerouting) into data schemas and APIs.' },
      { id: 'pltr_r4', title: 'Round 4: Onsite Coding Round', duration: '60 mins', focus: 'Complex Implementation', description: 'Live coding on multi-step algorithmic state machines and graphs.' },
      { id: 'pltr_r5', title: 'Round 5: Managerial & Mission Fit', duration: '45 mins', focus: 'Impact, Ethics & High Ownership', description: 'Discussion of mission critical reliability, handling high pressure, and business value.' }
    ],
    preparationTips: [
      'Practice the Decomposition interview: Ask clarifying questions, define domain entities, and create clean API boundaries.',
      'Focus heavily on Graph algorithms (BFS, DFS, shortest path) and Object-Oriented modeling.'
    ],
    questions: [
      {
        id: 'pltr_q1',
        roleId: 'backend',
        topic: 'Data Modeling & Ontology',
        difficulty: 'hard',
        round: 'Decomposition Round',
        question: 'Design an Enterprise Ontology Engine that integrates 5 disparate supply chain databases into a single queryable graph.',
        answer: 'Define a shared Ontology schema: Entities (Factories, Parts, Shipments) and Directed Links (Supplies, Assembles, Delivers). Implement Change Data Capture (CDC) connectors to stream updates from source databases into an Apache Iceberg lakehouse. Use a Distributed Graph Index (e.g., JanusGraph / Neo4j on top of Cassandra) with unified surrogate IDs, enabling real-time multi-hop graph traversal queries for supply chain disruptions.',
        followUp: 'How do you enforce granular attribute-based access control (ABAC) on individual graph nodes?'
      }
    ],
    checklist: [{ id: 'pltr_c1', title: 'Practice Palantir Decomposition framework on ambiguous real-world problems', category: 'System Design' }]
  },

  // ==================== 5. SAAS & PRODUCT COMPANIES ====================
  {
    id: 'zoho',
    name: 'Zoho',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'ZOHO',
    color: '#008329',
    website: 'https://www.zoho.com/careers',
    industry: 'Enterprise SaaS, CRM & Cloud Office Suite',
    headquarters: 'Chennai, India',
    products: ['Zoho CRM', 'Zoho Books', 'Zoho Workplace', 'Zoho Creator', 'ManageEngine'],
    description: 'Bootstrapped SaaS giant renowned for engineering self-sufficiency, building its own datacenters, and rigorous low-level C/Java coding rounds.',
    hiringProcessNote: 'Unique interview process with heavy emphasis on Basic & Advanced Coding Rounds (often in C or Java without standard libraries), followed by Application Design.',
    rolesSupported: ['swe', 'fullstack', 'backend', 'frontend', 'qa'],
    rounds: [
      { id: 'zoho_r1', title: 'Round 1: Basic Programming Round', duration: '90 mins', focus: 'C / Java fundamentals without libraries', description: 'Solving 5-6 core programming questions (pattern printing, string manipulations, matrix sorting).' },
      { id: 'zoho_r2', title: 'Round 2: Advanced Coding Round', duration: '90-120 mins', focus: 'Complex logic & edge cases', description: 'Writing 2-3 intricate programs (e.g., Text justification, Sudoku solver, custom regex parser).' },
      { id: 'zoho_r3', title: 'Round 3: Low-Level Application Design', duration: '90 mins', focus: 'OOP & Console Application', description: 'Designing a working console application (e.g., Railway Reservation System, Banking System, Taxi Booking) with full validation.' },
      { id: 'zoho_r4', title: 'Round 4: Technical HR / General Technical', duration: '45 mins', focus: 'CS Fundamentals & Approach', description: 'Review of data structures, pointers, and code optimization.' },
      { id: 'zoho_r5', title: 'Round 5: HR Round', duration: '20 mins', focus: 'Cultural fit and long-term commitment', description: 'Assesses passion for software craftsmanship and stability.' }
    ],
    preparationTips: [
      'Practice writing code in C or Java without relying on built-in libraries (avoid `Collections.sort` or `String.split`).',
      'Master console application modeling: Railway Ticket Reservation, ATM Machine, Parking Lot, and Lift Management.',
      'Pay obsessive attention to edge-case validation and clean function modularity.'
    ],
    questions: [
      {
        id: 'zoho_q1',
        roleId: 'swe',
        topic: 'Low-Level Application Design',
        difficulty: 'medium',
        round: 'Design Round',
        question: 'Design a console-based Railway Ticket Reservation System with Confirmed, RAC, and Waiting List allocation rules.',
        answer: 'Model entities: `Passenger`, `Ticket`, `BerthType` (Upper, Middle, Lower), and `BookingStatus` (Confirmed, RAC, WL). Maintain fixed capacity counters (e.g. 60 confirmed, 18 RAC, 10 WL). On booking: assign Lower berth to senior citizens/ladies if available, otherwise any available berth. When a confirmed ticket is cancelled: promote first RAC passenger to confirmed, and promote first Waiting List passenger to RAC automatically.',
        followUp: 'How do you handle group bookings where members want adjacent berths?'
      }
    ],
    checklist: [
      { id: 'zoho_c1', title: 'Implement Railway Ticket Reservation System with Confirmed, RAC, and WL in pure Java', category: 'LLD' },
      { id: 'zoho_c2', title: 'Practice solving string and pattern algorithms without built-in library functions', category: 'Coding' }
    ]
  },
  {
    id: 'freshworks',
    name: 'Freshworks',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'FRSH',
    color: '#FF4E00',
    website: 'https://www.freshworks.com/company/careers',
    industry: 'Customer Engagement & IT Service Management SaaS',
    headquarters: 'San Mateo, CA / Chennai, India',
    products: ['Freshdesk', 'Freshservice', 'Freshsales', 'Freshchat', 'Freddy AI'],
    description: 'Nasdaq-listed modern SaaS champion known for intuitive UI/UX, multi-tenant cloud architecture on AWS, and rapid product iteration.',
    hiringProcessNote: 'Standard rounds include online assessment, 2 technical interviews (DSA & System Design), followed by cultural fit.',
    rolesSupported: ['swe', 'frontend', 'backend', 'fullstack', 'qa', 'devops'],
    rounds: [
      { id: 'frsh_r1', title: 'Round 1: Online Assessment', duration: '90 mins', focus: 'DSA & Problem Solving', description: 'Assesses algorithms, hash maps, and strings on HackerEarth.' },
      { id: 'frsh_r2', title: 'Round 2: Technical Interview 1', duration: '60 mins', focus: 'Data Structures & Algorithms', description: 'Trees, Linked Lists, Two Pointers, and algorithmic optimization.' },
      { id: 'frsh_r3', title: 'Round 3: Technical Interview 2 - System Design', duration: '60 mins', focus: 'SaaS Architecture & Low-Level Design', description: 'Designing customer ticketing workflows, rate limiters, or real-time chat sync.' },
      { id: 'frsh_r4', title: 'Round 4: Engineering Manager Round', duration: '45 mins', focus: 'Product Mindset & Collaboration', description: 'Evaluating product empathy, past architecture decisions, and code review practices.' },
      { id: 'frsh_r5', title: 'Round 5: HR Round', duration: '30 mins', focus: 'Culture & Motivation', description: 'Alignment with Freshworks core values: "Happy Work Environments".' }
    ],
    preparationTips: [
      'Focus on real-world SaaS design problems: Ticket assignment systems, SLA timer tracking, and notification fanout.',
      'Be strong in modern web stacks (React, Node.js/Ruby on Rails/Java, Redis, MySQL/PostgreSQL).'
    ],
    questions: [
      {
        id: 'frsh_q1',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'medium',
        round: 'System Design Round',
        question: 'Design an automated SLA (Service Level Agreement) Breach Notification Engine for a customer support ticketing system.',
        answer: 'Tickets have dynamic SLA policies (e.g. Response required in 4 hours). Use a distributed delay queue pattern: When a ticket is created or updated, calculate the target breach timestamp and push a message into a Redis Sorted Set where `score = breach_timestamp`. A background worker polls `ZRANGEBYSCORE` for tasks with score <= current_time, emitting alerts to agent channels via WebSockets/Kafka, scaling without database table scans.',
        followUp: 'How do you pause the SLA timer when the ticket status changes to "Pending Customer Response"?'
      }
    ],
    checklist: [{ id: 'frsh_c1', title: 'Design a Distributed Delayed Notification Queue using Redis Sorted Sets', category: 'System Design' }]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'TEAM',
    color: '#0052CC',
    website: 'https://www.atlassian.com/company/careers',
    industry: 'Team Collaboration & Developer Productivity Software',
    headquarters: 'Sydney, Australia',
    products: ['Jira', 'Confluence', 'Trello', 'Bitbucket', 'Atlassian Intelligence'],
    description: 'Pioneers of team collaboration software, famous for remote-first "Team Anywhere" culture, clean code standards, and rigorous values interviews.',
    hiringProcessNote: 'Evaluates practical data structures, production-quality code with unit tests, system design, and dedicated values interviews.',
    rolesSupported: ['swe', 'backend', 'frontend', 'fullstack', 'sre', 'devops'],
    rounds: [
      { id: 'team_r1', title: 'Round 1: Karat Technical Screening', duration: '60 mins', focus: 'Fast Problem Solving & Coding', description: 'Conducted via Karat assessing practical algorithm implementation.' },
      { id: 'team_r2', title: 'Round 2: Onsite Coding & Code Quality', duration: '60 mins', focus: 'Data Structures with Clean Code', description: 'Requires modular code with unit tests and clear exception handling.' },
      { id: 'team_r3', title: 'Round 3: System Design', duration: '60 mins', focus: 'Scalable Enterprise Collaboration', description: 'Design Jira issue tracking pipeline, real-time rich-text document sync, or activity feed.' },
      { id: 'team_r4', title: 'Round 4: Management & Past Experience', duration: '60 mins', focus: 'Technical Leadership & Project Depth', description: 'Deep probe into architectural compromises and cross-functional team dynamics.' },
      { id: 'team_r5', title: 'Round 5: Atlassian Values Interview', duration: '45 mins', focus: '5 Core Company Values', description: 'Assesses Open Company No Bullshit, Play as a Team, and Don’t #@!% the Customer.' }
    ],
    preparationTips: [
      'Write production-quality code during interviews: extract helper functions, validate inputs, and write unit tests.',
      'Prepare specific stories aligned with Atlassian’s 5 core values: "Open company, no bullshit", "Build with heart & balance", "Don\'t #@!% the customer", "Play, as a team", "Be the change you seek".'
    ],
    questions: [
      {
        id: 'team_q1',
        roleId: 'backend',
        topic: 'System Design',
        difficulty: 'hard',
        round: 'System Design Round',
        question: 'Design an Activity Feed service for Jira that notifies millions of developers about issue updates in real time.',
        answer: 'Use an event-driven architecture. When an issue is updated, emit an `IssueUpdatedEvent` to Apache Kafka. An Activity Processor consumes events, checks issue project watch lists, writes notification records into Cassandra/PostgreSQL (partitioned by `user_id`), and pushes real-time notifications to active client browser sessions via WebSocket connection servers.',
        followUp: 'How do you handle notification batching so a user isn\'t spammed by 50 rapid edits on the same Jira ticket?'
      }
    ],
    checklist: [
      { id: 'team_c1', title: 'Study Atlassian’s 5 Core Values and prepare authentic STAR examples', category: 'Behavioral' },
      { id: 'team_c2', title: 'Practice writing clean code with unit tests and exception handling in live coding', category: 'Coding' }
    ]
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'NOW',
    color: '#81B5A1',
    website: 'https://careers.servicenow.com',
    industry: 'Enterprise Cloud Workflow Automation & ITSM',
    headquarters: 'Santa Clara, CA',
    products: ['Now Platform', 'IT Service Management (ITSM)', 'HR Service Delivery', 'Now Assist AI'],
    description: 'Enterprise workflow leader driving the digital transformation of work across IT, HR, and customer service operations.',
    hiringProcessNote: 'Evaluates Java/JavaScript fundamentals, relational database architecture, workflow automation engines, and distributed caching.',
    rolesSupported: ['swe', 'backend', 'fullstack', 'frontend', 'cloud', 'qa'],
    rounds: [
      { id: 'now_r1', title: 'Round 1: Online Coding Assessment', duration: '90 mins', focus: 'DSA & Problem Solving', description: 'Assesses algorithmic efficiency and problem solving on HackerRank.' },
      { id: 'now_r2', title: 'Round 2: Technical Interview 1', duration: '60 mins', focus: 'Data Structures & OOP', description: 'Trees, Graphs, Object-Oriented design, and clean code principles.' },
      { id: 'now_r3', title: 'Round 3: Technical Interview 2 - System Design', duration: '60 mins', focus: 'Enterprise Workflow Engine Design', description: 'Designing state machines, workflow execution engines, and multi-node job queues.' },
      { id: 'now_r4', title: 'Round 4: Hiring Manager Round', duration: '45 mins', focus: 'Experience & Customer Focus', description: 'Deep dive into past technical challenges and workflow optimizations.' },
      { id: 'now_r5', title: 'Round 5: HR Round', duration: '30 mins', focus: 'Culture & Career Goals', description: 'Discussion of culture fit and career development.' }
    ],
    preparationTips: [
      'Understand how workflow engines and Finite State Machines (FSMs) execute multi-step business approvals.',
      'Be comfortable with relational database design and ACID transaction isolation.'
    ],
    questions: [
      {
        id: 'now_q1',
        roleId: 'backend',
        topic: 'Workflow Architecture',
        difficulty: 'medium',
        round: 'System Design Round',
        question: 'Design a distributed Workflow Engine that coordinates multi-step approval pipelines with timeouts and retries.',
        answer: 'Model workflows as Directed Acyclic Graphs (DAGs) of states and transitions. Store state machine instances in a database with optimistic locking (`version` column). Workers poll runnable tasks or consume from SQS, execute approval logic, and advance the state. Schedule timeout checks using a delayed task queue. If an approval times out, transition to the escalation state automatically.',
        followUp: 'How do you ensure state transitions remain strictly atomic and idempotent during worker crashes?'
      }
    ],
    checklist: [{ id: 'now_c1', title: 'Design a Finite State Machine (FSM) Workflow Engine with persistent state', category: 'System Design' }]
  },
  {
    id: 'guidewire',
    name: 'Guidewire',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'GWRE',
    color: '#002F6C',
    website: 'https://careers.guidewire.com',
    industry: 'Property & Casualty Insurance Cloud Platform',
    headquarters: 'San Mateo, CA',
    products: ['InsuranceSuite', 'Guidewire Cloud Platform (GWCP)', 'Jutro Digital Platform'],
    description: 'The mission-critical cloud platform for global Property and Casualty (P&C) insurers, processing hundreds of billions in insurance premiums.',
    hiringProcessNote: 'Evaluates object-oriented modeling, Java ecosystem, cloud-native services on AWS, and complex rule engines.',
    rolesSupported: ['swe', 'backend', 'cloud', 'qa', 'fullstack'],
    rounds: [
      { id: 'gwre_r1', title: 'Round 1: Online Technical Assessment', duration: '90 mins', focus: 'DSA & Java Core', description: 'Algorithmic problems and OOP reasoning on Codility.' },
      { id: 'gwre_r2', title: 'Round 2: Technical Interview 1', duration: '60 mins', focus: 'Data Structures & Problem Solving', description: 'Coding on data structures with focus on maintainability.' },
      { id: 'gwre_r3', title: 'Round 3: Low-Level / System Design', duration: '60 mins', focus: 'Rule Engine & Transaction Processing', description: 'Designing insurance policy calculation rules, transaction isolation, and audit logging.' },
      { id: 'gwre_r4', title: 'Round 4: Managerial Round', duration: '45 mins', focus: 'Domain complexity & teamwork', description: 'Discussion of navigating complex domain logic and code reliability.' }
    ],
    preparationTips: ['Focus on clean Object-Oriented design patterns, Java collections, and transaction isolation.'],
    questions: [
      {
        id: 'gwre_q1',
        roleId: 'backend',
        topic: 'Software Design',
        difficulty: 'medium',
        round: 'Design Round',
        question: 'Design a configurable Insurance Policy Premium Rating Engine using the Strategy Pattern.',
        answer: 'Define a common interface `RatingStrategy` with method `calculatePremium(Policy policy)`. Implement concrete strategies for different coverage types (e.g. `AutoRatingStrategy`, `HomeRatingStrategy`, `CommercialRatingStrategy`). Use a `RatingEngine` context that dynamically selects and chains relevant strategies based on policy product configuration.',
        followUp: 'How do you allow business analysts to modify rating factors without redeploying code?'
      }
    ],
    checklist: [{ id: 'gwre_c1', title: 'Review Strategy and Rule Engine design patterns in Java', category: 'LLD' }]
  },
  {
    id: 'kovaico',
    name: 'Kovai.co',
    tier: 'SaaS & Enterprise Product',
    tierId: 'saas-product',
    logoText: 'KOVAI',
    color: '#0D6EFD',
    website: 'https://www.kovai.co/careers',
    industry: 'Enterprise Software & Knowledge Management SaaS',
    headquarters: 'Coimbatore, India / London, UK',
    products: ['Document360', 'Serverless360 / Turbo360', 'Atomicwork'],
    description: 'Rapidly growing SaaS product powerhouse known for Document360 (AI knowledge base) and Azure monitoring platform Turbo360.',
    hiringProcessNote: 'Assesses full-stack competencies, Azure cloud primitives, C#/.NET / JavaScript, and SaaS UI craftsmanship.',
    rolesSupported: ['swe', 'fullstack', 'frontend', 'backend', 'cloud', 'qa'],
    rounds: [
      { id: 'kov_r1', title: 'Round 1: Online Assessment', duration: '60 mins', focus: 'Programming & Aptitude', description: 'Coding challenges and analytical aptitude.' },
      { id: 'kov_r2', title: 'Round 2: Technical Interview 1', duration: '45-60 mins', focus: 'Full-stack fundamentals', description: 'Frontend (React/TypeScript) and backend (C#/.NET / Node.js) architecture.' },
      { id: 'kov_r3', title: 'Round 3: System Design & Product Round', duration: '60 mins', focus: 'SaaS Knowledge Base Design', description: 'Designing markdown documentation portals, full-text search, and multi-tenant billing.' },
      { id: 'kov_r4', title: 'Round 4: Culture & Leadership', duration: '30 mins', focus: 'Product obsession and teamwork', description: 'Assesses work ethic and passion for SaaS products.' }
    ],
    preparationTips: ['Understand Full-Text Search indexing (Elasticsearch / Algolia) and SaaS document portals.'],
    questions: [
      {
        id: 'kov_q1',
        roleId: 'fullstack',
        topic: 'Full-Text Search',
        difficulty: 'medium',
        round: 'System Design Round',
        question: 'How do Inverted Indexes enable sub-second keyword search across millions of markdown documentation articles in Document360?',
        answer: 'Instead of searching document texts sequentially (O(N)), an Inverted Index tokenizes and normalizes words into an alphabetical dictionary of distinct terms. Each term points to a Postings List of document IDs and word positions: `{"kubernetes": [Doc1, Doc4, Doc9]}`. Searching for "kubernetes cluster" computes the intersection of postings lists in millisecond time.',
        followUp: 'How do you implement typo-tolerant fuzzy matching using n-grams or Levenshtein distance?'
      }
    ],
    checklist: [{ id: 'kov_c1', title: 'Review Inverted Index architecture and Full-Text Search fundamentals', category: 'Search' }]
  }
];

// Helper functions for accessing company datasets
export const getCompanyById = (id) => {
  return companiesData.find(c => c.id === id);
};

export const getCompaniesByTier = (tierId) => {
  if (!tierId || tierId === 'all') return companiesData;
  return companiesData.filter(c => c.tierId === tierId);
};
