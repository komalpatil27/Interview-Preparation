# Performance Optimization - Brief Theory

## Page Load Optimization

**Techniques:**
1. **Minimize HTTP Requests** - Bundle files, use sprites
2. **Enable Compression** - Gzip, Brotli
3. **Optimize Images** - Compress, lazy load, responsive images, modern formats (WebP, AVIF)
4. **Minify Resources** - Remove whitespace, shorten variable names
5. **Use CDN** - Serve static assets from edge locations
6. **Browser Caching** - Cache-Control headers, ETags
7. **Code Splitting** - Load only what's needed

## JavaScript Optimization

**Debouncing:** Wait until user stops action before executing
- Use case: Search input, window resize

**Throttling:** Limit execution rate
- Use case: Scroll events, mouse movement

**Memory Leaks:**
- Detached DOM nodes
- Event listeners not removed
- Global variables
- Closures holding references

**Prevention:**
- Remove event listeners on cleanup
- Clear timers and intervals
- Avoid global variables
- Use WeakMap/WeakSet for temporary references

**Efficient DOM Manipulation:**
- Batch DOM changes
- Use DocumentFragment
- Minimize reflows/repaints
- Use CSS classes instead of inline styles

## Profiling & Debugging

**Chrome DevTools:**
- **Performance Tab:** Record and analyze runtime performance
- **Memory Tab:** Find memory leaks, take heap snapshots
- **Network Tab:** Analyze requests, timing, size

**Performance API:**
- Measure execution time
- User Timing API for custom marks
- Navigation Timing for page load metrics

## Compression

**Types:**
- **Gzip:** Good compression, widely supported
- **Brotli:** Better compression, modern browsers
- **Deflate:** Older, less efficient

**What to Compress:** Text files (HTML, CSS, JS, JSON, SVG)

## Caching

**Levels:**
1. **Browser Cache:** Cache-Control, ETags
2. **Service Worker:** Offline support, cache strategies
3. **CDN Cache:** Edge caching
4. **Server Cache:** Redis, Memcached
5. **Database Cache:** Query result caching

**Cache Strategies:**
- Cache-First: Check cache, then network
- Network-First: Check network, fallback to cache
- Stale-While-Revalidate: Serve cache, update in background

## Critical Rendering Path

**Steps:**
1. Parse HTML → DOM
2. Parse CSS → CSSOM
3. Combine DOM + CSSOM → Render Tree
4. Layout (calculate positions)
5. Paint (draw pixels)

**Optimization:**
- Inline critical CSS
- Defer non-critical CSS
- Defer JavaScript
- Minimize render-blocking resources

## Reflow vs Repaint

**Reflow (Layout):**
- Recalculate positions and sizes
- Very expensive
- Triggered by: DOM changes, style changes, window resize

**Repaint:**
- Redraw pixels
- Less expensive
- Triggered by: color changes, visibility changes

**Optimization:**
- Batch DOM reads and writes
- Use CSS transforms (don't trigger reflow)
- Use requestAnimationFrame for animations
- Avoid layout thrashing

## Lighthouse Metrics

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** Main content visible (< 2.5s)
- **FID (First Input Delay):** Interactivity (< 100ms)
- **CLS (Cumulative Layout Shift):** Visual stability (< 0.1)

**Other Metrics:**
- **FCP (First Contentful Paint):** First content visible
- **TTI (Time to Interactive):** Fully interactive
- **Speed Index:** How quickly content is visually displayed

## RAIL Performance Model

**Guidelines:**
- **Response:** Process events in < 50ms
- **Animation:** Produce frame in < 16ms (60fps)
- **Idle:** Maximize idle time for non-critical work
- **Load:** Deliver content in < 1s

## Network Optimization

**HTTP/2 Features:**
- Multiplexing
- Server push
- Header compression

**Resource Hints:**
- `dns-prefetch` - Resolve DNS early
- `preconnect` - Establish connection early
- `prefetch` - Load resource for next page
- `preload` - Load critical resource
- `prerender` - Load and render next page

## Web Workers

**Purpose:** Run JavaScript in background thread
- Don't block main thread
- Good for CPU-intensive tasks
- No DOM access

**Service Workers:**
- Offline support
- Background sync
- Push notifications
- Cache management

## Monitoring

**Real User Monitoring (RUM):**
- Collect data from actual users
- Measure real-world performance
- Tools: Google Analytics, New Relic

**Synthetic Monitoring:**
- Automated tests from controlled environment
- Consistent baseline
- Tools: Lighthouse CI, WebPageTest

**Continuous Monitoring:**
- Track performance over time
- Set up alerts for regressions
- Monitor Core Web Vitals
