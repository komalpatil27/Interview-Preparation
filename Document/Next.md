# Next.js - Complete Interview Guide

## Fundamentals

### 1. What is Next.js?

Next.js is a React framework for building full-stack web applications. It provides features like server-side rendering (SSR), static site generation (SSG), API routes, and automatic code splitting.

**Key Features:**
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- File-based routing
- Image optimization
- Built-in CSS support
- TypeScript support

**Example:**
```javascript
// pages/index.js
export default function Home() {
  return <h1>Welcome to Next.js!</h1>
}
```


### 2. What is the difference between Next.js and React?

| Feature | React | Next.js |
|---------|-------|---------|
| Type | Library | Framework |
| Rendering | Client-side only | SSR, SSG, CSR |
| Routing | Requires React Router | File-based routing |
| SEO | Poor (CSR) | Excellent (SSR/SSG) |
| API Routes | No | Yes |
| Configuration | Manual setup | Zero config |
| Image Optimization | Manual | Built-in |

**React (Client-Side Rendering):**
```javascript
// App.js
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}
```

**Next.js (File-based Routing):**
```javascript
// pages/index.js - automatically creates route "/"
export default function Home() {
  return <h1>Home Page</h1>
}

// pages/about.js - automatically creates route "/about"
export default function About() {
  return <h1>About Page</h1>
}
```


### 3. What are the different rendering methods in Next.js?

#### **1. Static Site Generation (SSG)**
Pre-renders pages at build time. Best for content that doesn't change often.

```javascript
// pages/blog/[id].js
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  
  return {
    props: { post },
    revalidate: 60 // ISR - revalidate every 60 seconds
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map(post => ({ params: { id: post.id } })),
    fallback: 'blocking' // or false, true
  };
}

export default function Post({ post }) {
  return <div>{post.title}</div>
}
```

#### **2. Server-Side Rendering (SSR)**
Pre-renders pages on each request. Best for dynamic content.

```javascript
// pages/dashboard.js
export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const data = await fetchUserData(req.cookies.token);
  
  return {
    props: { data }
  };
}

export default function Dashboard({ data }) {
  return <div>{data.username}</div>
}
```

#### **3. Client-Side Rendering (CSR)**
Renders on the client side, like traditional React.

```javascript
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);
  
  if (!user) return <div>Loading...</div>
  return <div>{user.name}</div>
}
```

#### **4. Incremental Static Regeneration (ISR)**
Updates static pages after build without rebuilding entire site.

```javascript
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 10 // Regenerate page every 10 seconds
  };
}
```


### 4. What is the App Router vs Pages Router?

**Pages Router (Legacy - Next.js 12 and below):**
```
pages/
  index.js          → /
  about.js          → /about
  blog/
    [id].js         → /blog/:id
```

**App Router (Next.js 13+):**
```
app/
  page.js           → /
  about/
    page.js         → /about
  blog/
    [id]/
      page.js       → /blog/:id
  layout.js         → Root layout
  loading.js        → Loading UI
  error.js          → Error UI
```

**App Router Features:**
- React Server Components by default
- Nested layouts
- Loading and error states
- Server actions
- Streaming


### 5. What are API Routes in Next.js?

API Routes allow you to create backend endpoints within your Next.js app.

**Pages Router:**
```javascript
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: ['Alice', 'Bob'] });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ message: 'User created', name });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

**App Router (Route Handlers):**
```javascript
// app/api/users/route.js
export async function GET(request) {
  const users = await fetchUsers();
  return Response.json({ users });
}

export async function POST(request) {
  const body = await request.json();
  const user = await createUser(body);
  return Response.json({ user }, { status: 201 });
}
```


### 6. What is the difference between getStaticProps, getServerSideProps, and getStaticPaths?

**getStaticProps** - Fetch data at build time (SSG):
```javascript
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

**getServerSideProps** - Fetch data on each request (SSR):
```javascript
export async function getServerSideProps(context) {
  const data = await fetchData(context.params.id);
  return { props: { data } };
}
```

**getStaticPaths** - Define dynamic routes for SSG:
```javascript
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map(p => ({ params: { id: p.id } })),
    fallback: false
  };
}
```


### 7. What is the purpose of _app.js and _document.js?

**_app.js** - Wraps all pages, used for global state, layouts, CSS:
```javascript
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

**_document.js** - Customizes HTML document structure:
```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```


### 8. How does routing work in Next.js?

**File-based Routing (Pages Router):**
```
pages/
  index.js          → /
  about.js          → /about
  blog/
    index.js        → /blog
    [slug].js       → /blog/:slug
  users/
    [id]/
      settings.js   → /users/:id/settings
```

**Dynamic Routes:**
```javascript
// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;
  
  return <div>Post: {slug}</div>
}
```

**Catch-all Routes:**
```javascript
// pages/docs/[...slug].js
// Matches: /docs/a, /docs/a/b, /docs/a/b/c
export default function Docs() {
  const router = useRouter();
  const { slug } = router.query; // ['a', 'b', 'c']
  
  return <div>Docs</div>
}
```

**Programmatic Navigation:**
```javascript
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  const navigate = () => {
    router.push('/about');
    // or
    router.push({
      pathname: '/blog/[slug]',
      query: { slug: 'my-post' }
    });
  };
  
  return <button onClick={navigate}>Go to About</button>
}
```


### 9. What is Image Optimization in Next.js?

Next.js provides automatic image optimization with the `Image` component.

```javascript
import Image from 'next/image';

