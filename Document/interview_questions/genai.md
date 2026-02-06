# GenAI — Interview Questions & Detailed Answers

## Q1: How would you evaluate and integrate an LLM into an existing product while ensuring safety and cost control?

**Answer:**

**Evaluation & Integration Strategy:**

**Phase 1: Use Case Definition (Week 1)**
- Identify specific problem LLM will solve
- Define success metrics (accuracy, user satisfaction, cost per query)
- Assess if LLM is the right solution vs rule-based or traditional ML

**Phase 2: Risk Assessment (Week 1-2)**

**Security & Privacy Risks:**
- **PII Exposure:** User data sent to third-party LLM → Mitigation: Anonymize/redact PII, use on-premise models
- **Hallucinations:** False information → Mitigation: RAG with verified sources, confidence thresholds, human review
- **Prompt Injection:** Users manipulate prompts → Mitigation: Input sanitization, prompt templates
- **Data Leakage:** Training data exposed → Mitigation: Use models with privacy guarantees

**Phase 3: Model Selection (Week 2-3)**

**Cost vs Quality Trade-offs:**

| Model | Cost/1K tokens | Quality | Latency | Use Case |
|-------|----------------|---------|---------|----------|
| GPT-4 | $0.03 | Highest | ~2s | Critical, complex tasks |
| GPT-3.5 | $0.002 | High | ~1s | General purpose |
| Llama 2 (self-hosted) | Infrastructure | Medium | ~500ms | Privacy-sensitive |

**Phase 4: Guardrails & Safety (Week 4-5)**
- **Rate Limiting:** 100 requests/minute per user
- **Content Filters:** Toxic content detection, banned keywords
- **Response Caching:** Cache common queries (24hr TTL for factual, 1hr for personalized)
- **Budget Caps:** Daily spending limits, alerts at 80% threshold

**Phase 5: A/B Testing (Week 5-6)**
- Route 10% traffic to LLM version
- Track metrics: quality (user satisfaction), latency (P95), cost ($/request), safety (flagged responses)
- Gradual rollout: 10% → 25% → 50% → 100%

**Phase 6: Cost Control**
- Token optimization: Truncate context, use only relevant docs
- Model tiering: Simple queries → small model, complex → GPT-4
- Caching: 60%+ cache hit rate reduces costs significantly

---

## Q2: Describe a system design for prompt management, model selection, and A/B testing of models.

**Answer:**

**System Architecture:**
```
User Request → API Gateway → Prompt Manager → Model Router → LLM
                                    ↓                ↓
                            Experiment Service   Monitoring
```

**1. Prompt Management:**
- **Prompt Store:** Database with versioning (prompt_id, version, template, parameters)
- **Template System:** Jinja2 templates with variables
- **Caching:** Redis cache for active prompts (5min TTL)

**2. Model Selection & Routing:**
- **Model Registry:** Catalog of models with cost, latency, quality scores
- **Dynamic Routing:** Based on query complexity or A/B experiment assignment
- **Fallback:** If primary model fails, route to backup

**3. A/B Testing:**
- **Experiment Service:** Assign users to variants using consistent hashing
- **Traffic Split:** 33% GPT-4, 33% Claude, 34% Llama
- **Metrics Tracking:** Latency, cost, user ratings, error rate per variant
- **Analysis:** Statistical significance testing, confidence intervals

**4. Telemetry:**
- Store all requests: user_id, model, prompt, response, latency, cost, rating
- Real-time metrics: Prometheus/Datadog for dashboards
- Audit logs: 90-day retention for compliance

---

## Q3: How do you mitigate hallucinations and ensure traceability/attribution of model outputs?

**Answer:**

**Hallucination Mitigation:**

**1. Retrieval-Augmented Generation (RAG):**
- Embed user query → Vector search → Retrieve top-5 relevant docs → Include in prompt
- LLM generates response based ONLY on provided context
- If answer not in context, respond "I don't have enough information"

**2. Confidence Scoring:**
- Generate 3 responses with different temperatures
- Calculate agreement (semantic similarity)
- If confidence < 70%, route to human review

**3. Fact-Checking Layer:**
- Extract claims from response
- Verify against knowledge base
- Flag unverified claims

**4. Prompt Engineering:**
- Explicitly instruct: "Answer only from provided data"
- Include examples of good/bad responses
- Use chain-of-thought prompting

**Traceability & Attribution:**

**1. Comprehensive Logging:**
- Log every request: prompt, model version, response, sources, confidence, timestamp
- Audit trail for compliance (GDPR, HIPAA)
- 90-day retention, encrypted at rest

**2. Source Attribution:**
- Include citations in response: "[1] Source document"
- Link to original documents
- Display confidence score

**3. Model Version Tracking:**
- Track deployed model versions with checksums
- Enable reproducibility: same prompt + model version → same response

**4. Audit Capabilities:**
- Query logs by user_id, date range
- Reproduce any response from log_id
- Export audit reports for compliance

---

## Q4: What monitoring and privacy considerations are specific to GenAI (PII, audit trails)?

**Answer:**

**Monitoring:**

**1. Output Quality:**
- User ratings (thumbs up/down)
- Toxicity detection (OpenAI Moderation API)
- Hallucination rate (fact-check failures)
- CSAT scores

**2. Performance:**
- Latency: P50, P95, P99 by model
- Throughput: Requests per minute
- Error rate: Timeouts, API failures
- Cache hit rate

**3. Cost:**
- $ per request, $ per user, total spend
- Token usage trends
- Cost by model, by feature
- Budget alerts (80%, 100% thresholds)

**Privacy Considerations:**

