# Web Protocols - Brief Theory

## HTTP/HTTPS

**HTTP Methods:**
- GET - Retrieve data
- POST - Create resource
- PUT - Update entire resource
- PATCH - Partial update
- DELETE - Remove resource

**Status Codes:**
- 2xx - Success (200 OK, 201 Created)
- 3xx - Redirection (301 Moved, 304 Not Modified)
- 4xx - Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
- 5xx - Server Error (500 Internal Error, 503 Service Unavailable)

**HTTPS:** HTTP with TLS/SSL encryption
- Encrypts data in transit
- Authenticates server
- Ensures data integrity

## RESTful API

**Principles:**
- Stateless - each request independent
- Client-server architecture
- Cacheable responses
- Uniform interface
- Layered system

**Best Practices:**
- Use nouns for resources (`/users`, not `/getUsers`)
- Use HTTP methods correctly
- Version your API (`/api/v1/users`)
- Use proper status codes
- Provide filtering, sorting, pagination

## HTTP Versions

**HTTP/1.1:**
- Text-based protocol
- One request per connection
- Head-of-line blocking

**HTTP/2:**
- Binary protocol
- Multiplexing (multiple requests on one connection)
- Server push
- Header compression

**HTTP/3:**
- Built on QUIC (UDP-based)
- Faster connection establishment
- Better on unreliable networks

## TCP vs UDP

**TCP (Transmission Control Protocol):**
- Connection-oriented
- Reliable delivery
- Ordered packets
- Error checking
- Use: HTTP, HTTPS, Email

**UDP (User Datagram Protocol):**
- Connectionless
- No guaranteed delivery
- Faster, lower overhead
- Use: Video streaming, Gaming, DNS

## WebSockets vs Polling

**Polling:** Client repeatedly requests updates
- High overhead
- Latency

**Long Polling:** Server holds request until data available
- Better than polling
- Still has overhead

**WebSockets:** Real-time bidirectional communication
- Low latency
- Low overhead
- Persistent connection
- Use: Chat, Gaming, Live updates

## API Architectures

**REST:**
- Multiple endpoints
- Resource-based
- Can over-fetch/under-fetch
- Easy caching

**JSON-RPC:**
- Single endpoint
- Method-based
- Simple protocol

**GraphQL:**
- Single endpoint
- Query-based
- Request exactly what you need
- No over-fetching
- Complex caching

## Network Models

**OSI Model (7 Layers):**
1. Physical - Cables, signals
2. Data Link - MAC addresses
3. Network - IP addresses, routing
4. Transport - TCP/UDP, ports
5. Session - Connection management
6. Presentation - Encryption, compression
7. Application - HTTP, FTP, SMTP

**TCP/IP Model (4 Layers):**
1. Network Access - Physical + Data Link
2. Internet - IP, routing
3. Transport - TCP/UDP
4. Application - HTTP, FTP, DNS
