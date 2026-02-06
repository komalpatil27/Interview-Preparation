# Infrastructure & Cloud Complete Guide

## Docker

### L2 - Docker Basics

**Docker Workflow:**
```bash
# 1. Build image from Dockerfile
docker build -t myapp:1.0 .

# 2. Run container from image
docker run -d -p 3000:3000 --name myapp-container myapp:1.0

# 3. View running containers
docker ps

# 4. Stop container
docker stop myapp-container

# 5. Remove container
docker rm myapp-container
```

**up vs run vs start:**
```bash
# docker-compose up
# - Creates and starts containers
# - Builds images if needed
docker-compose up

# docker run
# - Creates and starts a single container
docker run -d nginx

# docker start
# - Starts existing stopped container
docker start myapp-container
```

**Container States:**
- **running** - Container is executing
- **paused** - Container execution is paused
- **restarting** - Container is restarting
- **exited** - Container has stopped
- **dead** - Container failed to stop

```bash
# Check container state
docker ps -a

# Pause container
docker pause myapp-container

# Unpause
docker unpause myapp-container

# Restart
docker restart myapp-container
```

### L3 - Docker Advanced

**Dockerfile:**
```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Run application
CMD ["node", "index.js"]
```

**Multi-stage Build:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
      - redis
    networks:
      - app-network
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network
  
  redis:
    image: redis:7-alpine
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

**Light Virtualization:**
- Containers share host OS kernel
- Faster startup than VMs
- Less resource overhead
- Isolated processes

### L4 - Docker Networks

**Network Types:**
```bash
# 1. Bridge (default)
# - Containers on same host can communicate
docker network create my-bridge
docker run --network my-bridge nginx

# 2. None
# - No network access
docker run --network none nginx

# 3. Host
# - Use host's network directly
docker run --network host nginx

# 4. Overlay
# - Multi-host networking (Docker Swarm)
docker network create --driver overlay my-overlay
```

**Network Commands:**
```bash
# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Connect container to network
docker network connect my-network container-name

# Disconnect
docker network disconnect my-network container-name
```


## AWS (Amazon Web Services)

### L1 - AWS Basics

**Core Services:**

**1. EC2 (Elastic Compute Cloud):**
```bash
# Virtual servers in the cloud
# - Choose instance type (t2.micro, t3.medium, etc.)
# - Select AMI (Amazon Machine Image)
# - Configure security groups
# - Launch instance
```

**2. S3 (Simple Storage Service):**
```javascript
// Upload file to S3
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
  Bucket: 'my-bucket',
  Key: 'file.txt',
  Body: 'Hello World'
};

s3.upload(params, (err, data) => {
  console.log('Uploaded:', data.Location);
});

// Download file
s3.getObject({
  Bucket: 'my-bucket',
  Key: 'file.txt'
}, (err, data) => {
  console.log(data.Body.toString());
});
```

**3. Lambda (Serverless Functions):**
```javascript
// Lambda function
exports.handler = async (event) => {
  console.log('Event:', event);
  
  // Process event
  const result = await processData(event);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};

// Trigger Lambda from API Gateway, S3, DynamoDB, etc.
```

### L2 - Cloud Infrastructure

**Cloud vs On-Premise:**

| Feature | Cloud | On-Premise |
|---------|-------|------------|
| Cost | Pay-as-you-go | High upfront |
| Scalability | Auto-scaling | Manual |
| Maintenance | Managed | Self-managed |
| Availability | High (99.9%+) | Depends |
| Security | Shared responsibility | Full control |

**Auto Scaling:**
```javascript
// AWS Auto Scaling Group
{
  "MinSize": 2,
  "MaxSize": 10,
  "DesiredCapacity": 4,
  "ScalingPolicies": [
    {
      "PolicyName": "scale-up",
      "AdjustmentType": "ChangeInCapacity",
      "ScalingAdjustment": 2,
      "Cooldown": 300
    }
  ]
}
```

