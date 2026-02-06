# Security — Interview Questions & Detailed Answers

## Q1: Describe a threat model for a customer-facing web app and prioritize mitigations.

**Answer:**

**Threat Modeling Process:**

**1. Identify Assets:**
- User credentials (passwords, tokens)
- Personal data (PII, payment info)
- Business data (orders, transactions)
- Application code and secrets
- Infrastructure (servers, databases)

**2. Identify Threat Actors:**
- **External attackers:** Hackers, bots, competitors
- **Malicious users:** Account takeover, fraud
- **Insiders:** Employees with access
- **Supply chain:** Compromised dependencies

**3. Entry Points & Attack Vectors:**
- **Web application:** XSS, CSRF, injection attacks
- **APIs:** Authentication bypass, data exposure
- **Authentication:** Brute force, credential stuffing
- **Infrastructure:** DDoS, server vulnerabilities
- **Third-party services:** Compromised integrations

**4. Threat Scenarios (STRIDE Framework):**

**Spoofing:**
- Attacker impersonates legitimate user
- Weak authentication, stolen credentials

**Tampering:**
- Modify data in transit or at rest
- Man-in-the-middle attacks, SQL injection

**Repudiation:**
- User denies performing action
- Lack of audit logs

**Information Disclosure:**
- Unauthorized data access
- Exposed APIs, misconfigured S3 buckets

**Denial of Service:**
- Make service unavailable
- DDoS attacks, resource exhaustion

**Elevation of Privilege:**
- Gain unauthorized access
- Privilege escalation, broken access control

**5. Risk Assessment (Impact × Likelihood):**

| Threat | Impact | Likelihood | Risk Score | Priority |
|--------|--------|------------|------------|----------|
| SQL Injection | High | Medium | High | 1 |
| XSS | High | High | Critical | 1 |
| Credential Stuffing | High | High | Critical | 1 |
| DDoS | Medium | Medium | Medium | 2 |
| Insider Threat | High | Low | Medium | 2 |
| Supply Chain | High | Low | Medium | 3 |

**6. Prioritized Mitigations:**

**Critical Priority (Implement Immediately):**

**1. Strong Authentication:**
- Multi-factor authentication (MFA) for all users
- Password complexity requirements
- Rate limiting on login attempts
- Account lockout after failed attempts
- CAPTCHA for suspicious activity

**2. Input Validation & Output Encoding:**
- Sanitize all user inputs
- Use parameterized queries (prevent SQL injection)
- Encode output (prevent XSS)
- Validate file uploads (type, size, content)

**3. HTTPS Everywhere:**
- TLS 1.3 for all connections
- HSTS headers to enforce HTTPS
- Secure cookies (HttpOnly, Secure, SameSite)

**4. Secrets Management:**
- Use secrets manager (AWS Secrets Manager, HashiCorp Vault)
- Rotate credentials regularly
- Never hardcode secrets in code
- Encrypt secrets at rest

**5. Monitoring & Logging:**
- Log all authentication attempts
- Monitor for suspicious patterns
- Set up alerts for anomalies
- Centralized logging (ELK, Splunk)

**High Priority (Implement Soon):**

**6. Authorization & Access Control:**
- Principle of least privilege
- Role-based access control (RBAC)
- Verify permissions on every request
- Audit access logs regularly

**7. API Security:**
- API keys with rate limiting
- OAuth 2.0 for third-party access
- Input validation on all endpoints
- Versioning and deprecation strategy

**8. DDoS Protection:**
- CDN with DDoS mitigation (Cloudflare, AWS Shield)
- Rate limiting at application level
- Auto-scaling to handle spikes

**Medium Priority (Plan for Implementation):**

**9. Security Testing:**
- Regular penetration testing
- Automated security scans (SAST, DAST)
- Dependency vulnerability scanning
- Bug bounty program

**10. Incident Response Plan:**
- Define roles and responsibilities
- Runbooks for common incidents
- Communication plan
- Post-incident review process

---

## Q2: How would you design authentication and authorization for microservices? (OAuth, JWT, token revocation)

**Answer:**

**Authentication & Authorization Architecture:**

**1. Centralized Identity Provider (IdP):**

