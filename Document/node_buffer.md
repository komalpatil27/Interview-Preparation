# Node.js `Buffer` — Quick Reference

This note summarizes Node.js `Buffer` for interview prep: creation, encoding, common operations, and pitfalls.

## Purpose
`Buffer` is a Node.js global used to work with raw binary data. It's essential when dealing with TCP streams, file I/O, binary protocols, and encoding conversions.

## Creating Buffers
- `Buffer.from(string[, encoding])` — create from string (default `utf8`).
- `Buffer.from(array)` — create from an array of bytes.
- `Buffer.alloc(size[, fill[, encoding]])` — allocate a zero-filled buffer (safe).
- `Buffer.allocUnsafe(size)` — faster allocation but memory not cleared (use carefully).

## Encoding
- Common encodings: `utf8`, `ascii`, `base64`, `hex`, `utf16le`.
- Convert: `buf.toString('base64')`, `Buffer.from(base64string, 'base64')`.

## Common operations
- `buf.slice(start, end)` — creates a view on the same memory (no copy).
- `Buffer.concat([buf1, buf2], totalLength?)` — concatenate buffers (creates new buffer).
- `buf.copy(targetBuf, targetStart=0, srcStart=0, srcEnd=buf.length)` — copy bytes.
- `buf.readUInt32BE(offset)` / `buf.readUInt32LE(offset)` — read integers with endianness.
- `buf.writeUInt32BE(value, offset)` — write integers.

## Performance & safety notes
- Prefer `Buffer.alloc()` for security-sensitive code to avoid leaking old memory.
- `Buffer.allocUnsafe()` is faster but must be fully overwritten before use.
- `slice()` shares memory — be careful with long-lived slices keeping large buffers alive.
- Avoid frequent small allocations in hot loops; reuse buffers or use pooling.

## Interop examples
- Reading a file: `fs.readFileSync(path)` returns a `Buffer`.
- Streams: `stream.on('data', chunk => { /* chunk is Buffer or string depending on encoding */ })`.

## Pitfalls
- Mixing encodings: always be explicit about encoding when converting strings.
- Endianness: network vs host endianness matters for binary protocols.
- Memory leaks via slices or unreleased references.

## Interview checklist — Buffer topics
- Know how to create buffers (`from`, `alloc`, `allocUnsafe`) and when to use each.
- Explain `slice()` vs `copy()` (view vs copy) and memory implications.
- Demonstrate converting between `utf8`, `base64`, and `hex`.
- Show reading/writing integers with `readUInt*` / `writeUInt*` and discuss endianness.
- Describe security/performance trade-offs of `allocUnsafe` and how to mitigate risks.

---
Reference: https://nodejs.org/docs/latest/api/buffer.html
