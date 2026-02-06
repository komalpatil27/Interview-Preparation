# React Complete Interview Guide

Based on interview feedback: Strong fundamentals, knows lifecycle, hooks, Virtual DOM, Redux, Router. Need clarity on render props initially, dangerouslySetInnerHTML.

## Components

### L1 - Component Basics

**Class-based Components:**
```javascript
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**Functional Components:**
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// With hooks
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**PropTypes:**
```javascript
import PropTypes from 'prop-types';

function User({ name, age, email }) {
  return <div>{name} - {age}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string
};

User.defaultProps = {
  age: 18
};
```

**Lifecycle Methods (Class Components):**
```javascript
class MyComponent extends React.Component {
  // Mounting
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  
  componentDidMount() {
    // After first render - fetch data, subscriptions
    fetchData().then(data => this.setState({ data }));
  }
  
  // Updating
  shouldComponentUpdate(nextProps, nextState) {
    // Return false to prevent re-render
    return this.state.data !== nextState.data;
  }
  
  componentDidUpdate(prevProps, prevState) {
    // After update - compare props/state
    if (this.props.userId !== prevProps.userId) {
      this.fetchUser(this.props.userId);
    }
  }
  
  // Unmounting
  componentWillUnmount() {
    // Cleanup - remove listeners, cancel requests
    this.subscription.unsubscribe();
  }
  
  // Error handling
  componentDidCatch(error, info) {
    console.error('Error:', error, info);
  }
  
  render() {
    return <div>{this.state.data}</div>;
  }
}
```

**Controlled vs Uncontrolled Components:**
```javascript
// Controlled - React controls the value
function ControlledForm() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// Uncontrolled - DOM controls the value
function UncontrolledForm() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return <input ref={inputRef} />;
}
```

**Composition vs Inheritance:**
```javascript
// Composition (preferred in React)
function Dialog({ title, children }) {
  return (
    <div className="dialog">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome">
      <p>Thank you for visiting!</p>
    </Dialog>
  );
}

// props.children
function Container({ children }) {
  return <div className="container">{children}</div>;
}

<Container>
  <Header />
  <Main />
  <Footer />
</Container>
```

### L2 - Advanced Component Patterns

**Higher-Order Components (HOCs):**
```javascript
// HOC - function that takes a component and returns a new component
function withAuth(Component) {
  return function AuthComponent(props) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = withAuth(Dashboard);

// Multiple HOCs
const EnhancedComponent = withAuth(withLogging(withAnalytics(MyComponent)));
```

**Render Props:**
```javascript
// Component with render prop
class Mouse extends React.Component {
  state = { x: 0, y: 0 };
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
<Mouse render={({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)} />

// Or with children as function
<Mouse>
  {({ x, y }) => <h1>Position: {x}, {y}</h1>}
</Mouse>
```

**Component Re-rendering:**
```javascript
// Component re-renders when:
// 1. State changes
// 2. Props change
// 3. Parent re-renders
// 4. Context changes

// Prevent unnecessary re-renders
class MyComponent extends React.PureComponent {
  // Shallow comparison of props and state
  render() {
    return <div>{this.props.value}</div>;
  }
}

// Functional equivalent
const MyComponent = React.memo(function MyComponent({ value }) {
  return <div>{value}</div>;
});

// Custom comparison
const MyComponent = React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```


## Hooks

### L1 - Basic Hooks

**useState:**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Functional update
  const increment = () => setCount(prev => prev + 1);
  
  // Multiple state variables
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
  // Object state
  const [user, setUser] = useState({ name: '', age: 0 });
  const updateName = (name) => setUser(prev => ({ ...prev, name }));
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

**useEffect:**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // componentDidMount + componentDidUpdate
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Only re-run if userId changes
  
  // componentDidMount only
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty deps = run once
  
  // componentWillUnmount
  useEffect(() => {
    const subscription = subscribe();
    
    return () => {
      subscription.unsubscribe(); // Cleanup
    };
  }, []);
  
  return <div>{user?.name}</div>;
}
```

**useCallback:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback - new function on every render
  const handleClick = () => setCount(count + 1);
  
  // With useCallback - memoized function
  const handleClickMemo = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Dependencies
  
  return <Child onClick={handleClickMemo} />;
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});
```

**useMemo:**
```javascript
function ExpensiveComponent({ items }) {
  // Without useMemo - recalculates on every render
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  // With useMemo - only recalculates when items change
  const totalMemo = useMemo(() => {
    console.log('Calculating total...');
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  return <div>Total: ${totalMemo}</div>;
}
```

### L2 - Custom Hooks

```javascript
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### L3 - useLayoutEffect

```javascript
// useEffect - runs after paint
useEffect(() => {
  // DOM updates are visible to user
}, []);

// useLayoutEffect - runs before paint
useLayoutEffect(() => {
  // DOM updates happen before user sees anything
  // Use for DOM measurements
  const height = ref.current.offsetHeight;
}, []);

// Example: Tooltip positioning
function Tooltip({ children, text }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef();
  
  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  }, []);
  
  return (
    <>
      <div ref={ref}>{children}</div>
      <div style={{ position: 'absolute', left: coords.x, top: coords.y }}>
        {text}
      </div>
    </>
  );
}
```


## Virtual DOM & Reconciliation

### L1 - Virtual DOM Concept

**How it works:**
1. State changes
2. New Virtual DOM created
3. Diff with previous Virtual DOM
4. Calculate minimal changes
5. Update real DOM

**Keys:**
```javascript
// Bad - using index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// Good - using unique ID
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// Why keys matter:
// Without proper keys, React may re-render entire list
// With keys, React knows which items changed
```

### L3 - Reconciliation Algorithm

**Diffing Algorithm:**
```javascript
// Different element types - unmount and remount
<div>
  <Counter />
</div>

// Changes to:
<span>
  <Counter />
</span>
// Counter is unmounted and remounted

// Same element type - update props
<div className="before" />
// Changes to:
<div className="after" />
// Only className is updated

// Recursing on children
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// Adding at end is efficient
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>

// Adding at beginning without keys is inefficient
<ul>
  <li>zero</li>  {/* React thinks this changed */}
  <li>first</li>  {/* React thinks this changed */}
  <li>second</li> {/* React thinks this is new */}
</ul>

// With keys - efficient
<ul>
  <li key="0">zero</li>
  <li key="1">first</li>
  <li key="2">second</li>
</ul>
```


## State Management

### L1 - Redux Basics

**Three Principles:**
1. Single source of truth (one store)
2. State is read-only (dispatch actions)
3. Changes made with pure functions (reducers)

**Redux Flow:**
```javascript
// 1. Actions
const INCREMENT = 'INCREMENT';
const increment = () => ({ type: INCREMENT });
const incrementBy = (amount) => ({ type: INCREMENT, payload: amount });

// 2. Reducers
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + (action.payload || 1) };
    default:
      return state;
  }
}

// 3. Store
import { createStore } from 'redux';
const store = createStore(counterReducer);

// 4. Subscribe
store.subscribe(() => {
  console.log(store.getState());
});

// 5. Dispatch
store.dispatch(increment());
store.dispatch(incrementBy(5));
```

### L2 - React Redux

**Provider & connect:**
```javascript
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Wrap app with Provider
<Provider store={store}>
  <App />
</Provider>

// Connect component to store
import { connect } from 'react-redux';

function Counter({ count, increment }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

// mapStateToProps
const mapStateToProps = (state) => ({
  count: state.count
});

// mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: 'INCREMENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

**Redux Hooks (Modern):**
```javascript
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  );
}
```

**Redux Thunk (Async):**
```javascript
// Action creator that returns function
function fetchUser(id) {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_REQUEST' });
    
    try {
      const user = await fetch(`/api/users/${id}`).then(r => r.json());
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: error });
    }
  };
}