**1. PII Handling:**
- **Detection:** Regex for emails, SSN, phone numbers
- **Redaction:** Replace with [EMAIL], [SSN] before sending to LLM
- **Anonymization:** Hash user IDs, remove names
- **On-premise models:** For highly sensitive data

**2. Audit Trails:**
- Log all requests with user_id, timestamp, prompt, response
- Immutable logs (append-only)
- Encrypted at rest and in transit
- Access controls: Only authorized personnel

**3. Compliance:**
- **GDPR:** Right to deletion, data portability, consent
- **HIPAA:** PHI encryption, access logs, BAA with LLM provider
- **Retention policies:** Auto-delete logs after 90 days (or per regulation)

**4. Data Residency:**
- Store data in user's region (EU data in EU)
- Use regional LLM endpoints
- Cross-border transfer agreements

---

## Q5: How would you design a human-in-the-loop workflow for model-assisted features?

**Answer:**

**Workflow Architecture:**

```
LLM Response → Confidence Check → Low Confidence? → Review Queue → Human Reviewer
                                      ↓ High Confidence
                                  Return to User
                                      ↓
                              Collect Feedback → Retrain
```

**1. Routing Logic:**
```python
async def process_request(query):
    response = await llm.generate(query)
    confidence = calculate_confidence(response)
    
    if confidence < 0.7 or is_critical_domain(query):
        # Route to human review
        await review_queue.enqueue({
            'query': query,
            'llm_response': response,
            'confidence': confidence,
            'priority': 'high' if is_critical_domain(query) else 'normal'
        })
        return "Your request is being reviewed by our team."
    else:
        return response
```

**2. Review Queue:**
- **Prioritization:** Critical > Low confidence > Normal
- **SLA Tracking:** Target 4 hours for critical, 24 hours for normal
- **Assignment:** Round-robin or skill-based routing

**3. Reviewer Interface:**
- Display: Original query, LLM response, confidence score, context
- Actions: Approve, Edit, Reject, Escalate
- Feedback: Thumbs up/down, comments

**4. Feedback Loop:**
```python
async def capture_correction(review_id, corrected_response):
    # Store as training data
    await training_db.insert({
        'query': review.query,
        'llm_response': review.llm_response,
        'human_response': corrected_response,
        'confidence': review.confidence,
        'created_at': datetime.now()
    })
    
    # Trigger retraining if threshold met
    if await training_db.count() > 1000:
        await trigger_retraining()
```

**5. Metrics:**
- **Reviewer SLA:** % reviewed within target time
- **Agreement rate:** % of LLM responses approved without edits
- **Correction patterns:** Common types of errors
- **Throughput:** Reviews per hour per reviewer

**6. Continuous Improvement:**
- Retrain model on corrected data monthly
- A/B test new model vs current
- Gradually reduce human review as confidence improves

---

## Q6: How do you estimate and optimize GenAI inference costs at scale?

**Answer:**

**Cost Estimation:**

**1. Per-Request Cost:**
```python
def estimate_cost(prompt, response, model='gpt-3.5-turbo'):
    input_tokens = count_tokens(prompt)
    output_tokens = count_tokens(response)
    
    pricing = {
        'gpt-4': {'input': 0.03, 'output': 0.06},  # per 1K tokens
        'gpt-3.5-turbo': {'input': 0.0015, 'output': 0.002}
    }
    
    cost = (input_tokens / 1000 * pricing[model]['input'] +
            output_tokens / 1000 * pricing[model]['output'])
    
    return cost
```

**2. Monthly Projection:**
- Requests per month: 1M
- Avg tokens per request: 500 input, 200 output
- Model: GPT-3.5
- Cost: 1M × ((500/1000 × $0.0015) + (200/1000 × $0.002)) = $1,150/month

**Cost Optimization:**

**1. Caching:**
```python
# Cache common queries
cache_hit_rate = 0.6  # 60% of requests served from cache
effective_requests = 1M × (1 - cache_hit_rate) = 400K
savings = $1,150 × 0.6 = $690/month
```

**2. Batch Processing:**
- Combine multiple requests into single API call
- Reduces overhead, improves throughput
- 20-30% cost reduction

**3. Model Tiering:**
```python
def route_to_model(query):
    complexity = assess_complexity(query)
    
    if complexity == 'simple':
        return 'gpt-3.5-turbo'  # $0.002/1K tokens
    elif complexity == 'medium':
        return 'claude-instant'  # $0.008/1K tokens
    else:
        return 'gpt-4'  # $0.03/1K tokens
```

**4. Prompt Optimization:**
- Reduce prompt size: Remove unnecessary context
- Use shorter system messages
- Truncate long inputs (keep only relevant parts)
- 30-40% token reduction

**5. Response Length Limits:**
```python
response = await llm.generate(
    prompt=prompt,
    max_tokens=200  # Limit output length
)
```

**6. Autoscaling:**
- Scale inference servers based on demand
- Use spot instances for batch processing (70% cheaper)
- Reserved capacity for baseline traffic

**7. Cost Caps:**
```python
class CostController:
    def __init__(self, daily_budget=100):
        self.daily_budget = daily_budget
        self.spent_today = 0
    
    async def can_make_request(self, estimated_cost):
        if self.spent_today + estimated_cost > self.daily_budget:
            return False  # Reject request
        return True
```

**8. Monitoring:**
- Track cost per user, per feature, per model
- Alert at 80% of budget
- Daily/weekly cost reports
- Identify high-cost users or queries

**Cost Breakdown Example:**

| Optimization | Monthly Cost | Savings |
|--------------|--------------|---------|
| Baseline | $1,150 | - |
| + Caching (60%) | $460 | $690 (60%) |
| + Prompt optimization | $322 | $138 (30%) |
| + Model tiering | $258 | $64 (20%) |
| **Total** | **$258** | **$892 (78%)** |
