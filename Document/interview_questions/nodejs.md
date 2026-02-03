# Node.js & Concurrency — Interview Questions

- Explain Node.js single-threaded model and strategies for CPU-bound work (workers, native addons).
	A: Node runs JavaScript on a single main thread and uses an event loop to schedule non-blocking I/O. Long synchronous or CPU-heavy work blocks the event loop and delays all requests. Offload CPU-bound tasks:

	- Worker threads: spawn threads inside the same process for parallel CPU work (`worker_threads`).
	- Child processes: run separate processes (useful for isolation or native binaries).
	- Native addons: implement heavy logic in native code (C/C++) when needed.

	Example (worker thread):

	```js
	// main.js
	const { Worker } = require('worker_threads')
	function runTask(data) {
	  return new Promise((res, rej) => {
	    const w = new Worker('./worker.js', { workerData: data })
	    w.on('message', res)
	    w.on('error', rej)
	  })

	// use runTask(...) instead of blocking the event loop
	```

	```js
	// worker.js
	const { parentPort, workerData } = require('worker_threads')
	// perform CPU-heavy computation
	const result = heavyCompute(workerData)
	parentPort.postMessage(result)

## Most Asked Node.js Questions — Answers & Examples

Below are concise explanations and short examples for commonly asked Node.js interview questions.

1) What is the difference between `process.nextTick()` and `setImmediate()`?

- Explanation: `process.nextTick()` queues a callback to run at the end of the current operation, before the event loop continues to the next phase. `setImmediate()` queues the callback to run on the check phase of the next event-loop iteration. `process.nextTick()` runs earlier (higher priority) and can starve I/O if abused.

- Example:

```js
console.log('start')
process.nextTick(() => console.log('nextTick'))
setImmediate(() => console.log('setImmediate'))
console.log('end')
// Output: start, end, nextTick, setImmediate
```

2) How does `require()` caching work in Node.js?

- Explanation: When a module is required, Node loads and executes it once and caches the exported object in `require.cache`. Subsequent `require()` calls return the cached exports (same reference). Clearing or deleting entries from `require.cache` forces reloading.

- Example:

```js
const a1 = require('./module')
const a2 = require('./module')
console.log(a1 === a2) // true
delete require.cache[require.resolve('./module')]
const a3 = require('./module') // reloaded
```

3) Explain the module system: CommonJS vs ES Modules in Node.

- Explanation: CommonJS (`require`, `module.exports`) is synchronous and has been Node's traditional module system. ES Modules (`import` / `export`) are standard JavaScript modules with static structure and support asynchronous loading semantics. Node supports both — `.mjs` files or `type: "module"` in `package.json` enable ESM.

- Example (CommonJS):

```js
// a.js
module.exports = function () { return 'CJS' }
// b.js
const a = require('./a')

