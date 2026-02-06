# Performance — Interview Questions & Detailed Answers

## Q1: Walk me through diagnosing a sudden 3x latency increase.

**Answer:**

**Step-by-Step Diagnostic Approach:**

**1. Immediate Triage (First 5 minutes):**
- Check recent deployments - did we just deploy?
- Review feature flags - was a new feature enabled?
- Check monitoring dashboards - which services are affected?
- Look at error rates - are errors increasing too?
- Identify scope - all users or specific segments?

**2. APM Trace Analysis (Next 10 minutes):**
- Use Application Performance Monitoring (Datadog, New Relic, Dynatrace)
- Examine P95 and P99 latency percentiles (not just average)
- Identify which endpoint(s) are slow
- Look at distributed traces to find bottleneck in request flow
- Check if latency is in: database, external API, or application code

**3. Infrastructure Metrics (Parallel investigation):**
- **CPU usage** - Is CPU maxed out? (>80% sustained)
- **Memory** - Memory leak? Garbage collection pauses?
- **Disk I/O** - Disk saturation? Slow reads/writes?
- **Network** - Network congestion? Packet loss?
- **Connection pools** - Exhausted database connections?

**4. Database Investigation:**
- Check slow query logs
- Look for missing indexes or table scans
- Check for lock contention or deadlocks
- Verify connection pool isn't exhausted
- Look at query execution plans

**5. Downstream Services:**
- Are external APIs slow?
- Third-party service degradation?
- Check service mesh metrics
- Verify circuit breakers aren't tripped

**6. Short-term Mitigations:**
- **Rollback** recent deployment if that's the cause
- **Disable feature flag** if new feature is culprit
- **Scale horizontally** - add more instances
- **Rate limiting** - protect system from overload
- **Cache** - add caching if possible
- **Circuit breaker** - fail fast on slow dependencies

**7. Root Cause Analysis:**
- Correlate timeline with changes (code, config, traffic)
- Reproduce in staging if possible
- Review code changes in recent deployment
- Check for N+1 queries or inefficient algorithms
- Analyze traffic patterns - sudden spike?

**8. Long-term Fix:**
- Fix underlying issue (optimize query, add index, fix algorithm)
- Add monitoring/alerting to catch early next time
- Load test to verify fix
- Document incident in post-mortem

---

## Q2: How do you choose caching boundaries (client, CDN, edge, app, DB) and invalidation strategy?

**Answer:**

**Caching Layers & Decision Framework:**

**1. Client-Side Caching (Browser):**
- **What to cache:** Static assets (JS, CSS, images), API responses
- **When to use:** Data that rarely changes, user-specific data
- **TTL:** Long (1 year for versioned assets, 5-10 min for API data)
- **Invalidation:** Cache-Control headers, versioned URLs
- **Benefits:** Fastest (no network), reduces server load
- **Drawbacks:** Hard to invalidate, user-specific

**2. CDN Caching (CloudFront, Cloudflare):**
- **What to cache:** Static assets, public API responses, media files
- **When to use:** Globally distributed users, high traffic
- **TTL:** Hours to days for static content
- **Invalidation:** Purge API, versioned URLs, cache tags
- **Benefits:** Low latency globally, reduces origin load
- **Drawbacks:** Cost, invalidation delay

**3. Edge Caching (Cloudflare Workers, Lambda@Edge):**
- **What to cache:** Personalized content, API responses
- **When to use:** Need computation near user, A/B testing
- **TTL:** Minutes to hours
- **Invalidation:** Event-based, TTL expiry
- **Benefits:** Low latency, can customize per region
- **Drawbacks:** Limited compute, complexity

**4. Application Cache (Redis, Memcached):**
- **What to cache:** Database query results, computed values, session data
- **When to use:** Expensive computations, frequent reads
- **TTL:** Seconds to hours depending on staleness tolerance
- **Invalidation:** Write-through, write-behind, explicit invalidation
- **Benefits:** Fast, flexible, shared across instances
- **Drawbacks:** Additional infrastructure, cache coherence

