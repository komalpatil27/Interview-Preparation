# Async Context (AsyncLocalStorage & async_hooks) — Quick Reference

This short note summarizes `AsyncLocalStorage` and `async_hooks` for Node.js interview prep.

## Purpose
Provide request-scoped or async-chain-scoped context (trace IDs, logging metadata) that persists across asynchronous callbacks and promises.

## Main API
- Import: `const { AsyncLocalStorage } = require('async_hooks')` or `import { AsyncLocalStorage } from 'async_hooks'`
- Create: `const als = new AsyncLocalStorage()`
- Run with context: `als.run({ traceId }, () => { /* async work */ })`
- Access: `als.getStore()` returns the store object inside the async chain.

## Example
```js
const { AsyncLocalStorage } = require('async_hooks')
const als = new AsyncLocalStorage()

function handler(req, res) {
  const ctx = { traceId: req.headers['x-trace-id'] || generateId() }
  als.run(ctx, async () => {
    await someAsyncOp()
    console.log('trace', als.getStore())
    res.end('ok')
  })
}
```

## Use cases
- Distributed tracing and correlating logs across async operations.
- Storing request-scoped flags or short-lived caches.

## Pitfalls & best practices
- Keep the store small (IDs, flags). Avoid large mutable state.
- Context flows only through instrumented async APIs; some native modules or poorly instrumented code can break propagation.
- Use `als.run()` or `als.enterWith()` at the request boundary.
- Context does not cross process boundaries — use headers or explicit propagation between services.
- Test under concurrency and with worker threads; `AsyncLocalStorage` is per async chain.

## References
- Node.js docs: https://nodejs.org/docs/latest/api/async_context.html
