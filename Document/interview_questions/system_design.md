# System Design — Event Mechanism & Caching — Interview Questions

- Design an event-driven order processing system; discuss delivery guarantees, ordering, retries.
	A: Use a durable broker (Kafka/Rabbit), partition by order id to preserve ordering, implement idempotent consumers and transactional outbox for atomicity, and use retries with exponential backoff plus dead-letter queues for poison messages.
- Compare pub/sub vs event sourcing vs message queues — when to pick each?
	A: Use pub/sub for fan-out notifications, queues for distributed work processing, and event sourcing when you need an immutable history and state reconstruction. Choose based on ordering, replayability, and query patterns.
- How would you prevent cascading failures when consumers lag or crash?
	A: Enforce backpressure, rate-limiting, circuit breakers, separate critical topics, autoscale consumers, and use bounded queues plus DLQs for malformed messages.
- Design a global cache with regional fallbacks and cache coherence strategy.
	A: Use CDN at edge, per-region Redis caches, and a coordination or invalidation channel (events) to propagate changes. Use stale-while-revalidate and versioned keys to reduce coherence issues.
- How do you handle cache stampedes and cache poisoning in high-write scenarios?
	A: Use request coalescing/singleflight, randomized TTL jitter, mutexed regeneration, validate inputs and keys to prevent poisoning, and consider write-through or explicit invalidation schemes.
- Explain designing idempotency in event processing and at API boundaries.
	A: Assign unique request/event IDs, persist processed IDs or use idempotent database operations, and combine with transactional outbox so side-effects are only emitted after state is committed.