**5. Database-Level Cache (Query cache, materialized views):**
- **What to cache:** Frequently accessed query results
- **When to use:** Read-heavy workloads, complex aggregations
- **TTL:** Varies by database
- **Invalidation:** Automatic on writes (query cache), manual refresh (materialized views)
- **Benefits:** Transparent, no code changes
- **Drawbacks:** Limited control, can be invalidated frequently

**Invalidation Strategies:**

**1. Time-Based (TTL):**
- Set expiration time on cached data
- Simple, predictable
- Good for: Data that changes predictably
- Drawback: May serve stale data

**2. Event-Based Invalidation:**
- Invalidate when underlying data changes
- Requires event system (Kafka, Redis Pub/Sub)
- Good for: Critical data that must be fresh
- Drawback: Complex, potential race conditions

**3. Versioned Keys:**
- Include version in cache key: `user:123:v2`
- Change version on update
- Good for: Avoiding invalidation complexity
- Drawback: Old versions remain until TTL

**4. Write-Through Cache:**
- Update cache when writing to database
- Ensures cache is always fresh
- Good for: Write-moderate workloads
- Drawback: Slower writes

**5. Stale-While-Revalidate:**
- Serve stale data while fetching fresh data in background
- Best user experience
- Good for: Non-critical data
- Drawback: May serve stale data briefly

**Decision Matrix:**

| Layer | Latency | Cost | Staleness Tolerance | Use Case |
|-------|---------|------|---------------------|----------|
| Client | Lowest | Free | High | Static assets |
| CDN | Very Low | Medium | Medium | Public content |
| Edge | Low | Medium-High | Medium | Personalized content |
| App Cache | Low | Low-Medium | Low-Medium | Computed results |
| DB Cache | Medium | Low | Low | Query results |

---

## Q3: Discuss capacity planning for peak traffic and cost/latency trade-offs.

**Answer:**

**Capacity Planning Process:**

**1. Baseline & Growth Analysis:**
- Collect historical traffic data (6-12 months)
- Identify traffic patterns: daily, weekly, seasonal
- Calculate growth rate (month-over-month, year-over-year)
- Identify peak periods (Black Friday, holidays, product launches)

**2. Traffic Forecasting:**
- Use historical data + growth models
- Account for marketing campaigns and product launches
- Add safety margin (20-30% headroom)
- Consider worst-case scenarios

**Example:**
- Current peak: 10,000 RPS
- Growth rate: 20% per quarter
- Next quarter peak: 12,000 RPS
- With 30% headroom: 15,600 RPS capacity needed

**3. Resource Sizing:**
- **Compute:** CPU, memory requirements per request
- **Storage:** Database size, log retention
- **Network:** Bandwidth requirements
- **Cache:** Redis/Memcached capacity

**Load Testing:**
- Run synthetic load tests to validate capacity
- Test at 1.5x expected peak traffic
- Identify bottlenecks before production
- Verify autoscaling triggers work correctly

**4. Autoscaling Policies:**

**Horizontal Scaling (Add/remove instances):**
- Scale based on: CPU, memory, request count, queue depth
- Scale-out threshold: 70% CPU for 5 minutes
- Scale-in threshold: 30% CPU for 15 minutes (slower to scale down)
- Min instances: 2 (for redundancy)
- Max instances: Based on capacity planning

**Vertical Scaling (Bigger instances):**
- Use for: Databases, stateful services
- Less flexible but simpler
- Requires downtime or read replicas

**5. Cost vs Latency Trade-offs:**

**Reserved vs On-Demand Capacity:**

**Reserved Instances (1-3 year commitment):**
- **Cost:** 30-70% cheaper
- **Latency:** Same as on-demand
- **Use for:** Baseline capacity (always-on instances)
- **Trade-off:** Less flexibility, upfront commitment

**On-Demand Instances:**
- **Cost:** Full price
- **Latency:** Same performance
- **Use for:** Peak traffic, autoscaling
- **Trade-off:** Higher cost for flexibility

**Spot Instances (AWS) / Preemptible (GCP):**
- **Cost:** 70-90% cheaper
- **Latency:** Same, but can be terminated
- **Use for:** Batch jobs, fault-tolerant workloads
- **Trade-off:** Unreliable, not for critical services

