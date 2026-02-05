# Node.js `assert` module — Quick Reference

This file summarizes the core Node.js `assert` utilities useful for tests and runtime checks.

## Purpose
The built-in `assert` module provides assertion helpers for writing unit tests and simple runtime validations. It's lightweight and available in core Node.js (no install needed).

## Importing
- CommonJS: `const assert = require('assert')`
- ESM: `import assert from 'assert'`

## Common methods
- `assert.ok(value, message)` — assert that `value` is truthy.
- `assert.equal(actual, expected, message)` — loose equality (uses `==`).
- `assert.strictEqual(actual, expected, message)` — strict equality (`===`).
- `assert.deepStrictEqual(actual, expected, message)` — deep structural equality using strict comparisons.
- `assert.notDeepStrictEqual(actual, expected, message)` — inverse of deep strict equal.
- `assert.throws(fn, error?, message?)` — expect `fn` to throw; can check constructor or regex.
- `assert.doesNotThrow(fn, message?)` — expect `fn` not to throw.
- `assert.rejects(asyncFn, error?, message?)` — expect an async function/Promise to reject.
- `assert.ifError(value)` — throw if `value` is truthy (useful for callback `err` checks).
- `assert.fail(message)` — explicitly fail a test.

## Best practices
- Prefer `strictEqual` and `deepStrictEqual` to avoid coercion-related surprises.
- Use `assert.rejects` and `assert.throws` to test error paths for async/sync code respectively.
- For more advanced test features (fixtures, reporting), use a test runner (`node:test`, Mocha, Jest) together with `assert` or an assertion library.

## Examples
```js
const assert = require('assert')

function sum(a, b) { return a + b }
assert.strictEqual(sum(2,2), 4, 'sum should add numbers')

const expected = { id: 1, name: 'Alice' }
assert.deepStrictEqual(getUser(), expected)

assert.throws(() => JSON.parse('invalid'), SyntaxError)

await assert.rejects(async () => { throw new Error('boom') })
```

## Notes
- `assert` is intentionally minimal; for richer assertion styles (matchers, spies) prefer test frameworks.
- Keep assertion messages descriptive to aid debugging when tests fail.

---

(Reference: Node.js assert API — https://nodejs.org/docs/latest/api/assert.html)
