# System Design — Event Mechanism & Caching — Interview Questions & Detailed Answers

## Q1: Design an event-driven order processing system; discuss delivery guarantees, ordering, retries.

**Answer:**

**System Architecture:**

```
Order Service → Message Broker (Kafka/RabbitMQ) → Consumer Services
                                                   ↓
                                          - Payment Service
                                          - Inventory Service
                                          - Notification Service
                                          - Shipping Service
```

**1. Message Broker Selection:**

**Apache Kafka (Recommended for high-throughput):**
- **Pros:** High throughput, durable, partitioned, replay capability
- **Cons:** More complex, eventual consistency
- **Use when:** High volume, need event replay, multiple consumers

**RabbitMQ:**
- **Pros:** Flexible routing, easier to set up, supports multiple protocols
- **Cons:** Lower throughput than Kafka
- **Use when:** Complex routing, lower volume

**2. Event Schema Design:**

```json
{
  "eventId": "uuid-1234",
  "eventType": "ORDER_CREATED",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0",
  "payload": {
    "orderId": "ORD-12345",
    "customerId": "CUST-789",
    "items": [
      {
        "productId": "PROD-001",
        "quantity": 2,
        "price": 29.99
      }
    ],
    "totalAmount": 59.98,
    "currency": "USD"
  },
  "metadata": {
    "correlationId": "trace-abc123",
    "source": "order-service",
    "retryCount": 0
  }
}
```

**3. Delivery Guarantees:**

**At-Most-Once (Fire and Forget):**
- Message sent, no acknowledgment
- **Risk:** Message loss
- **Use when:** Non-critical notifications, metrics

**At-Least-Once (Recommended):**
- Message delivered one or more times
- Requires idempotent consumers
- **Implementation:** Acknowledge after processing
- **Use when:** Most business events

**Exactly-Once (Complex):**
- Message delivered exactly once
- Requires transactional outbox pattern
- **Implementation:** Database + message broker transaction
- **Use when:** Financial transactions, critical operations

**4. Ensuring At-Least-Once Delivery:**

**Producer Side:**
```javascript
// Kafka producer with retries
const producer = kafka.producer({
  idempotent: true,
  maxInFlightRequests: 5,
  retry: {
    retries: 10,
    initialRetryTime: 100,
    maxRetryTime: 30000
  }
});

await producer.send({
  topic: 'orders',
  messages: [{
    key: orderId,
    value: JSON.stringify(orderEvent)
  }],
  acks: 'all' // Wait for all replicas
});
```

**Consumer Side:**
```javascript
// Acknowledge only after successful processing
consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    try {
      await processOrder(message.value);
      // Only commit offset after success
      await consumer.commitOffsets([{
        topic,
        partition,
        offset: (parseInt(message.offset) + 1).toString()
      }]);
    } catch (error) {
      // Don't commit, message will be redelivered
      logger.error('Processing failed', error);
      throw error;
    }
  }
});
```

**5. Ordering Guarantees:**

**Partition by Order ID:**
- All events for same order go to same partition
- Maintains order within partition
- Enables parallel processing across orders

```javascript
// Kafka partitioning
await producer.send({
  topic: 'orders',
  messages: [{
    key: orderId, // Same orderId → same partition
    value: JSON.stringify(event)
  }]
});
```

**Sequential Processing per Order:**
- Consumer processes messages from partition sequentially
- Order-level ordering guaranteed
- Global ordering not guaranteed (not needed)

**6. Idempotent Consumers:**

**Why needed:** At-least-once delivery means duplicates possible

**Implementation:**

```javascript
async function processOrder(message) {
  const event = JSON.parse(message);
  const eventId = event.eventId;
  
  // Check if already processed
  const exists = await db.query(
    'SELECT 1 FROM processed_events WHERE event_id = $1',
    [eventId]
  );
  
  if (exists.rows.length > 0) {
    console.log('Event already processed, skipping');
    return; // Idempotent - safe to skip
  }
  
  // Process in transaction
  await db.transaction(async (trx) => {
    // Business logic
    await trx.query(
      'UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2',
      [event.payload.quantity, event.payload.productId]
    );
    
    // Mark as processed
    await trx.query(
      'INSERT INTO processed_events (event_id, processed_at) VALUES ($1, NOW())',
      [eventId]
    );
  });
}
```

**7. Retry Strategy:**

**Exponential Backoff:**
```javascript
async function processWithRetry(message, maxRetries = 5) {
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      await processOrder(message);
      return; // Success
    } catch (error) {
      retryCount++;
      
      if (retryCount >= maxRetries) {
        // Send to Dead Letter Queue
        await sendToDLQ(message, error);
        throw error;
      }
      
      // Exponential backoff: 2^n seconds
      const delayMs = Math.pow(2, retryCount) * 1000;
      await sleep(delayMs);
    }
  }
}
```

**Dead Letter Queue (DLQ):**
- Failed messages after max retries
- Manual investigation and replay
- Prevents blocking of other messages

**8. Transactional Outbox Pattern:**

**Problem:** Ensure database update and event publish are atomic

