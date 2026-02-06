# React - Brief Theory

## Components

**Class vs Functional:**
- Class: `extends React.Component`, has lifecycle methods
- Functional: Simple functions, use hooks for state/effects

**Lifecycle Methods:**
- **Mounting:** constructor → render → componentDidMount
- **Updating:** render → componentDidUpdate
- **Unmounting:** componentWillUnmount
- **Error:** componentDidCatch

**Controlled vs Uncontrolled:**
- Controlled: React controls form value via state
- Uncontrolled: DOM controls value, use refs to access

**Composition:** Preferred over inheritance in React, use props.children

## Hooks - State and Side Effects in Functional Components

**useState - Managing Component State:**
- Adds state to functional components (previously only in class components)
- Returns array: `[currentValue, setterFunction]`
- Setter function triggers re-render
- Can pass function to setter for state based on previous value
- State persists between re-renders
- Each useState call is independent

**useEffect - Side Effects and Lifecycle:**

**What are side effects?**
- Operations that affect things outside the component
- Examples: Data fetching, subscriptions, DOM manipulation, timers

**When does useEffect run?**
- Runs AFTER render (doesn't block painting)
- Runs after every render by default
- Dependency array controls when it runs

**Dependency Array Explained:**
- **No array** - Runs after every render
- **Empty array `[]`** - Runs once after initial render (like componentDidMount)
- **With dependencies `[a, b]`** - Runs when a or b changes

**Cleanup Function:**
- Return function from useEffect for cleanup
- Runs before component unmounts
- Runs before effect runs again (to clean up previous effect)
- Use for: Removing event listeners, canceling subscriptions, clearing timers

**useCallback - Memoizing Functions:**

**Problem it solves:**
- Functions are recreated on every render
- Child components re-render if function prop changes
- Causes unnecessary re-renders

**How it works:**
- Returns memoized version of function
- Only creates new function if dependencies change
- Use when: Passing callbacks to optimized child components
- Don't overuse - has its own cost

**useMemo - Memoizing Expensive Calculations:**

**Problem it solves:**
- Expensive calculations run on every render
- Wastes CPU on unchanged data

**How it works:**
- Caches result of calculation
- Only recalculates if dependencies change
- Returns the memoized value (not a function)
- Use when: Heavy computations, complex filtering/sorting
- Don't overuse - premature optimization

**useCallback vs useMemo:**
- useCallback: Memoizes the function itself
- useMemo: Memoizes the function's return value

**useLayoutEffect - Synchronous Effects:**
- Runs BEFORE browser paints
- Blocks visual updates until complete
- Use for: DOM measurements, preventing flicker
- Rare use case - prefer useEffect

**Custom Hooks - Reusable Logic:**
- Extract component logic into reusable functions
- Must start with "use" prefix
- Can use other hooks inside
- Share stateful logic between components
- Examples: useLocalStorage, useFetch, useDebounce

## Higher-Order Components (HOCs)

**Definition:** Function that takes component and returns enhanced component

**Use Cases:** Code reuse, logic abstraction, props manipulation

**Example:** withAuth, withLogging, withAnalytics

## Render Props

**Definition:** Component with function prop that returns React element

**Use Cases:** Share code between components, render logic reuse

## Virtual DOM

**Concept:** Lightweight copy of actual DOM in memory

**Process:**
1. State changes
2. Create new Virtual DOM
3. Diff with previous Virtual DOM
4. Update only changed parts in real DOM

**Keys:** Help React identify which items changed, added, or removed
- Use unique IDs, not array index

## Reconciliation

**Diffing Algorithm:**
- Different element types → unmount and remount
- Same element type → update props only
- Recursing on children → use keys for efficiency

## State Management

**Redux:**
- Single source of truth (one store)
- State is read-only (dispatch actions)
- Changes via pure functions (reducers)

**Redux Flow:** Action → Reducer → Store → Component

**Redux Thunk:** Middleware for async actions

**Context API:**
- Built-in state management
- Good for simple state (theme, locale)
- Avoid for frequently changing state

**Context vs Redux:**
- Context: Simple, built-in, small apps
- Redux: Complex state, middleware, time-travel debugging

## React Router

**Components:**
- `BrowserRouter` - HTML5 history API
- `Routes` - Container for routes
- `Route` - Define path and component
- `Link` - Navigation without page reload

**Hooks:**
- `useParams` - Access URL parameters
- `useNavigate` - Programmatic navigation
- `useLocation` - Current location object

## Performance Optimization

**React.memo:** Prevent re-render if props unchanged (shallow comparison)

**PureComponent:** Class component with shallow prop/state comparison

**shouldComponentUpdate:** Manually control re-rendering

**Code Splitting:** Split code into chunks, load on demand
- `React.lazy()` - lazy load components
- `Suspense` - fallback while loading

**Keys:** Help React optimize list rendering

## Security

**dangerouslySetInnerHTML:** Renders raw HTML
- Risk: XSS attacks
- Solution: Sanitize with DOMPurify

**XSS Prevention:**
- React escapes by default
- Validate user input
- Sanitize HTML before rendering
- Use Content Security Policy
