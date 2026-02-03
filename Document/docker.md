### 1. What is Docker?

Docker provides the ability to package and run an application in a loosely isolated environment called a container. Containers are lightweight, portable, and contain everything needed to run an application, including the code, runtime, system tools, libraries, and settings.

**Key Benefits:**
- Consistency across environments (dev, staging, production)
- Faster deployment and scaling
- Resource efficiency compared to VMs
- Isolation and security
- Version control for infrastructure


### 2. What is the difference between Docker and Virtual Machines?

**Docker Containers:**
- Share the host OS kernel
- Lightweight (MBs in size)
- Start in seconds
- Less resource overhead
- Better performance

**Virtual Machines:**
- Include full OS
- Heavy (GBs in size)
- Start in minutes
- More resource overhead
- Complete isolation

```
┌─────────────────────────────────┐
│         Application             │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │App 1│ │App 2│ │App 3│       │ CONTAINERS
│  └─────┘ └─────┘ └─────┘       │
│  ┌──────────────────────┐      │
│  │   Docker Engine      │      │
│  └──────────────────────┘      │
│  ┌──────────────────────┐      │
│  │     Host OS          │      │
│  └──────────────────────┘      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │App 1│ │App 2│ │App 3│       │
│  │OS 1 │ │OS 2 │ │OS 3 │       │ VIRTUAL MACHINES
│  └─────┘ └─────┘ └─────┘       │
│  ┌──────────────────────┐      │
│  │    Hypervisor        │      │
│  └──────────────────────┘      │
│  ┌──────────────────────┐      │
│  │     Host OS          │      │
│  └──────────────────────┘      │
└─────────────────────────────────┘
```


### 3. What is a Docker Image?

A Docker image is a read-only template that contains instructions for creating a Docker container. It includes the application code, runtime, libraries, environment variables, and configuration files.

**Image Layers:**
- Images are built in layers
- Each instruction in Dockerfile creates a new layer
- Layers are cached for efficiency
- Layers are shared between images

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```


### 4. What is a Docker Container?

A container is a runnable instance of a Docker image. It's an isolated process that runs on the host OS, with its own filesystem, networking, and process space.

**Container Lifecycle:**
```bash
# Create and start container
docker run -d --name myapp -p 3000:3000 myapp:latest

# List running containers
docker ps

# Stop container
docker stop myapp

# Start stopped container
docker start myapp

# Remove container
docker rm myapp
```


### 5. What is a Dockerfile?

A Dockerfile is a text file containing instructions to build a Docker image. Each instruction creates a layer in the image.

**Common Dockerfile Instructions:**
```dockerfile
# Base image
FROM ubuntu:22.04

# Metadata
LABEL maintainer="dev@example.com"

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Set working directory
WORKDIR /app

# Copy files
COPY package.json .
COPY . .

# Run commands
RUN apt-get update && apt-get install -y nodejs
RUN npm install --production

# Expose port
EXPOSE 3000

# Define volume
VOLUME ["/app/data"]

# Set user
USER node

# Entry point (cannot be overridden)
ENTRYPOINT ["node"]

# Default command (can be overridden)
CMD ["server.js"]
```


### 6. What is the difference between CMD and ENTRYPOINT?

**CMD:**
- Provides default arguments
- Can be overridden at runtime
- Only last CMD is executed

**ENTRYPOINT:**
- Defines the executable
- Cannot be easily overridden
- CMD becomes arguments to ENTRYPOINT

```dockerfile
# Example 1: CMD only
FROM node:18
CMD ["node", "app.js"]
# docker run myimage          → runs: node app.js
# docker run myimage server.js → runs: server.js

# Example 2: ENTRYPOINT + CMD
FROM node:18
ENTRYPOINT ["node"]
CMD ["app.js"]
# docker run myimage          → runs: node app.js
# docker run myimage server.js → runs: node server.js
```


### 7. What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.

**docker-compose.yml Example:**
```yaml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    volumes:
      - ./web:/app
    networks:
      - app-network

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

**Common Commands:**
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale web=3
```


### 8. What are Docker Volumes?

Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.

**Types of Volumes:**

1. **Named Volumes** (Managed by Docker)
```bash
docker volume create mydata
docker run -v mydata:/app/data myapp
```

2. **Bind Mounts** (Host directory)
```bash
docker run -v /host/path:/container/path myapp
```

3. **tmpfs Mounts** (In-memory, temporary)
```bash
docker run --tmpfs /app/temp myapp
```

**Volume Commands:**
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata

# Remove unused volumes
docker volume prune
```


### 9. What is Docker Networking?

Docker networking allows containers to communicate with each other and the outside world.

**Network Types:**

1. **Bridge** (Default) - Isolated network for containers
2. **Host** - Container uses host's network
3. **None** - No networking
4. **Overlay** - Multi-host networking (Swarm)

```bash
# Create network
docker network create mynetwork

# Run container on network
docker run --network mynetwork myapp

# Connect running container to network
docker network connect mynetwork mycontainer

# List networks
docker network ls

# Inspect network
docker network inspect mynetwork
```


### 10. What are Docker registries?

A Docker registry stores Docker images. Docker Hub is the default public registry.

**Common Operations:**
```bash
# Login to registry
docker login

# Tag image
docker tag myapp:latest username/myapp:v1.0

# Push to registry
docker push username/myapp:v1.0

# Pull from registry
docker pull username/myapp:v1.0

# Private registry
docker tag myapp:latest registry.company.com/myapp:v1.0
docker push registry.company.com/myapp:v1.0
```


