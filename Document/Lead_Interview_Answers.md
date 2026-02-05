# Lead Interview Questions — Answers

This document provides concise, lead-level answers to the interview questions grouped by topic. Use these as guidance for evaluation and follow-up.

## Security

Q: Describe a threat model for a customer-facing web app and prioritize mitigations.
A: Identify assets (user data, credentials, payment info), actors (external attackers, insiders), entry points (web UI, APIs, 3rd-party integrations) and attacker capabilities. Prioritize mitigations by risk (impact × likelihood): strong auth and authorization, input validation and output encoding, TLS everywhere, secrets management, monitoring/alerting, and dependency review. Validate with automated scanning and periodic threat-model reviews.

Q: How would you design authentication and authorization for microservices?
A: Centralize authentication via an identity provider (OAuth2/OIDC); use short-lived access tokens and refresh tokens. For authorization, use scopes/claims and an authorization service or policy layer (RBAC/ABAC). Implement token revocation with a session store or token introspection, enforce least privilege, and audit access logs.

Q: Explain common causes of XSS, CSRF, and how to prevent them.
A: XSS: unsanitized user input rendered into pages. Prevent with output encoding/templating and CSP. CSRF: unauthorized state-changing requests using a valid user session. Prevent with same-site cookies, anti-CSRF tokens, and requiring explicit auth headers for stateful APIs.

Q: How do you secure secrets in CI/CD and runtime environments?
A: Use a secrets manager (Vault, cloud KMS) with short-lived credentials and automated rotation. Inject secrets at runtime via environment or secret volumes, grant least-privilege IAM roles, and audit accesses. Avoid storing secrets in repo or logs.

Q: Describe how you'd detect and respond to a data breach.
A: Detect via anomaly detection, IDS, audit logs, and alerts. Response: contain (isolate affected systems), preserve forensic evidence, notify stakeholders, rotate secrets, patch vulnerabilities, and run a post-incident review. Follow compliance and legal notification requirements.

Q: What security metrics and alerts should a lead track?
A: Authentication failures, privilege escalations, unusual API traffic, data exfiltration patterns, vulnerable dependency reports, patch/rotation lag, and mean time to remediate critical vulnerabilities.

Q: How do you evaluate third-party dependencies for supply-chain risks?
A: Review maintainership, release cadence, CVE history, popularity, license, and signing. Prefer minimal surface area, pin versions, use vulnerability scanning, and have replacement plans.

## Performance

Q: Walk me through diagnosing a sudden 3x latency increase.
A: Check recent deploys/rollouts first, then metrics/traces (APM), host-level metrics (CPU, memory, I/O), DB slow queries, and external dependency latencies. Use distributed tracing to find hotspots and narrow root cause; roll back or mitigate with rate limiting or circuit breakers if needed.

Q: How do you choose caching boundaries and invalidation strategy?
A: Cache where data is read-mostly and close to the consumer (browser/CDN/edge) for static content; app-level or Redis for computed results; DB caching for heavy read queries. Choose TTLs, cache keys, and invalidation patterns (write-through, write-back, explicit invalidation). Favor consistency vs staleness trade-offs depending on correctness requirements.

Q: Discuss capacity planning for peak traffic.
A: Analyze historical usage, model growth and burst patterns, define headroom and failure modes. Establish autoscaling policies, reserve capacity for critical flows, use synthetic load tests, and cost/latency trade-offs (on-demand vs reserved instances).

Q: What performance budgets and SLAs would you set and enforce in CI?
A: Define budgets for metrics like P95/P99 latency, page load times, and error rates. Enforce via performance tests in CI (benchmarks, synthetic RUM), and fail builds if budgets are exceeded.

Q: How do you measure end-to-end user-perceived performance?
A: Use Real User Monitoring (RUM) for client metrics, synthetic tests for global baselines, and distributed tracing for backend contribution. Correlate RUM with server traces to locate backend causes.

Q: Explain techniques for reducing tail latency.
A: Use hedged requests, replicated reads, prioritized scheduling, backpressure, right-sizing resources, and reducing contention (sharding/connection pools). Instrument P99 and trace causal chains.

## GenAI

Q: How would you evaluate and integrate an LLM while ensuring safety and cost control?
A: Start with a risk assessment for PII and hallucinations. Prototype with isolated features, set guardrails (content filters, rate limits, prompt templates), and pick appropriate model size to balance cost and quality. Add usage quotas, caching of responses, and monitored A/B experiments.

Q: Describe a system design for prompt management and A/B testing.
A: Build a prompt store and versioning, a model selection layer, telemetry capture, and an experiment runner that routes traffic. Track fidelity, quality metrics, and business KPIs; store prompts and responses for auditing and retraining.

Q: How do you mitigate hallucinations and ensure traceability?
A: Use grounding (retrieve-and-augment), verification steps (fact-checking models or deterministic checks), and human-in-the-loop reviews for critical outputs. Log prompts, model versions, inputs, and outputs for auditability.

Q: What monitoring and privacy considerations are specific to GenAI?
A: Monitor quality (BLEU/ROUGE proxies, user satisfaction), safety (toxic/harmful outputs), latency and cost. For privacy, avoid sending sensitive PII to third-party models or anonymize/transform data. Keep audit trails and data retention policies.

