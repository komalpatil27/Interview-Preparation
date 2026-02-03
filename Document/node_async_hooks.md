# Node.js `async_hooks` — Quick Reference

This concise note covers the `async_hooks` API for interview prep: lifecycle callbacks, utilities, `AsyncResource`, and pitfalls.

## Purpose
`async_hooks` exposes lifecycle hooks for asynchronous resources in Node.js. It's useful for tracing, diagnostics, and building higher-level context libraries (e.g., `AsyncLocalStorage`).

## Main concepts
- Async resource: any async operation (timers, promises, I/O, HTTP requests) has an async id and a trigger id.
- Lifecycle callbacks: you can observe resource creation and lifecycle events.

## Core API
- `const async_hooks = require('async_hooks')` or `import * as async_hooks from 'async_hooks'`
- `async_hooks.createHook({ init, before, after, destroy, promiseResolve })`
  - `init(asyncId, type, triggerAsyncId, resource)` — called when a resource is created.
  - `before(asyncId)` — called just before the resource's callback executes.
  - `after(asyncId)` — called just after the callback finishes.
  - `destroy(asyncId)` — called when resource is destroyed.
  - `promiseResolve(asyncId)` — called when a Promise resolves (optional).
- `hook.enable()` / `hook.disable()` — turn hooks on/off.

## Utility functions & classes
- `async_hooks.executionAsyncId()` — current execution async id.
- `async_hooks.triggerAsyncId()` — async id that triggered the current resource.
- `async_hooks.executionAsyncResource()` — returns the resource object for current execution.
- `class AsyncResource` — create custom async resources when integrating native/3rd-party libs.
  - `new AsyncResource(type[, opts])` and `resource.runInAsyncScope(fn, thisArg, ...args)` to preserve async context.

## Simple example — logging lifecycle
```js
const async_hooks = require('async_hooks')
const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log('init', asyncId, type, 'triggered by', triggerAsyncId)
  },
  before(asyncId) { console.log('before', asyncId) },
  after(asyncId) { console.log('after', asyncId) },
  destroy(asyncId) { console.log('destroy', asyncId) }
})
hook.enable()

setTimeout(() => console.log('timer done'), 10)
```

## Using `AsyncResource` (preserve context across callbacks)
```js
const { AsyncResource } = require('async_hooks')
class MyResource extends AsyncResource {
  constructor() { super('MY_RESOURCE') }
  run(cb) { return this.runInAsyncScope(cb) }
}
const r = new MyResource()
r.run(() => setTimeout(() => {/* callback preserves async resource */}, 10))
```

## Relationship to `AsyncLocalStorage`
- `AsyncLocalStorage` is built on `async_hooks` and provides a simpler store API for per-request context. Prefer `AsyncLocalStorage` for most use-cases; use `async_hooks` for lower-level instrumentation.

## Pitfalls & best practices
- Performance: hooks add overhead; keep hook handlers minimal and avoid heavy synchronous work inside callbacks.
- Complexity: `async_hooks` is low-level — prefer `AsyncLocalStorage` for context propagation and `AsyncResource` for integration.
- Context loss: some native modules or uninstrumented code can break propagation; test under concurrency and worker threads.
- Security: don't store sensitive secrets in long-lived stores; propagate only IDs or non-sensitive flags.

## Interview checklist
- Know the lifecycle callbacks (`init`, `before`, `after`, `destroy`).
- Explain use-cases: tracing, correlation IDs, diagnostics, instrumentation.
- Understand `AsyncResource` and when to create custom resources.
- Be aware of perf implications and prefer `AsyncLocalStorage` when possible.

---
Reference: https://nodejs.org/docs/latest/api/async_hooks.html
