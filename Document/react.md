### 1) Pure Components
Pure components are the components which render the same output for the same state and props. 
In function components, you can achieve these pure components through memoized React.memo() API wrapping around the component.

```jsx
const EmployeeProfile = memo(function EmployeeProfile({ name }) {
    return (<>
          <p>Name:{name}</p>
          </>);
  });
  export default function EmployeeRegForm() {
    const [name, setName] = useState('');
    return (
      <>
       <label>
          Email: <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <EmployeeProfile name={name}/>
      </>
    );
  }
```

### 2) state and Props
- State : State of a component is an object that holds some information that may change over the lifetime of the component. 
- Props : Props are inputs to components.

### 3) Dynamic import , Static import
- Dynamic import : Dynamic imports, also known as code splitting or lazy loading, 
```jsx
if (someCondition) {
  import('./ConditionalModule')
    .then((module) => {
      const ConditionalModule = module.default;
      // Use ConditionalModule
    })
    .catch((error) => {
      // Handle errors
    });
}
 Example2 :
 import React , {lazy , Suspense} from 'react';
 const Comp = () => {
 cost LazyLoadedComponent = lazy(() => import(./Component))
 return(
    <>
    <Suspense fallback ={<>'...loading'</>}>
    <LazyLoadedComponent>
    </Suspense>
    </>
 )
 }
```

### 4) Synthetic events 
SyntheticEvent is a cross-browser wrapper around the browser's native event.

```
function BookStore() {
  handleTitleChange(e) {
    console.log('The new title is:', e.target.value);
    // 'e' represents synthetic event
    const nativeEvent = e.nativeEvent;
    console.log(nativeEvent);
    e.stopPropogation();
    e.preventDefault();
  }
  ```

### 5) What are portals in React?

Portal is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
ReactDOM.createPortal(child, container);

### 6) Routing

- Route , link
Route defines what should be rendered for a given URL path, while Link provides a way to navigate between different URL paths and render the appropriate components without causing a full page refresh.

Routers-

- 1. BrowserRouter : The BrowserRouter is the recommended router for most web applications. It uses the HTML5 history API to keep the UI in sync with the URL in the browser's address bar.
- 2. hashRouter : The HashRouter is an older technique used for routing in web applications. It uses the hash portion of the URL (e.g., https://example.com/#/about) to keep the UI in sync with the URL. 
- 3. memoryRouter: The MemoryRouter is primarily used for testing purposes or for rendering React Router components in a non-browser environment, such as React Native or server-side rendering.

### 7) Example of Jest test case
```javascript
const sum = (a, b) => a + b;
export default sum; 

// sum.test.js
import sum from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```
### 8) Code-splitting?
Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

### 9) When do you need to use refs?
There are few use cases to go for refs,
Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.

### 10) strict mode in React
StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. 
- To find the bugs caused by impure rendering where the components will re-render twice.
- To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
- Identifying components with unsafe lifecycle methods.
- Warning about legacy string ref API usage.

### 11) HOC :

	Higher-order components or HOC is the advanced method of reusing the component functionality logic. It simply takes the original component and returns the enhanced component.
```jsx

//GreetingComponent.js
import React from 'react';

const GreetingComponent = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default GreetingComponent;

//withLogger.js HOC
import React from 'react';

const withLogger = (WrappedComponent) => (props) => {
  console.log('Component props:', props);
  return <WrappedComponent {...props} />;
};

export default withLogger;

//App.js
import React from 'react';
import GreetingComponent from './GreetingComponent';
import withLogger from './withLogger';

const LoggedGreetingComponent = withLogger(GreetingComponent);

const App = () => {
  return <LoggedGreetingComponent name="John" />;
};

export default App;
```

### 12) React Design patterns
- Component-Based Architecture: 
    - React itself is based on the component-based architecture. 
    - You break down your UI into reusable components, each responsible for a specific part of the UI. This promotes code reusability and makes your UI easier to understand and maintain.
- Container-Presentational Components: 
    - This pattern separates components into two categories: containers (or smart components) and presentational (or dumb) components. Containers handle data fetching, state management, and interactions with Redux or other state management libraries, while presentational components focus solely on rendering UI based on props they receive.
- Higher-Order Components (HOC): HOCs are functions that accept a component as input and return a new component with enhanced functionality. They're useful for code reuse, cross-cutting concerns like authentication, and separating concerns.
- Render Props: Instead of using HOCs, you can use render props, where a component's logic is encapsulated in a function passed as a prop. This function returns JSX, allowing components to share code without introducing additional nesting.
- Compound Components: This pattern involves creating a group of components that work together to achieve a common goal. Each component handles a specific responsibility, and when combined, they create a more complex UI or behavior.
- State Management Patterns: While React's built-in state management is suitable for small to medium-sized applications, for larger apps, you might use external state management libraries like Redux or MobX. These libraries provide predictable state management and help manage complex application states.
- Controlled vs. Uncontrolled Components: In controlled components, form data is handled by React state, while in uncontrolled components, the form data is handled by the DOM itself. Choosing between them depends on your use case and preference.
- Context API: React's Context API allows you to pass data through the component tree without having to pass props manually at every level. It's useful for sharing global data like themes, user authentication, or language preferences.
- Server-Side Rendering (SSR): SSR is a technique where the server generates the initial HTML of a web page, which is then enhanced by client-side JavaScript. It's beneficial for SEO, performance, and user experience, especially for large-scale applications.
- Error Boundary: Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They help improve the robustness of your application.