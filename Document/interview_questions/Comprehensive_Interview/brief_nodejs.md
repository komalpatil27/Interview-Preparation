# Node.js - Brief Theory

## Modules

**CommonJS vs ES6:**
- CommonJS: `require()`, `module.exports` (synchronous)
- ES6: `import`, `export` (asynchronous, tree-shakeable)

**Module Caching:** Modules loaded once, cached for subsequent requires

**Global Scope:** Each file has own scope, use `global` for true globals

## Package Management

**NPM:** Node Package Manager
- `package.json` - project metadata, dependencies
- `package-lock.json` - exact dependency versions
- `node_modules` - installed packages

**Semantic Versioning:** MAJOR.MINOR.PATCH
- `^1.2.3` - Compatible (1.x.x)
- `~1.2.3` - Patch releases (1.2.x)
- `1.2.3` - Exact version

## Event Loop

**Phases:**
1. **Timers** - setTimeout, setInterval
2. **Pending callbacks** - I/O callbacks
3. **Idle, prepare** - Internal
4. **Poll** - Retrieve new I/O events
5. **Check** - setImmediate
6. **Close callbacks** - socket close events

**process.nextTick():** Executes before next phase (highest priority)

**setImmediate():** Executes in check phase

**libUV:** C library that implements event loop and async I/O

## File System

**Sync vs Async:**
- Sync: Blocks execution until complete
- Async: Non-blocking, uses callbacks/promises
- Use async for I/O operations to avoid blocking

**Promises API:** Modern async file operations with async/await

## Streams

**Types:**
- **Readable** - Read data (fs.createReadStream)
- **Writable** - Write data (fs.createWriteStream)
- **Duplex** - Both read and write (net.Socket)
- **Transform** - Modify data (zlib, crypto)

**Benefits:** Memory efficient, process data in chunks, don't load entire file

**Piping:** Connect streams together for data flow

## Buffer

**Purpose:** Handle binary data in Node.js

**Use Cases:** File I/O, network operations, cryptography

**Encoding:** UTF-8, ASCII, Base64, Hex

## Testing

**Unit Testing:** Test individual functions/modules in isolation

**Integration Testing:** Test multiple components together

**E2E Testing:** Test entire application flow from user perspective

**Tools:** Jest, Mocha, Chai, Supertest, Playwright

## Debugging

**Logging:** Winston, Bunyan - structured logging with levels

**Profiling:** Identify performance bottlenecks
- CPU profiling - find slow functions
- Memory profiling - find memory leaks

**Chrome DevTools:** Debug Node.js with `--inspect` flag

## Multithreading

**Child Processes:** Spawn separate Node.js processes
- `fork()` - create new Node.js process
- Communication via messages

**Clustering:** Utilize multiple CPU cores
- Master process forks workers
- Workers share server port
- Auto-restart on crash

**Worker Threads:** True multithreading in Node.js
- Share memory
- Good for CPU-intensive tasks
- Don't block event loop