**Solution:**
```javascript
// 1. Write to database AND outbox table in same transaction
await db.transaction(async (trx) => {
  // Business logic
  await trx.query(
    'INSERT INTO orders (id, customer_id, total) VALUES ($1, $2, $3)',
    [orderId, customerId, total]
  );
  
  // Write event to outbox
  await trx.query(
    'INSERT INTO outbox (event_id, event_type, payload) VALUES ($1, $2, $3)',
    [eventId, 'ORDER_CREATED', JSON.stringify(orderData)]
  );
});

// 2. Separate process polls outbox and publishes to Kafka
setInterval(async () => {
  const events = await db.query(
    'SELECT * FROM outbox WHERE published = false ORDER BY created_at LIMIT 100'
  );
  
  for (const event of events.rows) {
    await producer.send({
      topic: 'orders',
      messages: [{ value: event.payload }]
    });
    
    await db.query(
      'UPDATE outbox SET published = true WHERE event_id = $1',
      [event.event_id]
    );
  }
}, 1000);
```

**9. Monitoring & Observability:**

**Metrics to Track:**
- Message lag (how far behind consumers are)
- Processing time per message
- Error rate
- Retry count
- DLQ message count

**Alerting:**
- Consumer lag > 1000 messages
- Error rate > 5%
- DLQ messages increasing

**10. Handling Failures:**

**Downstream Service Unavailable:**
- Retry with exponential backoff
- Circuit breaker to prevent cascading failures
- Fallback to DLQ after max retries

**Poison Messages:**
- Messages that always fail (bad data)
- Send to DLQ after N retries
- Alert for manual investigation

**Consumer Crashes:**
- Kafka rebalances partitions to other consumers
- Unacknowledged messages redelivered
- Ensure graceful shutdown to commit offsets

---

## Q2: Compare pub/sub vs event sourcing vs message queues — when to pick each?

**Answer:**

**1. Publish/Subscribe (Pub/Sub):**

