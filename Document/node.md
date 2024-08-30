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

```javascript app.all('/api/users', (req, res, next) => {
    // Middleware function for /api/users
    next();
}); 
```
### 3.Node.js Architecture
    Single Threaded Event Loop:

- Single Thread: Node.js operates on a single main thread, running JavaScript code. This is similar to how JavaScript works in browsers.
    Event Loop: The core of Node.js is its event loop, which handles asynchronous operations and callbacks. The event loop enables Node.js to perform non-blocking I/O operations despite being single-threaded.
    Asynchronous and Non-Blocking I/O:

- Non-Blocking I/O: When Node.js performs I/O operations (e.g., file reads, network requests), it doesn’t wait for these operations to complete before moving on. Instead, it initiates the operation and continues executing other code.
    Callbacks and Promises: Once the I/O operation completes, Node.js adds the callback associated with the operation to the event loop's task queue. The event loop picks up these callbacks when the main thread is free.
    Worker Threads and the Thread Pool:

- Worker Threads: For certain types of operations that are computationally intensive or blocking (e.g., cryptographic functions), Node.js uses a pool of background worker threads. This thread pool is managed by the libuv library.
    Thread Pool: Node.js uses a thread pool (provided by libuv) for operations that cannot be handled asynchronously in a non-blocking manner. This allows for handling tasks like file system operations and DNS lookups more efficiently.
    Event-Driven Model:

- Event Emitters: Node.js uses an event-driven architecture where objects called "event emitters" can emit events that other parts of the program can listen to and handle.
    Event Handlers: When an event occurs, the associated event handlers or listeners are invoked. This model is useful for handling multiple concurrent operations, such as incoming network requests.