Use OpenID Connect (OIDC) / OAuth 2.0 for authentication:
- **Identity Provider:** Auth0, Okta, AWS Cognito, or custom
- **Single source of truth** for user identities
- **SSO (Single Sign-On)** across all services

**Authentication Flow:**

```
1. User → Login Request → Identity Provider
2. IdP validates credentials (username/password + MFA)
3. IdP issues tokens:
   - ID Token (user identity)
   - Access Token (API access)
   - Refresh Token (get new access token)
4. Client stores tokens securely
5. Client includes Access Token in API requests
```

**2. Token-Based Authentication (JWT):**

**Access Token Structure:**
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user123",
    "email": "user@example.com",
    "roles": ["user", "admin"],
    "scopes": ["read:orders", "write:orders"],
    "iss": "https://auth.example.com",
    "aud": "api.example.com",
    "exp": 1640000000,
    "iat": 1639996400
  },
  "signature": "..."
}
```

**Token Characteristics:**
- **Short-lived:** 15-60 minutes (limits damage if compromised)
- **Stateless:** No server-side session storage
- **Signed:** Verify authenticity (RS256 or HS256)
- **Contains claims:** User ID, roles, permissions

**3. Authorization Strategies:**

**Option A: Token-Based Authorization (Scopes/Claims)**
- Include permissions in JWT claims
- Each service validates token and checks scopes
- **Pros:** Fast, no additional service calls
- **Cons:** Tokens can become large, permissions not updated until refresh

**Option B: Centralized Policy Service**
- Services call authorization service to check permissions
- Use Open Policy Agent (OPA) or custom service
- **Pros:** Dynamic permissions, fine-grained control
- **Cons:** Additional latency, single point of failure

**Hybrid Approach (Recommended):**
- Coarse-grained permissions in JWT (roles)
- Fine-grained permissions via policy service for sensitive operations

**4. Service-to-Service Authentication:**

**Option A: Service Accounts with JWT:**
- Each service has its own credentials
- Services obtain tokens from IdP
- Include service identity in token

**Option B: Mutual TLS (mTLS):**
- Services authenticate using certificates
- Service mesh (Istio, Linkerd) handles mTLS automatically
- **Pros:** Strong authentication, encrypted communication
- **Cons:** Certificate management complexity

**5. Token Revocation Strategies:**

**Challenge:** JWTs are stateless, can't be revoked directly

**Solution 1: Short-Lived Tokens + Refresh Tokens**
- Access tokens expire quickly (15 min)
- Refresh tokens stored server-side
- Revoke refresh token to prevent new access tokens
- **Limitation:** Existing access tokens valid until expiry

**Solution 2: Token Introspection**
- Maintain revocation list (Redis, database)
- Services check if token is revoked on each request
- **Trade-off:** Adds latency, requires state

**Solution 3: Session Store**
- Store active sessions in Redis
- Check session validity on each request
- Revoke by deleting session
- **Trade-off:** No longer stateless

**Recommended Approach:**
- Short-lived access tokens (15 min)
- Refresh tokens with revocation capability
- Revocation list for critical operations
- Audit log of all token issuance and revocation

**6. Authorization Models:**

**RBAC (Role-Based Access Control):**
- Users assigned roles (admin, user, moderator)
- Roles have permissions
- Simple, easy to understand
- **Use when:** Clear role hierarchy

**ABAC (Attribute-Based Access Control):**
- Permissions based on attributes (user, resource, environment)
- More flexible than RBAC
- **Example:** "Allow if user.department == resource.department"
- **Use when:** Complex permission logic

**7. Security Best Practices:**

- **Validate tokens on every request**
- **Use HTTPS for all communication**
- **Store tokens securely** (HttpOnly cookies or secure storage)
- **Implement rate limiting** on auth endpoints
- **Log all authentication/authorization events**
- **Regular security audits** of permissions
- **Principle of least privilege**

---

## Q3: Explain common causes of XSS, CSRF, and how to prevent them.

**Answer:**

**Cross-Site Scripting (XSS):**

**What is XSS?**
Attacker injects malicious scripts into web pages viewed by other users.

**Types of XSS:**

**1. Stored XSS (Persistent):**
- Malicious script stored in database
- Executed when other users view the page
- **Example:** Comment with `<script>` tag steals cookies

**2. Reflected XSS:**
- Malicious script in URL parameter
- Server reflects it back in response
- **Example:** Search query with script tag

**3. DOM-Based XSS:**
- Client-side JavaScript processes untrusted data
- No server involvement
- **Example:** `document.write(location.hash)`

**Common Causes:**
- Unsanitized user input rendered in HTML
- Using `innerHTML` with user data
- Unsafe use of `eval()` or `Function()`
- Missing output encoding

**Prevention:**

**1. Output Encoding:**
- Encode HTML entities: `<` → `&lt;`, `>` → `&gt;`
- Use framework's built-in escaping (React, Angular auto-escape)
- Context-aware encoding (HTML, JavaScript, URL, CSS)

**2. Content Security Policy (CSP):**
```html
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com; object-src 'none'
```
- Whitelist allowed script sources
- Block inline scripts (unless nonce/hash used)
- Prevent `eval()` and similar

**3. Input Validation:**
- Validate input format (email, phone, etc.)
- Reject unexpected characters
- Use allowlist, not blocklist

**4. Use Safe APIs:**
- Avoid `innerHTML`, use `textContent`
- Avoid `eval()`, `Function()`, `setTimeout(string)`
- Use `createElement()` and `setAttribute()`

**5. Sanitize HTML (if needed):**
- Use DOMPurify library
- Remove dangerous tags and attributes
- Only when you need to allow some HTML

**Cross-Site Request Forgery (CSRF):**

**What is CSRF?**
Attacker tricks user into performing unwanted actions on a site where they're authenticated.

**How it works:**
1. User logs into bank.com
2. User visits malicious site evil.com
3. evil.com contains: `<img src="https://bank.com/transfer?to=attacker&amount=1000">`
4. Browser automatically includes bank.com cookies
5. Transfer executes without user's knowledge

**Common Causes:**
- State-changing operations via GET requests
- Missing CSRF protection
- Relying only on cookies for authentication

**Prevention:**

**1. CSRF Tokens (Synchronizer Token Pattern):**
- Generate unique token per session/request
- Include token in forms and AJAX requests
- Server validates token on submission
- Tokens should be unpredictable and tied to user session

**Example:**
```html
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="random_token_here">
  <input name="amount" value="100">
  <button type="submit">Transfer</button>
