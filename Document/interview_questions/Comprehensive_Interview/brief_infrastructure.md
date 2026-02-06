# Infrastructure & Cloud - Brief Theory

## Docker

**Concepts:**
- **Image:** Blueprint for container (read-only)
- **Container:** Running instance of image
- **Dockerfile:** Instructions to build image
- **Docker Compose:** Define multi-container applications

**Commands:**
- `build` - Create image from Dockerfile
- `run` - Create and start container
- `start` - Start existing container
- `stop` - Stop running container
- `ps` - List containers

**Container States:**
- running - Executing
- paused - Execution paused
- restarting - Restarting
- exited - Stopped
- dead - Failed to stop

**Multi-stage Build:** Optimize image size by using multiple FROM statements

**Light Virtualization:**
- Containers share host OS kernel
- Faster startup than VMs
- Less resource overhead
- Isolated processes

## Docker Networks

**Types:**
- **Bridge (default):** Containers on same host communicate
- **None:** No network access
- **Host:** Use host's network directly
- **Overlay:** Multi-host networking (Swarm)

## AWS Services

**EC2 (Elastic Compute Cloud):**
- Virtual servers in cloud
- Choose instance type, OS, storage
- Pay for what you use

**S3 (Simple Storage Service):**
- Object storage
- Highly durable (99.999999999%)
- Use cases: Static websites, backups, data lakes

**Lambda (Serverless):**
- Run code without managing servers
- Pay per execution
- Event-driven
- Auto-scaling

## Cloud vs On-Premise

**Cloud Advantages:**
- Pay-as-you-go pricing
- Auto-scaling
- High availability
- Managed services
- Global reach

**On-Premise Advantages:**
- Full control
- No internet dependency
- Data sovereignty
- Predictable costs (long-term)

## Auto Scaling

**Horizontal Scaling:** Add more instances

**Vertical Scaling:** Increase instance size

**Auto Scaling Group:**
- Min, max, desired capacity
- Scale based on metrics (CPU, memory, requests)
- Health checks and auto-replacement

## Running Node.js on VPS

**Components:**
- **PM2:** Process manager (auto-restart, clustering)
- **Nginx:** Reverse proxy, load balancer
- **SSL:** HTTPS with Let's Encrypt

**Benefits:**
- Zero-downtime deployments
- Automatic restarts on crash
- Load balancing
- Monitoring

## Serverless vs Serverfull

**Serverless (Lambda):**
- No server management
- Pay per execution
- Auto-scaling
- Cold start latency
- Good for: Infrequent workloads, variable traffic

**Serverfull (EC2):**
- Full control
- Always running
- Manual scaling
- Predictable performance
- Good for: Consistent traffic, long-running processes

## Monitoring & Alerting

**CloudWatch:**
- Collect metrics
- Set alarms
- View logs
- Create dashboards

**Health Checks:**
- Endpoint that returns service status
- Check database, cache, external services
- Return 200 if healthy, 503 if unhealthy

**Alerting:**
- Set thresholds (CPU > 80%, errors > 10/min)
- Notify via email, SMS, Slack
- Auto-remediation (restart service, scale up)

## CDN (Content Delivery Network)

**Purpose:** Serve content from edge locations close to users

**Benefits:**
- Reduced latency
- Lower bandwidth costs
- DDoS protection
- Offload origin server

**Use Cases:** Static assets (images, CSS, JS), video streaming

## IAM (Identity and Access Management)

**Concepts:**
- **Users:** Individual accounts
- **Groups:** Collection of users
- **Roles:** Temporary credentials for services
- **Policies:** Define permissions (JSON)

**Principle of Least Privilege:** Grant minimum permissions needed

## Deployment Strategies

**Blue-Green:**
- Two identical environments (Blue = current, Green = new)
- Deploy to Green, test, switch traffic
- Easy rollback (switch back to Blue)

**Canary:**
- Deploy to small subset (5%)
- Monitor metrics
- Gradually increase (10%, 25%, 50%, 100%)
- Rollback if issues

**A/B Testing:**
- Split traffic between versions
- Compare metrics
- Choose winner

## Infrastructure as Code

**Benefits:**
- Version control
- Reproducible
- Automated
- Documentation

**Tools:**
- **Terraform:** Multi-cloud, declarative
- **CloudFormation:** AWS-specific
- **Pulumi:** Use programming languages

## Kubernetes

**Concepts:**
- **Pod:** Smallest deployable unit (one or more containers)
- **Deployment:** Manage replicas of pods
- **Service:** Expose pods to network
- **Ingress:** HTTP routing

**Benefits:**
- Container orchestration
- Auto-scaling
- Self-healing
- Load balancing
- Rolling updates

## PaaS vs IaaS

**IaaS (Infrastructure as a Service):**
- Rent infrastructure (servers, storage, network)
- You manage: OS, runtime, application
- Examples: EC2, VPS

**PaaS (Platform as a Service):**
- Managed platform
- You manage: Application only
- Examples: Heroku, AWS Elastic Beanstalk, Google App Engine
