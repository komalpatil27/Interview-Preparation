# Node.js Complete Guide

## Modules

### L1 - Module Basics

**Standard (CommonJS) Syntax:**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
// or
exports.add = add;

// app.js
const math = require('./math');
console.log(math.add(2, 3)); // 5
```

**ES6 Module Syntax:**
```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// app.mjs
import Calculator, { add } from './math.mjs';
console.log(add(2, 3)); // 5
```

**Module Load System:**
- Modules are cached after first load
- Circular dependencies are handled
- Modules load synchronously

**Global Scope:**
```javascript
// In Node.js, each file has its own scope
// These are NOT global
const myVar = 'local';
function myFunc() {}

// These ARE global
global.myGlobal = 'accessible everywhere';
console.log(__dirname);  // Current directory
console.log(__filename); // Current file
console.log(process);    // Process object
```

### L2 - Advanced Modules

**require() Internals:**
```javascript
// Module resolution order:
// 1. Core modules (fs, http, path)
// 2. File modules (./file, ../file)
// 3. node_modules

const fs = require('fs');           // Core module
const myModule = require('./my');   // File module
const express = require('express'); // node_modules

// Module wrapper
(function(exports, require, module, __filename, __dirname) {
  // Your module code here
});
```

**Import Weight (Performance):**
```javascript
// Heavy - loads entire library
const _ = require('lodash');

// Light - loads only what you need
const map = require('lodash/map');

// ES6 tree-shaking (with bundler)
import { map } from 'lodash-es';
```


## Package Managers

### L1 - NPM Basics

**CLI Commands:**
```bash
# Initialize project
npm init
npm init -y  # Skip questions

# Install packages
npm install express
npm install --save-dev jest
npm install -g nodemon

# Uninstall
npm uninstall express

# Update
npm update
npm outdated  # Check for updates

# Run scripts
npm run dev
npm test
npm start
```

**package.json:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

**package-lock.json:**
- Locks exact versions of dependencies
- Ensures consistent installs across environments
- Auto-generated, don't edit manually

### L2 - Advanced Package Management

**Semantic Versioning:**
```json
{
  "dependencies": {
    "express": "4.18.2",     // Exact version
    "lodash": "^4.17.21",    // Compatible (4.x.x)
    "react": "~18.2.0",      // Patch releases (18.2.x)
    "vue": "*"               // Any version (not recommended)
  }
}
```

- **Major.Minor.Patch** (1.2.3)
- **^** - Compatible with version (updates minor & patch)
- **~** - Approximately equivalent (updates patch only)

**npm shrinkwrap:**
```bash
# Create npm-shrinkwrap.json (published with package)
npm shrinkwrap

# Similar to package-lock but for published packages
```

**NPM Scripts:**
```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "webpack",
    "postbuild": "npm run test",
    "clean": "rm -rf dist",
    "dev": "NODE_ENV=development nodemon",
    "prod": "NODE_ENV=production node index.js"
  }
}
```

**YARN:**
```bash
# Install
yarn add express
yarn add --dev jest

# Remove
yarn remove express

# Install all
yarn install

# Run scripts
yarn dev
yarn test
```


## Event Loop (Node.js)

### L1 - Event Loop Basics

**How it works:**
```javascript
console.log('1'); // Call stack

setTimeout(() => console.log('2'), 0); // Timer queue

Promise.resolve().then(() => console.log('3')); // Microtask queue

process.nextTick(() => console.log('4')); // Next tick queue

console.log('5'); // Call stack

// Output: 1, 5, 4, 3, 2
```

### L3 - Node.js Event Loop (libUV)

**Event Loop Phases:**
```
   ┌───────────────────────────┐
┌─>│           timers          │ setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ Internal
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │ socket.on('close')
│  └───────────────────────────┘
└──────────────────────────────┘
```

**process.nextTick vs setImmediate:**
```javascript
// process.nextTick - executes before next phase
process.nextTick(() => console.log('nextTick'));

// setImmediate - executes in check phase
setImmediate(() => console.log('setImmediate'));

setTimeout(() => console.log('setTimeout'), 0);

// Output: nextTick, setTimeout, setImmediate
```

**Microtask Queue Priority:**
1. `process.nextTick()` (highest)
2. `Promise.then()`
3. Event loop phases


## File System

### L1 - File System API

**Sync vs Async:**
```javascript
const fs = require('fs');

// Synchronous (blocks execution)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise-based (modern)
const fs = require('fs').promises;
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

**Common Operations:**
```javascript
const fs = require('fs').promises;

// Read file
await fs.readFile('file.txt', 'utf8');

// Write file
await fs.writeFile('file.txt', 'content');

// Append to file
await fs.appendFile('file.txt', 'more content');

// Delete file
await fs.unlink('file.txt');

// Check if exists
await fs.access('file.txt');

// Get file stats
const stats = await fs.stat('file.txt');
console.log(stats.size, stats.isFile(), stats.isDirectory());

// Read directory
const files = await fs.readdir('./');

// Create directory
await fs.mkdir('newdir', { recursive: true });
```

**OS Differences:**
```javascript
const path = require('path');

// Windows: C:\Users\file.txt
// Unix: /home/user/file.txt

// Use path module for cross-platform compatibility
const filePath = path.join(__dirname, 'files', 'data.txt');
// Works on both Windows and Unix
```


## Streams

### L3 - Stream API