</form>
```

**2. SameSite Cookies:**
```
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly
```
- **Strict:** Cookie never sent on cross-site requests
- **Lax:** Cookie sent on top-level navigation (GET only)
- **None:** Cookie sent on all requests (requires Secure)

**3. Custom Headers for AJAX:**
- Require custom header (e.g., `X-Requested-With: XMLHttpRequest`)
- Cross-origin requests can't set custom headers without CORS
- Server rejects requests without header

**4. Verify Origin/Referer Headers:**
- Check `Origin` or `Referer` header
- Ensure request comes from your domain
- **Limitation:** Headers can be missing or spoofed

**5. Use POST for State Changes:**
- Never use GET for state-changing operations
- GET should be safe and idempotent

**6. Re-authentication for Sensitive Actions:**
- Require password for critical operations
- Use MFA for high-value transactions

**Comparison:**

| Aspect | XSS | CSRF |
|--------|-----|------|
| **Attack** | Inject malicious script | Trick user into unwanted action |
| **Target** | Other users | Authenticated user |
| **Prevention** | Output encoding, CSP | CSRF tokens, SameSite cookies |
| **Impact** | Steal data, hijack session | Unauthorized actions |

---

## Q4: How do you secure secrets in CI/CD and runtime environments? (KMS, vaults, least privilege)

**Answer:**

**Secrets Management Strategy:**

**1. Never Store Secrets in Code:**

**Bad Practices:**
- Hardcoded in source code
- Committed to Git repository
- In configuration files in repo
- In Docker images

**Why it's bad:**
- Exposed in version history
- Visible to anyone with repo access
- Hard to rotate
- Leaked in logs or error messages

**2. Use Secrets Manager:**

**Options:**
- **AWS Secrets Manager** - Managed service, automatic rotation
- **HashiCorp Vault** - Open source, dynamic secrets
- **Azure Key Vault** - Azure-native solution
- **Google Secret Manager** - GCP solution

**Benefits:**
- Centralized secret storage
- Encryption at rest and in transit
- Access control and auditing
- Automatic rotation
- Versioning

**3. CI/CD Pipeline Security:**

**Storing Secrets in CI/CD:**
- Use CI/CD platform's secret management (GitHub Secrets, GitLab CI/CD Variables)
- Encrypt secrets at rest
- Mask secrets in logs
- Limit access to secrets (only specific jobs/branches)

**Example (GitHub Actions):**
```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
        run: ./deploy.sh