// Usage
dispatch(fetchUser(123));
```

**Context API vs Redux:**
```javascript
// Context API - for simple state
const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme } = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}

// When to use Redux:
// - Complex state logic
// - State needed across many components
// - State updates frequently
// - Need middleware (logging, async)
// - Time-travel debugging

// When to use Context:
// - Simple state (theme, locale)
// - Infrequent updates
// - Small app
```


## React Router

### L1 - Basic Routing

**React Router v6:**
```javascript
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User 123</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}
```

**v5 vs v6 Differences:**
```javascript
// v5
<Route path="/users/:id" component={User} />
<Route path="/users/:id" render={(props) => <User {...props} />} />

// v6
<Route path="/users/:id" element={<User />} />

// v5 - useHistory
const history = useHistory();
history.push('/home');

// v6 - useNavigate
const navigate = useNavigate();
navigate('/home');

// v5 - Switch
<Switch>
  <Route path="/" component={Home} />
</Switch>

// v6 - Routes
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```


## Performance & Optimization

### L2 - Optimization Techniques

**React.memo:**
```javascript
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data}</div>;
});

// Only re-renders if props change
```

**shouldComponentUpdate:**
```javascript
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.id !== nextProps.id;
  }
  
  render() {
    return <div>{this.props.data}</div>;
  }
}
```

**PureComponent:**
```javascript
// Automatically implements shouldComponentUpdate with shallow comparison
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.data}</div>;
  }
}
```

### L3 - Advanced Optimization

**Code Splitting:**
```javascript
import React, { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

<Routes>
  <Route path="/" element={
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  } />
</Routes>
```

**React DevTools:**
- Profiler tab - measure render performance
- Components tab - inspect props/state
- Highlight updates - see what re-renders


## Security

### L3 - XSS Prevention

**dangerouslySetInnerHTML:**
```javascript
// Dangerous - XSS vulnerability
function Component({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

// If htmlContent = '<script>alert("XSS")</script>'
// Script will execute!

// Safe - sanitize first
import DOMPurify from 'dompurify';

function SafeComponent({ htmlContent }) {
  const sanitized = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// Better - avoid dangerouslySetInnerHTML
function BetterComponent({ text }) {
  return <div>{text}</div>; // React escapes by default
}
```

**XSS on Props:**
```javascript
// Vulnerable
<a href={userInput}>Click</a>
// If userInput = 'javascript:alert("XSS")'

// Safe - validate URLs
function isValidUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

<a href={isValidUrl(userInput) ? userInput : '#'}>Click</a>
```

This comprehensive React guide covers all topics mentioned in your interview feedback!
