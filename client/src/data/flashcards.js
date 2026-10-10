// Centralized Master Flashcards Dataset
// Contains memory recall flashcards across all curriculum subjects.

import { aiCurriculumFlashcards } from './aiCurriculumFlashcards.js';

const baseFlashcardsData = [
  // ==================== 1. OOP ====================
  {
    id: 'fc_1',
    subject: 'OOP',
    front: 'What are the four core pillars of Object-Oriented Programming (OOP)?',
    back: '1. Encapsulation: Bundling data and methods, hiding internal state.\n2. Abstraction: Hiding implementation details and exposing only essential interfaces.\n3. Inheritance: Reusing parent class properties and behaviors in derived classes.\n4. Polymorphism: Ability of an object or method to take multiple forms (overloading & overriding).',
    category: 'Core Concepts'
  },
  {
    id: 'fc_2',
    subject: 'OOP',
    front: 'What is the key difference between Method Overloading and Method Overriding?',
    back: '• Overloading (Compile-Time / Static Polymorphism): Same method name, different parameters within the same class. Return type can differ.\n• Overriding (Runtime / Dynamic Polymorphism): Subclass provides specific implementation of a parent method with the exact same name, arguments, and compatible return type.',
    category: 'Polymorphism'
  },
  {
    id: 'oop_fc_3',
    subject: 'OOP',
    front: 'Why doesn\'t Java allow multiple inheritance with classes?',
    back: 'To avoid the Diamond Problem ambiguity. If class D extends B and C, and both override a method from A, the compiler cannot know which method implementation D should inherit.',
    category: 'Inheritance'
  },
  {
    id: 'oop_fc_4',
    subject: 'OOP',
    front: 'What are the SOLID design principles?',
    back: '• S: Single Responsibility (one reason to change)\n• O: Open/Closed (open for extension, closed for modification)\n• L: Liskov Substitution (subclasses substitutable for base classes)\n• I: Interface Segregation (specific interfaces over fat ones)\n• D: Dependency Inversion (depend on abstractions, not concretions)',
    category: 'Design Principles'
  },
  {
    id: 'oop_fc_5',
    subject: 'OOP',
    front: 'What is the difference between Aggregation and Composition?',
    back: '• Aggregation: Weak HAS-A relationship where child can exist independently of parent (e.g., Department and Teacher).\n• Composition: Strong HAS-A relationship with shared lifecycle; child cannot exist without parent (e.g., House and Room).',
    category: 'Relationships'
  },

  // ==================== 2. DSA ====================
  {
    id: 'dsa_fc_1',
    subject: 'DSA',
    front: 'Why are arrays faster than linked lists for sequential traversal?',
    back: 'Cache Locality (Spatial Locality). Array elements reside in contiguous memory, allowing CPU hardware prefetchers to load entire 64-byte cache lines. Linked list nodes are scattered across the heap, causing frequent L1/L2 cache misses.',
    category: 'Memory & Arrays'
  },
  {
    id: 'dsa_fc_2',
    subject: 'DSA',
    front: 'What are the average and worst-case time complexities of QuickSort?',
    back: '• Average: O(n log n)\n• Worst-case: O(n²) (occurs when chosen pivot is repeatedly the extreme minimum or maximum element on an already sorted array).',
    category: 'Sorting'
  },
  {
    id: 'dsa_fc_3',
    subject: 'DSA',
    front: 'What are the two requirements for a problem to be solvable via Dynamic Programming?',
    back: '1. Optimal Substructure: Optimal solution to problem contains optimal solutions to subproblems.\n2. Overlapping Subproblems: The recursive formulation repeatedly solves identical subproblems.',
    category: 'Algorithms'
  },
  {
    id: 'dsa_fc_4',
    subject: 'DSA',
    front: 'What is the time complexity to search, insert, and delete in an AVL or Red-Black Tree?',
    back: 'Guaranteed O(log n) worst-case time for all three operations, due to self-balancing tree height invariants.',
    category: 'Trees'
  },
  {
    id: 'dsa_fc_5',
    subject: 'DSA',
    front: 'How do you detect a cycle in a singly linked list in O(1) space?',
    back: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare). Advance slow pointer by 1 step and fast pointer by 2 steps. If they ever point to the same node, a cycle exists.',
    category: 'Linked Lists'
  },

  // ==================== 3. DBMS ====================
  {
    id: 'fc_4',
    subject: 'DBMS',
    front: 'What does ACID stand for in DBMS transactions?',
    back: '• Atomicity: All operations succeed or none do (all-or-nothing rollback via undo log).\n• Consistency: Database transitions only between valid states enforcing constraints.\n• Isolation: Concurrent transactions execute without interfering (via locks/MVCC).\n• Durability: Committed updates survive system crashes (via redo log/WAL).',
    category: 'Transactions'
  },
  {
    id: 'fc_5',
    subject: 'DBMS',
    front: 'What is the difference between Clustered and Non-Clustered Indexes?',
    back: '• Clustered Index: Determines physical storage order of rows on disk. Only ONE per table (typically Primary Key). Leaf nodes contain actual row data.\n• Non-Clustered Index: Stored in separate B+ tree. Leaf nodes contain index keys and row pointers (row locator / PK). Multiple allowed per table.',
    category: 'Indexing'
  },
  {
    id: 'dbms_fc_3',
    subject: 'DBMS',
    front: 'What is the difference between 2NF and 3NF?',
    back: '• 2NF: Eliminates Partial Functional Dependencies (all non-prime attributes must depend on the FULL candidate key).\n• 3NF: Eliminates Transitive Dependencies (non-prime attributes cannot depend on other non-prime attributes).',
    category: 'Normalization'
  },
  {
    id: 'dbms_fc_4',
    subject: 'DBMS',
    front: 'What is MVCC and what is its primary benefit?',
    back: 'Multi-Version Concurrency Control maintains multiple point-in-time versions of rows with transaction IDs. Benefit: Readers never block writers, and writers never block readers.',
    category: 'Concurrency'
  },
  {
    id: 'dbms_fc_5',
    subject: 'DBMS',
    front: 'What does the CAP Theorem state for distributed databases?',
    back: 'Under a Network Partition (P), a distributed system can guarantee Consistency (C) or Availability (A), but NEVER both simultaneously.',
    category: 'Distributed DB'
  },

  // ==================== 4. SQL ====================
  {
    id: 'fc_7',
    subject: 'SQL',
    front: 'What is the difference between WHERE and HAVING in SQL?',
    back: '• WHERE filters individual records BEFORE grouping or aggregation takes place.\n• HAVING filters aggregated groups AFTER the GROUP BY clause has evaluated.',
    category: 'SQL Filtering'
  },
  {
    id: 'sql_fc_2',
    subject: 'SQL',
    front: 'What is the difference between RANK() and DENSE_RANK()?',
    back: '• RANK() leaves gaps in rank numbering after ties (e.g., 1, 2, 2, 4).\n• DENSE_RANK() does NOT leave gaps (e.g., 1, 2, 2, 3).',
    category: 'Window Functions'
  },
  {
    id: 'sql_fc_3',
    subject: 'SQL',
    front: 'What does a CROSS JOIN produce?',
    back: 'The Cartesian Product of both tables. Pairs every row of table A with every row of table B (M * N total output rows).',
    category: 'Joins'
  },
  {
    id: 'sql_fc_4',
    subject: 'SQL',
    front: 'Why does `SELECT * FROM tbl WHERE col = NULL` return 0 rows?',
    back: 'SQL uses Three-Valued Logic where equality comparison with NULL evaluates to UNKNOWN, not TRUE. You must write `col IS NULL`.',
    category: 'NULL Semantics'
  },
  {
    id: 'sql_fc_5',
    subject: 'SQL',
    front: 'What is the execution order of standard SQL clauses?',
    back: '1. FROM & JOINs\n2. WHERE\n3. GROUP BY\n4. HAVING\n5. SELECT\n6. DISTINCT\n7. ORDER BY\n8. LIMIT / OFFSET',
    category: 'Query Execution'
  },

  // ==================== 5. OS ====================
  {
    id: 'os_fc_1',
    subject: 'OS',
    front: 'What is the difference between a Process and a Thread?',
    back: '• Process: Independent program with its own private virtual memory space. High context switch cost (TLB flush).\n• Thread: Lightweight execution unit within a process sharing heap, global variables, and open files with other threads in the process.',
    category: 'Processes'
  },
  {
    id: 'os_fc_2',
    subject: 'OS',
    front: 'What is a Page Fault?',
    back: 'A hardware interrupt trap raised by the MMU when a program tries to access a virtual memory page whose page table valid bit is 0 (not currently loaded in physical RAM).',
    category: 'Virtual Memory'
  },
  {
    id: 'os_fc_3',
    subject: 'OS',
    front: 'What are the 4 Coffman conditions for Deadlock?',
    back: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait (breaking any one prevents deadlock).',
    category: 'Deadlocks'
  },
  {
    id: 'os_fc_4',
    subject: 'OS',
    front: 'What is Thrashing?',
    back: 'When physical RAM is overcommitted and the OS spends virtually all CPU cycles swapping pages in and out of disk rather than executing application code.',
    category: 'Memory Management'
  },
  {
    id: 'os_fc_5',
    subject: 'OS',
    front: 'What is the difference between User Mode and Kernel Mode?',
    back: '• User Mode (Ring 3): Restricted CPU instructions; cannot directly access hardware or modify MMU.\n• Kernel Mode (Ring 0): Unrestricted CPU instructions and complete memory access.',
    category: 'Security'
  },

  // ==================== 6. NETWORKS ====================
  {
    id: 'net_fc_1',
    subject: 'Networks',
    front: 'What packets make up the TCP Three-Way Handshake?',
    back: '1. Client -> Server: SYN (synchronize seq number)\n2. Server -> Client: SYN-ACK (acknowledge client seq, send server seq)\n3. Client -> Server: ACK (acknowledge server seq)',
    category: 'Transport Layer'
  },
  {
    id: 'net_fc_2',
    subject: 'Networks',
    front: 'Why is UDP faster than TCP?',
    back: 'UDP has no connection handshake, no retransmission delays, no congestion window throttling, and a tiny 8-byte header (compared to 20+ bytes in TCP).',
    category: 'Protocols'
  },
  {
    id: 'net_fc_3',
    subject: 'Networks',
    front: 'What is the difference between TCP TIME_WAIT and CLOSE_WAIT?',
    back: '• TIME_WAIT: Client waits 2MSL after sending final ACK to ensure duplicate packets die out.\n• CLOSE_WAIT: Server has received FIN from client and is waiting for its own local application to close the socket.',
    category: 'TCP States'
  },
  {
    id: 'net_fc_4',
    subject: 'Networks',
    front: 'What is a CORS Preflight request?',
    back: 'An automated HTTP OPTIONS request sent by browsers before complex cross-origin requests to check allowed origins, methods, and headers.',
    category: 'Web Security'
  },
  {
    id: 'net_fc_5',
    subject: 'Networks',
    front: 'How many usable hosts exist in a /24 IPv4 subnet?',
    back: '254 usable hosts. (32 - 24 = 8 host bits. 2^8 = 256. Subtract 2 for network address .0 and broadcast address .255 = 254).',
    category: 'Subnetting'
  },

  // ==================== 7. WEBDEV ====================
  {
    id: 'web_fc_1',
    subject: 'WebDev',
    front: 'What are Microtasks vs Macrotasks in the JavaScript Event Loop?',
    back: '• Microtasks: Promises (.then/.catch), queueMicrotask, MutationObserver. Drained completely until empty before any new macrotask.\n• Macrotasks: setTimeout, setInterval, setImmediate, I/O callbacks.',
    category: 'JavaScript'
  },
  {
    id: 'web_fc_2',
    subject: 'WebDev',
    front: 'What is the difference between XSS and CSRF?',
    back: '• XSS (Cross-Site Scripting): Attacker executes malicious JavaScript inside the victim\'s browser.\n• CSRF (Cross-Site Request Forgery): Malicious site tricks victim\'s browser into sending authenticated requests using ambient session cookies.',
    category: 'Security'
  },
  {
    id: 'web_fc_3',
    subject: 'WebDev',
    front: 'What are the 3 values for the SameSite cookie attribute?',
    back: '• Strict: Cookie never sent in cross-site requests (even following links).\n• Lax: Cookie sent on top-level GET navigations (default in modern browsers).\n• None: Cookie sent with all cross-site requests (requires Secure/HTTPS flag).',
    category: 'Security'
  },
  {
    id: 'web_fc_4',
    subject: 'WebDev',
    front: 'What is the Critical Rendering Path?',
    back: 'The sequence of steps browsers take to convert HTML/CSS/JS into pixels: DOM Tree -> CSSOM Tree -> Render Tree -> Layout (Reflow) -> Paint -> Composite.',
    category: 'Browser Performance'
  },
  {
    id: 'web_fc_5',
    subject: 'WebDev',
    front: 'What are Over-fetching and Under-fetching in REST APIs?',
    back: '• Over-fetching: Receiving unwanted excess data fields in API response.\n• Under-fetching: Endpoint returns too little data, requiring multiple sequential N+1 network requests (solved by GraphQL).',
    category: 'API Design'
  },

  // ==================== 8. LINUX ====================
  {
    id: 'fc_8',
    subject: 'Linux',
    front: 'What do file permission digits 754 represent in Linux chmod?',
    back: '• 7 (Owner): Read (4) + Write (2) + Execute (1) = rwx\n• 5 (Group): Read (4) + Execute (1) = r-x\n• 4 (Others): Read (4) = r--',
    category: 'Permissions'
  },
  {
    id: 'linux_fc_2',
    subject: 'Linux',
    front: 'What is the difference between SIGTERM (15) and SIGKILL (9)?',
    back: '• SIGTERM (15): Graceful termination request. Can be caught, allowing the process to close DB connections and cleanup.\n• SIGKILL (9): Uncatchable immediate kill enforced by the kernel.',
    category: 'Process Signals'
  },
  {
    id: 'linux_fc_3',
    subject: 'Linux',
    front: 'What is the difference between a Hard Link and a Soft Link (Symlink)?',
    back: '• Hard Link: Points directly to existing Inode. Same file permissions/ID. Survives deletion of original file.\n• Soft Link: Separate file containing the text path to target file. Breaks if target file is deleted.',
    category: 'Filesystems'
  },
  {
    id: 'linux_fc_4',
    subject: 'Linux',
    front: 'What is the OOM Killer in Linux?',
    back: 'Out-Of-Memory Killer is an emergency kernel mechanism that calculates an oom_score for running processes when RAM+swap are exhausted and terminates the highest-scoring process with SIGKILL.',
    category: 'Memory'
  },
  {
    id: 'linux_fc_5',
    subject: 'Linux',
    front: 'What does `2>&1` mean in shell redirection?',
    back: 'It redirects standard error (file descriptor 2) into wherever standard output (file descriptor 1) is currently directed.',
    category: 'Shell Redirection'
  },

  // ==================== 9. AWS ====================
  {
    id: 'aws_fc_1',
    subject: 'AWS',
    front: 'What is the difference between an IAM User and an IAM Role?',
    back: '• IAM User: Permanent long-term credentials (password, access key ID + secret) for human users.\n• IAM Role: Temporary security credentials obtained via AWS STS with automatic rotation, intended for EC2/Lambda services.',
    category: 'IAM'
  },
  {
    id: 'aws_fc_2',
    subject: 'AWS',
    front: 'What is the difference between S3 Standard and S3 Glacier Deep Archive?',
    back: '• S3 Standard: Low latency, 11 9s durability, designed for active frequent access.\n• Glacier Deep Archive: Lowest cost storage in AWS (approx $0.00099/GB/mo) with retrieval times between 12-48 hours.',
    category: 'S3 Storage'
  },
  {
    id: 'aws_fc_3',
    subject: 'AWS',
    front: 'What is the role of a NAT Gateway in an AWS VPC?',
    back: 'Enables EC2 instances in a private subnet to make outbound connections to the internet (e.g. for OS patches) without allowing incoming internet traffic to reach them directly.',
    category: 'VPC Networking'
  },
  {
    id: 'aws_fc_4',
    subject: 'AWS',
    front: 'What is the difference between Security Groups and Network ACLs (NACLs)?',
    back: '• Security Group: Stateful virtual firewall at instance ENI level (inbound response automatically allowed out).\n• NACL: Stateless subnet-level firewall evaluating numbered rules in order.',
    category: 'VPC Security'
  },
  {
    id: 'aws_fc_5',
    subject: 'AWS',
    front: 'What is an AWS Lambda Cold Start?',
    back: 'The initialization latency incurred when Lambda spins up a brand-new execution environment container, downloads code, and initializes runtime before executing your handler.',
    category: 'Serverless'
  },

  // ==================== 10. DEVOPS ====================
  {
    id: 'devops_fc_1',
    subject: 'DevOps',
    front: 'What is Continuous Delivery vs Continuous Deployment?',
    back: '• Continuous Delivery: Code is automatically tested and packaged into deployable artifacts; production deployment requires a manual approval trigger.\n• Continuous Deployment: Every commit that passes automated pipeline tests is deployed directly to production with zero human intervention.',
    category: 'CI/CD'
  },
  {
    id: 'devops_fc_2',
    subject: 'DevOps',
    front: 'What is a Canary Deployment?',
    back: 'Routing a small percentage of real production traffic (e.g., 2% -> 10% -> 100%) to a new release while monitoring error rates to limit the blast radius of unexpected regressions.',
    category: 'Deployments'
  },
  {
    id: 'devops_fc_3',
    subject: 'DevOps',
    front: 'What is Configuration Drift in infrastructure?',
    back: 'The gradual accumulation of undocumented manual changes made to live servers, causing development, staging, and production environments to diverge.',
    category: 'Infrastructure'
  },
  {
    id: 'devops_fc_4',
    subject: 'DevOps',
    front: 'What is Immutable Infrastructure?',
    back: 'Servers are never modified in-place. If changes or security patches are needed, an entirely new machine image or container is built, tested, deployed, and the old server terminated.',
    category: 'IaC'
  },
  {
    id: 'devops_fc_5',
    subject: 'DevOps',
    front: 'What are the 4 DORA engineering metrics?',
    back: '1. Deployment Frequency\n2. Lead Time for Changes\n3. Change Failure Rate\n4. Mean Time to Recovery (MTTR)',
    category: 'SRE'
  },

  // ==================== 11. DOCKER ====================
  {
    id: 'doc_fc_1',
    subject: 'Docker',
    front: 'What Linux kernel mechanisms make Docker containers possible?',
    back: '• Namespaces: Provide process, network, filesystem, and user isolation.\n• cgroups (Control Groups): Enforce CPU, memory, and I/O resource limits.',
    category: 'Architecture'
  },
  {
    id: 'doc_fc_2',
    subject: 'Docker',
    front: 'What is a Multi-Stage Dockerfile build?',
    back: 'Using multiple FROM statements to separate the heavy compilation/build environment from the final slim runtime image (copying only the compiled binary to shrink image size).',
    category: 'Dockerfile'
  },
  {
    id: 'doc_fc_3',
    subject: 'Docker',
    front: 'How does Docker Layer Caching work?',
    back: 'Each line in a Dockerfile creates an immutable layer. Docker reuses cached layers unless the instruction or files copied in that step have changed, in which case all subsequent layers are invalidated.',
    category: 'Optimization'
  },
  {
    id: 'doc_fc_4',
    subject: 'Docker',
    front: 'What is the difference between Docker Volumes and Bind Mounts?',
    back: '• Volumes: Managed by Docker in host storage (/var/lib/docker/volumes/). Best practice for database persistence.\n• Bind Mounts: Map arbitrary host file paths directly into the container.',
    category: 'Storage'
  },
  {
    id: 'doc_fc_5',
    subject: 'Docker',
    front: 'What is the difference between ENTRYPOINT and CMD?',
    back: '• ENTRYPOINT: Sets the fixed executable command.\n• CMD: Sets default arguments for ENTRYPOINT that can be overridden by arguments passed to `docker run`.',
    category: 'Dockerfile'
  },

  // ==================== 12. KUBERNETES ====================
  {
    id: 'k8s_fc_1',
    subject: 'Kubernetes',
    front: 'What is etcd in a Kubernetes cluster?',
    back: 'The consistent, highly available distributed key-value store implementing Raft consensus that holds all cluster state, object manifests, and metadata.',
    category: 'Control Plane'
  },
  {
    id: 'k8s_fc_2',
    subject: 'Kubernetes',
    front: 'What is the difference between Liveness and Readiness probes?',
    back: '• Liveness: If failed, kubelet kills and restarts the container.\n• Readiness: If failed, the pod is removed from Service traffic endpoints (not restarted).',
    category: 'Health Checks'
  },
  {
    id: 'k8s_fc_3',
    subject: 'Kubernetes',
    front: 'What is an Ingress Controller?',
    back: 'A Layer 7 reverse proxy (e.g. NGINX) that routes external HTTP/HTTPS traffic to internal cluster Services based on hostnames and URL paths.',
    category: 'Networking'
  },
  {
    id: 'k8s_fc_4',
    subject: 'Kubernetes',
    front: 'What is a Pod in Kubernetes?',
    back: 'The smallest deployable unit in Kubernetes. Encapsulates one or more containers sharing the same network IP, ports, and storage volumes.',
    category: 'Core Concepts'
  },
  {
    id: 'k8s_fc_5',
    subject: 'Kubernetes',
    front: 'What does Exit Code 137 mean in Kubernetes pod crashes?',
    back: 'The container was OOMKilled (Out of Memory) by the Linux kernel cgroups because it exceeded its configured memory limit.',
    category: 'Troubleshooting'
  },

  // ==================== 13. TERRAFORM ====================
  {
    id: 'tf_fc_1',
    subject: 'Terraform',
    front: 'What is the function of the terraform.tfstate file?',
    back: 'It records the mapping between declarative HCL code resources and real-world cloud resource IDs and attributes, and tracks resource dependency graphs.',
    category: 'State Management'
  },
  {
    id: 'tf_fc_2',
    subject: 'Terraform',
    front: 'Why is DynamoDB used alongside S3 for Terraform backends?',
    back: 'To provide distributed state locking. When terraform plan/apply runs, it locks the state in DynamoDB to prevent teammates from running concurrent conflicting apply operations.',
    category: 'State Locking'
  },
  {
    id: 'tf_fc_3',
    front: 'What does `terraform plan` do?',
    back: 'Refreshes state against cloud APIs, compares desired HCL code with live state, and shows resources to add (+), change (~), or destroy (-) without executing changes.',
    category: 'Workflow',
    subject: 'Terraform'
  },
  {
    id: 'tf_fc_4',
    subject: 'Terraform',
    front: 'What is the difference between root module and child module?',
    back: '• Root module: The primary working directory where terraform commands run.\n• Child module: A parameterized reusable component called via a `module` block in the root module.',
    category: 'Modules'
  },
  {
    id: 'tf_fc_5',
    subject: 'Terraform',
    front: 'What happens when an input variable is marked `sensitive = true`?',
    back: 'Terraform redacts the value in stdout console logs and plan output summaries, preventing credentials from leaking in build logs.',
    category: 'Variables'
  },

  // ==================== 14. DEVSECOPS ====================
  {
    id: 'sec_fc_1',
    subject: 'DevSecOps',
    front: 'What is the difference between SAST and DAST?',
    back: '• SAST: White-box static source code analysis without running the app (finds vulnerabilities in code early).\n• DAST: Black-box dynamic testing attacking the running application from outside HTTP endpoints.',
    category: 'Security Testing'
  },
  {
    id: 'sec_fc_2',
    subject: 'DevSecOps',
    front: 'What is the Pull model in Prometheus monitoring?',
    back: 'Prometheus periodically scrapes (HTTP GET) the `/metrics` endpoint exposed by target applications/exporters, allowing Prometheus to control ingestion rate.',
    category: 'Prometheus'
  },
  {
    id: 'sec_fc_3',
    subject: 'DevSecOps',
    front: 'What are the 3 Pillars of Observability?',
    back: '1. Metrics (aggregated numeric time-series)\n2. Logs (detailed contextual event strings)\n3. Traces (end-to-end request journeys across microservices via Trace IDs)',
    category: 'Observability'
  },
  {
    id: 'sec_fc_4',
    subject: 'DevSecOps',
    front: 'What is an Error Budget in SRE?',
    back: 'The allowable failure headroom defined as `100% - SLO`. If SLO is 99.9%, the error budget is 0.1% of requests or approx 43 minutes of downtime per month.',
    category: 'SRE'
  },
  {
    id: 'sec_fc_5',
    subject: 'DevSecOps',
    front: 'What is Shift-Left Security?',
    back: 'Integrating security checks (SAST, secret detection, container scanning) early into developer IDEs and CI pipelines instead of testing only before production release.',
    category: 'DevSecOps Culture'
  },

  // ==================== 15. SYSTEM DESIGN ====================
  {
    id: 'sys_fc_1',
    subject: 'System Design',
    front: 'Why is Consistent Hashing used instead of `hash(key) % N`?',
    back: 'Adding or removing a server in modulo hashing remaps ~100% of keys. Consistent Hashing remaps only `K / N` keys on average, preventing massive database cache stampedes.',
    category: 'Distributed Systems'
  },
  {
    id: 'sys_fc_2',
    subject: 'System Design',
    front: 'What is the difference between Cache-Aside and Write-Through caching?',
    back: '• Cache-Aside: App reads from cache; on miss, reads DB, writes to cache. Writes go directly to DB, invalidating cache.\n• Write-Through: App writes to cache, which synchronously writes to DB before confirming.',
    category: 'Caching'
  },
  {
    id: 'sys_fc_3',
    subject: 'System Design',
    front: 'What are the 3 states of a Circuit Breaker?',
    back: '1. Closed: Normal operation, requests pass through.\n2. Open: High failure rate trips circuit; requests fail immediately with fallback without calling dependency.\n3. Half-Open: Trial requests sent to test if dependency recovered.',
    category: 'Resilience'
  },
  {
    id: 'sys_fc_4',
    subject: 'System Design',
    front: 'How does Kafka differ from RabbitMQ regarding consumed messages?',
    back: 'RabbitMQ deletes messages once acknowledged by consumers. Kafka retains messages on an immutable disk log for days, allowing consumers to replay historical events.',
    category: 'Message Brokers'
  },
  {
    id: 'sys_fc_5',
    subject: 'System Design',
    front: 'What is the Token Bucket rate limiting algorithm?',
    back: 'Tokens are added to a bucket at a fixed rate up to a max capacity. Each request consumes 1 token. Allows traffic bursts up to capacity while enforcing average rate limits.',
    category: 'Rate Limiting'
  }
];

export const flashcardsData = [
  ...baseFlashcardsData,
  ...aiCurriculumFlashcards
];
