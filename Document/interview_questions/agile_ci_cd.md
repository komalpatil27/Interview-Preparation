# Agile, Pipeline & CI/CD — Interview Questions & Detailed Answers

## Q1: As a tech lead, how do you shape an engineering roadmap while keeping sprint predictability?

**Answer:**

Balancing strategic roadmap planning with sprint predictability requires a multi-faceted approach:

**1. OKR-Based Prioritization:**
- Define quarterly Objectives and Key Results aligned with business goals
- Break down strategic initiatives into measurable outcomes
- Prioritize work based on impact vs effort matrix
- Allocate capacity: 70% features, 20% platform/tech debt, 10% innovation

**2. Capacity Planning:**
- Track team velocity over multiple sprints to establish baseline
- Reserve 20-30% capacity for unplanned work (bugs, incidents, support)
- Use historical data to improve estimation accuracy
- Account for holidays, PTO, and team changes

**3. Breaking Down Large Initiatives:**
- Decompose epics into smaller, deliverable milestones
- Each milestone should provide incremental value
- Use vertical slicing to deliver end-to-end features
- Ensure dependencies are identified and managed early

**4. Communication & Trade-offs:**
- Maintain transparent roadmap visible to stakeholders
- Regularly communicate progress, blockers, and risks
- Present trade-offs clearly: scope vs timeline vs quality
- Use data to justify decisions (velocity, cycle time, defect rates)

**5. Continuous Refinement:**
- Conduct regular backlog grooming sessions
- Adjust roadmap based on learnings and changing priorities
- Retrospectives to improve predictability
- Balance new features with stability and technical excellence

---

## Q2: Design a CI/CD pipeline that balances speed, safety, and traceability for multi-service apps.

**Answer:**

**Pipeline Architecture:**

**Stage 1: Code Quality & Fast Feedback (< 5 minutes)**
- Linting (ESLint, Prettier)
- Unit tests (Jest, Mocha)
- Static analysis (SonarQube, CodeQL)
- Security scanning (Snyk, Dependabot)
- **Goal:** Catch obvious issues immediately

**Stage 2: Integration & Contract Testing (< 15 minutes)**
- Integration tests against test databases
- Contract tests between services (Pact)
- API schema validation
- Component tests
- **Goal:** Verify service interactions

**Stage 3: Build & Artifact Creation**
- Docker image build with multi-stage optimization
- Tag with commit SHA, branch, and timestamp
- Push to container registry
- Generate SBOM (Software Bill of Materials)
- **Goal:** Create deployable, traceable artifacts

**Stage 4: Deployment to Staging**
- Deploy to staging environment
- Run smoke tests
- Performance tests (load, stress)
- End-to-end tests (Playwright, Cypress)
- **Goal:** Validate in production-like environment

**Stage 5: Canary Deployment (Progressive Rollout)**
- Deploy to 5% of production traffic
- Monitor key metrics: error rates, latency, CPU, memory
- Automated health checks every 2 minutes
- If metrics degrade beyond thresholds → automatic rollback
- Gradually increase: 5% → 25% → 50% → 100%
- **Goal:** Safe production deployment with quick rollback

**Traceability Features:**
- Git commit SHA in every deployment
- Link deployments to Jira tickets
- Audit logs for all pipeline actions
- Deployment notifications to Slack/Teams
- Trace requests through distributed tracing (Jaeger, Zipkin)

**Feature Flags:**
- Use LaunchDarkly or similar for progressive feature rollout
- Decouple deployment from release
- Kill switch for problematic features
- A/B testing capabilities

**Observability:**
- Metrics: Prometheus, Grafana
- Logs: ELK stack or CloudWatch
- Traces: OpenTelemetry
- Alerts: PagerDuty for critical issues

---

## Q3: What gates (tests, canaries, feature flags) would you enforce before a production deploy?

**Answer:**

**Pre-Deployment Gates:**

**1. Automated Testing Gates:**
- ✅ All unit tests passing (100% required)
- ✅ Integration tests passing (95%+ coverage on critical paths)
- ✅ No high/critical security vulnerabilities (SAST/DAST scans)
- ✅ Performance tests within acceptable thresholds (P95 < 500ms)
- ✅ Code coverage above minimum threshold (80%+)