```

**Best Practices:**
- **Separate secrets per environment** (dev, staging, prod)
- **Rotate secrets regularly** (every 90 days)
- **Audit secret access** (who accessed what, when)
- **Use short-lived credentials** where possible

**4. Runtime Environment Security:**

**Option A: Environment Variables (from Secrets Manager)**
```bash
# Fetch from AWS Secrets Manager at container startup
export DB_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/db/password --query SecretString --output text)
```

**Option B: Secret Volumes (Kubernetes)**
```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
    volumeMounts:
    - name: secrets
      mountPath: "/etc/secrets"
      readOnly: true
  volumes:
  - name: secrets
    secret:
      secretName: app-secrets
```

**Option C: Dynamic Secrets (Vault)**
- Application requests credentials from Vault
- Vault generates short-lived credentials
- Credentials automatically expire
- **Use for:** Database credentials, API keys

**5. Least Privilege Access:**

**IAM Roles (AWS):**
- Assign minimal permissions needed
- Use IAM roles, not access keys
- Separate roles per service/environment
- Regular access reviews

**Example:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "secretsmanager:GetSecretValue"
    ],
    "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db/*"
  }]
}
```

**6. Secret Rotation:**

**Automated Rotation:**
- Schedule regular rotation (every 30-90 days)
- Use secrets manager's automatic rotation
- Update all services simultaneously
- Zero-downtime rotation strategy

**Rotation Process:**
1. Generate new secret
2. Update secrets manager
3. Deploy new secret to all services
4. Verify all services using new secret
5. Revoke old secret

**7. Auditing & Monitoring:**

**What to log:**
- Secret access (who, when, which secret)
- Failed access attempts
- Secret creation/deletion
- Rotation events

**Alerts:**
- Unusual access patterns
- Failed authentication
- Secrets accessed from unexpected IPs
- Secrets not rotated in X days

**8. Development Environment:**

**Local Development:**
- Use `.env` files (never commit to Git)
- Add `.env` to `.gitignore`
- Provide `.env.example` with dummy values
- Use tools like `dotenv` to load secrets

**Sharing Secrets with Team:**
- Use 1Password, LastPass for team secrets
- Encrypt secrets before sharing
- Use secure channels (not Slack, email)

**9. Secrets in Logs:**

**Prevention:**
- Mask secrets in application logs
- Configure logging libraries to redact sensitive data
- Review logs for accidental exposure
- Use structured logging

**Example (Node.js):**
```javascript
// Bad
console.log('Database URL:', process.env.DATABASE_URL);

// Good
console.log('Database connection established');
```

---

## Q5: Describe how you'd detect and respond to a data breach — key steps and stakeholders.

**Answer:**

**Data Breach Response Plan:**

**Phase 1: Detection (Immediate)**

**Detection Methods:**
- **Intrusion Detection Systems (IDS):** Unusual network traffic
- **Log Analysis:** Failed login attempts, unusual access patterns
- **Anomaly Detection:** ML-based detection of abnormal behavior
- **User Reports:** Customers reporting suspicious activity
- **Third-Party Alerts:** Security researchers, bug bounty
- **Automated Alerts:** SIEM (Splunk, ELK) triggers

**Indicators of Compromise:**
- Unusual database queries
- Large data exports
- Access from unusual locations/IPs
- Privilege escalation attempts
- Disabled security controls
- Unexpected outbound traffic

**Phase 2: Containment (First Hour)**

**Immediate Actions:**
1. **Isolate affected systems** - Disconnect from network
2. **Preserve evidence** - Take snapshots, save logs
3. **Activate incident response team**
4. **Stop the breach** - Close attack vector
5. **Assess scope** - What data was accessed?