### 11. What is Docker Swarm?

Docker Swarm is Docker's native clustering and orchestration tool for managing multiple Docker hosts.

**Key Concepts:**
- **Nodes**: Manager nodes (control) and Worker nodes (run tasks)
- **Services**: Definition of tasks to execute
- **Tasks**: Individual containers running on nodes

```bash
# Initialize swarm
docker swarm init

# Add worker node
docker swarm join --token <token> <manager-ip>:2377

# Deploy service
docker service create --name web --replicas 3 -p 80:80 nginx

# Scale service
docker service scale web=5

# List services
docker service ls

# Update service
docker service update --image nginx:latest web
```


### 12. How do you optimize Docker images?

**Best Practices:**

1. **Use smaller base images**
```dockerfile
# Bad: 1GB+
FROM ubuntu:22.04

# Good: ~5MB
FROM alpine:3.18
```

2. **Multi-stage builds**
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
CMD ["node", "dist/server.js"]
```

3. **Minimize layers**
```dockerfile
# Bad: Multiple layers
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2

# Good: Single layer
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    && rm -rf /var/lib/apt/lists/*
```

4. **Use .dockerignore**
```
node_modules
npm-debug.log
.git
.env
*.md
```

5. **Order instructions by change frequency**
```dockerfile
# Dependencies change less frequently
COPY package*.json ./
RUN npm install

# Code changes more frequently
COPY . .
```


### 13. What is the difference between COPY and ADD?

**COPY:**
- Simple file/directory copying
- Preferred for most use cases
- More transparent

**ADD:**
- Can extract tar files automatically
- Can download files from URLs
- More features but less predictable

```dockerfile
# Recommended: Use COPY
COPY package.json /app/

# ADD auto-extracts tar
ADD archive.tar.gz /app/

# ADD can download (not recommended)
ADD https://example.com/file.txt /app/
```


### 14. How do you debug a Docker container?

**Debugging Techniques:**

```bash
# View container logs
docker logs mycontainer
docker logs -f mycontainer  # Follow logs

# Execute command in running container
docker exec -it mycontainer bash
docker exec mycontainer ls /app

# Inspect container
docker inspect mycontainer

# View resource usage
docker stats mycontainer

# View processes
docker top mycontainer

# Copy files from container
docker cp mycontainer:/app/logs ./logs

# Check container events
docker events --filter container=mycontainer
```


### 15. What are Docker health checks?

Health checks determine if a container is working properly.

```dockerfile
# Dockerfile
FROM node:18
WORKDIR /app
COPY . .

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```


### 16. What is Docker layer caching?

Docker caches each layer during the build process. If a layer hasn't changed, Docker reuses the cached version.

**Optimization Strategy:**
```dockerfile
# Inefficient: Code changes invalidate npm install cache
COPY . .
RUN npm install

# Efficient: Only reinstall when package.json changes
COPY package*.json ./
RUN npm install
COPY . .
```


### 17. How do you secure Docker containers?

**Security Best Practices:**

1. **Use official images**
```dockerfile
FROM node:18-alpine  # Official image
```

2. **Don't run as root**
```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

3. **Scan images for vulnerabilities**
```bash
docker scan myapp:latest
```

4. **Use secrets for sensitive data**
```bash
echo "mypassword" | docker secret create db_password -
```

5. **Limit resources**
```bash
docker run --memory="512m" --cpus="1.0" myapp
```

6. **Use read-only filesystem**
```bash
docker run --read-only --tmpfs /tmp myapp
```


### 18. What are common Docker commands?

```bash
# Images
docker images                    # List images
docker build -t myapp:v1 .      # Build image
docker rmi myapp:v1             # Remove image
docker pull nginx:latest        # Pull image
docker push myapp:v1            # Push image

# Containers
docker ps                       # List running containers
docker ps -a                    # List all containers
docker run -d myapp             # Run container (detached)
docker stop mycontainer         # Stop container
docker start mycontainer        # Start container
docker restart mycontainer      # Restart container
docker rm mycontainer           # Remove container
docker exec -it mycontainer bash # Execute command

# System
docker system df                # Show disk usage
docker system prune             # Remove unused data
docker system prune -a          # Remove all unused data

# Logs and Monitoring
docker logs mycontainer         # View logs
docker stats                    # View resource usage
docker inspect mycontainer      # Detailed info
```


### 19. What is the difference between docker run and docker start?

**docker run:**
- Creates a NEW container from an image
- Runs the container
- Can specify configuration (ports, volumes, etc.)

**docker start:**
- Starts an EXISTING stopped container
- Uses existing configuration
- Cannot change container settings

```bash
# docker run: Create and start new container
docker run -d --name web -p 80:80 nginx

# docker start: Start existing container
docker start web
```


### 20. What are Docker best practices for production?

1. **Use specific image tags**
```dockerfile
# Bad
FROM node:latest

# Good
FROM node:18.17.0-alpine
```

2. **Implement health checks**
3. **Use multi-stage builds**
4. **Set resource limits**
5. **Use environment variables for configuration**
6. **Implement proper logging**
7. **Regular security scanning**
8. **Use orchestration (Kubernetes, Swarm)**
9. **Implement CI/CD pipelines**
10. **Monitor and alert**

```yaml
# Production docker-compose.yml
version: '3.8'
services:
  web:
    image: myapp:1.2.3
    restart: always
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```