**Running Node.js on VPS:**
```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install PM2 (Process Manager)
npm install -g pm2

# 3. Start application
pm2 start app.js --name myapp

# 4. Configure PM2 to start on boot
pm2 startup
pm2 save

# 5. Setup Nginx as reverse proxy
sudo apt install nginx

# /etc/nginx/sites-available/myapp
server {
  listen 80;
  server_name example.com;
  
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# 6. Enable site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### L3 - Serverless & Monitoring

**Serverless vs Serverfull:**

**Serverless (AWS Lambda):**
- No server management
- Pay per execution
- Auto-scaling
- Event-driven
- Cold start latency

**Serverfull (EC2):**
- Full control
- Always running
- Manual scaling
- Predictable performance

**When to use Serverless:**
- Infrequent workloads
- Variable traffic
- Event-driven tasks
- Microservices

**When to use Serverfull:**
- Consistent traffic
- Long-running processes
- Need full control
- Latency-sensitive

**Lambda Example:**
```javascript
// API Gateway → Lambda → DynamoDB
exports.handler = async (event) => {
  const AWS = require('aws-sdk');
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
  const params = {
    TableName: 'Users',
    Key: { id: event.pathParameters.id }
  };
  
  const result = await dynamodb.get(params).promise();
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.Item)
  };
};
```

**Monitoring & Alerting:**
```javascript
// CloudWatch Logs
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

// Send custom metric
cloudwatch.putMetricData({
  Namespace: 'MyApp',
  MetricData: [{
    MetricName: 'RequestCount',
    Value: 1,
    Unit: 'Count',
    Timestamp: new Date()
  }]
}, (err, data) => {
  console.log('Metric sent');
});

// Create alarm
cloudwatch.putMetricAlarm({
  AlarmName: 'HighCPU',
  ComparisonOperator: 'GreaterThanThreshold',
  EvaluationPeriods: 2,
  MetricName: 'CPUUtilization',
  Namespace: 'AWS/EC2',
  Period: 300,
  Statistic: 'Average',
  Threshold: 80,
  ActionsEnabled: true,
  AlarmActions: ['arn:aws:sns:region:account:topic']
});
```

**Health Checks:**
```javascript
// Express health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database
    await db.ping();
    
    // Check Redis
    await redis.ping();
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

### L4 - Advanced Cloud

**CDN (Content Delivery Network):**
```javascript
// CloudFront distribution
{
  "DistributionConfig": {
    "Origins": [{
      "Id": "S3-my-bucket",
      "DomainName": "my-bucket.s3.amazonaws.com"
    }],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-my-bucket",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
    },
    "Enabled": true
  }
}

// Use cases:
// - Serve static assets (images, CSS, JS)
// - Reduce latency (edge locations)
// - Reduce origin server load
// - DDoS protection
```

**IAM (Identity and Access Management):**
```json
// IAM Policy - S3 read-only access
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::my-bucket",
      "arn:aws:s3:::my-bucket/*"
    ]
  }]
}

// IAM Role for Lambda
{
  "Effect": "Allow",
  "Action": [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:PutLogEvents"
  ],
  "Resource": "*"
}
```

**Deployment Strategies:**

**1. Blue-Green Deployment:**
```
Blue (current) → Green (new)
- Deploy to Green
- Test Green
- Switch traffic to Green
- Keep Blue as rollback
```

**2. Canary Deployment:**
```
- Deploy to small subset (5%)
- Monitor metrics
- Gradually increase (10%, 25%, 50%, 100%)
- Rollback if issues
```

**3. A/B Testing:**
```
- Split traffic between versions
- Compare metrics
- Choose winner
```

**Infrastructure as Code (Terraform):**
```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "WebServer"
  }
}

resource "aws_s3_bucket" "assets" {
  bucket = "my-assets-bucket"
  acl    = "private"
}

resource "aws_lambda_function" "api" {
  filename      = "lambda.zip"
  function_name = "my-api"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
}
```

**Kubernetes Basics:**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"

---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

**PaaS vs IaaS:**

**IaaS (Infrastructure as a Service):**
- EC2, VPS
- You manage: OS, runtime, application
- Provider manages: Hardware, networking

**PaaS (Platform as a Service):**
- Heroku, AWS Elastic Beanstalk
- You manage: Application
- Provider manages: OS, runtime, infrastructure

This comprehensive guide covers Docker and Cloud infrastructure!
