# Web Communication Protocols

## L1 - Fundamentals

### HTTP (HyperText Transfer Protocol)

HTTP is the foundation of data communication on the web.

**Key Concepts:**
```javascript
// HTTP Request
GET /api/users HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: application/json

// HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 123

{"users": [...]}
```

**HTTP Methods:**
- **GET** - Retrieve data
- **POST** - Create new resource
- **PUT** - Update entire resource
- **PATCH** - Partial update
- **DELETE** - Remove resource
- **HEAD** - Get headers only
- **OPTIONS** - Check allowed methods

**Status Codes:**
- **2xx** - Success (200 OK, 201 Created, 204 No Content)
- **3xx** - Redirection (301 Moved, 302 Found, 304 Not Modified)
- **4xx** - Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx** - Server Error (500 Internal Error, 503 Service Unavailable)


### HTTPS (HTTP Secure)

HTTPS is HTTP with encryption using TLS/SSL.

**How it works:**
1. Client requests secure connection
2. Server sends SSL certificate
3. Client verifies certificate
4. Encrypted connection established
5. Data transmitted securely

**Benefits:**
- Data encryption
- Authentication
- Data integrity
- SEO boost


### RESTful API Basics

REST (Representational State Transfer) is an architectural style for APIs.

**Principles:**
- Stateless communication
- Client-server architecture
- Cacheable responses
- Uniform interface

**Example:**
```javascript
// RESTful endpoints
GET    /api/users          // Get all users
GET    /api/users/123      // Get user by ID
POST   /api/users          // Create user
PUT    /api/users/123      // Update user
DELETE /api/users/123      // Delete user

// Express implementation
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});
```


## L2 - Intermediate Concepts

### HTTP vs HTTPS

| Feature | HTTP | HTTPS |
|---------|------|-------|
| Security | Not encrypted | Encrypted (TLS/SSL) |
| Port | 80 | 443 |
| Certificate | Not required | SSL certificate required |
| Speed | Faster | Slightly slower (encryption overhead) |
| SEO | Lower ranking | Higher ranking |
| Data Integrity | Vulnerable | Protected |

**When to use HTTPS:**
- Login pages
- Payment processing
- Personal data
- All modern websites (recommended)


### RESTful API Design

**Best Practices:**
```javascript
// Good RESTful design
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/123
PUT    /api/v1/users/123
DELETE /api/v1/users/123

// Nested resources
GET    /api/v1/users/123/posts
POST   /api/v1/users/123/posts

// Filtering, sorting, pagination
GET /api/v1/users?role=admin&sort=name&page=2&limit=10

// Response structure
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 2,
    "limit": 10
  }
}
```

**HTTP Headers:**
```javascript
// Request headers
{
  "Content-Type": "application/json",
  "Authorization": "Bearer token123",
  "Accept": "application/json",
  "User-Agent": "MyApp/1.0"
}

// Response headers
{
  "Content-Type": "application/json",
  "Cache-Control": "max-age=3600",
  "ETag": "abc123",
  "Access-Control-Allow-Origin": "*"
}
```


## L3 - Advanced Protocols

### HTTP vs HTTPS vs HTTP/2 vs HTTP/3

**HTTP/1.1:**
- Text-based protocol
- One request per connection
- Head-of-line blocking

**HTTP/2:**
- Binary protocol
- Multiplexing (multiple requests over single connection)
- Server push
- Header compression
- Stream prioritization

```javascript
// HTTP/2 Server Push
const http2 = require('http2');
const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
});

server.on('stream', (stream, headers) => {
  // Push CSS before HTML
  stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
    pushStream.respondWithFile('style.css');
  });
  
  stream.respondWithFile('index.html');
});
```

**HTTP/3:**
- Built on QUIC (UDP-based)
- Faster connection establishment
- Better performance on unreliable networks
- No head-of-line blocking


### TCP vs UDP

**TCP (Transmission Control Protocol):**
- Connection-oriented
- Reliable delivery
- Ordered packets
- Error checking
- Slower

**Use cases:** HTTP, HTTPS, FTP, Email

**UDP (User Datagram Protocol):**
- Connectionless
- No guaranteed delivery
- No ordering
- Faster
- Lower overhead

**Use cases:** Video streaming, Gaming, DNS, VoIP