export default function Profile() {
  return (
    <div>
      {/* Local image */}
      <Image
        src="/profile.jpg"
        alt="Profile"
        width={500}
        height={500}
        priority // Load immediately
      />
      
      {/* Remote image */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote"
        width={500}
        height={500}
        loading="lazy" // Lazy load
      />
      
      {/* Responsive image */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
```

**Benefits:**
- Automatic lazy loading
- Prevents Cumulative Layout Shift (CLS)
- Serves modern formats (WebP, AVIF)
- Responsive images
- On-demand optimization


### 10. What are Layouts in Next.js?

**Pages Router:**
```javascript
// components/Layout.js
export default function Layout({ children }) {
  return (
    <div>
      <nav>Navigation</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

// pages/_app.js
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

**App Router (Nested Layouts):**
```javascript
// app/layout.js (Root layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/dashboard/layout.js (Nested layout)
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```


### 11. What is Middleware in Next.js?

Middleware runs before a request is completed, useful for authentication, redirects, etc.

```javascript
// middleware.js (root level)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  
  // Redirect if not authenticated
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

// Specify which routes to run middleware on
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```


### 12. What are Server Components vs Client Components?

**Server Components (App Router default):**
```javascript
// app/posts/page.js
// This is a Server Component by default
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**Client Components:**
```javascript
'use client'; // Mark as Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**When to use Client Components:**
- Need useState, useEffect, or other React hooks
- Need event listeners (onClick, onChange, etc.)
- Need browser-only APIs (localStorage, window, etc.)
- Need to use class components


### 13. What is Incremental Static Regeneration (ISR)?

ISR allows you to update static pages after build without rebuilding the entire site.

```javascript
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 60 // Regenerate page every 60 seconds
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**How it works:**
1. Initial request serves cached page
2. After `revalidate` time, next request triggers regeneration
3. Regenerated page is cached
4. Subsequent requests get new cached page


### 14. How do you handle environment variables in Next.js?

```javascript
// .env.local
DATABASE_URL=mongodb://localhost:27017
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Server-side only:**
```javascript
// Can only be accessed in server-side code
const dbUrl = process.env.DATABASE_URL;
```

**Client-side (must prefix with NEXT_PUBLIC_):**
```javascript
// Can be accessed in browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Usage in API routes:**
```javascript
// pages/api/db.js
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  // Connect to database
  res.status(200).json({ connected: true });
}
```


### 15. What is the difference between Link and router.push()?

**Link Component (Declarative):**
```javascript
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
      
      {/* With query params */}
      <Link href={{ pathname: '/blog', query: { id: '1' } }}>
        Blog
      </Link>
    </nav>
  );
}
```

**useRouter (Programmatic):**
```javascript
import { useRouter } from 'next/router';

export default function LoginButton() {
  const router = useRouter();
  
  const handleLogin = async () => {
    await login();
    router.push('/dashboard');
    // or
    router.replace('/dashboard'); // No history entry
  };
  
  return <button onClick={handleLogin}>Login</button>
}
```


### 16. How do you implement authentication in Next.js?

**Using NextAuth.js:**
```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
});

// pages/_app.js
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

// pages/dashboard.js
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <button onClick={() => signIn()}>Sign In</button>
  
  return (
    <div>
      <p>Welcome {session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```


### 17. What are Server Actions in Next.js?

Server Actions allow you to run server-side code directly from client components.

```javascript
// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.posts.create({ title, content });
  
  revalidatePath('/posts');
  redirect('/posts');
}

// app/new-post/page.js
import { createPost } from '../actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```


### 18. How do you optimize performance in Next.js?

**1. Use Image Optimization:**
```javascript
import Image from 'next/image';

<Image src="/hero.jpg" width={800} height={600} priority />
```

**2. Code Splitting (Automatic):**
```javascript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR for this component
});
```

**3. Font Optimization:**
```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

**4. Use Static Generation when possible:**
```javascript
export async function getStaticProps() {
  // Runs at build time
}
```

**5. Implement ISR for dynamic content:**
```javascript
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60
  };
}
```


### 19. What is the fallback option in getStaticPaths?

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: false // or true, 'blocking'
  };
}
```

**fallback: false**
- Only pre-rendered paths are accessible
- 404 for any other path

**fallback: true**
- Shows fallback page while generating
- Good for many pages

```javascript
export default function Post({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return <div>{post.title}</div>
}
```

**fallback: 'blocking'**
- Waits for HTML to be generated
- No fallback UI needed
- Better for SEO


### 20. How do you deploy a Next.js application?

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Docker:**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

**Build for production:**
```bash
npm run build
npm start
```

**Environment variables:**
```bash
# .env.production
DATABASE_URL=production_url
NEXT_PUBLIC_API_URL=https://api.production.com
```
