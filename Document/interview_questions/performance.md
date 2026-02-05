# Performance — Interview Questions

- Walk me through diagnosing a sudden 3x latency increase.
	A: Check recent deploys and feature flags, then inspect APM traces and P95/P99 spikes to locate the affected endpoint. Correlate with host metrics (CPU, memory, I/O), DB slow queries, and downstream service latency; apply short-term mitigations (rollback, scale, rate-limit) while you fix root cause.
- How do you choose caching boundaries (client, CDN, edge, app, DB) and invalidation strategy?
	A: Cache at the closest layer to the consumer that yields latency/cost benefits: CDN for static, edge for responses, Redis/app for computed results, and DB-level caches for heavy reads. Choose TTLs, explicit invalidation or versioned keys depending on staleness tolerance.
- Discuss capacity planning for peak traffic and cost/latency trade-offs.
	A: Use historical traffic + growth models to size headroom, define autoscale policies, run synthetic load tests, and balance reserved vs on-demand capacity based on cost and latency requirements.
- What performance budgets and SLAs would you set and how to enforce them in CI?
	A: Define SLOs (P95/P99, error rates, LCP) and enforce via CI performance tests and synthetic checks; fail PRs or block merges when budgets are violated or regress beyond thresholds.
- How do you measure end-to-end user-perceived performance? (RUM, synthetic tests)
	A: Combine Real User Monitoring for client metrics with synthetic tests and distributed tracing to attribute backend contributions; correlate RUM with traces to find root causes.
- Explain techniques for reducing tail latency in distributed systems.
	A: Use hedged/backup requests, replicated reads, prioritized scheduling, connection pooling, backpressure, and reduce contention/sharing; instrument P99 and trace causal chains to identify hotspots.
