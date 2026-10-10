// Centralized Master Multiple Choice Questions Dataset
// Contains 5+ verified, technically accurate MCQs for all 15 curriculum subjects.

export const mcqsData = [
  // ==================== 1. OOP ====================
  {
    id: 'mcq_1',
    subject: 'OOP',
    question: 'Which of the following concepts in OOP best describes the mechanism of wrapping code and data together into a single unit?',
    options: [
      'Abstraction',
      'Encapsulation',
      'Polymorphism',
      'Inheritance'
    ],
    answer: 1, // Encapsulation
    explanation: 'Encapsulation is the process of binding data variables and methods together into a class, and restricting direct access using private access modifiers.',
    difficulty: 'easy',
    tags: ['oop', 'encapsulation', 'fundamentals'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'mcq_2',
    subject: 'OOP',
    question: 'What is runtime polymorphism achieved through in Java?',
    options: [
      'Method Overloading',
      'Method Overriding',
      'Operator Overloading',
      'Static Binding'
    ],
    answer: 1, // Method Overriding
    explanation: 'In Java, runtime polymorphism (dynamic method dispatch) is achieved through Method Overriding, where a subclass provides a specific implementation of a method declared in its superclass.',
    difficulty: 'medium',
    tags: ['oop', 'polymorphism', 'java'],
    relatedTopicId: 'oop_polymorphism'
  },
  {
    id: 'mcq_9',
    subject: 'OOP',
    question: 'Can you override a static method in Java?',
    options: [
      'Yes, it behaves identically to non-static methods',
      'No, static methods belong to the class and are hidden (method hiding), not overridden',
      'Yes, if you use the @Override annotation',
      'Only if the method is marked protected'
    ],
    answer: 1,
    explanation: 'Static methods are resolved at compile time using static binding. Defining a static method with the same signature in a subclass hides the parent method rather than overriding it.',
    difficulty: 'hard',
    tags: ['oop', 'java', 'static'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_mcq_4',
    subject: 'OOP',
    question: 'Which SOLID principle is violated when a derived class alters the expected behavior of a base class method such that callers break when the base reference points to the derived instance?',
    options: [
      'Single Responsibility Principle',
      'Open/Closed Principle',
      'Liskov Substitution Principle',
      'Interface Segregation Principle'
    ],
    answer: 2,
    explanation: 'The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of a subclass without breaking application correctness.',
    difficulty: 'medium',
    tags: ['oop', 'solid', 'lsp'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_mcq_5',
    subject: 'OOP',
    question: 'Why is the "volatile" keyword required for the instance reference in the Double-Checked Locking Singleton pattern in Java?',
    options: [
      'To force the JVM to keep the object in Metaspace',
      'To prevent the JVM and CPU from reordering instructions during object initialization',
      'To automatically invoke garbage collection when idle',
      'To make the object cloneable across threads'
    ],
    answer: 1,
    explanation: 'Instruction reordering can cause thread B to observe a non-null reference before thread A has finished executing the constructor. The volatile keyword establishes a happens-before memory barrier.',
    difficulty: 'hard',
    tags: ['oop', 'singleton', 'concurrency'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },

  // ==================== 2. DSA ====================
  {
    id: 'mcq_6',
    subject: 'DSA',
    question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (AVL / Red-Black Tree)?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    answer: 1, // O(log n)
    explanation: 'In a self-balancing binary search tree, the height is guaranteed to be logarithmic (h = O(log n)), making search, insertion, and deletion O(log n).',
    difficulty: 'easy',
    tags: ['dsa', 'trees', 'complexity'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },
  {
    id: 'dsa_mcq_2',
    subject: 'DSA',
    category: 'Hashing',
    question: 'What is the worst-case time complexity of lookup in a Hash Table if all n elements hash to the same bucket (using simple linked list separate chaining)?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n²)'
    ],
    answer: 2,
    explanation: 'When all elements collide into the same bucket in a linked list, search degrades into a linear scan through the chain, taking O(n) time.',
    difficulty: 'easy',
    tags: ['dsa', 'hashing', 'complexity'],
    relatedTopicId: 'dsa_hash-tables'
  },
  {
    id: 'dsa_mcq_3',
    subject: 'DSA',
    question: 'Which sorting algorithm is guaranteed to have O(n log n) time complexity in the worst case AND is stable?',
    options: [
      'QuickSort',
      'MergeSort',
      'HeapSort',
      'SelectionSort'
    ],
    answer: 1,
    explanation: 'MergeSort guarantees O(n log n) in all cases (best, average, worst) and preserves the relative order of equal elements (stable). QuickSort is O(n²) worst-case; HeapSort is not stable.',
    difficulty: 'medium',
    tags: ['dsa', 'sorting', 'mergesort'],
    relatedTopicId: 'dsa_sorting-and-searching'
  },
  {
    id: 'dsa_mcq_4',
    subject: 'DSA',
    question: 'Which graph traversal algorithm guarantees finding the shortest path between two vertices in an UNWEIGHTED graph?',
    options: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'Kruskal\'s Algorithm',
      'Tarjan\'s Algorithm'
    ],
    answer: 1,
    explanation: 'BFS explores vertices layer-by-layer in order of increasing distance from the source, guaranteeing that the first time a target vertex is reached, the path is shortest in an unweighted graph.',
    difficulty: 'easy',
    tags: ['dsa', 'graphs', 'bfs'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },
  {
    id: 'dsa_mcq_5',
    subject: 'DSA',
    question: 'What is the time complexity to build a Binary Heap from an arbitrary array of n integers using the bottom-up Heapify approach?',
    options: [
      'O(n log n)',
      'O(n)',
      'O(log n)',
      'O(n²)'
    ],
    answer: 1,
    explanation: 'Building a heap bottom-up requires O(n) time because the majority of nodes are near the leaves and require few down-heap operations (converging mathematical series).',
    difficulty: 'medium',
    tags: ['dsa', 'heaps', 'complexity'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },

  // ==================== 3. DBMS ====================
  {
    id: 'mcq_4',
    subject: 'DBMS',
    question: 'Which normal form eliminates transitive functional dependencies?',
    options: [
      'First Normal Form (1NF)',
      'Second Normal Form (2NF)',
      'Third Normal Form (3NF)',
      'Boyce-Codd Normal Form (BCNF)'
    ],
    answer: 2, // 3NF
    explanation: '3NF requires that a relation is in 2NF and no non-prime attribute is transitively dependent on the primary key (X -> Y and Y -> Z where Z is non-prime).',
    difficulty: 'medium',
    tags: ['dbms', 'normalization', '3nf'],
    relatedTopicId: 'dbms_normalization'
  },
  {
    id: 'dbms_mcq_2',
    subject: 'DBMS',
    question: 'Which property of ACID transactions is guaranteed by Write-Ahead Logging (WAL) and Redo Logs upon system reboot after a power crash?',
    options: [
      'Atomicity',
      'Consistency',
      'Isolation',
      'Durability'
    ],
    answer: 3,
    explanation: 'Durability ensures that once a transaction has committed, its changes survive system crashes. WAL guarantees all committed operations are stored sequentially on disk and replayed during recovery.',
    difficulty: 'medium',
    tags: ['dbms', 'acid', 'durability'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_mcq_3',
    subject: 'DBMS',
    question: 'In MySQL InnoDB and PostgreSQL, what does MVCC stand for and what is its primary benefit?',
    options: [
      'Multi-Variable Column Check; improves schema validation',
      'Multi-Version Concurrency Control; readers do not block writers and writers do not block readers',
      'Maximum Velocity Cluster Cache; speeds up full table scans',
      'Memory Virtualized Consistency Controller; manages buffer pool RAM'
    ],
    answer: 1,
    explanation: 'MVCC maintains multiple versions of database rows with transaction timestamps so readers see a consistent snapshot without acquiring exclusive locks on rows.',
    difficulty: 'medium',
    tags: ['dbms', 'mvcc', 'concurrency'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_mcq_4',
    subject: 'DBMS',
    question: 'How many Clustered Indexes can exist on a single database table in MySQL InnoDB / SQL Server?',
    options: [
      'Only 1',
      'Up to 16',
      'Unlimited',
      'One per foreign key column'
    ],
    answer: 0,
    explanation: 'Because a clustered index determines the physical storage ordering of data rows on disk, a table can only be physically ordered in one way, permitting only ONE clustered index.',
    difficulty: 'easy',
    tags: ['dbms', 'indexing', 'clustered-index'],
    relatedTopicId: 'dbms_indexing-and-storage'
  },
  {
    id: 'dbms_mcq_5',
    subject: 'DBMS',
    question: 'Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but is vulnerable to Phantom Reads under the ANSI SQL standard?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    answer: 2,
    explanation: 'Repeatable Read guarantees that data re-read within a transaction returns identical values, preventing dirty and non-repeatable reads. New matching rows inserted by other transactions (phantom reads) are traditionally possible.',
    difficulty: 'hard',
    tags: ['dbms', 'isolation-levels', 'transactions'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },

  // ==================== 4. SQL ====================
  {
    id: 'mcq_5',
    subject: 'SQL',
    question: 'Which SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?',
    options: [
      'WHERE',
      'HAVING',
      'GROUP BY',
      'ORDER BY'
    ],
    answer: 1, // HAVING
    explanation: 'The WHERE clause cannot be used with aggregate functions directly; HAVING is specifically designed to filter groups created by GROUP BY or aggregated expressions.',
    difficulty: 'easy',
    tags: ['sql', 'queries', 'aggregates'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_mcq_2',
    subject: 'SQL',
    question: 'What is the result of evaluating the condition: `WHERE column_name = NULL` in SQL?',
    options: [
      'TRUE for all rows where column_name has no value',
      'FALSE for all rows',
      'UNKNOWN for all rows (evaluates to non-matching)',
      'Syntax Error'
    ],
    answer: 2,
    explanation: 'In SQL Three-Valued Logic, any equality comparison with NULL evaluates to UNKNOWN. To test for null values, you must use `IS NULL` or `IS NOT NULL`.',
    difficulty: 'medium',
    tags: ['sql', 'null', 'logic'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_mcq_3',
    subject: 'SQL',
    question: 'Which Window Function assigns consecutive integers to rows sharing identical values without skipping any subsequent rank numbers?',
    options: [
      'RANK()',
      'DENSE_RANK()',
      'ROW_NUMBER()',
      'NTILE()'
    ],
    answer: 1,
    explanation: 'DENSE_RANK() assigns identical ranks to tied rows and numbers the next distinct value with the immediately following integer (e.g. 1, 2, 2, 3), whereas RANK() skips (e.g. 1, 2, 2, 4).',
    difficulty: 'medium',
    tags: ['sql', 'window-functions', 'dense-rank'],
    relatedTopicId: 'sql_window-functions'
  },
  {
    id: 'sql_mcq_4',
    subject: 'SQL',
    question: 'What type of JOIN returns all records when there is a match in either left or right table records, filling missing attributes with NULL?',
    options: [
      'INNER JOIN',
      'CROSS JOIN',
      'FULL OUTER JOIN',
      'NATURAL JOIN'
    ],
    answer: 2,
    explanation: 'FULL OUTER JOIN combines the results of both LEFT JOIN and RIGHT JOIN, returning all rows from both tables and filling missing sides with NULL.',
    difficulty: 'easy',
    tags: ['sql', 'joins', 'outer-join'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_mcq_5',
    subject: 'SQL',
    question: 'What is the logical order of processing in a SQL SELECT statement?',
    options: [
      'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY',
      'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY',
      'FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY',
      'WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY'
    ],
    answer: 1,
    explanation: 'The logical order starts with FROM/JOINs, filters rows via WHERE, groups rows with GROUP BY, filters groups with HAVING, projects columns in SELECT, and finally orders the output in ORDER BY.',
    difficulty: 'medium',
    tags: ['sql', 'execution-order', 'fundamentals'],
    relatedTopicId: 'sql_joins-and-queries'
  },

  // ==================== 5. OS ====================
  {
    id: 'os_mcq_1',
    subject: 'OS',
    question: 'Which of the following is shared among all threads belonging to the same process?',
    options: [
      'Stack memory',
      'Program Counter (PC)',
      'Heap memory and open file descriptors',
      'CPU Register values'
    ],
    answer: 2,
    explanation: 'Threads of the same process share the process address space (Heap, global data) and open file descriptors, but each thread has its own private Stack, Program Counter, and CPU Registers.',
    difficulty: 'easy',
    tags: ['os', 'threads', 'processes'],
    relatedTopicId: 'os_process-management'
  },
  {
    id: 'os_mcq_2',
    subject: 'OS',
    question: 'What hardware condition triggers a Page Fault in an operating system?',
    options: [
      'The requested page table entry has its valid/present bit set to 0',
      'The CPU executes an illegal arithmetic instruction',
      'A process attempts to divide an integer by zero',
      'The disk drive runs out of sectors'
    ],
    answer: 0,
    explanation: 'When the MMU attempts to translate a virtual address whose page table entry has a valid/present bit of 0 (not in physical RAM), it raises a Page Fault hardware interrupt to the kernel.',
    difficulty: 'medium',
    tags: ['os', 'virtual-memory', 'page-fault'],
    relatedTopicId: 'os_memory-and-virtual-memory'
  },
  {
    id: 'os_mcq_3',
    subject: 'OS',
    question: 'Which of the following is NOT one of the 4 Coffman conditions required for a Deadlock?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Circular Wait',
      'Preemptive Scheduling'
    ],
    answer: 3,
    explanation: 'The 4 conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemptive scheduling actually prevents or breaks deadlocks.',
    difficulty: 'medium',
    tags: ['os', 'deadlocks', 'coffman'],
    relatedTopicId: 'os_concurrency-and-deadlocks'
  },
  {
    id: 'os_mcq_4',
    subject: 'OS',
    question: 'What is Thrashing in an operating system?',
    options: [
      'Multiple threads attempting to write to the same file simultaneously',
      'A state where the CPU spends more time swapping pages in/out of disk than executing instructions',
      'High network bandwidth saturation caused by broadcast packets',
      'A disk head crashing into the magnetic platter'
    ],
    answer: 1,
    explanation: 'Thrashing occurs when total memory demanded exceeds physical RAM, causing the system to constantly page-fault and swap memory pages back and forth from disk.',
    difficulty: 'easy',
    tags: ['os', 'virtual-memory', 'thrashing'],
    relatedTopicId: 'os_memory-and-virtual-memory'
  },
  {
    id: 'os_mcq_5',
    subject: 'OS',
    question: 'What is the primary difference between a Mutex and a Binary Semaphore?',
    options: [
      'A Semaphore works only on single-core CPUs',
      'A Mutex has ownership semantics (only the thread that locked it can unlock it); a Semaphore can be signaled by any thread',
      'A Mutex can take any integer value; a Semaphore is strictly 0 or 1',
      'There is no difference'
    ],
    answer: 1,
    explanation: 'A Mutex enforces strict thread ownership for mutual exclusion in critical sections. A Semaphore is a signaling mechanism without ownership, allowing any thread to signal (release) it.',
    difficulty: 'hard',
    tags: ['os', 'concurrency', 'mutex-semaphore'],
    relatedTopicId: 'os_concurrency-and-deadlocks'
  },

  // ==================== 6. NETWORKS ====================
  {
    id: 'net_mcq_1',
    subject: 'Networks',
    question: 'What is the exact sequence of packet flags exchanged during a standard TCP connection establishment?',
    options: [
      'ACK -> SYN -> SYN-ACK',
      'SYN -> SYN-ACK -> ACK',
      'FIN -> ACK -> FIN-ACK',
      'SYN -> ACK -> DATA'
    ],
    answer: 1,
    explanation: 'The TCP Three-Way Handshake consists of: Client sends SYN, Server replies with SYN-ACK, and Client completes connection with ACK.',
    difficulty: 'easy',
    tags: ['networks', 'tcp', 'handshake'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },
  {
    id: 'net_mcq_2',
    subject: 'Networks',
    question: 'Which protocol improvement enables HTTP/3 to eliminate Head-of-Line (HOL) blocking at the transport layer?',
    options: [
      'Running over TLS 1.3 over TCP',
      'Running over QUIC built on top of UDP',
      'Compressing headers using HPACK',
      'Increasing TCP window size to 64KB'
    ],
    answer: 1,
    explanation: 'HTTP/3 uses QUIC over UDP. In QUIC, independent streams are multiplexed without sharing a single TCP congestion window, so a lost packet on one stream does not block other streams.',
    difficulty: 'medium',
    tags: ['networks', 'http3', 'quic'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_mcq_3',
    subject: 'Networks',
    question: 'What DNS record type maps a domain name directly to an IPv4 address?',
    options: [
      'AAAA Record',
      'CNAME Record',
      'A Record',
      'MX Record'
    ],
    answer: 2,
    explanation: 'An A (Address) record maps a hostname to a 32-bit IPv4 address. An AAAA record maps to an IPv6 address.',
    difficulty: 'easy',
    tags: ['networks', 'dns', 'a-record'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_mcq_4',
    subject: 'Networks',
    question: 'Why does a client entering the TCP TIME_WAIT state wait for a duration equal to 2MSL (Maximum Segment Lifetime)?',
    options: [
      'To allow the CPU cache to cool down',
      'To ensure the final ACK reached the server and any lingering duplicate packets in the network dissipate',
      'To renegotiate the TLS encryption cipher',
      'To calculate the round-trip latency for the next socket'
    ],
    answer: 1,
    explanation: 'TIME_WAIT lasts 2 * MSL (typically 60-120 seconds) to ensure that the final ACK is received by the server (resending it if lost) and that old delayed segments die off before the port is reused.',
    difficulty: 'hard',
    tags: ['networks', 'tcp', 'time-wait'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },
  {
    id: 'net_mcq_5',
    subject: 'Networks',
    question: 'How many usable host IP addresses are available in a subnet with CIDR notation 192.168.1.0/26?',
    options: [
      '64',
      '62',
      '30',
      '126'
    ],
    answer: 1,
    explanation: 'A /26 prefix leaves 32 - 26 = 6 host bits. 2^6 = 64 total addresses. Subtracting 2 (network address and broadcast address) yields 62 usable host addresses.',
    difficulty: 'medium',
    tags: ['networks', 'cidr', 'subnetting'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },

  // ==================== 7. WEBDEV ====================
  {
    id: 'web_mcq_1',
    subject: 'WebDev',
    question: 'In the JavaScript Event Loop, which queue has highest priority and is completely drained immediately after the call stack empties?',
    options: [
      'Macrotask Queue (setTimeout, setInterval)',
      'Microtask Queue (Promises, queueMicrotask)',
      'I/O Polling Queue',
      'Rendering Pipeline Queue'
    ],
    answer: 1,
    explanation: 'The Microtask Queue is processed completely until empty before the Event Loop picks the next macrotask from the Task Queue.',
    difficulty: 'medium',
    tags: ['webdev', 'javascript', 'event-loop'],
    relatedTopicId: 'webdev_frontend-architecture'
  },
  {
    id: 'web_mcq_2',
    subject: 'WebDev',
    question: 'Which HTTP header prevents cross-site scripts from reading session cookies via `document.cookie`?',
    options: [
      'SameSite=Strict',
      'Secure',
      'HttpOnly',
      'X-XSS-Protection'
    ],
    answer: 2,
    explanation: 'Setting the HttpOnly flag on Set-Cookie instructs the browser to block JavaScript client code from reading or accessing the cookie, mitigating XSS cookie theft.',
    difficulty: 'easy',
    tags: ['webdev', 'security', 'cookies'],
    relatedTopicId: 'webdev_web-security'
  },
  {
    id: 'web_mcq_3',
    subject: 'WebDev',
    question: 'What is the primary difference between `Cache-Control: no-cache` and `Cache-Control: no-store`?',
    options: [
      'no-cache stores the asset but requires server validation before reuse; no-store forbids saving any copy to disk/cache',
      'no-cache is for images; no-store is for JSON APIs',
      'no-store allows CDN caching but disables browser caching',
      'They are identical'
    ],
    answer: 0,
    explanation: 'no-cache allows browsers and caches to store the response, but mandates revalidation (via ETag/Last-Modified) before serving it. no-store prohibits caching completely.',
    difficulty: 'medium',
    tags: ['webdev', 'http', 'caching'],
    relatedTopicId: 'webdev_frontend-architecture'
  },
  {
    id: 'web_mcq_4',
    subject: 'WebDev',
    question: 'What HTTP method is sent by modern browsers as a CORS preflight check prior to sending complex requests?',
    options: [
      'HEAD',
      'GET',
      'OPTIONS',
      'TRACE'
    ],
    answer: 2,
    explanation: 'The browser sends an HTTP OPTIONS preflight request to verify allowed origins, methods, and headers before executing non-simple cross-origin requests.',
    difficulty: 'easy',
    tags: ['webdev', 'cors', 'preflight'],
    relatedTopicId: 'webdev_web-security'
  },
  {
    id: 'web_mcq_5',
    subject: 'WebDev',
    question: 'What is the key benefit of GraphQL over REST when designing APIs for mobile applications with limited cellular bandwidth?',
    options: [
      'GraphQL automatically encrypts all responses with TLS 1.3',
      'GraphQL eliminates Over-fetching and Under-fetching by letting clients request only needed fields in a single query',
      'GraphQL does not require a backend web server',
      'GraphQL uses binary compression by default'
    ],
    answer: 1,
    explanation: 'GraphQL allows the mobile client to declare the exact JSON shape and fields it requires, eliminating over-fetching of unnecessary data and reducing multiple sequential roundtrips.',
    difficulty: 'easy',
    tags: ['webdev', 'graphql', 'rest'],
    relatedTopicId: 'webdev_rest-and-graphql'
  },

  // ==================== 8. LINUX ====================
  {
    id: 'mcq_10',
    subject: 'Linux',
    question: 'Which Linux command is used to inspect memory usage in real-time along with process CPU consumption?',
    options: [
      'df -h',
      'top (or htop)',
      'chmod',
      'grep'
    ],
    answer: 1,
    explanation: 'The top/htop command provides an interactive real-time view of running system processes, CPU, memory consumption, swap space, and uptime.',
    difficulty: 'easy',
    tags: ['linux', 'os', 'cli'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },
  {
    id: 'linux_mcq_2',
    subject: 'Linux',
    question: 'What numeric signal value is sent by the Linux kernel for an immediate, uncatchable process kill (SIGKILL)?',
    options: [
      'Signal 1 (SIGHUP)',
      'Signal 9 (SIGKILL)',
      'Signal 15 (SIGTERM)',
      'Signal 2 (SIGINT)'
    ],
    answer: 1,
    explanation: 'SIGKILL is Signal 9. It cannot be caught, handled, or ignored by the process; the kernel terminates the process immediately.',
    difficulty: 'easy',
    tags: ['linux', 'signals', 'sigkill'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },
  {
    id: 'linux_mcq_3',
    subject: 'Linux',
    question: 'What file permissions are granted by the command `chmod 644 document.txt`?',
    options: [
      'Owner: rwx, Group: r-x, Others: r-x',
      'Owner: rw-, Group: r--, Others: r--',
      'Owner: r--, Group: rw-, Others: rw-',
      'Owner: rw-, Group: rw-, Others: rw-'
    ],
    answer: 1,
    explanation: '6 (4+2 = rw-), 4 (4 = r--), 4 (4 = r--). Owner has read/write; Group and Others have read-only access.',
    difficulty: 'easy',
    tags: ['linux', 'permissions', 'chmod'],
    relatedTopicId: 'linux_permissions-and-file-management'
  },
  {
    id: 'linux_mcq_4',
    subject: 'Linux',
    question: 'What happens to the data of a file if you delete the original file when a Hard Link to it exists?',
    options: [
      'The data is permanently deleted immediately',
      'The hard link turns into a broken link',
      'The data remains completely intact and accessible through the hard link until its link count reaches zero',
      'The kernel throws an I/O error'
    ],
    answer: 2,
    explanation: 'A hard link points directly to the file Inode. The OS only frees the inode and disk blocks when the link count reaches 0 and no active file descriptors reference it.',
    difficulty: 'medium',
    tags: ['linux', 'hard-link', 'inodes'],
    relatedTopicId: 'linux_permissions-and-file-management'
  },
  {
    id: 'linux_mcq_5',
    subject: 'Linux',
    question: 'What does a high Linux "Load Average" accompanied by low CPU utilization typically indicate?',
    options: [
      'Memory corruption in L1 cache',
      'Processes waiting on Disk I/O (high iowait in Uninterruptible Sleep D state)',
      'A network cable has disconnected',
      'The system is idle'
    ],
    answer: 1,
    explanation: 'Load Average includes processes waiting in the CPU run queue AND processes in Uninterruptible Sleep (D state), typically blocked waiting for slow disk read/writes.',
    difficulty: 'medium',
    tags: ['linux', 'load-average', 'troubleshooting'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },

  // ==================== 9. AWS ====================
  {
    id: 'mcq_8',
    subject: 'AWS',
    question: 'Which AWS storage service provides scalable block-level storage designed for use with EC2 instances?',
    options: [
      'Amazon S3',
      'Amazon EBS (Elastic Block Store)',
      'Amazon EFS',
      'Amazon Glacier'
    ],
    answer: 1, // EBS
    explanation: 'Amazon Elastic Block Store (EBS) provides persistent block storage volumes for use with Amazon EC2 instances.',
    difficulty: 'easy',
    tags: ['aws', 'cloud', 'storage'],
    relatedTopicId: 'aws_core-compute-and-storage'
  },
  {
    id: 'aws_mcq_2',
    subject: 'AWS',
    question: 'Why should Amazon EC2 instances use IAM Roles rather than storing IAM User credentials in application config files?',
    options: [
      'IAM Roles cost less money than IAM Users',
      'IAM Roles automatically issue and rotate short-lived temporary security credentials via STS, eliminating hardcoded secret leaks',
      'IAM Users cannot access S3 buckets',
      'IAM Roles allow EC2 instances to bypass all VPC security groups'
    ],
    answer: 1,
    explanation: 'IAM Roles provide temporary credentials through the EC2 metadata service and AWS STS, automatically rotated with zero static credentials stored on instance disk.',
    difficulty: 'medium',
    tags: ['aws', 'iam', 'security'],
    relatedTopicId: 'aws_iam-and-security'
  },
  {
    id: 'aws_mcq_3',
    subject: 'AWS',
    question: 'What is the primary difference between an RDS Multi-AZ deployment and an RDS Read Replica?',
    options: [
      'Multi-AZ is synchronous replication for disaster recovery/failover (standby cannot be queried); Read Replicas are asynchronous for scaling read queries',
      'Multi-AZ can only be deployed across different AWS regions',
      'Read Replicas automatically fail over within 30 seconds with zero data loss',
      'Multi-AZ is for NoSQL databases only'
    ],
    answer: 0,
    explanation: 'Multi-AZ provides synchronous replication to an inactive standby instance for high availability/failover. Read Replicas use asynchronous replication to serve read traffic and scale performance.',
    difficulty: 'medium',
    tags: ['aws', 'rds', 'databases'],
    relatedTopicId: 'aws_databases-rds-and-dynamodb'
  },
  {
    id: 'aws_mcq_4',
    subject: 'AWS',
    question: 'What networking component is required in a Public Subnet to allow EC2 instances in a Private Subnet to initiate outbound internet requests without receiving inbound connections?',
    options: [
      'Internet Gateway (IGW)',
      'NAT Gateway (Network Address Translation)',
      'VPC Peering Connection',
      'Egress-Only Internet Gateway'
    ],
    answer: 1,
    explanation: 'A NAT Gateway deployed in a public subnet translates private IP addresses and forwards outbound traffic to the Internet Gateway, while preventing outside hosts from initiating direct inbound connections.',
    difficulty: 'medium',
    tags: ['aws', 'vpc', 'networking'],
    relatedTopicId: 'aws_networking-and-vpc'
  },
  {
    id: 'aws_mcq_5',
    subject: 'AWS',
    question: 'What Amazon S3 storage class automatically transitions objects between frequent and infrequent access tiers to optimize cost without retrieval fees?',
    options: [
      'S3 Standard-IA',
      'S3 Glacier Instant Retrieval',
      'S3 Intelligent-Tiering',
      'S3 One Zone-IA'
    ],
    answer: 2,
    explanation: 'S3 Intelligent-Tiering monitors access patterns and automatically moves data between access tiers to save money without performance impact or retrieval fees.',
    difficulty: 'easy',
    tags: ['aws', 's3', 'storage'],
    relatedTopicId: 'aws_core-compute-and-storage'
  },

  // ==================== 10. DEVOPS ====================
  {
    id: 'mcq_7',
    subject: 'DevOps',
    question: 'What is the primary difference between a Docker container and a Virtual Machine?',
    options: [
      'Containers run on hypervisors, whereas VMs run on the host kernel directly',
      'Containers share the host OS kernel and are lightweight, while VMs contain a full guest OS on top of a hypervisor',
      'Containers cannot be networked, while VMs can',
      'VMs take less memory and startup time than containers'
    ],
    answer: 1,
    explanation: 'Containers virtualize at the operating system level, sharing the host OS kernel via namespaces and cgroups, making them much faster and lighter than hardware-virtualized VMs.',
    difficulty: 'medium',
    tags: ['devops', 'docker', 'containers'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_mcq_2',
    subject: 'DevOps',
    question: 'In a Blue/Green deployment strategy, how is traffic switched over to the newly deployed release?',
    options: [
      'Servers are rebooted one by one in rolling batches',
      'The load balancer / router updates its target to route 100% of traffic from the Blue environment to the Green environment',
      'Code is compiled directly on production servers',
      'Traffic is mirrored for 48 hours before terminating Blue'
    ],
    answer: 1,
    explanation: 'Blue/Green deployment maintains two identical production environments. Once Green is verified, traffic is switched instantly at the router level, enabling near-instant zero-downtime cutover and easy rollback.',
    difficulty: 'easy',
    tags: ['devops', 'deployments', 'blue-green'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_mcq_3',
    subject: 'DevOps',
    question: 'Which of the following is NOT one of the 4 DORA (DevOps Research and Assessment) core metrics?',
    options: [
      'Deployment Frequency',
      'Lead Time for Changes',
      'Lines of Code Written per Day',
      'Change Failure Rate'
    ],
    answer: 2,
    explanation: 'The 4 DORA metrics are: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service (MTTR). Lines of code is an antipattern metric.',
    difficulty: 'easy',
    tags: ['devops', 'dora', 'metrics'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_mcq_4',
    subject: 'DevOps',
    question: 'What Git development model favors frequent, small commits directly into a single shared branch protected by automated CI tests and feature flags?',
    options: [
      'GitFlow',
      'Trunk-Based Development',
      'Forking Workflow',
      'Subversion Branching'
    ],
    answer: 1,
    explanation: 'Trunk-Based Development avoids long-lived feature branches, encouraging developers to merge small, frequent commits into the main branch to prevent merge conflicts.',
    difficulty: 'medium',
    tags: ['devops', 'git', 'trunk-based'],
    relatedTopicId: 'devops_gitops-and-culture'
  },
  {
    id: 'devops_mcq_5',
    subject: 'DevOps',
    question: 'What is GitOps, as implemented by tools like ArgoCD and Flux?',
    options: [
      'Hosting Git repositories on private hardware',
      'An operational model where Git is the single source of truth for desired infrastructure, and an in-cluster operator reconciles live state to match Git',
      'A plugin for GitHub to write pull requests automatically',
      'A disaster recovery backup script for Git repositories'
    ],
    answer: 1,
    explanation: 'GitOps uses declarative manifests stored in Git as the definitive source of truth. Continuous reconciliation agents pull changes and synchronize Kubernetes cluster state.',
    difficulty: 'medium',
    tags: ['devops', 'gitops', 'argocd'],
    relatedTopicId: 'devops_gitops-and-culture'
  },

  // ==================== 11. DOCKER ====================
  {
    id: 'doc_mcq_1',
    subject: 'Docker',
    question: 'Which Linux kernel feature is responsible for isolating process IDs, network interfaces, and mount points in Docker containers?',
    options: [
      'Control Groups (cgroups)',
      'Namespaces',
      'SELinux',
      'AppArmor'
    ],
    answer: 1,
    explanation: 'Linux Namespaces provide process, network, mount, user, and IPC isolation. cgroups enforce resource consumption limits (CPU, RAM).',
    difficulty: 'medium',
    tags: ['docker', 'kernel', 'namespaces'],
    relatedTopicId: 'docker_docker-architecture-and-internals'
  },
  {
    id: 'doc_mcq_2',
    subject: 'Docker',
    question: 'Why should you place `COPY package*.json ./` and `RUN npm install` BEFORE `COPY . .` in a Dockerfile?',
    options: [
      'Node.js fails if source code is copied first',
      'To leverage Docker layer caching so npm install is only re-run when dependencies change, not on every code edit',
      'To reduce memory usage during compilation',
      'To automatically run vulnerability scans'
    ],
    answer: 1,
    explanation: 'Docker caches image layers sequentially. Copying manifests first ensures the heavy dependency installation step is cached until package.json itself is modified.',
    difficulty: 'easy',
    tags: ['docker', 'caching', 'dockerfile'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_mcq_3',
    subject: 'Docker',
    question: 'What happens to files written to a container\'s writable layer when the container is deleted (`docker rm`)?',
    options: [
      'They are automatically moved to /tmp on the host',
      'They are permanently deleted along with the container lifecycle',
      'They are uploaded to Docker Hub',
      'They are converted into a Docker Volume'
    ],
    answer: 1,
    explanation: 'Data written directly to the container writable layer is ephemeral and destroyed when the container is removed. Persistent data must be written to Docker Volumes or Bind Mounts.',
    difficulty: 'easy',
    tags: ['docker', 'storage', 'volumes'],
    relatedTopicId: 'docker_volumes-and-storage'
  },
  {
    id: 'doc_mcq_4',
    subject: 'Docker',
    question: 'In a Dockerfile, what is the key difference between ENTRYPOINT and CMD?',
    options: [
      'ENTRYPOINT specifies the default executable that cannot be easily overridden; CMD specifies default arguments that can be overridden at runtime',
      'CMD runs during image build; ENTRYPOINT runs at container runtime',
      'ENTRYPOINT is only for Windows containers; CMD is for Linux',
      'There is no difference'
    ],
    answer: 0,
    explanation: 'ENTRYPOINT sets the container\'s fixed executable command. CMD provides default arguments to that executable that are easily overridden when passing args to `docker run`.',
    difficulty: 'medium',
    tags: ['docker', 'entrypoint', 'cmd'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_mcq_5',
    subject: 'Docker',
    question: 'What is the security risk of running container processes as the default "root" user?',
    options: [
      'The container cannot open port 80',
      'Root in the container has UID 0 on the host kernel; an escape vulnerability grants full host root access',
      'Docker Hub rejects root container images',
      'The image cannot be compressed'
    ],
    answer: 1,
    explanation: 'Unless user namespaces are remapped, root inside the container is identical to root on the host machine. A container breakout would yield administrative host compromise.',
    difficulty: 'medium',
    tags: ['docker', 'security', 'non-root'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },

  // ==================== 12. KUBERNETES ====================
  {
    id: 'k8s_mcq_1',
    subject: 'Kubernetes',
    question: 'Which component of the Kubernetes Control Plane is the ONLY one that communicates directly with the etcd data store?',
    options: [
      'kube-scheduler',
      'kube-controller-manager',
      'kube-apiserver',
      'kubelet'
    ],
    answer: 2,
    explanation: 'kube-apiserver acts as the central cluster gateway and is the sole component permitted to read and write directly to etcd.',
    difficulty: 'easy',
    tags: ['kubernetes', 'control-plane', 'apiserver'],
    relatedTopicId: 'kubernetes_architecture-and-control-plane'
  },
  {
    id: 'k8s_mcq_2',
    subject: 'Kubernetes',
    question: 'What happens when a container fails its Kubernetes Readiness Probe?',
    options: [
      'The container is killed and restarted by kubelet',
      'The Pod is terminated and deleted',
      'The Pod\'s IP is temporarily removed from the Service endpoints list so no traffic is routed to it',
      'The worker node is marked as NotReady'
    ],
    answer: 2,
    explanation: 'Readiness probe failures do NOT cause restarts; they signal that the pod is temporarily unready, prompting Kubernetes to stop routing traffic to it until it recovers.',
    difficulty: 'medium',
    tags: ['kubernetes', 'probes', 'readiness'],
    relatedTopicId: 'kubernetes_pods-and-deployments'
  },
  {
    id: 'k8s_mcq_3',
    subject: 'Kubernetes',
    question: 'Which Kubernetes Service type provisions an external Layer 4 load balancer directly via cloud provider APIs?',
    options: [
      'ClusterIP',
      'NodePort',
      'LoadBalancer',
      'ExternalName'
    ],
    answer: 2,
    explanation: 'Service type LoadBalancer integrates with cloud infrastructure (AWS, Azure, GCP) to automatically provision a cloud load balancer routing into the cluster.',
    difficulty: 'easy',
    tags: ['kubernetes', 'services', 'networking'],
    relatedTopicId: 'kubernetes_services-and-networking'
  },
  {
    id: 'k8s_mcq_4',
    subject: 'Kubernetes',
    question: 'What does a Pod status of CrashLoopBackOff typically indicate?',
    options: [
      'The cluster has run out of IP addresses',
      'The container starts, crashes, and kubelet restarts it with an exponential backoff delay',
      'The node has lost network connectivity to the API server',
      'The container image is currently downloading'
    ],
    answer: 1,
    explanation: 'CrashLoopBackOff indicates repeated container crashes upon startup. Kubelet restarts it repeatedly while backing off the restart interval to prevent CPU starvation.',
    difficulty: 'easy',
    tags: ['kubernetes', 'troubleshooting', 'crashloopbackoff'],
    relatedTopicId: 'kubernetes_scaling-and-troubleshooting'
  },
  {
    id: 'k8s_mcq_5',
    subject: 'Kubernetes',
    question: 'How are standard Kubernetes Secrets stored and protected by default inside etcd?',
    options: [
      'Encrypted with AES-256 by default',
      'Base64 encoded in plaintext (unencrypted unless KMS encryption at rest is explicitly enabled)',
      'Hashed using bcrypt',
      'Stored exclusively in worker node RAM'
    ],
    answer: 1,
    explanation: 'Kubernetes Secrets are merely base64 encoded by default. True encryption requires configuring KMS provider encryption at rest in the API server.',
    difficulty: 'medium',
    tags: ['kubernetes', 'security', 'secrets'],
    relatedTopicId: 'kubernetes_configuration-and-storage'
  },

  // ==================== 13. TERRAFORM ====================
  {
    id: 'tf_mcq_1',
    subject: 'Terraform',
    question: 'Why should teams use an S3 backend with DynamoDB when collaborating on Terraform projects?',
    options: [
      'To speed up internet download speed',
      'To provide centralized state storage in S3 and state locking in DynamoDB to prevent concurrent executions from corrupting state',
      'To automatically convert HCL to JSON',
      'To bypass AWS billing charges'
    ],
    answer: 1,
    explanation: 'S3 stores the shared terraform.tfstate centrally, while DynamoDB provides a distributed mutex lock during `terraform plan` and `apply` to prevent race conditions.',
    difficulty: 'medium',
    tags: ['terraform', 'state', 'backend'],
    relatedTopicId: 'terraform_state-management'
  },
  {
    id: 'tf_mcq_2',
    subject: 'Terraform',
    question: 'Which Terraform command analyzes live cloud infrastructure against the local state file and generates a speculative execution preview?',
    options: [
      'terraform init',
      'terraform plan',
      'terraform apply',
      'terraform validate'
    ],
    answer: 1,
    explanation: '`terraform plan` refreshes the state against live APIs, compares it with code configuration, and shows planned additions, changes, and deletions without modifying infrastructure.',
    difficulty: 'easy',
    tags: ['terraform', 'workflow', 'plan'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },
  {
    id: 'tf_mcq_3',
    subject: 'Terraform',
    question: 'What is the purpose of marking a Terraform input variable as `sensitive = true`?',
    options: [
      'It encrypts the variable value with a private key in the cloud',
      'It prevents the variable value from being printed in plan/apply console logs and output summaries',
      'It restricts the variable to read-only access',
      'It prevents other modules from referencing it'
    ],
    answer: 1,
    explanation: 'Setting `sensitive = true` redacts the value in stdout logs and CLI output, preventing accidental exposure of secrets in CI/CD build logs.',
    difficulty: 'easy',
    tags: ['terraform', 'variables', 'security'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },
  {
    id: 'tf_mcq_4',
    subject: 'Terraform',
    question: 'What happens when you run `terraform apply -replace="aws_instance.web"`?',
    options: [
      'The instance is renamed in code',
      'The instance is destroyed and recreated during the apply execution',
      'The instance is removed from state without touching the cloud resource',
      'The instance is stopped and started'
    ],
    answer: 1,
    explanation: 'The -replace flag (which replaces the deprecated `terraform taint`) forces Terraform to destroy and provision a fresh instance on the next apply.',
    difficulty: 'medium',
    tags: ['terraform', 'taint', 'replace'],
    relatedTopicId: 'terraform_state-management'
  },
  {
    id: 'tf_mcq_5',
    subject: 'Terraform',
    question: 'Which of the following has the HIGHEST precedence when Terraform resolves variable values?',
    options: [
      'Environment variables (TF_VAR_name)',
      'terraform.tfvars file',
      '*.auto.tfvars file',
      'Command-line flags (-var or -var-file)'
    ],
    answer: 3,
    explanation: 'Command-line flags passed via `-var` or `-var-file` have the highest precedence and override all file and environment variable definitions.',
    difficulty: 'medium',
    tags: ['terraform', 'variables', 'precedence'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },

  // ==================== 14. DEVSECOPS ====================
  {
    id: 'sec_mcq_1',
    subject: 'DevSecOps',
    question: 'What type of security testing scans third-party open-source libraries and package manifests (npm, pip, maven) for known CVE vulnerabilities?',
    options: [
      'SAST (Static Application Security Testing)',
      'DAST (Dynamic Application Security Testing)',
      'SCA (Software Composition Analysis)',
      'Penetration Testing'
    ],
    answer: 2,
    explanation: 'Software Composition Analysis (SCA) specifically identifies open-source components, licenses, and known vulnerabilities (CVEs) in third-party dependencies.',
    difficulty: 'easy',
    tags: ['devsecops', 'sca', 'dependencies'],
    relatedTopicId: 'devsecops_security-testing-sast-dast'
  },
  {
    id: 'sec_mcq_2',
    subject: 'DevSecOps',
    question: 'Which of the following is NOT one of the 4 Google SRE Golden Signals of monitoring?',
    options: [
      'Latency',
      'Traffic',
      'Errors',
      'Code Coverage'
    ],
    answer: 3,
    explanation: 'The 4 Golden Signals are Latency, Traffic, Errors, and Saturation. Code coverage is a software engineering metric, not a runtime operational signal.',
    difficulty: 'easy',
    tags: ['devsecops', 'sre', 'golden-signals'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_mcq_3',
    subject: 'DevSecOps',
    question: 'How does Prometheus collect metric data from target services by default?',
    options: [
      'Target services push metrics over UDP to a central daemon',
      'Prometheus periodically scrapes (PULL) an HTTP `/metrics` endpoint exposed by target instances',
      'Metrics are written to a shared relational database',
      'Via SSH tunnels'
    ],
    answer: 1,
    explanation: 'Prometheus uses a PULL-based model where the server scrapes metrics from HTTP endpoints exposed by target exporters and client libraries.',
    difficulty: 'medium',
    tags: ['devsecops', 'prometheus', 'monitoring'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_mcq_4',
    subject: 'DevSecOps',
    question: 'In Distributed Tracing (e.g. OpenTelemetry / Jaeger), what connects individual spans across multiple microservices to reconstruct a single user request path?',
    options: [
      'Process ID (PID)',
      'Trace ID passed in HTTP headers (W3C Trace Context)',
      'Host IP address',
      'SSL Certificate fingerprint'
    ],
    answer: 1,
    explanation: 'A unique Trace ID is generated at request entry and propagated across all microservice HTTP/gRPC boundaries in headers, tying together individual child Span IDs.',
    difficulty: 'medium',
    tags: ['devsecops', 'tracing', 'opentelemetry'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_mcq_5',
    subject: 'DevSecOps',
    question: 'If a service has a Service Level Objective (SLO) of 99.9% uptime over a 30-day window, what is its Error Budget?',
    options: [
      '99.9%',
      '0.1% (approximately 43.2 minutes of permitted downtime)',
      '1.0% (approximately 7.2 hours)',
      'Zero downtime'
    ],
    answer: 1,
    explanation: 'Error Budget is defined as `100% - SLO`. For a 99.9% SLO, the error budget is 0.1%, which allows approx 43 minutes of failure over a 30-day billing cycle.',
    difficulty: 'medium',
    tags: ['devsecops', 'sre', 'error-budget'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },

  // ==================== 15. SYSTEM DESIGN ====================
  {
    id: 'sys_mcq_1',
    subject: 'System Design',
    question: 'What is the primary architectural flaw of using simple modulo hashing `hash(key) % N` to distribute cache keys across N cache servers?',
    options: [
      'The hash function takes O(N) time to compute',
      'Adding or removing a single server changes the denominator to N+1 or N-1, causing almost all keys to remap and flooding the database with cache misses',
      'Modulo arithmetic cannot handle string keys',
      'It requires servers to run on identical operating systems'
    ],
    answer: 1,
    explanation: 'Modulo hashing causes nearly 100% of keys to remap when N changes. Consistent Hashing remaps only `K / N` keys on average, preventing cache stampedes.',
    difficulty: 'hard',
    tags: ['system-design', 'consistent-hashing', 'caching'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_mcq_2',
    subject: 'System Design',
    question: 'In the CAP theorem, what does Partition Tolerance (P) mean?',
    options: [
      'The database table is partitioned across multiple hard disks',
      'The system continues to operate despite arbitrary network packet drops or communication splits between nodes',
      'Transactions can be divided into smaller sub-queries',
      'Memory is divided into pages'
    ],
    answer: 1,
    explanation: 'Partition Tolerance guarantees the system continues functioning even when network partitions cause message drops or communication delays between cluster nodes.',
    difficulty: 'easy',
    tags: ['system-design', 'cap-theorem', 'distributed-systems'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_mcq_3',
    subject: 'System Design',
    question: 'Which caching strategy writes updates to the cache first, acknowledges immediately to the client, and asynchronously flushes data to the database in background batches?',
    options: [
      'Cache-Aside',
      'Write-Through',
      'Write-Back (Write-Behind)',
      'Read-Through'
    ],
    answer: 2,
    explanation: 'Write-Back provides highest write throughput and lowest latency by confirming writes in cache immediately, but risks data loss if the cache node crashes before disk flush.',
    difficulty: 'medium',
    tags: ['system-design', 'caching', 'write-back'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_mcq_4',
    subject: 'System Design',
    question: 'How does Apache Kafka differ from traditional message brokers like RabbitMQ regarding consumed messages?',
    options: [
      'Kafka deletes messages immediately upon consumer acknowledgment',
      'Kafka appends messages to an immutable on-disk log and retains them for a configured retention period, allowing multiple consumers to replay events independently',
      'RabbitMQ stores messages for 30 days by default on disk',
      'Kafka does not support multi-threading'
    ],
    answer: 1,
    explanation: 'Kafka is an append-only distributed commit log. Messages persist on disk independently of consumer reads, enabling historical replay and high throughput.',
    difficulty: 'medium',
    tags: ['system-design', 'kafka', 'messaging'],
    relatedTopicId: 'system-design_microservices-and-messaging'
  },
  {
    id: 'sys_mcq_5',
    subject: 'System Design',
    question: 'What is the purpose of the Circuit Breaker pattern in microservices architectures?',
    options: [
      'To encrypt payloads traveling between services',
      'To detect downstream service failures and immediately return fallback errors, preventing cascading thread exhaustion and system collapse',
      'To automatically balance CPU usage across instances',
      'To rotate TLS certificates automatically'
    ],
    answer: 1,
    explanation: 'Circuit breakers prevent cascading failures by failing fast when downstream services are unhealthy, giving struggling services time to recover without overwhelming thread pools.',
    difficulty: 'medium',
    tags: ['system-design', 'resilience', 'circuit-breaker'],
    relatedTopicId: 'system-design_microservices-and-messaging'
  }
];
