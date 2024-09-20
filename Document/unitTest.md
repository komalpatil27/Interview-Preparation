
# Unit Testing Overview

## What is Unit Testing?

Unit testing involves testing individual components of your code, such as functions or methods.
 in isolation to ensure they perform as expected. Each test case focuses on a specific piece of functionality.

## Simple Example

### Function to Test

```javascript
// math.js
function add(a, b) {
    return a + b;
}
module.exports = add;
```

### Writing a Unit Test with Jest

1. **Install Jest**

   ```bash
   npm install --save-dev jest
   ```

2. **Create a Test File**

   ```javascript
   // math.test.js
   const add = require('./math');

   test('adds 1 + 2 to equal 3', () => {
       expect(add(1, 2)).toBe(3);
   });

   test('adds -1 + 1 to equal 0', () => {
       expect(add(-1, 1)).toBe(0);
   });
   ```

3. **Run the Tests**

   Add this to your `package.json`:

   ```json
   "scripts": {
     "test": "jest"
   }
   ```

   Then run:

   ```bash
   npm test
   ```

### Expected Output

```
PASS  ./math.test.js
✓ adds 1 + 2 to equal 3
✓ adds -1 + 1 to equal 0
```

## Summary

- **Function**: `add(a, b)`—returns the sum of two numbers.
- **Tests**: Check if `add` correctly sums positive and negative numbers.
- **Tool**: Jest for running and managing tests.

Unit testing helps ensure that your code works correctly and can handle various input scenarios, improving reliability and facilitating easier debugging.

## Common Matchers
- toEqual
- toBe
- toBeDefined 
- toMatch (String)
- toContain (array)
- toBeInTheDocument ( to check if element is in dom or not)

### Example
```javascript
import { render , screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom" //import is needed to add matchers like toBeInDocument as it accesses the dom and We cannot access dom using react-testing-lib alone

describe("Contact Page Test cases" , () => {
    test("Should render Contact Component" , () => {
        // Render
        render(<Contact/>)
        // Query
        const heading = screen.getByRole("heading")
        // Assert
        expect(heading).toBeInTheDocument()
    })
    
    test("Should load button in Contact Component" , () => {
        render(<Contact/>)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })
    
    test("Should load two input boxes in Contact Component" , () => {
        render(<Contact/>)
        const input = screen.getAllByRole("textbox")
        // expect(button).toBeInTheDocument()
        expect(input.length).toBe(2)
    })
})
```

 `Object.seal()` prevents additions, `Object.freeze()` prevents modifications. `Object.seal()` prevents new properties from being added but allows existing properties to be modified.