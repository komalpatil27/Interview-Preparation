# Performance Optimization Complete Guide

## L2 - Page Load Optimization

**Techniques:**

**1. Minimize HTTP Requests:**
```html
<!-- Bad - multiple requests -->
<link rel="stylesheet" href="header.css">
<link rel="stylesheet" href="footer.css">
<link rel="stylesheet" href="main.css">

<!-- Good - bundled -->
<link rel="stylesheet" href="bundle.css">
```

**2. Enable Compression:**
```javascript
// Express with compression
const compression = require('compression');
app.use(compression());

// Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

**3. Optimize Images:**
```html
<!-- Responsive images -->
<img 
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 800px"
  alt="Description"
>

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>
```

**4. Minify Resources:**
```javascript
// Webpack configuration
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // JS
      new CssMinimizerPlugin() // CSS
    ]
  }
};
```

**5. Use CDN:**
```html
<!-- Serve static assets from CDN -->
<script src="https://cdn.example.com/library.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/styles.css">
```

**6. Browser Caching:**
```javascript
// Express
app.use(express.static('public', {
  maxAge: '1y' // Cache for 1 year
}));

// Cache-Control headers
res.setHeader('Cache-Control', 'public, max-age=31536000');
```


## L3 - Advanced Optimization

### JavaScript Profiling and Debugging

**Chrome DevTools:**
```javascript
// 1. Performance tab
// - Record page load
// - Identify slow functions
// - Find long tasks (> 50ms)

// 2. Console timing
console.time('operation');
// ... code ...
console.timeEnd('operation'); // operation: 123.45ms

// 3. Performance API
const start = performance.now();
// ... code ...
const end = performance.now();
console.log(`Took ${end - start}ms`);

// 4. User Timing API
performance.mark('start-fetch');
await fetch('/api/data');
performance.mark('end-fetch');
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');