Q: How would you design a human-in-the-loop workflow?
A: Use triage and confidence thresholds; when model confidence is low, route to human reviewers via a task queue, capture corrections as labeled data, and feed sanitized feedback to retraining pipelines.

Q: How do you estimate and optimize GenAI inference costs at scale?
A: Measure per-request cost considering model and context size; batch requests where possible; use caching, cheaper models for non-critical paths, and autoscaling inference with cold-start mitigation.

## System Design — Event Mechanism & Caching

Q: Design an event-driven order processing system; discuss guarantees.
A: Use a durable message broker (Kafka/Rabbit) with partitioning by order id for ordering. Consumers should implement idempotency and transactional outbox patterns to ensure at-least-once delivery without duplication. For strict ordering, design single-shard consumers or use sequence checks.

Q: Compare pub/sub vs event sourcing vs message queues.
A: Pub/sub is for broadcast patterns and loosely coupled subscribers. Message queues provide point-to-point processing with work distribution. Event sourcing stores state as events for auditability and rebuilds; choose event sourcing for complex domain histories, queues for task processing, and pub/sub for notifications.

Q: How to prevent cascading failures when consumers lag?
A: Apply backpressure, consumer autoscaling, rate limiting, separate critical/non-critical topics, circuit breakers, and bounded queues. Use dead-letter queues for poison messages.

Q: Design a global cache with regional fallbacks.
A: Use CDN for edge caching, regional caches (Redis) per region, and a global coordination layer for invalidation. Implement stale-while-revalidate and consistent hashing for cache locality; serve from fallback when origin is slow.

Q: How do you handle cache stampedes and poisoning?
A: Use request coalescing (single flight), randomized TTL jitter, lock-based regeneration or mutex, and strict validation of cached values. Validate inputs and sanitize keys to avoid poisoning.

Q: Explain designing idempotency in event processing.
A: Use unique request/event IDs and store processed IDs (dedup store) or use idempotent updates at target systems. Combine with transactional outbox to ensure events reflect committed state.

## Agile, Pipeline & CI/CD

Q: How do you shape an engineering roadmap while keeping sprint predictability?
A: Balance strategic platform work and feature delivery using prioritized OKRs, allocate capacity for unplanned work, and split large initiatives into incremental milestones. Communicate trade-offs and use roadmaps updated every PI/sprint.

Q: Design a CI/CD pipeline for multi-service apps.
A: Pipeline stages: unit tests, static analysis, integration and contract tests, performance/smoke tests, canary deploys with automated rollbacks, and production observability checks. Use feature flags and progressive rollout.

Q: What gates should be enforced before production deploy?
A: Passing unit/integration tests, security/scanning checks, dependency vulnerability threshold, performance smoke tests, and canary monitoring with automated rollback criteria.

Q: How do you measure engineering effectiveness?
A: Track lead time for changes, deployment frequency, change failure rate, and MTTR. Use those metrics to guide process improvements.

Q: Handling technical debt in Agile iterations.
A: Time-box debt remediation, include debt items in prioritization and sprint planning, measure ROI on refactors, and use automation to reduce repeatable debt (tests, infra-as-code).

Q: How to introduce trunk-based development?
A: Pilot with a small team, require feature toggles, enforce short-lived branches and strong CI, educate teams on merge discipline, and gradually scale while monitoring release stability.

## Node.js, Event Loop & Concurrency

Q: Explain Node.js single-threaded model and CPU-bound strategies.
A: Node uses an event loop for non-blocking I/O on a single thread. For CPU-bound work, offload to worker threads, child processes, or native addons; use streaming and chunking to avoid blocking the event loop.

Q: Compare web/service workers to Node worker threads.
A: Service workers run in browsers for request interception and caching; web workers handle CPU work in the client. Node worker threads run in the server process for parallel CPU tasks with shared memory options; choose based on environment and data locality.

Q: How do event loop phases affect design?
A: Timers, I/O callbacks, idle/prepare, poll, check phases determine callback ordering. Heavy synchronous code or long-running callbacks block subsequent phases and increase latency; keep handlers small and use async APIs.

Q: Design a Node service for high concurrency and heavy I/O.
A: Use non-blocking streams, backpressure-aware pipelines, connection pooling for DBs, clustering or multiple process instances behind a load balancer, and observability for queue/backpressure metrics.

Q: How to debug memory leaks or unresponsive event loop?
A: Capture heap snapshots and drifts, use async hooks and CPU profiles, monitor event loop lag, and inspect open handles. Reproduce with load tests and fix by eliminating closures retaining large objects.

Q: EventEmitter best practices.
A: Avoid many anonymous listeners, remove listeners on teardown, set max listeners or use WeakRefs for large-scale registration, and prevent emitting high-frequency synchronous events without batching.

### Node.js Fundamentals — Concise Q&A

- Q: What is Node.js and when to use it?
	A: A JavaScript runtime (V8+libuv) for server-side apps; ideal for I/O-bound, real-time, or streaming applications due to its async, event-driven model.