```javascript
// TCP Server (Node.js)
const net = require('net');
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('Message received');
  });
});
server.listen(3000);

// UDP Server (Node.js)
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', (msg, rinfo) => {
  console.log(`Received: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.bind(3000);
```


### WebSockets vs Polling

**Polling (Short Polling):**
```javascript
// Client repeatedly requests updates
setInterval(() => {
  fetch('/api/updates')
    .then(res => res.json())
    .then(data => updateUI(data));
}, 5000); // Poll every 5 seconds
```

**Long Polling:**
```javascript
// Server holds request until data available
function longPoll() {
  fetch('/api/updates')
    .then(res => res.json())
    .then(data => {
      updateUI(data);
      longPoll(); // Immediately poll again
    });
}
```

**WebSockets (Real-time bidirectional):**
```javascript
// Client
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello Server');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

// Server (Node.js with ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Hello Client');
  });
});
```

**Comparison:**

| Feature | Polling | Long Polling | WebSockets |
|---------|---------|--------------|------------|
| Real-time | No | Better | Yes |
| Overhead | High | Medium | Low |
| Latency | High | Medium | Low |
| Server Load | High | Medium | Low |
| Use Case | Simple updates | Notifications | Chat, Gaming |


### RESTful vs RPC vs GraphQL

**RESTful:**
```javascript
// Multiple endpoints
GET /api/users/123
GET /api/users/123/posts
GET /api/users/123/comments

// Overfetching - gets all user data
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "address": {...},
  "preferences": {...}
}
```

**JSON-RPC:**
```javascript
// Single endpoint, method-based
POST /api/rpc

{
  "jsonrpc": "2.0",
  "method": "getUser",
  "params": { "id": 123 },
  "id": 1
}

// Response
{
  "jsonrpc": "2.0",
  "result": { "id": 123, "name": "Alice" },
  "id": 1
}
```

**GraphQL:**
```javascript
// Single endpoint, query-based
POST /graphql

// Query - request only what you need
{
  user(id: 123) {
    name
    email
    posts {
      title
    }
  }
}

// Response - exactly what was requested
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com",
      "posts": [
        { "title": "Post 1" }
      ]
    }
  }
}

// GraphQL Server (Apollo)
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }
  
  type Post {
    id: ID!
    title: String!
  }
  
  type Query {
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }) => getUserById(id)
  },
  User: {
    posts: (user) => getPostsByUserId(user.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
```

**Comparison:**

| Feature | REST | RPC | GraphQL |
|---------|------|-----|---------|
| Endpoints | Multiple | Single | Single |
| Overfetching | Common | Possible | No |
| Underfetching | Common | Possible | No |
| Caching | Easy (HTTP) | Complex | Complex |
| Learning Curve | Low | Low | Medium |
| Flexibility | Low | Medium | High |


## L4 - Network Models

### TCP/IP Model vs OSI Model

**OSI Model (7 Layers):**
1. **Physical** - Cables, signals
2. **Data Link** - MAC addresses, switches
3. **Network** - IP addresses, routing
4. **Transport** - TCP/UDP, ports
5. **Session** - Connection management
6. **Presentation** - Encryption, compression
7. **Application** - HTTP, FTP, SMTP

**TCP/IP Model (4 Layers):**
1. **Network Access** - Physical + Data Link
2. **Internet** - IP, routing
3. **Transport** - TCP/UDP
4. **Application** - HTTP, FTP, DNS

**Example Flow:**
```
User types URL → Browser (Application Layer)
↓
DNS lookup → Transport Layer (UDP)
↓
IP routing → Internet Layer
↓
Ethernet frame → Network Access Layer
↓
Physical transmission → Server
```

**Practical Example:**
```javascript
// Application Layer (HTTP)
const http = require('http');

// Transport Layer (TCP - handled by Node.js)
const server = http.createServer((req, res) => {
  // Application logic
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

// Bind to IP and Port (Network + Transport Layer)
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
```

**Headers at Each Layer:**
```
Application: HTTP headers (Content-Type, etc.)
Transport: TCP headers (Source Port, Dest Port, Sequence Number)
Network: IP headers (Source IP, Dest IP, TTL)
Data Link: Ethernet headers (Source MAC, Dest MAC)
```
