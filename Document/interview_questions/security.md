# Security — Interview Questions

- Describe a threat model for a customer-facing web app and prioritize mitigations.
	A: Identify assets, actors, entry points, and attacker capabilities; prioritize by impact×likelihood. Mitigations commonly start with strong auth, input validation, TLS, secrets management, and monitoring.
- How would you design authentication and authorization for microservices? (OAuth, JWT, token revocation)
	A: Use a central identity provider (OIDC/OAuth2) for authentication and short-lived tokens; enforce authorization via scopes/claims or a policy service (RBAC/ABAC). Use token introspection or session store for revocation and audit access.
- Explain common causes of XSS, CSRF, and how to prevent them.
	A: XSS comes from unsanitized user input rendered into pages — prevent with output encoding and CSP. CSRF exploits authenticated sessions — prevent with SameSite cookies, anti-CSRF tokens, or requiring auth headers for state-changing APIs.
- How do you secure secrets in CI/CD and runtime environments? (KMS, vaults, least privilege)
	A: Use a secrets manager (Vault, cloud KMS) with short-lived credentials and automated rotation. Inject secrets at runtime via environment or secret volumes, grant least-privilege IAM roles, and audit accesses. Avoid storing secrets in repo or logs.

- Describe how you'd detect and respond to a data breach — key steps and stakeholders.
	A: Detection via logs, IDS, and anomaly alerts; response: contain, preserve evidence, notify stakeholders, rotate secrets, patch vulnerabilities, and run a post-incident review with action items.
- What security metrics and alerts should a lead track for production services?
	A: Track auth failures, privilege changes, unusual traffic patterns, dependency vulnerabilities, patch/rotation lag, and MTTR for critical vulns.
- How do you evaluate third-party dependencies for supply-chain risks?
	A: Check maintainership, CVE history, release cadence, signatures/licenses; pin versions, scan automatically, and have replacement plans.