**Types of Streams:**
1. **Readable** - Read data (fs.createReadStream)
2. **Writable** - Write data (fs.createWriteStream)
3. **Duplex** - Both read and write (net.Socket)
4. **Transform** - Modify data while reading/writing (zlib)

**Reading Large Files:**
```javascript
const fs = require('fs');

// Bad - loads entire file into memory
fs.readFile('large-file.txt', (err, data) => {
  console.log(data); // Could crash with large files
});

// Good - streams data in chunks
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
```

**Piping Streams:**
```javascript
const fs = require('fs');
const zlib = require('zlib');

// Copy file
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// Compress file
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// HTTP response streaming
const http = require('http');
http.createServer((req, res) => {
  fs.createReadStream('large-file.txt').pipe(res);
}).listen(3000);
```

**Transform Streams:**
```javascript
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream('input.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('output.txt'));
```


## Buffer

### L3 - Buffer API

**Creating Buffers:**
```javascript
// From string
const buf1 = Buffer.from('Hello');
console.log(buf1); // <Buffer 48 65 6c 6c 6f>

// Allocate size
const buf2 = Buffer.alloc(10); // Filled with zeros
const buf3 = Buffer.allocUnsafe(10); // Faster but not initialized

// From array
const buf4 = Buffer.from([72, 101, 108, 108, 111]);
```

**Buffer Operations:**
```javascript
const buf = Buffer.from('Hello World');

// Convert to string
console.log(buf.toString()); // 'Hello World'
console.log(buf.toString('hex')); // '48656c6c6f20576f726c64'
console.log(buf.toString('base64')); // 'SGVsbG8gV29ybGQ='

// Length
console.log(buf.length); // 11

// Slice
const slice = buf.slice(0, 5);
console.log(slice.toString()); // 'Hello'

// Concatenate
const buf1 = Buffer.from('Hello ');
const buf2 = Buffer.from('World');
const combined = Buffer.concat([buf1, buf2]);
console.log(combined.toString()); // 'Hello World'

// Compare
const buf3 = Buffer.from('abc');
const buf4 = Buffer.from('abd');
console.log(buf3.compare(buf4)); // -1 (buf3 < buf4)
```


## Testing

### L2 - Unit & Integration Testing

**Jest:**
```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// math.test.js
const { add } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

// Run: npm test
```

**Mocking:**
```javascript
// user.service.js
const db = require('./db');

async function getUser(id) {
  return await db.query('SELECT * FROM users WHERE id = ?', [id]);
}

// user.service.test.js
jest.mock('./db');
const db = require('./db');
const { getUser } = require('./user.service');

test('getUser returns user', async () => {
  db.query.mockResolvedValue({ id: 1, name: 'Alice' });
  
  const user = await getUser(1);
  
  expect(user).toEqual({ id: 1, name: 'Alice' });
  expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [1]);
});
```

**Integration Testing:**
```javascript
const request = require('supertest');
const app = require('./app');

describe('API Integration Tests', () => {
  test('GET /api/users returns users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveLength(3);
  });
  
  test('POST /api/users creates user', async () => {
    const newUser = { name: 'Alice', email: 'alice@example.com' };
    
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);
    
    expect(response.body).toMatchObject(newUser);
  });
});
```

### L3 - E2E Tests

**Playwright/Puppeteer:**
```javascript
const { chromium } = require('playwright');

test('user can login', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/login');
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  
  await page.waitForURL('**/dashboard');
  expect(page.url()).toContain('/dashboard');
  
  await browser.close();
});
```


## Diagnostic and Debugging

### L2 - Logging

**Winston Logger:**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.info('Server started');
logger.error('Database connection failed', { error: err.message });
```

### L3 - Profiling & Memory Analysis

**CPU Profiling:**
```bash
# Start with --prof flag
node --prof app.js

# Generate readable report
node --prof-process isolate-0x*.log > profile.txt
```

**Memory Profiling:**
```javascript
// Check memory usage
console.log(process.memoryUsage());
// {
//   rss: 24MB,        // Resident Set Size
//   heapTotal: 7MB,   // Total heap
//   heapUsed: 4MB,    // Used heap
//   external: 1MB     // C++ objects
// }

// Heap snapshot
const v8 = require('v8');
const fs = require('fs');

const snapshot = v8.writeHeapSnapshot();
console.log('Heap snapshot written to', snapshot);
```

**Debugging:**
```bash
# Chrome DevTools
node --inspect app.js
# Open chrome://inspect

# VS Code debugging
# Add to .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug App",
  "program": "${workspaceFolder}/app.js"
}
```


## Multithreading

### L3 - Child Processes & Worker Threads

**Child Processes (fork):**
```javascript
const { fork } = require('child_process');

// parent.js
const child = fork('child.js');

child.on('message', (msg) => {
  console.log('Message from child:', msg);
});

child.send({ hello: 'world' });

// child.js
process.on('message', (msg) => {
  console.log('Message from parent:', msg);
  process.send({ foo: 'bar' });
});
```

**Clustering:**
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart
  });
} else {
  // Workers share TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from worker ' + process.pid);
  }).listen(8000);
  
  console.log(`Worker ${process.pid} started`);
}
```

**Worker Threads:**
```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename);
  
  worker.on('message', (result) => {
    console.log('Result:', result);
  });
  
  worker.postMessage({ num: 10 });
} else {
  // Worker thread
  parentPort.on('message', ({ num }) => {
    const result = fibonacci(num);
    parentPort.postMessage(result);
  });
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