**What it is:**
- Producers publish messages to topics
- Multiple subscribers receive copies of messages
- Decoupled communication (publishers don't know subscribers)

**Architecture:**
```
Publisher → Topic → Subscriber 1
                  → Subscriber 2
                  → Subscriber 3
```

**Characteristics:**
- **Fan-out:** One message, many consumers
- **Ephemeral:** Messages typically not stored long-term
- **Real-time:** Immediate delivery
- **No ordering guarantees** (across subscribers)

**Use Cases:**
- **Notifications:** User signup → send email, update analytics, create profile
- **Event broadcasting:** Price update → notify all interested services
- **Real-time updates:** Stock price changes, sports scores
- **Logging/Monitoring:** Application logs to multiple consumers

**Technologies:**
- Google Pub/Sub, AWS SNS, Redis Pub/Sub, NATS

**Example:**
```javascript
// Publisher
pubsub.publish('user.signup', {
  userId: '123',
  email: 'user@example.com'
});

// Subscriber 1: Email Service
pubsub.subscribe('user.signup', async (message) => {
  await sendWelcomeEmail(message.email);
});

// Subscriber 2: Analytics Service
pubsub.subscribe('user.signup', async (message) => {
  await trackSignup(message.userId);
});
```

**Pros:**
- Simple, decoupled
- Easy to add new subscribers
- Real-time delivery

**Cons:**
- No message persistence (typically)
- No replay capability
- Subscribers must be online

---

**2. Message Queues:**

**What it is:**
- Producers send messages to queues
- Consumers pull messages from queues
- Work distribution pattern (one message, one consumer)

**Architecture:**
```
Producer → Queue → Consumer 1
                 → Consumer 2 (competes for messages)
                 → Consumer 3
```

**Characteristics:**
- **Load balancing:** Messages distributed across consumers
- **Persistent:** Messages stored until consumed
- **Ordered:** FIFO (typically)
- **Acknowledgment:** Consumer confirms processing

**Use Cases:**
- **Task processing:** Image resizing, video encoding
- **Job queues:** Background jobs, scheduled tasks
- **Rate limiting:** Throttle processing rate
- **Decoupling services:** Async communication

**Technologies:**
- RabbitMQ, AWS SQS, Azure Service Bus, Redis Lists

**Example:**
```javascript
// Producer
queue.send('image-processing', {
  imageUrl: 'https://example.com/image.jpg',
  operations: ['resize', 'compress']
});

// Consumer (one of many workers)
queue.consume('image-processing', async (message) => {
  await processImage(message.imageUrl, message.operations);
  message.ack(); // Acknowledge completion
});
```

**Pros:**
- Reliable delivery
- Load balancing
- Decoupling
- Retry mechanisms

**Cons:**
- Single consumer per message (no fan-out)
- More complex than pub/sub
- Requires queue management

---

**3. Event Sourcing:**

**What it is:**
- Store all changes as immutable events
- Current state derived by replaying events
- Events are the source of truth

**Architecture:**
```
Command → Event Store (append-only log)
                ↓
        Replay events → Current State
                ↓
        Projections/Views
```

**Characteristics:**
- **Immutable:** Events never deleted or modified
- **Complete history:** Full audit trail
- **Replayable:** Reconstruct state at any point in time
- **Event-driven:** Events trigger side effects

**Use Cases:**
- **Financial systems:** Banking, trading (need audit trail)
- **Collaborative editing:** Google Docs, Figma
- **Domain-driven design:** Complex business logic
- **Audit requirements:** Compliance, regulatory

**Technologies:**
- EventStore, Kafka (as event log), custom solutions

**Example:**
```javascript
// Events
const events = [
  { type: 'ACCOUNT_CREATED', data: { accountId: '123', balance: 0 } },
  { type: 'DEPOSIT', data: { amount: 100 } },
  { type: 'WITHDRAWAL', data: { amount: 30 } },
  { type: 'DEPOSIT', data: { amount: 50 } }
];

// Replay to get current state
function getCurrentState(events) {
  return events.reduce((state, event) => {
    switch (event.type) {
      case 'ACCOUNT_CREATED':
        return { ...event.data };
      case 'DEPOSIT':
        return { ...state, balance: state.balance + event.data.amount };
      case 'WITHDRAWAL':
        return { ...state, balance: state.balance - event.data.amount };
      default:
        return state;
    }
  }, {});
}

// Current balance: 120
```

**Pros:**
- Complete audit trail
- Time travel (replay to any point)
- Event replay for debugging
- Natural fit for event-driven systems

**Cons:**
- Complexity (learning curve)
- Storage overhead (all events stored)
- Schema evolution challenges
- Query complexity (need projections)

---

**Decision Matrix:**

| Pattern | Fan-Out | Persistence | Ordering | Replay | Use Case |
|---------|---------|-------------|----------|--------|----------|
| **Pub/Sub** | ✅ Yes | ❌ No | ❌ No | ❌ No | Notifications, broadcasting |
| **Message Queue** | ❌ No | ✅ Yes | ✅ Yes | ❌ No | Task processing, jobs |
| **Event Sourcing** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | Audit trail, complex domains |

**When to Pick Each:**

**Choose Pub/Sub when:**
- Need to notify multiple services of an event
- Real-time updates required
- Don't need message persistence
- Simple event broadcasting

**Choose Message Queue when:**
- Distributing work across workers
- Need reliable delivery
- Load balancing required
- Decoupling services

**Choose Event Sourcing when:**
- Need complete audit trail
- Regulatory/compliance requirements
- Complex business logic
- Want to replay events
- Time-travel debugging needed

**Hybrid Approaches:**

**Kafka (combines all three):**
- Pub/Sub: Multiple consumers per topic
- Message Queue: Consumer groups for load balancing
- Event Sourcing: Durable log, replay capability

**Common Pattern:**
- Event Sourcing for core domain
- Pub/Sub for notifications
- Message Queue for background jobs

---

## Q3: How would you prevent cascading failures when consumers lag or crash?

**Answer:**

**Cascading Failure Scenario:**
```
Service A → Service B → Service C
              ↓ (slow/crashes)
         Queue fills up
              ↓
    Service A times out
              ↓
    Service A crashes
              ↓
    Entire system down
```

**Prevention Strategies:**

**1. Backpressure:**

**What it is:** Slow down producers when consumers can't keep up

**Implementation:**

```javascript
// Producer checks queue depth before sending
async function sendMessage(message) {
  const queueDepth = await getQueueDepth('orders');
  
  if (queueDepth > 10000) {
    // Queue too full, apply backpressure
    throw new Error('Queue full, please retry later');
  }
  
  await queue.send('orders', message);
}

// Consumer signals capacity
const consumer = {
  maxConcurrent: 10, // Process max 10 messages at once
  
  async process(message) {
    // Process message
  }
};
```

**Benefits:**
- Prevents queue overflow
- Protects consumers from overload
- Graceful degradation

**2. Rate Limiting:**

**Producer-Side Rate Limiting:**
```javascript
const rateLimit = require('bottleneck');

const limiter = new rateLimit({
  maxConcurrent: 100, // Max 100 concurrent requests
  minTime: 10 // Min 10ms between requests
});

limiter.schedule(() => sendMessage(message));
```

**Consumer-Side Rate Limiting:**
```javascript
// Process max 100 messages per second
const limiter = new RateLimiter(100, 'second');

consumer.on('message', async (msg) => {
  await limiter.removeTokens(1);
  await processMessage(msg);
});
```

**3. Circuit Breaker:**

**What it is:** Stop calling failing service, fail fast

**States:**
- **Closed:** Normal operation
- **Open:** Service failing, reject requests immediately
- **Half-Open:** Test if service recovered

**Implementation:**
```javascript
const CircuitBreaker = require('opossum');

const breaker = new CircuitBreaker(callDownstreamService, {
  timeout: 3000, // 3 second timeout
  errorThresholdPercentage: 50, // Open if 50% fail
  resetTimeout: 30000 // Try again after 30s
});

breaker.on('open', () => {
  console.log('Circuit breaker opened, failing fast');
});

breaker.on('halfOpen', () => {
  console.log('Testing if service recovered');
});

// Use circuit breaker
try {
  const result = await breaker.fire(data);
} catch (error) {
  // Fallback logic
  return cachedData;
}
```

**4. Bounded Queues:**

**Limit queue size:**
```javascript
const queue = new Queue({
  maxSize: 10000, // Max 10k messages
  onFull: 'reject' // Reject new messages when full
});

// Producer handles rejection
try {
  await queue.send(message);
} catch (error) {
  if (error.code === 'QUEUE_FULL') {
    // Return 503 Service Unavailable
    return res.status(503).send('System overloaded');
  }
}
```

**Benefits:**
- Prevents unbounded memory growth
- Forces producers to handle overload
- Protects system resources

**5. Separate Critical Topics:**

**Isolate critical vs non-critical:**
```
Critical Queue (orders, payments) → Dedicated consumers
Non-Critical Queue (analytics, logs) → Separate consumers
```

**Benefits:**
- Critical work not blocked by non-critical
- Independent scaling
- Failure isolation

**6. Consumer Autoscaling:**

**Scale consumers based on queue depth:**
```yaml
# Kubernetes HPA based on queue depth
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-consumer
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-consumer
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: External
    external:
      metric:
        name: kafka_consumer_lag
      target:
        type: AverageValue
        averageValue: "1000" # Scale if lag > 1000
```

**7. Dead Letter Queue (DLQ):**

**Prevent poison messages from blocking:**
```javascript
async function processMessage(message) {
  try {
    await handleMessage(message);
  } catch (error) {
    message.retryCount = (message.retryCount || 0) + 1;
    
    if (message.retryCount > 5) {
      // Send to DLQ after 5 retries
      await dlq.send(message);
      console.log('Message sent to DLQ');
    } else {
      // Retry with exponential backoff
      const delay = Math.pow(2, message.retryCount) * 1000;
      await queue.send(message, { delay });
    }
  }
}
```

**8. Graceful Degradation:**

**Fallback strategies:**
```javascript
async function processOrder(order) {
  try {
    // Try primary processing
    await processWithPaymentGateway(order);
  } catch (error) {
    // Fallback: Queue for later processing
    await deferredQueue.send(order);
    
    // Return partial success to user
    return {
      status: 'pending',
      message: 'Order received, processing may be delayed'
    };
  }
}
```

**9. Monitoring & Alerting:**

**Key Metrics:**
- **Consumer lag:** How far behind consumers are
- **Queue depth:** Number of messages in queue
- **Processing rate:** Messages/second
- **Error rate:** Failed messages
- **Consumer health:** Active consumers

**Alerts:**
```javascript
// Alert if lag > 5000 messages
if (consumerLag > 5000) {
  alert('Consumer lag critical', { lag: consumerLag });
}

// Alert if no consumers active
if (activeConsumers === 0) {
  alert('All consumers down', { topic: 'orders' });
}

// Alert if error rate > 10%
if (errorRate > 0.1) {
  alert('High error rate', { rate: errorRate });
}
```

**10. Bulkhead Pattern:**

**Isolate resources:**
```javascript
// Separate thread pools for different operations
const criticalPool = new ThreadPool({ size: 10 });
const nonCriticalPool = new ThreadPool({ size: 5 });

// Critical operations use dedicated pool
criticalPool.execute(() => processPayment(order));

// Non-critical operations use separate pool
nonCriticalPool.execute(() => sendAnalytics(order));
```

**Benefits:**
- Failure in one area doesn't affect others
- Resource isolation
- Independent scaling

---

## Q4: Design a global cache with regional fallbacks and cache coherence strategy.

**Answer:**

**Architecture Overview:**

```
User (US) → CDN (US) → Edge Cache (US) → Regional Cache (US) → Origin DB
User (EU) → CDN (EU) → Edge Cache (EU) → Regional Cache (EU) → Origin DB
User (APAC) → CDN (APAC) → Edge Cache (APAC) → Regional Cache (APAC) → Origin DB
```

**1. Multi-Layer Caching:**

**Layer 1: CDN (CloudFront, Cloudflare)**
- **What to cache:** Static assets, public API responses
- **TTL:** Hours to days
- **Invalidation:** Purge API, versioned URLs
- **Location:** Edge locations globally (100+ POPs)

**Layer 2: Edge Cache (Redis at edge)**
- **What to cache:** User-specific data, session data
- **TTL:** Minutes to hours
- **Invalidation:** Event-based, TTL
- **Location:** Regional data centers (5-10 regions)

**Layer 3: Regional Cache (Redis cluster)**
- **What to cache:** Database query results, computed data
- **TTL:** Seconds to minutes
- **Invalidation:** Write-through, explicit
- **Location:** Same region as application servers

**Layer 4: Application Cache (In-memory)**
- **What to cache:** Hot data, configuration
- **TTL:** Seconds
- **Invalidation:** TTL, manual
- **Location:** Application server memory

**2. Regional Fallback Strategy:**

**Primary-Fallback Pattern:**
```javascript
async function getCachedData(key) {
  // Try local region cache first
  let data = await regionalCache.get(key);
  if (data) return data;
  
  // Fallback to nearest region
  data = await nearestRegionCache.get(key);
  if (data) {
    // Populate local cache
    await regionalCache.set(key, data, { ttl: 300 });
    return data;
  }
  
  // Fallback to global cache
  data = await globalCache.get(key);
  if (data) {
    await regionalCache.set(key, data, { ttl: 300 });
    return data;
  }
  
  // Cache miss - fetch from database
  data = await database.query(key);
  
  // Populate all cache layers
  await Promise.all([
    regionalCache.set(key, data, { ttl: 300 }),
    globalCache.set(key, data, { ttl: 600 })
  ]);
  
  return data;
}
```

**3. Cache Coherence Strategies:**

**Problem:** How to keep caches in sync across regions?

**Strategy A: Event-Based Invalidation (Recommended)**

```javascript
// When data changes, publish invalidation event
async function updateUser(userId, updates) {
  // Update database
  await db.update('users', userId, updates);
  
  // Publish invalidation event to all regions
  await eventBus.publish('cache.invalidate', {
    key: `user:${userId}`,
    regions: ['us-east', 'eu-west', 'ap-southeast']
  });
}

// Each region subscribes to invalidation events
eventBus.subscribe('cache.invalidate', async (event) => {
  await regionalCache.delete(event.key);
  console.log(`Invalidated ${event.key} in region`);
});
```

**Strategy B: Versioned Keys**

```javascript
// Include version in cache key
const version = await getDataVersion('user:123');
const cacheKey = `user:123:v${version}`;

// When data changes, increment version
async function updateUser(userId, updates) {
  await db.update('users', userId, updates);
  await incrementVersion(`user:${userId}`);
  // Old cached versions automatically stale
}
```

**Strategy C: TTL with Stale-While-Revalidate**

```javascript
async function getCachedData(key) {
  const cached = await cache.get(key);
  
  if (cached) {
    // Return cached data immediately
    const response = cached.data;
    
    // If stale, refresh in background
    if (cached.expiresAt < Date.now()) {
      // Don't await - refresh asynchronously
      refreshCache(key).catch(console.error);
    }
    
    return response;
  }
  
  // Cache miss - fetch and cache
  const data = await fetchFromDB(key);
  await cache.set(key, {
    data,
    expiresAt: Date.now() + 60000 // 1 minute
  });
  
  return data;
}
```

**4. Write Strategies:**

**Write-Through Cache:**
```javascript
async function updateData(key, value) {
  // Write to database and cache simultaneously
  await Promise.all([
    database.update(key, value),
    cache.set(key, value)
  ]);
}
```
- **Pros:** Cache always fresh
- **Cons:** Slower writes

**Write-Behind (Write-Back) Cache:**
```javascript
async function updateData(key, value) {
  // Write to cache immediately
  await cache.set(key, value);
  
  // Queue database write
  await writeQueue.enqueue({ key, value });
  
  return; // Return immediately
}

// Background worker writes to database
setInterval(async () => {
  const batch = await writeQueue.dequeue(100);
  await database.batchUpdate(batch);
}, 1000);
```
- **Pros:** Fast writes
- **Cons:** Risk of data loss if cache fails

**Write-Around Cache:**
```javascript
async function updateData(key, value) {
  // Write to database only
  await database.update(key, value);
  
  // Invalidate cache
  await cache.delete(key);
  
  // Next read will populate cache
}
```
- **Pros:** Avoids cache pollution
- **Cons:** Cache miss on next read

**5. Cross-Region Replication:**

**Active-Active Replication:**
```
US Region: Redis Cluster ←→ EU Region: Redis Cluster
                ↕
        APAC Region: Redis Cluster
```

**Implementation (Redis):**
```bash
# Configure Redis replication
redis-cli -h us-redis REPLICAOF eu-redis 6379
redis-cli -h eu-redis REPLICAOF apac-redis 6379
```

**Conflict Resolution:**
- Last-write-wins (LWW) with timestamps
- Vector clocks for complex scenarios
- Application-level conflict resolution

**6. Cache Warming:**

**Pre-populate cache:**
```javascript
// On deployment, warm cache with hot data
async function warmCache() {
  const hotKeys = await getHotKeys(); // Most accessed keys
  
  for (const key of hotKeys) {
    const data = await database.get(key);
    await cache.set(key, data);
  }
  
  console.log(`Warmed cache with ${hotKeys.length} keys`);
}
```

**7. Monitoring & Metrics:**

**Key Metrics:**
- **Hit rate:** Cache hits / total requests
- **Miss rate:** Cache misses / total requests
- **Latency:** P50, P95, P99 response times
- **Eviction rate:** How often keys evicted
- **Memory usage:** Cache size

**Alerts:**
```javascript
// Alert if hit rate drops
if (hitRate < 0.8) {
  alert('Cache hit rate low', { hitRate });
}

// Alert if memory usage high
if (memoryUsage > 0.9) {
  alert('Cache memory high', { usage: memoryUsage });
}
```

**8. Disaster Recovery:**

**Regional Failover:**
```javascript
async function getCachedData(key) {
  const regions = ['us-east', 'eu-west', 'ap-southeast'];
  
  for (const region of regions) {
    try {
      const data = await getFromRegion(region, key);
      if (data) return data;
    } catch (error) {
      console.log(`Region ${region} unavailable, trying next`);
    }
  }
  
  // All regions down - fetch from database
  return await database.get(key);
}
```

---

## Q5: How do you handle cache stampedes and cache poisoning in high-write scenarios?

**Answer:**

**Cache Stampede (Thundering Herd):**

**Problem:**
- Cache key expires
- Multiple requests simultaneously try to regenerate
- All hit database at once
- Database overload

**Scenario:**
```
Cache expires at 10:00:00
Request 1 (10:00:00.001) → Cache miss → Query DB
Request 2 (10:00:00.002) → Cache miss → Query DB
Request 3 (10:00:00.003) → Cache miss → Query DB
...
Request 1000 (10:00:00.100) → Cache miss → Query DB
→ 1000 simultaneous DB queries!
```

**Solutions:**

**1. Request Coalescing (Singleflight Pattern):**

```javascript
const inflightRequests = new Map();

async function getCachedData(key) {
  // Check cache first
  let data = await cache.get(key);
  if (data) return data;
  
  // Check if request already in flight
  if (inflightRequests.has(key)) {
    // Wait for existing request to complete
    return await inflightRequests.get(key);
  }
  
  // Create new request promise
  const requestPromise = fetchFromDB(key).then(async (data) => {
    await cache.set(key, data, { ttl: 300 });
    inflightRequests.delete(key);
    return data;
  });
  
  inflightRequests.set(key, requestPromise);
  return await requestPromise;
}
```

**Benefits:**
- Only one DB query per key
- Other requests wait for result
- Prevents stampede

**2. Probabilistic Early Expiration:**

```javascript
async function getCachedData(key) {
  const cached = await cache.get(key);
  
  if (cached) {
    const ttl = cached.ttl;
    const age = cached.age;
    
    // Probability of early refresh increases as TTL approaches
    const refreshProbability = age / ttl;
    
    if (Math.random() < refreshProbability) {
      // Refresh cache in background
      refreshCache(key).catch(console.error);
    }
    
    return cached.data;
  }
  
  // Cache miss - fetch and cache
  const data = await fetchFromDB(key);
  await cache.set(key, data, { ttl: 300 });
  return data;
}
```

**3. Mutex/Lock Pattern:**

```javascript
async function getCachedData(key) {
  let data = await cache.get(key);
  if (data) return data;
  
  // Try to acquire lock
  const lockKey = `lock:${key}`;
  const lockAcquired = await cache.set(lockKey, '1', {
    ttl: 10, // 10 second lock
    nx: true // Only set if not exists
  });
  
  if (lockAcquired) {
    // This request won the lock - fetch from DB
    try {
      data = await fetchFromDB(key);
      await cache.set(key, data, { ttl: 300 });
      return data;
    } finally {
      await cache.delete(lockKey);
    }
  } else {
    // Another request is fetching - wait and retry
    await sleep(100);
    return await getCachedData(key); // Retry
  }
}
```

**4. Stale-While-Revalidate:**

```javascript
async function getCachedData(key) {
  const cached = await cache.get(key);
  
  if (cached) {
    if (cached.isStale) {
      // Return stale data immediately
      const response = cached.data;
      
      // Refresh in background (don't await)
      refreshCache(key).catch(console.error);
      
      return response;
    }
    
    return cached.data;
  }
  
  // Cache miss - fetch synchronously
  const data = await fetchFromDB(key);
  await cache.set(key, {
    data,
    expiresAt: Date.now() + 60000,
    staleAt: Date.now() + 50000 // Stale after 50s, expires after 60s
  });
  
  return data;
}
```

**5. TTL Jitter:**

```javascript
// Add randomness to TTL to prevent simultaneous expiration
function setWithJitter(key, value, baseTTL) {
  const jitter = Math.random() * baseTTL * 0.1; // ±10% jitter
  const ttl = baseTTL + jitter;
  
  return cache.set(key, value, { ttl });
}

// Example: TTL between 270-330 seconds instead of exactly 300
await setWithJitter('user:123', userData, 300);
```

---

**Cache Poisoning:**

**Problem:**
- Malicious or invalid data cached
- Served to all users
- Hard to detect and fix

**Attack Scenarios:**

**1. Input Validation Bypass:**
```javascript
// Vulnerable code
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id; // No validation!
  const cacheKey = `user:${userId}`;
  
  let data = await cache.get(cacheKey);
  if (!data) {
    data = await db.query(`SELECT * FROM users WHERE id = '${userId}'`);
    await cache.set(cacheKey, data); // Caching malicious data!
  }
  
  res.json(data);
});

// Attack: /api/user/1' OR '1'='1
// Caches result of SQL injection!
```

**Prevention:**

**1. Input Validation:**
```javascript
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  // Validate input
  if (!/^\d+$/.test(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  const cacheKey = `user:${userId}`;
  let data = await cache.get(cacheKey);
  
  if (!data) {
    // Use parameterized query
    data = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    await cache.set(cacheKey, data);
  }
  
  res.json(data);
}); 
```

**2. Validate Before Caching:**
```javascript
async function cacheData(key, data) {
  // Validate data before caching
  if (!isValidData(data)) {
    throw new Error('Invalid data, not caching');
  }
  
  // Check data size
  if (JSON.stringify(data).length > 1000000) {
    throw new Error('Data too large to cache');
  }
  
  await cache.set(key, data);
}
```

**3. Sanitize Cache Keys:**
```javascript
function sanitizeCacheKey(key) {
  // Remove special characters
  return key.replace(/[^a-zA-Z0-9:_-]/g, '');
}

const cacheKey = sanitizeCacheKey(`user:${userId}`);
```

**4. Separate Cache Namespaces:**
```javascript
// Use different cache instances for different data types
const userCache = redis.createClient({ db: 0 });
const productCache = redis.createClient({ db: 1 });
const sessionCache = redis.createClient({ db: 2 });

// Prevents cross-contamination
```

**5. Cache Verification:**
```javascript
async function getCachedData(key) {
  const data = await cache.get(key);
  
  if (data) {
    // Verify cached data integrity
    if (!verifyChecksum(data)) {
      console.warn('Cache data corrupted, invalidating');
      await cache.delete(key);
      return await fetchFromDB(key);
    }
    
    return data;
  }
  
  return await fetchFromDB(key);
}
```

**6. Short TTLs for User Input:**
```javascript
// User-generated content: shorter TTL
await cache.set(`user-content:${id}`, data, { ttl: 60 });

// System data: longer TTL
await cache.set(`system-config:${id}`, data, { ttl: 3600 });
```

**7. Monitoring & Alerting:**
```javascript
// Monitor cache for anomalies
setInterval(async () => {
  const keys = await cache.keys('*');
  
  for (const key of keys) {
    const data = await cache.get(key);
    
    // Check for suspicious patterns
    if (containsSQLKeywords(data)) {
      alert('Possible cache poisoning', { key, data });
      await cache.delete(key);
    }
    
    // Check data size
    if (JSON.stringify(data).length > 10000000) {
      alert('Unusually large cached data', { key });
    }
  }
}, 60000); // Check every minute
```

**8. Cache Invalidation on Security Events:**
```javascript
// On security incident, flush affected caches
async function handleSecurityIncident(affectedKeys) {
  for (const key of affectedKeys) {
    await cache.delete(key);
  }
  
  // Log incident
  await auditLog.write({
    event: 'CACHE_INVALIDATION',
    reason: 'security_incident',
    keys: affectedKeys
  });
}
```

---

## Q6: Explain designing idempotency in event processing and at API boundaries.

**Answer:**

**Idempotency:** Operation can be applied multiple times without changing result beyond initial application.

**Why it's important:**
- Network failures cause retries
- At-least-once delivery guarantees duplicates
- User double-clicks submit button
- Prevents duplicate charges, orders, emails

**1. Idempotency at API Level:**

**Idempotency Keys:**

```javascript
app.post('/api/payments', async (req, res) => {
  const idempotencyKey = req.headers['idempotency-key'];
  
  if (!idempotencyKey) {
    return res.status(400).json({ error: 'Idempotency-Key required' });
  }
  
  // Check if request already processed
  const existing = await db.query(
    'SELECT * FROM idempotency_keys WHERE key = $1',
    [idempotencyKey]
  );
  
  if (existing.rows.length > 0) {
    // Return cached response
    return res.status(existing.rows[0].status_code)
      .json(existing.rows[0].response);
  }
  
  // Process payment
  try {
    const result = await processPayment(req.body);
    
    // Store idempotency key with result
    await db.query(
      'INSERT INTO idempotency_keys (key, status_code, response, created_at) VALUES ($1, $2, $3, NOW())',
      [idempotencyKey, 200, JSON.stringify(result)]
    );
    
    return res.json(result);
  } catch (error) {
    // Store error response too
    await db.query(
      'INSERT INTO idempotency_keys (key, status_code, response, created_at) VALUES ($1, $2, $3, NOW())',
      [idempotencyKey, 500, JSON.stringify({ error: error.message })]
    );
    
    throw error;
  }
});
```

**Client-Side:**
```javascript
// Client generates idempotency key
const idempotencyKey = uuidv4();

// Safe to retry with same key
await fetch('/api/payments', {
  method: 'POST',
  headers: {
    'Idempotency-Key': idempotencyKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(paymentData)
});
```

**2. Database-Level Idempotency:**

**Unique Constraints:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, idempotency_key) -- Prevents duplicates
);

