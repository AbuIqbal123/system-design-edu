export const categories = [
  { id: 'fundamentals', icon: '🧱', label: 'Fundamentals', description: 'Core concepts every system designer must know.' },
  { id: 'data', icon: '🗄️', label: 'Data & Storage', description: 'Databases, caching, and data partitioning strategies.' },
  { id: 'communication', icon: '🔗', label: 'Communication', description: 'APIs, messaging, and inter-service communication.' },
  { id: 'scale', icon: '📈', label: 'Scale & Reliability', description: 'Scaling patterns, availability, and fault tolerance.' },
  { id: 'interview', icon: '🎯', label: 'Interview', description: 'Practice questions and structured approaches.' },
];

export const topics = [
  {
    id: 'performance-vs-scalability',
    title: 'Performance vs Scalability',
    icon: '⚡',
    category: 'fundamentals',
    content: [
      { type: 'text', value: 'Performance and scalability are related but distinct concerns. **Performance** measures how fast a system responds to a single request. **Scalability** measures how well a system handles increased load.' },
      { type: 'heading', level: 2, value: 'Performance' },
      { type: 'text', value: 'A system is performant if it responds quickly. Key metrics:' },
      { type: 'list', items: [
        '**Latency** — time to complete one operation (ms)',
        '**Throughput** — operations completed per unit time (req/s)',
        '**Response time** — total time from request to response',
      ]},
      { type: 'heading', level: 2, value: 'Scalability' },
      { type: 'text', value: 'A system scales if it can handle more load without degrading. Two approaches:' },
      { type: 'list', items: [
        '**Vertical scaling (scale up)** — add more CPU, RAM, or disk to a single machine',
        '**Horizontal scaling (scale out)** — add more machines to the cluster',
      ]},
      { type: 'pros-cons', pros: [
        'Vertical: simpler, no code changes',
        'Vertical: no distributed system complexity',
        'Horizontal: theoretically unlimited capacity',
        'Horizontal: better fault tolerance',
      ], cons: [
        'Vertical: hardware ceiling',
        'Vertical: single point of failure',
        'Horizontal: operational complexity',
        'Horizontal: data consistency challenges',
      ]},
      { type: 'callout', variant: 'tip', value: 'Start with vertical scaling. Move to horizontal when you hit hardware limits or need high availability.' },
    ],
    sources: [
      { title: 'AWS — Scalability Best Practices', url: 'https://aws.amazon.com/architecture/scalability/' },
      { title: 'System Design Primer — Performance vs Scalability', url: 'https://github.com/donnemartin/system-design-primer' },
    ],
  },
  {
    id: 'latency-vs-throughput',
    title: 'Latency vs Throughput',
    icon: '🏎️',
    category: 'fundamentals',
    content: [
      { type: 'text', value: '**Latency** is the time to perform one operation. **Throughput** is the number of operations per unit time. Optimizing one often trades off against the other.' },
      { type: 'heading', level: 2, value: 'The Trade-off' },
      { type: 'text', value: 'Batching improves throughput but increases latency for individual items. Pipelining improves both by overlapping stages.' },
      { type: 'table', headers: ['Scenario', 'Latency', 'Throughput'], rows: [
        ['Single request, no batching', 'Low', 'Low'],
        ['Large batch, process together', 'High (per item wait)', 'High'],
        ['Pipelined processing', 'Medium', 'High'],
      ]},
      { type: 'callout', variant: 'info', value: 'In interviews, always ask: is the bottleneck latency (one slow request) or throughput (too many requests)?' },
    ],
    sources: [
      { title: 'Latency Numbers Every Programmer Should Know', url: 'https://colin-scott.github.io/personal_website/research/interactive_latency.html' },
    ],
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    icon: '🔺',
    category: 'fundamentals',
    content: [
      { type: 'text', value: 'The **CAP theorem** states that a distributed system can guarantee at most two of three properties simultaneously:' },
      { type: 'list', items: [
        '**Consistency** — every read receives the most recent write or an error',
        '**Availability** — every request receives a response (no guarantee it is the latest data)',
        '**Partition tolerance** — the system continues despite network partitions',
      ]},
      { type: 'heading', level: 2, value: 'Practical Implications' },
      { type: 'text', value: 'Network partitions are inevitable in distributed systems. So the real choice is between **CP** and **AP**:' },
      { type: 'table', headers: ['Choice', 'Behavior on Partition', 'Examples'], rows: [
        ['CP (Consistency + Partition tolerance)', 'Rejects writes/reads to maintain consistency', 'HBase, MongoDB (strong consistency mode)'],
        ['AP (Availability + Partition tolerance)', 'Serves potentially stale data', 'Cassandra, DynamoDB, CouchDB'],
      ]},
      { type: 'callout', variant: 'warning', value: 'CAP only applies during a network partition. In normal operation, you can have all three. The theorem describes what happens when things go wrong.' },
    ],
    sources: [
      { title: "Brewer's CAP Theorem", url: 'https://www.julianbrowne.com/article/brewers-cap-theorem' },
    ],
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    icon: '⚖️',
    category: 'scale',
    content: [
      { type: 'text', value: 'A **load balancer** distributes incoming requests across multiple servers. It is the first line of defense against overload.' },
      { type: 'heading', level: 2, value: 'Algorithms' },
      { type: 'list', items: [
        '**Round Robin** — cycle through servers in order',
        '**Least Connections** — send to the server with fewest active connections',
        '**IP Hash** — hash the client IP to pick a server (sticky sessions)',
        '**Weighted** — assign different capacities to different servers',
      ]},
      { type: 'heading', level: 2, value: 'Where to Place' },
      { type: 'text', value: 'Load balancers sit at multiple layers:' },
      { type: 'list', items: [
        '**DNS level** — cheap, but slow TTL propagation',
        '**L4 (Transport)** — routes by IP/port, fast, no content inspection',
        '**L7 (Application)** — routes by URL, headers, cookies; can do smart routing',
      ]},
      { type: 'callout', variant: 'tip', value: 'Use L7 load balancing for microservices. It can route based on request path, enabling canary deploys and A/B testing.' },
    ],
    sources: [
      { title: 'NGINX Load Balancing', url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/' },
    ],
  },
  {
    id: 'caching',
    title: 'Caching',
    icon: '💾',
    category: 'data',
    content: [
      { type: 'text', value: 'Caching stores frequently accessed data closer to the consumer, reducing latency and load on the origin.' },
      { type: 'heading', level: 2, value: 'Cache Layers' },
      { type: 'list', items: [
        '**Client cache** — browser HTTP cache, service workers',
        '**CDN** — edge caches distributed globally',
        '**Application cache** — in-memory (Redis, Memcached) or local process cache',
        '**Database cache** — query cache, buffer pool',
      ]},
      { type: 'heading', level: 2, value: 'Strategies' },
      { type: 'table', headers: ['Strategy', 'When to Use', 'Trade-off'], rows: [
        ['Cache-aside (lazy)', 'Read-heavy, tolerate stale', 'Cache miss on first read'],
        ['Write-through', 'Consistency matters', 'Write latency increases'],
        ['Write-back (write-behind)', 'Write-heavy, can lose data', 'Data loss on crash'],
        ['Refresh-ahead', 'Predictable access patterns', 'Wasted cache fills'],
      ]},
      { type: 'heading', level: 2, value: 'Eviction Policies' },
      { type: 'list', items: [
        '**LRU** (Least Recently Used) — evict the oldest access',
        '**LFU** (Least Frequently Used) — evict the lowest access count',
        '**FIFO** — evict in insertion order',
        '**TTL** — evict after a time window',
      ]},
      { type: 'callout', variant: 'warning', value: 'The two hardest problems in computer science: cache invalidation, naming things, and off-by-one errors.' },
    ],
    sources: [
      { title: 'AWS Caching Best Practices', url: 'https://aws.amazon.com/caching/best-practices/' },
    ],
  },
  {
    id: 'database-sharding',
    title: 'Database Sharding',
    icon: '🔀',
    category: 'data',
    content: [
      { type: 'text', value: '**Sharding** splits a database horizontally across multiple machines. Each shard holds a subset of the data.' },
      { type: 'heading', level: 2, value: 'Sharding Strategies' },
      { type: 'list', items: [
        '**Hash-based** — hash a key (e.g. user_id) to determine the shard. Even distribution, but cross-shard queries are expensive.',
        '**Range-based** — shard by key range (e.g. A-M, N-Z). Simple but can create hot spots.',
        '**Directory-based** — a lookup table maps keys to shards. Flexible but the directory is a bottleneck.',
      ]},
      { type: 'heading', level: 2, value: 'Challenges' },
      { type: 'list', items: [
        '**Rebalancing** — when shards become uneven, data must move',
        '**Cross-shard queries** — joins across shards require application logic',
        '**Referential integrity** — foreign keys across shards are not enforced by the DB',
      ]},
      { type: 'callout', variant: 'info', value: 'Shard only when vertical scaling and read replicas are insufficient. Sharding adds significant operational complexity.' },
    ],
    sources: [
      { title: 'MongoDB Sharding', url: 'https://www.mongodb.com/docs/manual/sharding/' },
    ],
  },
  {
    id: 'message-queues',
    title: 'Message Queues',
    icon: '📨',
    category: 'communication',
    content: [
      { type: 'text', value: 'Message queues decouple producers from consumers. Producers push messages; consumers pull at their own pace. This enables **asynchronous processing** and **load leveling**.' },
      { type: 'heading', level: 2, value: 'When to Use' },
      { type: 'list', items: [
        'Long-running tasks (image processing, email sending)',
        'Event-driven architectures (order placed → update inventory, send notification)',
        'Load leveling — absorb traffic spikes without dropping requests',
        'Retry logic — failed messages stay in the queue for retry',
      ]},
      { type: 'heading', level: 2, value: 'Popular Options' },
      { type: 'table', headers: ['System', 'Model', 'Best For'], rows: [
        ['RabbitMQ', 'Push (AMQP)', 'Complex routing, enterprise messaging'],
        ['Apache Kafka', 'Pull (log-based)', 'High throughput, event streaming, replay'],
        ['AWS SQS', 'Pull', 'Simple queues, serverless integration'],
      ]},
      { type: 'callout', variant: 'tip', value: 'Kafka is not just a queue — it is a distributed log. Consumers can replay from any offset, enabling event sourcing patterns.' },
    ],
    sources: [
      { title: 'Kafka Documentation', url: 'https://kafka.apache.org/documentation/' },
    ],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    icon: '🚦',
    category: 'scale',
    content: [
      { type: 'text', value: 'Rate limiting controls how many requests a client can make in a given time window. It protects services from abuse and overload.' },
      { type: 'heading', level: 2, value: 'Algorithms' },
      { type: 'list', items: [
        '**Fixed window** — count requests per minute. Simple but allows bursts at window boundaries.',
        '**Sliding window log** — track each request timestamp. Precise but memory-heavy.',
        '**Sliding window counter** — blend current and previous window counts. Good balance of accuracy and efficiency.',
        '**Token bucket** — tokens refill at a fixed rate; each request consumes a token. Allows short bursts.',
        '**Leaky bucket** — requests processed at a fixed rate. Smooths out bursts completely.',
      ]},
      { type: 'heading', level: 2, value: 'Where to Enforce' },
      { type: 'list', items: [
        '**Client-side** — self-throttle (unreliable, easily bypassed)',
        '**API gateway** — centralized, per-client limits',
        '**Server-side** — per-endpoint, per-user limits',
      ]},
      { type: 'callout', variant: 'warning', value: 'Always return `429 Too Many Requests` with `Retry-After` header. Silent drops make debugging impossible.' },
    ],
    sources: [
      { title: 'Stripe Rate Limiting', url: 'https://stripe.com/blog/rate-limiters' },
    ],
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing',
    icon: '🎯',
    category: 'data',
    content: [
      { type: 'text', value: '**Consistent hashing** distributes data across nodes such that adding or removing a node only moves a small fraction of the keys.' },
      { type: 'heading', level: 2, value: 'How It Works' },
      { type: 'list', items: [
        'Hash each node to a position on a ring (0 to 2^32)',
        'Hash each key to a position on the same ring',
        'Each key is stored on the next node clockwise from its hash',
        'Adding a node only affects keys between it and the previous node',
      ]},
      { type: 'heading', level: 2, value: 'Virtual Nodes' },
      { type: 'text', value: 'Real nodes get multiple positions on the ring (virtual nodes). This improves distribution uniformity and handles heterogeneous hardware.' },
      { type: 'callout', variant: 'info', value: 'Consistent hashing is used by DynamoDB, Cassandra, Memcached, and many distributed systems for data placement.' },
    ],
    sources: [
      { title: 'Consistent Hashing — Tom White', url: 'http://tom-e-white.com/2007/11/consistent-hashing.html' },
    ],
  },
  {
    id: 'availability-patterns',
    title: 'Availability Patterns',
    icon: '🛡️',
    category: 'scale',
    content: [
      { type: 'text', value: 'High availability (HA) means a system remains operational despite failures. Measured in "nines" — 99.99% is four nines, allowing ~52 minutes of downtime per year.' },
      { type: 'heading', level: 2, value: 'Key Patterns' },
      { type: 'list', items: [
        '**Redundancy** — run multiple instances; no single point of failure',
        '**Replication** — copy data across nodes (master-slave, master-master)',
        '**Heartbeat** — nodes periodically signal health; failure triggers failover',
        '**Circuit breaker** — stop calling a failing service; retry after a cooldown',
        '**Bulkhead** — isolate failures so one component crashing does not take down the system',
      ]},
      { type: 'heading', level: 2, value: 'Failover Strategies' },
      { type: 'table', headers: ['Strategy', 'Recovery Time', 'Complexity'], rows: [
        ['Active-passive', 'Seconds to minutes', 'Low'],
        ['Active-active', 'Instant', 'High (conflict resolution)'],
        ['Multi-region', 'Minutes', 'Very high'],
      ]},
      { type: 'callout', variant: 'tip', value: 'Design for failure. Assume every component will fail. The question is not if, but when and how gracefully.' },
    ],
    sources: [
      { title: 'AWS Well-Architected — Reliability', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/' },
    ],
  },
];

export const interviewQuestions = [
  { title: 'Design a URL Shortener', image: '', difficulty: 'Medium' },
  { title: 'Design a Chat System', image: '', difficulty: 'Hard' },
  { title: 'Design a Web Crawler', image: '', difficulty: 'Medium' },
  { title: 'Design a News Feed', image: '', difficulty: 'Hard' },
  { title: 'Design a Key-Value Store', image: '', difficulty: 'Medium' },
  { title: 'Design a Rate Limiter', image: '', difficulty: 'Medium' },
  { title: 'Design a Search Autocomplete', image: '', difficulty: 'Hard' },
  { title: 'Design YouTube', image: '', difficulty: 'Hard' },
];

export const interviewSteps = [
  {
    step: 1,
    title: 'Clarify Requirements',
    description: 'Never jump into design. Ask questions to understand scope, constraints, and goals.',
    questions: [
      'What are the core features? What is out of scope?',
      'What is the expected scale? (DAU, QPS, data volume)',
      'Is this read-heavy or write-heavy?',
      'What are the latency and availability requirements?',
    ],
  },
  {
    step: 2,
    title: 'Back-of-the-Envelope Estimation',
    description: 'Estimate scale to guide your design decisions. Use powers of two and latency numbers.',
    questions: [
      'How many requests per second at peak?',
      'How much data per request? Total storage?',
      'What is the read-to-write ratio?',
      'What bandwidth is needed?',
    ],
  },
  {
    step: 3,
    title: 'Define the API',
    description: 'Define the contract between client and server. Keep it simple.',
    questions: [
      'What endpoints are needed?',
      'What are the request/response formats?',
      'Is the API RESTful, GraphQL, or RPC?',
    ],
  },
  {
    step: 4,
    title: 'Define the Data Model',
    description: 'Choose your storage based on access patterns and scale requirements.',
    questions: [
      'SQL or NoSQL? Why?',
      'What are the primary entities and relationships?',
      'How will you partition/shard the data?',
    ],
  },
  {
    step: 5,
    title: 'High-Level Design',
    description: 'Draw the major components and how they connect. Start simple, then iterate.',
    questions: [
      'What are the core services?',
      'How do they communicate?',
      'Where are the bottlenecks and single points of failure?',
    ],
  },
  {
    step: 6,
    title: 'Deep Dive & Trade-offs',
    description: 'Go deeper on the most interesting component. Discuss trade-offs explicitly.',
    questions: [
      'How does this component scale?',
      'What happens when it fails?',
      'What are the alternatives and why did you choose this approach?',
    ],
  },
];

export const quizCards = [
  { question: 'What is the difference between vertical and horizontal scaling?', answer: 'Vertical scaling adds resources to a single machine (more CPU/RAM). Horizontal scaling adds more machines to the cluster. Vertical has a hardware ceiling; horizontal adds distributed system complexity.' },
  { question: 'What does CAP theorem stand for?', answer: 'Consistency, Availability, Partition tolerance. A distributed system can guarantee at most two of the three during a network partition.' },
  { question: 'What is consistent hashing?', answer: 'A hashing technique where adding or removing a node only remaps a small fraction of keys, minimizing data movement during cluster changes.' },
  { question: 'Name three cache eviction policies.', answer: 'LRU (Least Recently Used), LFU (Least Frequently Used), FIFO (First In First Out), and TTL-based expiration.' },
  { question: 'What is the difference between a message queue and a pub/sub system?', answer: 'In a message queue, each message is consumed by exactly one consumer. In pub/sub, a message can be delivered to multiple subscribers (fan-out).' },
  { question: 'What is a circuit breaker pattern?', answer: 'A pattern that stops calling a failing service after a threshold of failures. It "opens" the circuit, returns errors immediately, and retries after a cooldown period.' },
  { question: 'What is the difference between L4 and L7 load balancing?', answer: 'L4 (transport layer) routes by IP and port — fast but content-blind. L7 (application layer) routes by URL, headers, cookies — smarter but slower.' },
  { question: 'What is write-through caching?', answer: 'Data is written to both the cache and the backing store simultaneously. Ensures consistency but increases write latency.' },
  { question: 'What are the "nines" of availability?', answer: 'Availability measured as a percentage: 99.9% (three nines) = ~8.7 hours downtime/year. 99.99% (four nines) = ~52 minutes/year. 99.999% (five nines) = ~5 minutes/year.' },
  { question: 'When should you shard a database?', answer: 'When vertical scaling and read replicas are insufficient. Sharding splits data horizontally across machines but adds complexity for cross-shard queries, rebalancing, and referential integrity.' },
  { question: 'What is the token bucket algorithm?', answer: 'A rate limiting algorithm where tokens refill at a fixed rate. Each request consumes a token. If the bucket is empty, the request is rejected. Allows short bursts up to bucket capacity.' },
  { question: 'What is the difference between latency and throughput?', answer: 'Latency is the time to complete one operation. Throughput is the number of operations completed per unit time. Optimizing one often trades off against the other.' },
];

export const latencyNumbers = [
  { operation: 'L1 cache reference', time: 0.5, unit: 'ns' },
  { operation: 'Branch mispredict', time: 5, unit: 'ns' },
  { operation: 'L2 cache reference', time: 7, unit: 'ns' },
  { operation: 'Mutex lock/unlock', time: 25, unit: 'ns' },
  { operation: 'Main memory reference', time: 100, unit: 'ns' },
  { operation: 'Compress 1KB with zlib', time: 3000, unit: 'ns' },
  { operation: 'SSD random read', time: 16000, unit: 'ns', note: '4x slower than HDD seek' },
  { operation: 'Read 1MB sequentially from memory', time: 250000, unit: 'ns' },
  { operation: 'Round trip within same datacenter', time: 500000, unit: 'ns' },
  { operation: 'Disk seek', time: 2000000, unit: 'ns' },
  { operation: 'Read 1MB sequentially from SSD', time: 1000000, unit: 'ns' },
  { operation: 'Read 1MB sequentially from disk', time: 20000000, unit: 'ns' },
  { operation: 'Packet round trip CA → Netherlands → CA', time: 150000000, unit: 'ns' },
];

export const powersOfTwo = [
  { power: 10, exact: '1,024', approx: '~1 thousand', bytes: '1 KB' },
  { power: 20, exact: '1,048,576', approx: '~1 million', bytes: '1 MB' },
  { power: 30, exact: '1,073,741,824', approx: '~1 billion', bytes: '1 GB' },
  { power: 32, exact: '4,294,967,296', approx: '~4 billion', bytes: '4 GB' },
  { power: 40, exact: '1,099,511,627,776', approx: '~1 trillion', bytes: '1 TB' },
  { power: 50, exact: '1,125,899,906,842,624', approx: '~1 quadrillion', bytes: '1 PB' },
];