const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration);
```

### JavaScript Performance Optimization

**1. Debouncing & Throttling:**
```javascript
// Debounce - wait until user stops typing
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((value) => {
  console.log('Searching for:', value);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttle - limit execution rate
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

**2. Avoid Memory Leaks:**
```javascript
// ❌ Memory leak - event listener not removed
class Component {
  constructor() {
    window.addEventListener('resize', this.handleResize);
  }
  
  handleResize() {
    console.log('Resized');
  }
}

// ✅ Proper cleanup
class Component {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }
  
  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize() {
    console.log('Resized');
  }
}

// ❌ Memory leak - detached DOM nodes
let elements = [];
function addElement() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  elements.push(div); // Still referenced after removal
}

// ✅ Clear references
function removeElement() {
  const div = elements.pop();
  div.remove();
  // div is now garbage collected
}
```

**3. Efficient DOM Manipulation:**
```javascript
// ❌ Slow - multiple reflows
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  document.body.appendChild(div); // Reflow each time
}

// ✅ Fast - single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // Single reflow
```

### Memory Leak Detection

**Chrome DevTools Memory Profiler:**
```javascript
// 1. Take heap snapshot
// 2. Perform actions
// 3. Take another snapshot
// 4. Compare snapshots

// Find leaks:
// - Detached DOM nodes
// - Growing arrays/objects
// - Event listeners not removed

// Example: Detect leak
class LeakyComponent {
  constructor() {
    this.data = new Array(1000000); // Large array
    window.addEventListener('resize', () => {
      console.log(this.data.length); // Closure keeps reference
    });
  }
}

// Fix: Remove listener
class FixedComponent {
  constructor() {
    this.data = new Array(1000000);
    this.handleResize = () => console.log(this.data.length);
    window.addEventListener('resize', this.handleResize);
  }
  
  destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.data = null;
  }
}
```

### Compression

**Types:**
- **Gzip** - Good compression, widely supported
- **Brotli** - Better compression, modern browsers
- **Deflate** - Older, less efficient

```javascript
// Express with Brotli
const shrinkRay = require('shrink-ray-current');
app.use(shrinkRay());

// Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

### Caching

**1. Browser Caching:**
```javascript
// Cache-Control headers
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

// ETag (conditional requests)
const etag = generateETag(content);
res.setHeader('ETag', etag);

if (req.headers['if-none-match'] === etag) {
  res.status(304).end(); // Not Modified
}
```

**2. Service Worker Caching:**
```javascript
// service-worker.js
const CACHE_NAME = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

**3. Redis Caching:**
```javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedData(key) {
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFromDatabase();
  await client.set(key, JSON.stringify(data), { EX: 3600 });
  
  return data;
}
```

**4. CDN Caching:**
```javascript
// CloudFlare, Cloudinary, AWS CloudFront
// - Cache static assets
// - Serve from edge locations
// - Reduce origin server load
```

### Critical Rendering Path

**Optimize CRP:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. Critical CSS inline -->
  <style>
    /* Above-the-fold styles */
    body { margin: 0; font-family: Arial; }
    .header { background: #333; color: white; }
  </style>
  
  <!-- 2. Async non-critical CSS -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
  <!-- 3. Defer JavaScript -->
  <script defer src="app.js"></script>
</head>
<body>
  <!-- Content -->
</body>
</html>
```

**Phases:**
1. **DOM Construction** - Parse HTML
2. **CSSOM Construction** - Parse CSS
3. **Render Tree** - Combine DOM + CSSOM
4. **Layout** - Calculate positions
5. **Paint** - Draw pixels

### Repaint vs Reflow

**Reflow (Layout):**
- Recalculate positions and sizes
- Expensive operation
- Triggered by: DOM changes, style changes, window resize

**Repaint:**
- Redraw pixels
- Less expensive than reflow
- Triggered by: color changes, visibility changes

```javascript
// ❌ Causes multiple reflows
element.style.width = '100px';  // Reflow
element.style.height = '100px'; // Reflow
element.style.margin = '10px';  // Reflow

// ✅ Single reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Or use class
element.className = 'optimized-class';

// ❌ Reading layout properties causes reflow
const height = element.offsetHeight; // Reflow
element.style.height = height + 10 + 'px'; // Reflow

// ✅ Batch reads and writes
const height = element.offsetHeight;
requestAnimationFrame(() => {
  element.style.height = height + 10 + 'px';
});
```

### Google Lighthouse

**Run Lighthouse:**
```bash
# CLI
npm install -g lighthouse
lighthouse https://example.com --view

# Chrome DevTools
# 1. Open DevTools
# 2. Lighthouse tab
# 3. Generate report
```

**Metrics:**
- **FCP** (First Contentful Paint) - First content visible
- **LCP** (Largest Contentful Paint) - Main content visible
- **FID** (First Input Delay) - Interactivity
- **CLS** (Cumulative Layout Shift) - Visual stability
- **TTI** (Time to Interactive) - Fully interactive

**Optimization Tips:**
```javascript
// 1. Reduce JavaScript execution time
// - Code splitting
// - Remove unused code
// - Minify and compress

// 2. Minimize main thread work
// - Use Web Workers for heavy computation
// - Defer non-critical JavaScript

// 3. Reduce request counts
// - Bundle files
// - Use HTTP/2
// - Inline critical resources

// 4. Optimize images
// - Use modern formats (WebP, AVIF)
// - Lazy load images
// - Use responsive images
```


## L4 - Advanced Performance

### JavaScript Obfuscation and Minification

**Minification:**
```javascript
// Before
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// After (Terser)
function calculateTotal(t){let e=0;for(let l=0;l<t.length;l++)e+=t[l].price;return e}
```

**Obfuscation:**
```javascript
// javascript-obfuscator
const JavaScriptObfuscator = require('javascript-obfuscator');

const obfuscated = JavaScriptObfuscator.obfuscate(`
  function hello() {
    console.log('Hello World');
  }
`, {
  compact: true,
  controlFlowFlattening: true
});

console.log(obfuscated.getObfuscatedCode());
```

### Long Computations

**Web Workers:**
```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

worker.onmessage = (e) => {
  console.log('Result:', e.data); // Result: 15
};

// worker.js
self.onmessage = (e) => {
  const sum = e.data.numbers.reduce((a, b) => a + b, 0);
  self.postMessage(sum);
};
```

**requestIdleCallback:**
```javascript
// Run non-critical work during idle time
function processData(data) {
  const chunks = chunkArray(data, 100);
  
  function processChunk(index) {
    if (index >= chunks.length) return;
    
    requestIdleCallback((deadline) => {
      while (deadline.timeRemaining() > 0 && index < chunks.length) {
        processItem(chunks[index]);
        index++;
      }
      processChunk(index);
    });
  }
  
  processChunk(0);
}
```

### Network Optimizations

**HTTP/2 Server Push:**
```javascript
// Node.js HTTP/2
const http2 = require('http2');
const server = http2.createSecureServer({ key, cert });

server.on('stream', (stream, headers) => {
  // Push CSS before HTML
  stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
    pushStream.respondWithFile('style.css');
  });
  
  stream.respondWithFile('index.html');
});
```

**Resource Hints:**
```html
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch (low priority) -->
<link rel="prefetch" href="/next-page.html">

<!-- Preload (high priority) -->
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- Prerender (load entire page) -->
<link rel="prerender" href="/next-page.html">
```

### RAIL Performance Model

**RAIL:**
- **Response** - Process events in < 50ms
- **Animation** - Produce frame in < 16ms (60fps)
- **Idle** - Maximize idle time
- **Load** - Deliver content in < 1s

```javascript
// Response: Handle input quickly
button.addEventListener('click', () => {
  // Keep under 50ms
  processClick();
});

// Animation: 60fps = 16.67ms per frame
function animate() {
  // Keep under 16ms
  updatePosition();
  requestAnimationFrame(animate);
}

// Idle: Use idle time
requestIdleCallback(() => {
  // Non-critical work
  preloadImages();
});

// Load: Fast initial load
// - Critical CSS inline
// - Defer JavaScript
// - Lazy load images
```

### Continuous Performance Monitoring

**Real User Monitoring (RUM):**
```javascript
// Google Analytics
gtag('event', 'timing_complete', {
  name: 'load',
  value: Math.round(performance.now()),
  event_category: 'JS Dependencies'
});

// Custom RUM
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Send to analytics
    sendToAnalytics({
      metric: entry.name,
      value: entry.duration
    });
  }
});

observer.observe({ entryTypes: ['measure', 'navigation'] });
```

**Synthetic Monitoring:**
```javascript
// Lighthouse CI
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["https://example.com"]
    },
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "interactive": ["error", { "maxNumericValue": 5000 }]
      }
    }
  }
}
```

This comprehensive guide covers all performance optimization techniques!
