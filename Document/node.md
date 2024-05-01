### 1. Intro of node
   - Node.js is an open-source, cross-platform JavaScript runtime environment and library to run web applications outside the client’s browser. It is used to create server-side web applications.

   - Node.js is perfect for data-intensive applications as it uses an asynchronous, event-driven model. You can use  I/O intensive web applications like video streaming sites. You can also use it for developing: Real-time web applications, Network applications, General-purpose applications, and Distributed systems.

### 2. Methods
- app.use()
This method is used to mount middleware functions at a specified path. Middleware functions can perform tasks such as parsing incoming requests, logging, authentication, etc. They have access to the request (req) and response (res) objects, and the next middleware function in the application’s request-response cycle. Middleware functions can also end the request-response cycle by sending a response or passing control to the next middleware function by calling next().
```app.use('/api', middlewareFunction);```

- app.get(), app.post(), app.put(), app.delete()
These methods are used to define routes for different HTTP methods (GET, POST, PUT, DELETE) on the Express application.

- app.all()
This method is used to handle all HTTP methods for a specific route. It is useful for defining middleware for a particular route that should be executed regardless of the HTTP method.

```app.all('/api/users', (req, res, next) => {
    // Middleware function for /api/users
    next();
});```