**Stakeholders to Notify:**
- **Incident Response Team:** Security, DevOps, Engineering
- **Executive Leadership:** CEO, CTO, CISO
- **Legal Team:** Assess legal obligations
- **PR/Communications:** Prepare external communication
- **Customer Support:** Prepare for user inquiries

**Phase 3: Investigation (First 24 Hours)**

**Forensic Analysis:**
- Review access logs (who, what, when)
- Analyze attack vector (how did they get in?)
- Identify compromised accounts
- Determine data exfiltrated
- Timeline of events

**Questions to Answer:**
- What data was accessed/stolen?
- How many users affected?
- How did attacker gain access?
- When did breach occur?
- Is breach still ongoing?

**Phase 4: Eradication (Days 1-3)**

**Remove Threat:**
1. **Patch vulnerabilities** - Fix security holes
2. **Remove malware** - Clean infected systems
3. **Revoke compromised credentials** - Rotate all secrets
4. **Close backdoors** - Remove attacker access
5. **Update security rules** - Prevent re-entry

**Credential Rotation:**
- Database passwords
- API keys
- SSH keys
- Service account credentials
- User passwords (force reset)

**Phase 5: Recovery (Days 3-7)**

**Restore Services:**
1. **Rebuild compromised systems** - From clean backups
2. **Verify security** - Scan for vulnerabilities
3. **Restore data** - From backups if needed
4. **Monitor closely** - Watch for re-infection
5. **Gradual restoration** - Staged rollout

**Phase 6: Notification (Varies by Jurisdiction)**

**Legal Requirements:**
- **GDPR:** 72 hours to notify authorities
- **CCPA:** Without unreasonable delay
- **HIPAA:** 60 days for breaches > 500 people
- **State laws:** Vary by state

**Who to Notify:**
- **Affected users:** Email, in-app notification
- **Regulatory authorities:** Data protection agencies
- **Law enforcement:** FBI, local police
- **Credit bureaus:** If financial data compromised
- **Business partners:** If their data affected

**Communication Template:**
```
Subject: Important Security Notice

We are writing to inform you of a security incident that may have affected your data.

What happened: [Brief description]
What data was affected: [Specific data types]
What we're doing: [Actions taken]
What you should do: [User actions - change password, monitor accounts]
How to contact us: [Support contact]
```

**Phase 7: Post-Incident Review (Week 2)**

**Post-Mortem:**
- **Timeline:** Detailed sequence of events
- **Root cause:** Why did breach occur?
- **Response effectiveness:** What worked? What didn't?
- **Lessons learned:** How to prevent future breaches?
- **Action items:** Security improvements needed

**Improvements:**
- Implement additional security controls
- Update incident response plan
- Conduct security training
- Increase monitoring
- Regular security audits

**Stakeholder Roles:**

| Role | Responsibilities |
|------|------------------|
| **CISO/Security Lead** | Overall incident command, decision making |
| **DevOps/SRE** | System isolation, forensics, recovery |
| **Engineering** | Patch vulnerabilities, implement fixes |
| **Legal** | Regulatory compliance, legal obligations |
| **PR/Communications** | External communication, media relations |
| **Customer Support** | Handle user inquiries, provide updates |
| **Executive Team** | Strategic decisions, stakeholder communication |
| **HR** | If insider threat, employee investigation |

**Metrics to Track:**
- **Time to detect:** How long until breach discovered?
- **Time to contain:** How long to stop breach?
- **Time to recover:** How long to restore services?
- **Number of records affected**
- **Cost of breach** (remediation, legal, reputation)

---

## Q6: What security metrics and alerts should a lead track for production services?

**Answer:**

**Authentication & Access Metrics:**

**1. Failed Login Attempts:**
- **Metric:** Count of failed logins per minute/hour
- **Alert:** > 100 failed attempts in 5 minutes (potential brute force)
- **Action:** Rate limiting, account lockout, CAPTCHA

**2. Successful Logins from New Locations:**
- **Metric:** Logins from IPs/countries not seen before
- **Alert:** Login from high-risk country
- **Action:** Require MFA, notify user

**3. Privilege Escalation:**
- **Metric:** Users gaining admin/elevated permissions
- **Alert:** Any privilege change
- **Action:** Review and approve, audit log

