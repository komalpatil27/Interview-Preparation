### Pure Components
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

### state and Props
- State : State of a component is an object that holds some information that may change over the lifetime of the component. 
- Props : Props are inputs to components.

### Dynamic import , Static import
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

### Synthetic events 
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

### What are portals in React?

Portal is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
ReactDOM.createPortal(child, container);

### Routing

- Route , link
Route defines what should be rendered for a given URL path, while Link provides a way to navigate between different URL paths and render the appropriate components without causing a full page refresh.

Routers-

- 1. BrowserRouter : The BrowserRouter is the recommended router for most web applications. It uses the HTML5 history API to keep the UI in sync with the URL in the browser's address bar.
- 2. hashRouter : The HashRouter is an older technique used for routing in web applications. It uses the hash portion of the URL (e.g., https://example.com/#/about) to keep the UI in sync with the URL. 
- 3. memoryRouter: The MemoryRouter is primarily used for testing purposes or for rendering React Router components in a non-browser environment, such as React Native or server-side rendering.

### Example of Jest test case
```javascript
const sum = (a, b) => a + b;
export default sum;

// sum.test.js
import sum from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```
### Code-splitting?
Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

### When do you need to use refs?
There are few use cases to go for refs,
Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.

### strict mode in React
StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. 
- To find the bugs caused by impure rendering where the components will re-render twice.
- To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
- Identifying components with unsafe lifecycle methods.
- Warning about legacy string ref API usage.

### HOC :

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
