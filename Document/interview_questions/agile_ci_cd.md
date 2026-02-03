# Agile, Pipeline & CI/CD — Interview Questions

- Q: As a tech lead, how do you shape an engineering roadmap while keeping sprint predictability?
  A: Balance strategic platform work with feature work using prioritized OKRs, allocate predictable capacity for unplanned work, break Heyyyinitiatives into milestones, and communicate trade-offs.

- Q: Design a CI/CD pipeline that balances speed, safety, and traceability for multi-service apps.
  A: Stage pipeline: lint/unit → integration/contract tests → performance/smoke → canary with automated rollbacks and observability checks; use feature flags for progressive rollout and traceability.

- Q: What gates (tests, canaries, feature flags) would you enforce before a production deploy?
  A: Require passing unit/integration tests, static/security scans, performance smoke tests, and successful canary metrics with automated rollback thresholds.

- Q: How do you measure engineering effectiveness (lead time, MTTR, change failure rate)?
  A: Track lead time for changes, deployment frequency, change failure rate, and MTTR; use trends to identify process or tooling improvements.

- Q: Describe handling technical debt priorities within Agile iterations.
  A: Time-box debt, include debt tasks in planning, estimate ROI for refactors, and automate recurring work (tests/infrastructure) to reduce future debt.

- Q: How would you introduce and roll out trunk-based development or branching strategy changes?
  A: Pilot with a small team, require short-lived branches or feature flags, enforce strong CI, educate teams, and progressively expand while monitoring stability and metrics.