**6. Multi-Region vs Single-Region:**

**Single Region:**
- **Cost:** Lower (no cross-region data transfer)
- **Latency:** Higher for distant users
- **Use when:** Users concentrated in one region

**Multi-Region:**
- **Cost:** Higher (data replication, cross-region traffic)
- **Latency:** Lower globally
- **Use when:** Global user base, need high availability

**7. Caching vs Compute:**

**More Caching:**
- **Cost:** Lower (cache is cheaper than compute)
- **Latency:** Lower (cache hits are fast)
- **Trade-off:** Staleness, cache invalidation complexity

**More Compute:**
- **Cost:** Higher
- **Latency:** Higher (recalculate every time)
- **Trade-off:** Always fresh data

**8. Database Optimization:**

**Read Replicas:**
- **Cost:** Medium (additional DB instances)
- **Latency:** Lower for reads
- **Use for:** Read-heavy workloads

**Sharding:**
- **Cost:** Higher (complexity, multiple DBs)
- **Latency:** Lower (smaller datasets)
- **Use for:** Very large datasets

**Managed vs Self-Hosted:**
- **Managed (RDS, Aurora):** Higher cost, lower latency (optimized)
- **Self-Hosted (EC2):** Lower cost, requires expertise

**9. Monitoring & Adjustment:**
- Track actual vs predicted traffic
- Monitor cost per request
- Adjust autoscaling policies based on real data
- Quarterly capacity reviews

---

## Q4: What performance budgets and SLAs would you set and how to enforce them in CI?

**Answer:**

**Performance Budgets:**

**1. Core Web Vitals (Frontend):**
- **LCP (Largest Contentful Paint):** < 2.5s (good), < 4s (acceptable)
- **FID (First Input Delay):** < 100ms (good), < 300ms (acceptable)
- **CLS (Cumulative Layout Shift):** < 0.1 (good), < 0.25 (acceptable)
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.5s

**2. Backend Performance:**
- **P50 latency:** < 100ms
- **P95 latency:** < 500ms
- **P99 latency:** < 1000ms
- **Error rate:** < 0.1%
- **Throughput:** > 1000 RPS per instance

**3. Resource Budgets:**
- **JavaScript bundle:** < 200KB gzipped
- **CSS bundle:** < 50KB gzipped
- **Images:** < 100KB per image
- **Total page weight:** < 1MB
- **Number of requests:** < 50

**SLAs (Service Level Agreements):**

**Availability:**
- **Critical services:** 99.9% uptime (43 minutes downtime/month)
- **Non-critical services:** 99.5% uptime (3.6 hours downtime/month)

**Performance:**
- **API response time:** P95 < 500ms
- **Page load time:** P95 < 3s
- **Error rate:** < 0.5%

**Enforcing in CI/CD:**

**1. Lighthouse CI:**
```yaml
# .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["https://staging.example.com"]
    },
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", {"maxNumericValue": 1800}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
```

**2. Bundle Size Checks:**
- Use bundlesize or size-limit
- Fail CI if bundle exceeds budget
- Track bundle size over time

**3. Performance Testing in CI:**
- Run load tests on staging
- Use k6, Artillery, or JMeter
- Fail if P95 latency exceeds threshold
- Compare against baseline

**4. Synthetic Monitoring:**
- Run automated tests from multiple locations
- Check critical user journeys
- Alert if performance degrades

**5. PR Performance Checks:**
- Comment on PR with performance impact
- Show before/after comparison
- Block merge if regression > 10%

---

## Q5: How do you measure end-to-end user-perceived performance? (RUM, synthetic tests)

**Answer:**

**Real User Monitoring (RUM):**

**What it measures:**
- Actual user experience in production
- Real devices, networks, locations
- Core Web Vitals, page load times
- JavaScript errors, API failures

**Tools:**
- Google Analytics, New Relic, Datadog RUM
- Custom instrumentation with Performance API