**2. Code Quality Gates:**
- ✅ Code review approval from at least 2 engineers
- ✅ No SonarQube blockers or critical issues
- ✅ Linting and formatting checks passed
- ✅ No TODO/FIXME comments in critical code paths

**3. Security & Compliance Gates:**
- ✅ Dependency vulnerability scan (no critical CVEs)
- ✅ Secrets scanning (no hardcoded credentials)
- ✅ License compliance check
- ✅ GDPR/compliance requirements met

**4. Deployment Readiness:**
- ✅ Database migrations tested and reversible
- ✅ Feature flags configured for new features
- ✅ Runbook updated with rollback procedures
- ✅ On-call engineer notified and available

**Post-Deployment Gates (Canary):**

**5. Canary Metrics (5% traffic for 10 minutes):**
- ✅ Error rate < 0.1% (vs baseline)
- ✅ P95 latency within 10% of baseline
- ✅ CPU/Memory usage within normal range
- ✅ No increase in 5xx errors
- ✅ Key business metrics stable (conversion, signups)

**6. Progressive Rollout:**
- 5% → Wait 10 min → Check metrics
- 25% → Wait 15 min → Check metrics
- 50% → Wait 20 min → Check metrics
- 100% → Monitor for 1 hour

**7. Automated Rollback Triggers:**
- Error rate > 1%
- P95 latency > 2x baseline
- Critical endpoint failures
- Memory leak detected (>80% usage sustained)
- Manual kill switch via feature flag

**8. Feature Flag Strategy:**
- New features behind flags (default: off)
- Gradual rollout by user segment
- Quick disable without redeployment
- A/B testing for product experiments

---

## Q4: How do you measure engineering effectiveness (lead time, MTTR, change failure rate)?

**Answer:**

**DORA Metrics (DevOps Research and Assessment):**

**1. Lead Time for Changes:**
- **Definition:** Time from code commit to production deployment
- **Measurement:** Track commit timestamp to deployment timestamp
- **Target:** < 1 day for elite performers
- **How to improve:**
  - Automate CI/CD pipeline
  - Reduce batch sizes (smaller PRs)
  - Eliminate manual approval steps
  - Optimize test suite execution time

**2. Deployment Frequency:**
- **Definition:** How often code is deployed to production
- **Measurement:** Count deployments per day/week
- **Target:** Multiple deployments per day (elite)
- **How to improve:**
  - Trunk-based development
  - Feature flags for incomplete features
  - Automated testing and deployment
  - Reduce deployment ceremony

**3. Change Failure Rate:**
- **Definition:** Percentage of deployments causing failures
- **Measurement:** (Failed deployments / Total deployments) × 100
- **Target:** < 15% (elite performers < 5%)
- **How to improve:**
  - Better test coverage
  - Canary deployments
  - Automated rollback
  - Post-incident reviews and action items

**4. Mean Time to Recovery (MTTR):**
- **Definition:** Average time to restore service after incident
- **Measurement:** Time from incident detection to resolution
- **Target:** < 1 hour (elite performers)
- **How to improve:**
  - Automated rollback mechanisms
  - Better monitoring and alerting
  - Runbooks and incident playbooks
  - Chaos engineering to practice recovery

**Additional Metrics:**

**5. Code Review Time:**
- Time from PR creation to approval
- Target: < 4 hours
- Indicates collaboration effectiveness

**6. Cycle Time:**
- Time from starting work to deployment
- Includes development, review, testing, deployment
- Target: < 3 days

**7. Defect Escape Rate:**
- Bugs found in production vs caught in testing
- Lower is better
- Indicates test effectiveness

**Tracking & Visualization:**
- Use tools: Jira, GitHub Insights, custom dashboards
- Weekly/monthly trend analysis
- Correlate metrics with team changes or process improvements
- Share metrics transparently with team

---

## Q5: Describe handling technical debt priorities within Agile iterations.

**Answer:**

**Technical Debt Management Strategy:**