**4. Account Lockouts:**
- **Metric:** Number of locked accounts
- **Alert:** Spike in lockouts (potential attack)
- **Action:** Investigate pattern

**Application Security Metrics:**

**5. Unusual Traffic Patterns:**
- **Metric:** Requests per second, unusual endpoints
- **Alert:** 3x normal traffic, access to admin endpoints
- **Action:** Rate limiting, block suspicious IPs

**6. Error Rates:**
- **Metric:** 4xx and 5xx error rates
- **Alert:** > 5% error rate
- **Action:** Investigate cause (attack or bug?)

**7. SQL Injection Attempts:**
- **Metric:** Requests with SQL keywords in parameters
- **Alert:** Any detected SQL injection attempt
- **Action:** Block IP, review input validation

**8. XSS Attempts:**
- **Metric:** Requests with script tags or JavaScript
- **Alert:** Any detected XSS attempt
- **Action:** Block, review output encoding

**Dependency & Vulnerability Metrics:**

**9. Known Vulnerabilities:**
- **Metric:** Number of CVEs in dependencies
- **Alert:** Any critical (CVSS > 9.0) vulnerability
- **Action:** Patch immediately

**10. Dependency Age:**
- **Metric:** Days since last dependency update
- **Alert:** > 90 days without update
- **Action:** Review and update dependencies

**11. Unpatched Systems:**
- **Metric:** Systems without latest security patches
- **Alert:** Any system > 30 days behind
- **Action:** Schedule patching

**Secrets & Credentials Metrics:**

**12. Secret Rotation Lag:**
- **Metric:** Days since last secret rotation
- **Alert:** > 90 days without rotation
- **Action:** Rotate secrets

**13. Hardcoded Secrets:**
- **Metric:** Secrets found in code/config
- **Alert:** Any hardcoded secret detected
- **Action:** Remove, use secrets manager

**14. Failed Secret Access:**
- **Metric:** Failed attempts to access secrets
- **Alert:** > 10 failed attempts
- **Action:** Investigate, potential breach

**Incident Response Metrics:**

**15. Mean Time to Detect (MTTD):**
- **Metric:** Time from breach to detection
- **Target:** < 1 hour
- **Improvement:** Better monitoring, anomaly detection

**16. Mean Time to Respond (MTTR):**
- **Metric:** Time from detection to containment
- **Target:** < 4 hours for critical
- **Improvement:** Automated response, runbooks

**17. Mean Time to Recover:**
- **Metric:** Time from incident to full recovery
- **Target:** < 24 hours
- **Improvement:** Better backups, automation

**Compliance & Audit Metrics:**

**18. Audit Log Completeness:**
- **Metric:** % of actions logged
- **Target:** 100% for security-relevant actions
- **Action:** Ensure comprehensive logging

**19. Access Review Completion:**
- **Metric:** % of users reviewed quarterly
- **Target:** 100%
- **Action:** Regular access audits

**20. Security Training Completion:**
- **Metric:** % of team completed security training
- **Target:** 100% annually
- **Action:** Mandatory training program

**Dashboard Example:**

```
Security Dashboard

Authentication:
- Failed Logins (last hour): 45 ✅
- New Location Logins: 2 ⚠️
- Privilege Changes: 0 ✅

Vulnerabilities:
- Critical CVEs: 0 ✅
- High CVEs: 3 ⚠️
- Unpatched Systems: 1 ⚠️

Secrets:
- Secrets > 90 days old: 2 ⚠️
- Failed Secret Access: 0 ✅

Incidents:
- MTTD: 45 min ✅
- MTTR: 3.2 hours ✅
- Open Incidents: 1 ⚠️
```

**Alerting Strategy:**

**Critical (Page On-Call):**
- Active breach detected
- Critical vulnerability (CVSS > 9.0)
- Mass data exfiltration
- Privilege escalation

**High (Notify Team):**
- Unusual traffic patterns
- Failed login spike
- Unpatched critical systems

**Medium (Daily Digest):**
- Dependency updates available
- Secret rotation due
- Access review needed

---

## Q7: How do you evaluate third-party dependencies for supply-chain risks?

**Answer:**

**Dependency Evaluation Framework:**

**1. Initial Assessment:**