// ESM (in .mjs or package.json type: module)
// a.mjs
export const msg = 'ESM'
// b.mjs
import { msg } from './a.mjs'
```

4) What is event-loop starvation and how can it happen?

- Explanation: Starvation occurs when long-running synchronous computations or a flood of microtasks prevent the event loop from processing other callbacks (I/O, timers). For example, busy CPU loops or repeated `process.nextTick()` calls can starve I/O.

- Mitigation: Offload heavy CPU tasks to `worker_threads` or child processes, break work into chunks, and use asynchronous APIs.

5) How do you handle uncaught exceptions and unhandled promise rejections in Node?

- Explanation: Use `process.on('uncaughtException')` and `process.on('unhandledRejection')` to log and perform cleanup. Prefer allowing the process to exit after a fatal uncaught exception to avoid inconsistent state; use clustering or process manager to restart.

- Example:

```js
process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err)
	// attempt graceful shutdown, then process.exit(1)
})
```

6) What are streams in Node and the different stream types?

- Explanation: Streams are abstractions for working with streaming data. Types:
	- `Readable` — source of data (fs.createReadStream).
	- `Writable` — sink of data (fs.createWriteStream).
	- `Duplex` — both readable & writable (sockets).
	- `Transform` — duplex that transforms data (gzip).

- Example (Readable -> Writable):

```js
const fs = require('fs')
const r = fs.createReadStream('bigfile')
const w = fs.createWriteStream('copy')
r.pipe(w)
```

7) How do you implement backpressure with streams?

- Explanation: Backpressure ensures fast producers don't overwhelm slow consumers. Node's stream API signals readiness: `stream.write()` returns `false` when the consumer is saturated — you should stop writing and wait for the `drain` event.

- Example:

```js
async function writeLots(stream, dataChunks) {
	for (const chunk of dataChunks) {
		if (!stream.write(chunk)) {
			await new Promise(r => stream.once('drain', r))
		}
	}
	stream.end()
}
```

8) What is the difference between `fs.readFile` and `fs.createReadStream`?

- Explanation: `fs.readFile` reads the entire file into memory (not suitable for large files). `fs.createReadStream` reads the file in chunks and streams it — memory efficient and works with backpressure.

9) How do you scale Node applications across multiple CPU cores?

- Explanation: Use the `cluster` module or a process manager like `PM2` to run multiple Node worker processes (one per core). Alternatively, use a load balancer in front of multiple instances (containers) and use stateless design or shared session stores.

- Example (cluster):

```js
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
	for (let i=0;i<numCPUs;i++) cluster.fork()
} else {
	http.createServer((req,res)=> res.end('ok')).listen(3000)
}
```

10) Explain how the Node.js garbage collector works at a high level.

- Explanation: Node uses V8's garbage collector which employs generational GC: young generation (new objects, collected frequently) and old generation (long-lived objects, collected less frequently). GC runs pause the JS thread; reduce pauses by avoiding large object graphs, limiting memory churn, and tuning V8 flags if needed.

11) How do you secure a Node.js application (basic practices)?

- Explanation: Keep dependencies updated, validate and sanitize inputs, use HTTPS, set secure headers (Helmet), avoid eval/unsafe code, manage secrets via env vars/secret store, implement rate-limiting and authentication, and apply least privilege on resources.

12) What are common patterns for graceful shutdown in Node services?

- Explanation: Listen for termination signals (`SIGINT`, `SIGTERM`), stop accepting new requests, finish in-flight requests, close DB connections and other handles, then exit. Use timeouts to force-exit if shutdown stalls.

- Example:

```js
const server = app.listen(3000)
function shutdown(){
	server.close(()=> process.exit(0))
	setTimeout(()=> process.exit(1), 30000)
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
```

13) How to debug memory leaks in Node (tools and approaches)?

- Explanation: Use heap snapshots (`--inspect` + Chrome DevTools), `heapdump`, `clinic heap` or `memwatch-next`. Compare snapshots to find growing retained sizes, check for unclosed timers/streams, global caches, or large closures.

14) What are native addons and when to use them?

- Explanation: Native addons are compiled modules (C/C++) using Node-API (N-API) or NAN. Use them for CPU-critical tasks or to interface with native libraries. Prefer pure JS or worker threads first; addons add maintenance and portability complexity.

15) How to handle file uploads efficiently in Node?

- Explanation: Stream uploads directly to disk or object storage (S3) without buffering the entire file in memory. Use multipart parsers (busboy, multer in streaming mode) and enforce size limits and virus scanning where appropriate.

- Example (busboy):

```js
const Busboy = require('busboy')
http.createServer((req,res)=>{
	const bb = new Busboy({ headers: req.headers })
	bb.on('file', (name, file, info) => {
		const ws = fs.createWriteStream('/tmp/'+info.filename)
		file.pipe(ws)
	})
	bb.on('finish', ()=> res.end('ok'))
	req.pipe(bb)
}).listen(3000)
```

16) Explain how to use clustering and process managers (PM2, systemd).

- Explanation: `cluster` spawns worker processes within a machine. Process managers like `PM2` manage multiple processes, restarts, log rotation, and deployments. `systemd` can be used to run Node as a service with supervision. Use them to achieve resilience and zero-downtime restarts.

17) How does V8 optimize JavaScript execution (baseline understanding)?

- Explanation: V8 uses an interpreter and optimizing JIT compilers. It profiles hot code paths and generates optimized machine code; deoptimizes if assumptions break (e.g., type changes). Write predictable code (stable object shapes, avoid polymorphic calls) for better optimization.

18) What is `libuv` and why is it important for Node?

- Explanation: `libuv` is the C library that provides the event loop, async I/O, thread pool, timers, and cross-platform abstractions. It underpins Node's non-blocking I/O model.

19) How do you implement rate limiting and throttling in Node APIs?

- Explanation: Use token-bucket or leaky-bucket algorithms. Implement at the API gateway/load balancer level or in the app using in-memory stores for single-process or Redis for distributed rate limits. Libraries: `express-rate-limit` (local), `rate-limiter-flexible` (Redis-backed).

20) How do you test async code in Node (promises/async-await) — tools and patterns?

- Explanation: Use test frameworks that support async tests (Jest, Mocha). Return the promise or use `async` test functions and `await`. Use mocks for timers (`jest.useFakeTimers()`), and run tests deterministically.

- Example (Jest):

```js
test('async function', async () => {
	const r = await fetchData()
	expect(r).toBeDefined()
})
```

---

If you want, I can expand any specific question with deeper examples, diagnostics checklists, or add quick CLI commands to reproduce and test examples locally.

	A: They serve different environments:

	- Web/Service Workers (browser): run in client-side environments for background tasks (caching, request interception, off-main-thread computation). Use them for UI responsiveness and offline capabilities.
	- Node `worker_threads`: server-side threads for CPU-bound tasks where you need shared memory or lower-latency parallelism.

	Example: use a Service Worker to cache assets in the browser, use `worker_threads` to process image resizing on the server.
- How does the event loop phases (timers, I/O callbacks, idle) affect application design and latency?
	A: The event loop runs phases (timers, pending callbacks, idle, poll, check, close). Ordering matters: a long synchronous callback in any phase blocks the loop and increases latency. Prefer small, asynchronous tasks and split work into microtasks or worker threads when needed.

	Example ordering quirks:

	```js
	console.log('start')
	setTimeout(() => console.log('timeout'), 0)
	setImmediate(() => console.log('immediate'))
	process.nextTick(() => console.log('nextTick'))
	// Output: start, nextTick, immediate or timeout depending on context; nextTick always runs before IO callbacks
	```
- Design a Node service to handle high concurrent connections and heavy I/O (backpressure, streaming).
	A: Build streaming pipelines and respect backpressure so fast producers don't overwhelm consumers. Use `stream` APIs, connection pooling for DBs, clustering (multiple Node instances) for multi-core utilization, and metrics for backpressure and queue depth.

	Example: stream-file upload with backpressure-aware pipeline

	```js
	const fs = require('fs')
	const http = require('http')

	http.createServer((req, res) => {
	  const writeStream = fs.createWriteStream('/tmp/upload')
	  req.pipe(writeStream) // pipe handles backpressure
	  req.on('end', () => res.end('ok'))
	}).listen(3000)
	```
- How would you debug a memory leak or unresponsive event loop in production?
	A: Steps:

	1. Reproduce locally with load tests.
	2. Capture heap snapshots and compare (Chrome DevTools or `node --inspect` + `heapdump`).
	3. Use CPU profiles (`clinic`, `0x`) and monitor event-loop lag (`event-loop-lag` or custom timers).
	4. Inspect open handles (`process._getActiveHandles()`), and look for leaked timers, sockets, or closures retaining large objects.

	Example commands (not run here):

	- Start with inspector: `node --inspect app.js` and open Chrome://inspect
	- Use `clinic doctor -- node app.js` to profile CPU and event-loop

	Fixes typically involve removing unintended global references, clearing timers, or moving heavy work to workers.
- Explain best practices for using EventEmitter safely across modules and avoiding memory leaks.
	A: Best practices:

	- Remove listeners when no longer needed (`emitter.off()` / `removeListener`).
	- Avoid creating many anonymous listeners; keep references to allow removal.
	- Set `emitter.setMaxListeners(n)` to a sensible default to detect leaks.
	- For high-frequency events, batch or debounce emissions to reduce sync work.

	Example cleanup:

	```js
	const ee = new EventEmitter()
	function onData(d) { /* handle */ }
	ee.on('data', onData)

	// on shutdown
	ee.off('data', onData)
	```