**1. Categorize Technical Debt:**
- **Critical:** Security vulnerabilities, performance issues, data corruption risks
- **High:** Blocking future features, causing frequent bugs, slowing development
- **Medium:** Code smells, outdated dependencies, missing tests
- **Low:** Cosmetic improvements, nice-to-have refactors

**2. Time-Boxing Approach:**
- Allocate 20% of sprint capacity to technical debt
- Reserve specific time slots (e.g., "Tech Debt Fridays")
- Prevents debt from being perpetually deprioritized
- Ensures continuous improvement

**3. Include in Sprint Planning:**
- Add debt items to backlog with clear acceptance criteria
- Estimate effort like feature work
- Balance debt with feature delivery
- Make debt visible to stakeholders

**4. ROI-Based Prioritization:**
- Calculate return on investment for refactors:
  - **Impact:** How much does it slow development? How many bugs does it cause?
  - **Effort:** How long to fix?
  - **Risk:** What breaks if we don't fix it?
- Prioritize high-impact, low-effort items first

**5. Prevent New Debt:**
- Code review standards
- Automated linting and quality gates
- "Boy Scout Rule": Leave code better than you found it
- Refactor as you go (small, continuous improvements)

**6. Automate Recurring Work:**
- Automate tests to reduce manual testing debt
- Infrastructure as Code to reduce deployment debt
- CI/CD to reduce integration debt
- Documentation generation to reduce knowledge debt

**7. Track Debt Metrics:**
- Code complexity (cyclomatic complexity)
- Test coverage trends
- Dependency age and vulnerabilities
- Build/test execution time

**8. Communicate Impact:**
- Show how debt slows feature delivery
- Quantify cost of bugs caused by debt
- Demonstrate improvements after paying down debt
- Get stakeholder buy-in for debt work

---

## Q6: How would you introduce and roll out trunk-based development or branching strategy changes?

**Answer:**

**Phased Rollout Strategy:**

**Phase 1: Education & Buy-In (Week 1-2)**
- Present benefits: Faster integration, fewer merge conflicts, better CI
- Address concerns: "What about incomplete features?" (feature flags)
- Show success stories from other teams/companies
- Get leadership support

**Phase 2: Pilot with Small Team (Week 3-4)**
- Select 1-2 teams (5-10 engineers) for pilot
- Provide training on trunk-based development
- Set up necessary tooling: feature flags, CI improvements
- Establish metrics baseline: merge conflicts, lead time, deployment frequency

**Phase 3: Establish Practices (Week 5-6)**
- **Short-lived branches:** Max 1-2 days, ideally < 24 hours
- **Small commits:** Frequent integration to main
- **Feature flags:** Hide incomplete features
- **Strong CI:** Fast, reliable tests that run on every commit
- **Pair programming:** For complex changes

**Phase 4: Tooling & Infrastructure (Week 7-8)**
- Improve CI speed: Parallel tests, better caching
- Set up feature flag system (LaunchDarkly, Unleash)
- Implement branch protection rules
- Automated checks: tests, linting, security scans

**Phase 5: Progressive Expansion (Week 9-12)**
- Add 2-3 more teams
- Share learnings from pilot team
- Adjust practices based on feedback
- Monitor metrics: Are we seeing improvements?

**Phase 6: Organization-Wide Rollout (Month 4+)**
- Mandate trunk-based development for new projects
- Migrate existing projects gradually
- Provide ongoing support and training
- Celebrate wins and share metrics

**Key Success Factors:**

**1. Strong CI/CD:**
- Tests must be fast (< 10 minutes)
- Tests must be reliable (no flaky tests)
- Automated deployment to staging
- Quick rollback capability

**2. Feature Flags:**
- Essential for hiding incomplete work
- Allows deployment without release
- Enables A/B testing and gradual rollouts
- Requires flag management discipline

**3. Cultural Shift:**
- Embrace small, frequent commits
- Trust in automated tests
- Continuous integration mindset
- Collaborative code review

**4. Monitoring & Metrics:**
- Track deployment frequency (should increase)
- Track lead time (should decrease)
- Track merge conflicts (should decrease)
- Track change failure rate (should stay stable or improve)

**Rollback Plan:**
- If metrics degrade, pause rollout
- Investigate root causes
- Address tooling or process gaps
- Resume when issues resolved