**Maintainership:**
- **Active maintenance:** Last commit < 6 months ago
- **Responsive maintainers:** Issues/PRs addressed promptly
- **Multiple maintainers:** Not single point of failure
- **Organization-backed:** Company or foundation support

**Red Flags:**
- Abandoned project (no updates in years)
- Single maintainer (bus factor = 1)
- Unresponsive to security issues
- Frequent maintainer changes

**2. Security History:**

**CVE Analysis:**
- Check CVE database for known vulnerabilities
- How quickly were vulnerabilities patched?
- Severity of past vulnerabilities
- Frequency of security issues

**Tools:**
- `npm audit`, `yarn audit`
- Snyk, WhiteSource, Dependabot
- GitHub Security Advisories

**3. Release Cadence:**

**Healthy Patterns:**
- Regular releases (monthly/quarterly)
- Semantic versioning followed
- Changelog maintained
- Security patches released promptly

**Warning Signs:**
- Irregular releases
- Breaking changes in patches
- No changelog
- Delayed security fixes

**4. Code Quality:**

**Review:**
- Read source code (especially for critical dependencies)
- Check test coverage
- Look for security best practices
- Review recent commits

**Automated Checks:**
- Linting/code quality scores
- Test coverage reports
- Static analysis results

**5. Licensing:**

**Verify:**
- Compatible with your project license
- No viral licenses (GPL) if incompatible
- License file present
- No license changes in recent versions

**Tools:**
- `license-checker`
- FOSSA, Black Duck

**6. Popularity & Community:**

**Indicators:**
- GitHub stars (> 1000 for critical deps)
- npm downloads (weekly)
- Active community (issues, discussions)
- Used by reputable projects

**Caution:**
- Popularity ≠ security
- Typosquatting attacks target popular packages

**7. Supply Chain Security:**

**Package Integrity:**
- Verify package signatures
- Check for unexpected changes
- Review package.json scripts (pre/post install)
- Use lock files (package-lock.json, yarn.lock)

**Dependency Tree:**
- Review transitive dependencies
- Limit dependency depth
- Watch for suspicious sub-dependencies

**8. Operational Practices:**

**Pin Versions:**
```json
{
  "dependencies": {
    "express": "4.18.2",  // Exact version
    "lodash": "~4.17.21"  // Patch updates only
  }
}
```

**Automated Scanning:**
- Run `npm audit` in CI/CD
- Dependabot/Renovate for automatic updates
- Fail builds on critical vulnerabilities

**Vendor Packages:**
- Copy critical dependencies into your repo
- Reduces external dependency
- **Trade-off:** Manual updates needed

**9. Alternatives & Replacement Plan:**

**Evaluate:**
- Identify alternative packages
- Can you build it yourself?
- Cost/benefit of dependency vs custom code

**Replacement Plan:**
- Document how to replace dependency
- Estimate effort required
- Maintain list of alternatives

**10. Continuous Monitoring:**

**Ongoing:**
- Subscribe to security advisories
- Monitor CVE databases
- Track dependency health metrics
- Regular dependency audits (quarterly)

**Metrics to Track:**
- Number of dependencies
- Average dependency age
- Known vulnerabilities
- Update frequency

**Decision Matrix:**

| Factor | Weight | Score (1-10) | Weighted Score |
|--------|--------|--------------|----------------|
| Maintainership | 25% | 8 | 2.0 |
| Security History | 30% | 9 | 2.7 |
| Release Cadence | 15% | 7 | 1.05 |
| Code Quality | 15% | 8 | 1.2 |
| Community | 10% | 9 | 0.9 |
| License | 5% | 10 | 0.5 |
| **Total** | **100%** | | **8.35** |

**Threshold:** > 7.0 to approve dependency

**Example Evaluation:**

**Package: `lodash`**
- ✅ Active maintenance (frequent updates)
- ✅ Strong security track record
- ✅ Regular releases
- ✅ High code quality
- ✅ Very popular (50M+ weekly downloads)
- ✅ MIT license
- **Decision:** Approve

**Package: `random-unmaintained-lib`**
- ❌ Last update 3 years ago
- ❌ Known vulnerabilities unpatched
- ❌ Single maintainer, inactive
- ❌ No tests
- ❌ 100 weekly downloads
- ⚠️ Unclear license
- **Decision:** Reject, find alternative