-- Insert will fail if duplicate
INSERT INTO orders (id, user_id, total, idempotency_key)
VALUES ('uuid-123', 456, 99.99, 'idem-key-789')
ON CONFLICT (user_id, idempotency_key) DO NOTHING;
```

**Upsert Pattern:**
```sql
-- Insert or update (idempotent)
INSERT INTO user_preferences (user_id, theme, language)
VALUES ($1, $2, $3)
ON CONFLICT (user_id)
DO UPDATE SET theme = $2, language = $3;
```

**3. Event Processing Idempotency:**

**Event Deduplication:**

```javascript
async function processEvent(event) {
  const eventId = event.eventId;
  
  // Check if event already processed
  const processed = await db.query(
    'SELECT 1 FROM processed_events WHERE event_id = $1',
    [eventId]
  );
  
  if (processed.rows.length > 0) {
    console.log('Event already processed, skipping');
    return; // Idempotent - safe to skip
  }
  
  // Process event in transaction
  await db.transaction(async (trx) => {
    // Business logic
    await trx.query(
      'UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2',
      [event.quantity, event.productId]
    );
    
    // Mark event as processed
    await trx.query(
      'INSERT INTO processed_events (event_id, processed_at) VALUES ($1, NOW())',
      [eventId]
    );
  });
}
```

**4. Transactional Outbox Pattern:**

**Ensures exactly-once processing:**

```javascript
// Write to database and outbox in same transaction
async function createOrder(orderData) {
  await db.transaction(async (trx) => {
    // Insert order
    const order = await trx.query(
      'INSERT INTO orders (id, user_id, total) VALUES ($1, $2, $3) RETURNING *',
      [orderData.id, orderData.userId, orderData.total]
    );
    
    // Write event to outbox
    await trx.query(
      'INSERT INTO outbox (event_id, event_type, payload, created_at) VALUES ($1, $2, $3, NOW())',
      [uuidv4(), 'ORDER_CREATED', JSON.stringify(order.rows[0])]
    );
  });
}

