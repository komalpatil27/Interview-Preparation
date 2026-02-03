# GenAI — Interview Questions

- How would you evaluate and integrate an LLM into an existing product while ensuring safety and cost control?
	A: Prototype in an isolated flow, perform a risk assessment (PII, hallucinations), select model size by cost/quality tradeoff, add guardrails (filters, rate limits), cache responses, and run monitored A/B tests before full rollout.
- Describe a system design for prompt management, model selection, and A/B testing of models.
	A: Build a prompt store with versioning, a routing layer for model selection, telemetry capture for metrics, and an experiment runner to split traffic and evaluate quality vs cost.
- How do you mitigate hallucinations and ensure traceability/attribution of model outputs?
	A: Use retrieval-augmented generation (grounding), fact-checking steps, confidence thresholds with human review, and log prompts/model versions/outputs for audits.
- What monitoring and privacy considerations are specific to GenAI (PII, audit trails)?
	A: Monitor output quality and toxicity, latency and cost; anonymize or scrub PII, keep audit trails, and enforce retention/compliance policies.
- How would you design a human-in-the-loop workflow for model-assisted features?
	A: Route low-confidence or critical outputs to reviewers via a queue, capture corrections as labeled data, and close the loop into retraining while tracking reviewer SLAs.
- How do you estimate and optimize GenAI inference costs at scale?
	A: Measure per-request token/context costs, batch requests, cache frequent responses, use smaller models for non-critical paths, and autoscale inference with cost caps.