- Q: What is the event loop in Node.js?
	A: The single-threaded loop that schedules and runs callbacks for async operations (timers, I/O, callbacks). Keep handlers short to avoid blocking.

- Q: How does Node handle blocking or CPU-heavy tasks?
	A: Offload to worker threads, spawn child processes, or use native addons; avoid long synchronous operations on the main thread.

- Q: What is `libuv` and the thread pool?
	A: `libuv` is the underlying C library providing async I/O and a thread pool for operations that can't be non-blocking (filesystem, DNS, compression).

- Q: What are common Express methods to know for interviews?
	A: `app.use()` (mount middleware), `app.get()`/`post()`/`put()`/`delete()` (routes), and `app.all()` (all-method handlers). Understand middleware order and `next()`.

- Q: How do you test in Node.js quickly?
	A: Use the built-in `assert` for simple asserts or pair with `node:test`, Mocha, or Jest for full test runners; use `assert.strictEqual`/`deepStrictEqual` for reliable checks.

- Q: Key runtime ops to monitor in production?
	A: Event loop lag, CPU, memory/heap usage, open handles, GC pauses, and request/response latencies.

## Buffer — Interview Q&A

- Q: What is `Buffer` in Node.js and when is it used?
	A: `Buffer` is the core API for raw binary data used for TCP sockets, file I/O, and binary protocols. It's used when you need to manipulate bytes directly or convert between encodings.

- Q: How do you create buffers safely?
	A: Use `Buffer.from()` for existing data and `Buffer.alloc()` for new zero-filled buffers. Avoid `Buffer.allocUnsafe()` unless you immediately overwrite the memory for performance.

- Q: Explain `slice()` vs `copy()` on buffers.
	A: `slice()` returns a view referencing the same memory (no copy) — efficient but may keep large memory alive. `copy()` copies bytes into a new buffer — uses extra memory but isolates lifetime.

- Q: How do you handle encoding conversions and binary reads/writes?
	A: Convert with `buf.toString('base64'|'hex'|'utf8')` and `Buffer.from(str, 'base64')`. Read/write integers with `readUInt32BE/LE` and `writeUInt32BE/LE`, minding endianness.

- Q: What performance/security pitfalls to mention?
	A: `allocUnsafe` can leak old memory if not overwritten; slices share memory and can cause leaks; frequent small allocations hurt GC. Prefer pooling/reuse and be explicit about encodings.

## Async Hooks — Interview Q&A

- Q: What are the primary `async_hooks` lifecycle callbacks and what do they indicate?
	A: `init` (resource created), `before` (about to run callback), `after` (callback finished), `destroy` (resource cleaned), and `promiseResolve` (Promise resolved). Use `init` to record creation and `before`/`after` to trace execution windows.

- Q: When should you use `AsyncResource`?
	A: Create `AsyncResource` when integrating non-instrumented or native async work so you can preserve async context across callbacks (e.g., custom C++ bindings, 3rd-party libs).

- Q: How does `AsyncLocalStorage` relate to `async_hooks`?
	A: `AsyncLocalStorage` is a higher-level API built on `async_hooks` providing a per-async-chain store for request-scoped data. Prefer `AsyncLocalStorage` for most context-propagation needs.

- Q: What are common use-cases for `async_hooks`/`AsyncLocalStorage`?
	A: Correlating logs with trace IDs, per-request metadata, request-scoped caches, and building tracing/instrumentation libraries.

- Q: What performance or correctness pitfalls should you mention in interviews?
	A: Hooks add runtime overhead (keep handlers minimal), context can be lost with uninstrumented native modules, and context doesn't cross process boundaries — propagate explicitly. Test under concurrency and worker threads.

- Q: Quick example answer to demonstrate understanding:
	A: "Use `AsyncLocalStorage` at HTTP entry to store `{traceId}` via `als.run()`, then call `als.getStore()` inside downstream async code to include traceId in logs; if integrating native callbacks, wrap them with `AsyncResource` so context is preserved." 

## Leadership & Systemic Questions

Q: Describe making a major architecture decision.
A: Describe problem framing, constraints, alternatives, prototypes, data-driven evaluations and stakeholder alignment. Track decision rationale and rehearse migration/resilience plans.

Q: How do you mentor engineers to lift ownership?
A: Pair programming, code reviews focused on coaching, setting growth goals, delegating ownership with clear expectations, and supporting stretch assignments.

Q: Balance shipping features vs platform investments.
A: Tie platform work to measurable outcomes (reliability, dev velocity), allocate fixed capacity and use cost-benefit frameworks to prioritize.

Q: How do you run incident reviews?
A: Time-box an evidence-based incident write-up, include timelines, root cause, remediation, and action items with owners and timelines. Follow up on action completion.

Q: What metrics and dashboards are required?
A: Business KPIs, latency/error rates, capacity/utilization, deployment health, and incident/MTTR trends. Dashboards should support drill-downs by service and region.

Q: How do you hire and interview senior engineers?
A: Focus on system design, deep debugging, ownership examples, trade-off reasoning, and cultural fit. Use a mix of take-home or paired design exercises and behavioral/hypothetical questions.