// Separate process publishes from outbox
setInterval(async () => {
  const events = await db.query(
    'SELECT * FROM outbox WHERE published = false ORDER BY created_at LIMIT 100 FOR UPDATE SKIP LOCKED'
  );
  
  for (const event of events.rows) {
    await eventBus.publish(event.event_type, event.payload);
    
    await db.query(
      'UPDATE outbox SET published = true, published_at = NOW() WHERE event_id = $1',
      [event.event_id]
    );
  }
}, 1000);
```

**5. Idempotent Operations:**

**Naturally Idempotent:**
- `SET user.name = "John"` (same result every time)
- `DELETE FROM users WHERE id = 123` (deleting again does nothing)
- `UPDATE users SET status = 'active' WHERE id = 123`

**Not Idempotent (need handling):**
- `UPDATE users SET balance = balance + 100` (adds 100 each time)
- `INSERT INTO orders VALUES (...)` (creates duplicate)
- `SEND EMAIL` (sends multiple emails)

**Making Non-Idempotent Operations Idempotent:**

```javascript
// Non-idempotent: increment balance
async function addFunds(userId, amount) {
  await db.query(
    'UPDATE users SET balance = balance + $1 WHERE id = $2',
    [amount, userId]
  );
}

// Idempotent: use transaction ID
async function addFunds(userId, amount, transactionId) {
  // Check if transaction already applied
  const existing = await db.query(
    'SELECT 1 FROM transactions WHERE id = $1',
    [transactionId]
  );
  
  if (existing.rows.length > 0) {
    return; // Already processed
  }
  
  await db.transaction(async (trx) => {
    // Update balance
    await trx.query(
      'UPDATE users SET balance = balance + $1 WHERE id = $2',
      [amount, userId]
    );
    
    // Record transaction
    await trx.query(
      'INSERT INTO transactions (id, user_id, amount, created_at) VALUES ($1, $2, $3, NOW())',
      [transactionId, userId, amount]
    );
  });
}
```

**6. Distributed Idempotency:**

**Using Redis for Deduplication:**

```javascript
async function processPayment(paymentId, amount) {
  const lockKey = `payment:lock:${paymentId}`;
  
  // Try to acquire lock (expires in 30 seconds)
  const lockAcquired = await redis.set(lockKey, '1', {
    ex: 30,
    nx: true // Only set if not exists
  });
  
  if (!lockAcquired) {
    // Payment already being processed
    throw new Error('Payment already in progress');
  }
  
  try {
    // Process payment
    const result = await chargeCard(amount);
    
    // Store result
    await redis.set(`payment:result:${paymentId}`, JSON.stringify(result), {
      ex: 86400 // 24 hours
    });
    
    return result;
  } finally {
    // Release lock
    await redis.del(lockKey);
  }
}
```

**7. Idempotency in Microservices:**

**Saga Pattern with Idempotency:**

```javascript
// Each step is idempotent
async function bookTripSaga(tripId) {
  const sagaId = `saga:${tripId}`;
  
  // Step 1: Book flight (idempotent with booking ID)
  await bookFlight(tripId, `${sagaId}:flight`);
  
  // Step 2: Book hotel (idempotent with booking ID)
  await bookHotel(tripId, `${sagaId}:hotel`);
  
  // Step 3: Charge payment (idempotent with transaction ID)
  await chargePayment(tripId, `${sagaId}:payment`);
}

// If saga fails and retries, each step checks if already completed
async function bookFlight(tripId, bookingId) {
  const existing = await db.query(
    'SELECT * FROM flight_bookings WHERE booking_id = $1',
    [bookingId]
  );
  
  if (existing.rows.length > 0) {
    return existing.rows[0]; // Already booked
  }
  
  // Make booking
  return await flightAPI.book({ tripId, bookingId });
}
```

**8. Best Practices:**

**Generate IDs Client-Side:**
```javascript
// Client generates UUID
const orderId = uuidv4();

// Send to server
await createOrder({ id: orderId, ...orderData });

// Safe to retry with same ID
```

**Idempotency Key Expiration:**
```sql
-- Clean up old idempotency keys (older than 24 hours)
DELETE FROM idempotency_keys
WHERE created_at < NOW() - INTERVAL '24 hours';
```

**Idempotency for External APIs:**
```javascript
// Stripe example
const charge = await stripe.charges.create({
  amount: 2000,
  currency: 'usd',
  source: 'tok_visa',
  idempotency_key: 'order-123' // Stripe handles deduplication
});
```