**Metrics collected:**
- Navigation timing (DNS, TCP, TLS, TTFB)
- Resource timing (JS, CSS, images)
- User interactions (clicks, scrolls)
- Geographic distribution
- Device types and browsers

**Benefits:**
- Real-world data
- Captures edge cases
- Segmentation by user, location, device

**Drawbacks:**
- No control over conditions
- Privacy concerns
- Sampling may be needed for scale

**Synthetic Monitoring:**

**What it measures:**
- Controlled, repeatable tests
- Simulated user journeys
- Consistent baseline

**Tools:**
- Lighthouse, WebPageTest, Pingdom
- Playwright, Puppeteer for custom tests

**Test types:**
- Page load tests
- Transaction monitoring (login, checkout)
- API endpoint tests
- Multi-step user flows

**Benefits:**
- Consistent, reproducible
- Can test before production
- No user impact

**Drawbacks:**
- May not reflect real users
- Limited to predefined scenarios

**Distributed Tracing:**

**How it works:**
- Trace requests across microservices
- Assign unique trace ID to each request
- Track timing at each service hop
- Identify bottlenecks in distributed systems

**Tools:**
- Jaeger, Zipkin, AWS X-Ray
- OpenTelemetry for instrumentation

**What it shows:**
- Service-to-service latency
- Database query times
- External API calls
- Error propagation

**Correlating RUM with Traces:**

**Process:**
1. User reports slow page load (RUM)
2. Extract trace ID from RUM data
3. Look up trace in distributed tracing system
4. Identify which backend service is slow
5. Drill into slow service to find root cause

**Example:**
- RUM shows: Page load = 5s
- Trace shows: API call to /products = 4.5s
- Drill down: Database query = 4s
- Root cause: Missing index on products table

---

## Q6: Explain techniques for reducing tail latency in distributed systems.

**Answer:**

**Tail Latency:** The slowest requests (P95, P99, P99.9) that significantly impact user experience.

**Techniques:**

**1. Hedged Requests (Backup Requests):**
- Send duplicate request after timeout threshold
- Use first response that arrives
- Cancel slower request
- **Trade-off:** Increased load, but lower tail latency
- **Use when:** Read-only operations, idempotent requests

**2. Replicated Reads:**
- Read from multiple replicas simultaneously
- Use fastest response
- Good for: Read-heavy workloads
- **Trade-off:** More network traffic

**3. Prioritized Scheduling:**
- Assign priority to requests
- Process high-priority requests first
- Use separate queues for different priorities
- Prevents low-priority work from blocking critical requests

**4. Connection Pooling:**
- Reuse TCP connections
- Avoid connection establishment overhead
- Pre-warm connections during idle time
- **Benefit:** Eliminates connection setup latency

**5. Backpressure & Load Shedding:**
- Reject requests when overloaded
- Fail fast instead of queuing
- Return 503 Service Unavailable
- **Benefit:** Prevents cascading failures

**6. Reduce Contention:**
- Minimize shared resources (locks, databases)
- Use sharding to distribute load
- Avoid hot keys in caches
- Use lock-free data structures where possible

**7. Caching:**
- Cache frequently accessed data
- Reduces database load
- Lower latency for cache hits
- **Trade-off:** Staleness

**8. Timeout Tuning:**
- Set aggressive timeouts
- Fail fast on slow dependencies
- Use circuit breakers
- **Benefit:** Prevents slow requests from blocking resources

**9. Asynchronous Processing:**
- Offload heavy work to background jobs
- Return immediately to user
- Process asynchronously
- **Use for:** Email sending, report generation

**10. Instrumentation & Monitoring:**
- Track P95, P99, P99.9 latency
- Identify causal chains with distributed tracing
- Find hotspots and optimize
- Set alerts on tail latency degradation

**Example Architecture:**
```
User Request
  ↓
Load Balancer (with hedging)
  ↓
API Gateway (prioritized queues)
  ↓
Service A (connection pooling)
  ↓
Database (replicated reads, sharding)
```

**Measurement:**
- Always track percentiles, not just averages
- P50 may be fast, but P99 tells real user experience
- Monitor tail latency trends over time

