# TypeScript — Most Asked Interview Questions & Detailed Answers

## Table of Contents
1. [TypeScript Basics](#typescript-basics)
2. [Types & Type System](#types--type-system)
3. [Advanced Types](#advanced-types)
4. [Generics](#generics)
5. [Classes & OOP](#classes--oop)
6. [Decorators](#decorators)
7. [Modules & Namespaces](#modules--namespaces)
8. [TypeScript Configuration](#typescript-configuration)
9. [Best Practices](#best-practices)

---

## TypeScript Basics

### Q1: What is TypeScript and why should we use it?

**Answer:**

**What is TypeScript:**
- TypeScript is a **statically typed superset of JavaScript** developed by Microsoft
- Compiles to plain JavaScript (ES3, ES5, ES6+)
- Adds optional static typing, classes, interfaces, and other features

**Why Use TypeScript:**

**1. Type Safety:**
```typescript
// JavaScript - Runtime error
function add(a, b) {
  return a + b;
}
add(5, "10"); // "510" - unexpected!

// TypeScript - Compile-time error
function add(a: number, b: number): number {
  return a + b;
}
add(5, "10"); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

**2. Better IDE Support:**
- IntelliSense (autocomplete)
- Refactoring tools
- Navigation (go to definition, find references)
- Inline documentation

**3. Early Error Detection:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  // TypeScript catches typos at compile time
  return {
    id: id,
    nmae: "John", // ❌ Error: 'nmae' does not exist in type 'User'
    email: "john@example.com"
  };
}
```

**4. Better Refactoring:**
- Rename symbols across entire codebase safely
- Change interface → all usages flagged
- Safe code transformations

**5. Documentation:**
```typescript
/**
 * Fetches user data from API
 * @param userId - The unique identifier for the user
 * @returns Promise resolving to User object
 */
async function fetchUser(userId: number): Promise<User> {
  // Implementation
}
```

**6. Modern JavaScript Features:**
- Use ES6+ features and compile to older JavaScript
- Async/await, classes, modules, etc.

---

### Q2: What is the difference between `interface` and `type` in TypeScript?

**Answer:**

**Similarities:**
Both can describe object shapes, be extended, and used interchangeably in most cases.

**Key Differences:**

**1. Declaration Merging:**

```typescript
// ✅ Interface supports declaration merging
interface User {
  name: string;
}

interface User {
  age: number;
}

// Merged into single interface
const user: User = {
  name: "John",
  age: 30
};

// ❌ Type does NOT support declaration merging
type Person = {
  name: string;
};

type Person = { // ❌ Error: Duplicate identifier 'Person'
  age: number;
};
```

**2. Extending:**

```typescript
// Interface uses 'extends'
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type uses intersection (&)
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};
```

**3. Union Types:**

```typescript
// ✅ Type can create unions
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// ❌ Interface cannot create unions directly
interface Status { // Can't do this
  // ...
}
```

**4. Primitives & Tuples:**

```typescript
// ✅ Type can alias primitives
type Name = string;
type Age = number;
type Coordinates = [number, number];

// ❌ Interface cannot alias primitives
interface Name extends string { } // ❌ Error
```

**5. Computed Properties:**

```typescript
// ✅ Type supports computed properties
type Keys = "name" | "age";
type Person = {
  [K in Keys]: string;
};

// ❌ Interface doesn't support mapped types directly
```

**When to Use:**

**Use Interface when:**
- Defining object shapes, especially for public APIs
- Need declaration merging (e.g., extending third-party types)
- Working with classes

**Use Type when:**
- Creating unions, intersections, or tuples
- Aliasing primitives
- Using mapped types or conditional types
- Need more complex type transformations

---

### Q3: Explain `any`, `unknown`, `never`, and `void` types.

**Answer:**

**1. `any` - The Escape Hatch:**

```typescript
// Disables type checking - use sparingly!
let value: any;

value = 5;           // ✅ OK
value = "hello";     // ✅ OK
value = true;        // ✅ OK
value.foo.bar.baz(); // ✅ No error (but will crash at runtime!)

// Problem: Loses all type safety
function process(data: any) {
  return data.toUpperCase(); // No error, but crashes if data is not a string
}

process(123); // Runtime error!
```

**When to use `any`:**
- Migrating JavaScript to TypeScript gradually
- Working with truly dynamic data (rare)
- Third-party libraries without types (better: use `unknown`)

**2. `unknown` - Type-Safe `any`:**

```typescript
// Must check type before using
let value: unknown;

value = 5;
value = "hello";
value = true;

// ❌ Cannot use without type checking
value.toUpperCase(); // Error: Object is of type 'unknown'

// ✅ Must narrow type first
if (typeof value === "string") {
  value.toUpperCase(); // ✅ OK - TypeScript knows it's a string
}

// Type guard example
function processUnknown(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase();
  } else if (typeof data === "number") {
    return data.toFixed(2);
  }
  throw new Error("Unsupported type");
}
```

**When to use `unknown`:**
- Receiving data from external sources (API, user input)
- Replacing `any` for better type safety
- When you don't know the type but will check it

**3. `never` - The Impossible Type:**

```typescript
// Represents values that never occur

// Function that never returns
function throwError(message: string): never {
  throw new Error(message);
  // No return statement - function never completes normally
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// Exhaustive type checking
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 * 10;
    case "square":
      return 10 * 10;
    case "triangle":
      return 0.5 * 10 * 10;
    default:
      // If we add a new shape and forget to handle it,
      // TypeScript will error here
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${shape}`);
  }
}

// Union type narrowing
function process(value: string | number) {
  if (typeof value === "string") {
    // value is string
  } else if (typeof value === "number") {
    // value is number
  } else {
    // value is never (all cases handled)
    const _exhaustive: never = value;
  }
}
```

**When to use `never`:**
- Functions that throw errors
- Infinite loops
- Exhaustive type checking
- Impossible states in unions

**4. `void` - No Return Value:**

```typescript
// Function returns undefined (or nothing)
function logMessage(message: string): void {
  console.log(message);
  // No return statement, or return undefined
}

// Can return undefined explicitly
function doSomething(): void {
  return undefined; // ✅ OK
  return null;      // ❌ Error
  return 5;         // ❌ Error
}

// Callback with void return
function forEach(arr: number[], callback: (n: number) => void) {
  for (const item of arr) {
    callback(item);
  }
}

forEach([1, 2, 3], (n) => {
  console.log(n); // No return needed
});
```

**When to use `void`:**
- Functions that don't return a value
- Callbacks that don't need to return anything
- Event handlers

**Comparison Table:**

| Type | Can Assign To | Can Use Without Checking | Use Case |
|------|---------------|-------------------------|----------|
| `any` | Anything | ✅ Yes (unsafe) | Escape hatch, migration |
| `unknown` | Only `unknown` or `any` | ❌ No (must narrow) | Safe alternative to `any` |
| `never` | Nothing | N/A | Impossible values, exhaustive checks |
| `void` | `undefined` | ✅ Yes | Functions with no return value |

---

## Types & Type System

### Q4: What are Type Guards and how do you create custom type guards?

**Answer:**

**Type Guards** narrow down types within conditional blocks.

**Built-in Type Guards:**

**1. `typeof` Type Guard:**
```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows value is string
  } else {
    return value.toFixed(2); // TypeScript knows value is number
  }
}
```

**2. `instanceof` Type Guard:**
```typescript
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows animal is Dog
  } else {
    animal.meow(); // TypeScript knows animal is Cat
  }
}
```

**3. `in` Operator:**
```typescript
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

function move(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive(); // TypeScript knows vehicle is Car
  } else {
    vehicle.sail(); // TypeScript knows vehicle is Boat
  }
}
```

**Custom Type Guards (User-Defined Type Guards):**

**Syntax:** `parameterName is Type`

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// Custom type guard function
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows pet is Fish
  } else {
    pet.fly(); // TypeScript knows pet is Bird
  }
}
```

**More Complex Example:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

// Type guard for Admin
function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).role === "admin";
}

function handleUser(user: User | Admin) {
  console.log(user.name); // Available on both

  if (isAdmin(user)) {
    console.log(user.permissions); // ✅ OK - TypeScript knows user is Admin
  } else {
    console.log(user.permissions); // ❌ Error - not available on User
  }
}
```

**Type Predicate with Validation:**

```typescript
interface ApiResponse {
  data: unknown;
}

interface SuccessResponse extends ApiResponse {
  data: {
    id: number;
    name: string;
  };
}

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return (
    typeof response.data === "object" &&
    response.data !== null &&
    "id" in response.data &&
    "name" in response.data &&
    typeof (response.data as any).id === "number" &&
    typeof (response.data as any).name === "string"
  );
}

async function fetchData() {
  const response: ApiResponse = await fetch("/api/data").then(r => r.json());
  
  if (isSuccessResponse(response)) {
    console.log(response.data.id); // ✅ Type-safe access
  }
}
```

---

### Q5: Explain Type Assertions and when to use them.

**Answer:**

**Type Assertions** tell TypeScript to treat a value as a specific type.

**Syntax:**

```typescript
// Angle-bracket syntax
let value1 = <string>someValue;

// 'as' syntax (preferred, works with JSX)
let value2 = someValue as string;
```

**Use Cases:**

**1. DOM Manipulation:**

```typescript
// TypeScript doesn't know the specific element type
const input = document.getElementById("email"); // HTMLElement | null

// Assert to specific type
const emailInput = document.getElementById("email") as HTMLInputElement;
emailInput.value = "test@example.com"; // ✅ OK

// With null check
const button = document.getElementById("submit") as HTMLButtonElement | null;
if (button) {
  button.disabled = true;
}
```

**2. Working with `unknown`:**

```typescript
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJSON('{"name": "John", "age": 30}');

// Assert to expected type
interface User {
  name: string;
  age: number;
}

const user = data as User;
console.log(user.name); // ✅ OK
```

**3. Narrowing Union Types:**

```typescript
type Response = { success: true; data: string } | { success: false; error: string };

function handleResponse(response: Response) {
  if (response.success) {
    // TypeScript knows response is success type
    console.log(response.data);
  } else {
    // TypeScript knows response is error type
    console.log(response.error);
  }
}

// Or with assertion (less safe)
function processResponse(response: Response) {
  const successResponse = response as { success: true; data: string };
  console.log(successResponse.data); // ⚠️ Might crash if response is error
}
```

**4. Const Assertions:**

```typescript
// Without const assertion
const colors1 = ["red", "green", "blue"]; // string[]

// With const assertion
const colors2 = ["red", "green", "blue"] as const; // readonly ["red", "green", "blue"]

// Object with const assertion
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;

// config.apiUrl = "..."; // ❌ Error: Cannot assign to 'apiUrl' because it is a read-only property
```

**5. Non-Null Assertion (`!`):**

```typescript
function processUser(user: User | null) {
  // Tell TypeScript: "I know this is not null"
  console.log(user!.name); // ⚠️ Dangerous - will crash if user is null
  
  // Better: Use optional chaining
  console.log(user?.name); // ✅ Safe
}

// Useful when you're certain
const button = document.getElementById("submit")!; // I know this exists
button.addEventListener("click", handleClick);
```

**Double Assertion (Escape Hatch):**

```typescript
// When TypeScript won't allow direct assertion
const value = "hello" as number; // ❌ Error

// Force it (very dangerous!)
const value = "hello" as unknown as number; // ✅ Compiles (but wrong!)
```

**When to Use Type Assertions:**

✅ **Good Use Cases:**
- DOM manipulation (you know the element type)
- Working with third-party libraries without types
- Narrowing types when you have more information than TypeScript

❌ **Avoid:**
- Using as a workaround for type errors
- When you're not certain about the type
- Instead of proper type guards

**Best Practices:**

```typescript
// ❌ Bad: Assertion without validation
function processData(data: unknown) {
  const user = data as User;
  return user.name; // Might crash!
}

// ✅ Good: Validate before asserting
function processData(data: unknown) {
  if (isUser(data)) {
    return data.name; // Type guard narrows type safely
  }
  throw new Error("Invalid data");
}

function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof (data as any).name === "string"
  );
}
```

---

## Advanced Types

### Q6: What are Utility Types in TypeScript? Explain common ones.

**Answer:**

TypeScript provides built-in **Utility Types** for common type transformations.

**1. `Partial<T>` - Make all properties optional:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// All properties become optional
type PartialUser = Partial<User>;
// Equivalent to:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

// Use case: Update functions
function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
}

updateUser(1, { name: "John" }); // ✅ OK
updateUser(1, { email: "john@example.com", age: 30 }); // ✅ OK
```

**2. `Required<T>` - Make all properties required:**

```typescript
interface Config {
  host?: string;
  port?: number;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// Equivalent to:
// {
//   host: string;
//   port: number;
//   timeout: number;
// }

function initServer(config: RequiredConfig) {
  // All properties guaranteed to exist
  console.log(config.host, config.port, config.timeout);
}
```

**3. `Readonly<T>` - Make all properties readonly:**

```typescript
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Equivalent to:
// {
//   readonly id: number;
//   readonly name: string;
// }

const user: ReadonlyUser = { id: 1, name: "John" };
user.name = "Jane"; // ❌ Error: Cannot assign to 'name' because it is a read-only property
```

**4. `Pick<T, K>` - Pick specific properties:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
}

// Pick only id and name
type UserPreview = Pick<User, "id" | "name">;
// Equivalent to:
// {
//   id: number;
//   name: string;
// }

function displayUser(user: UserPreview) {
  console.log(user.id, user.name);
}
```

**5. `Omit<T, K>` - Omit specific properties:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Omit password
type PublicUser = Omit<User, "password">;
// Equivalent to:
// {
//   id: number;
//   name: string;
//   email: string;
// }

function sendToClient(user: PublicUser) {
  // password not accessible
  return user;
}
```

**6. `Record<K, T>` - Create object type with specific keys:**

```typescript
// Map of string keys to User values
type UsersById = Record<string, User>;
// Equivalent to:
// {
//   [key: string]: User;
// }

const users: UsersById = {
  "user1": { id: 1, name: "John", email: "john@example.com" },
  "user2": { id: 2, name: "Jane", email: "jane@example.com" }
};

// Specific keys
type Permissions = Record<"read" | "write" | "delete", boolean>;
// Equivalent to:
// {
//   read: boolean;
//   write: boolean;
//   delete: boolean;
// }

const userPermissions: Permissions = {
  read: true,
  write: true,
  delete: false
};
```

**7. `Exclude<T, U>` - Exclude types from union:**

```typescript
type Status = "pending" | "approved" | "rejected" | "cancelled";

// Exclude cancelled
type ActiveStatus = Exclude<Status, "cancelled">;
// Type: "pending" | "approved" | "rejected"

type T1 = Exclude<string | number | boolean, boolean>;
// Type: string | number
```

**8. `Extract<T, U>` - Extract types from union:**

```typescript
type Status = "pending" | "approved" | "rejected" | "cancelled";

// Extract only approved and rejected
type FinalStatus = Extract<Status, "approved" | "rejected">;
// Type: "approved" | "rejected"

type T1 = Extract<string | number | boolean, boolean | string>;
// Type: string | boolean
```

**9. `NonNullable<T>` - Remove null and undefined:**

```typescript
type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// Type: string

function process(value: NonNullable<string | null>) {
  // value is guaranteed to be string (not null)
  return value.toUpperCase();
}
```

**10. `ReturnType<T>` - Get function return type:**

```typescript
function getUser() {
  return {
    id: 1,
    name: "John",
    email: "john@example.com"
  };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; email: string; }

// With generic function
function createArray<T>(item: T): T[] {
  return [item];
}

type StringArray = ReturnType<typeof createArray<string>>;
// Type: string[]
```

**11. `Parameters<T>` - Get function parameter types:**

```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// Type: [string, number, string]

// Use to create wrapper
function logAndCreateUser(...args: CreateUserParams) {
  console.log("Creating user with:", args);
  return createUser(...args);
}
```

**12. `Awaited<T>` - Unwrap Promise type:**

```typescript
async function fetchUser(): Promise<User> {
  return { id: 1, name: "John", email: "john@example.com" };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// Type: { id: number; name: string; email: string; }

// Nested promises
type T1 = Awaited<Promise<Promise<string>>>;
// Type: string
```

**Combining Utility Types:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Public user (omit password) with optional fields
type PublicUserUpdate = Partial<Omit<User, "password" | "id" | "createdAt" | "updatedAt">>;
// Type: { name?: string; email?: string; }

// Readonly user preview
type UserPreview = Readonly<Pick<User, "id" | "name">>;
// Type: { readonly id: number; readonly name: string; }
```

---

### Q7: Explain Mapped Types and Conditional Types with examples.

**Answer:**

**Mapped Types** transform properties of existing types.

**Basic Mapped Type:**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; }

type OptionalUser = Optional<User>;
// { id?: number; name?: string; }
```

**Mapped Type with Transformation:**

```typescript
// Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  id: number;
  name: string;
}

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; }

// Make all properties arrays
type Arrayify<T> = {
  [P in keyof T]: T[P][];
};

type UserArrays = Arrayify<User>;
// { id: number[]; name: string[]; }
```

**Key Remapping:**

```typescript
// Add 'get' prefix to all keys
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// {
//   getName: () => string;
//   getAge: () => number;
// }

// Filter out specific keys
type RemoveId<T> = {
  [P in keyof T as Exclude<P, "id">]: T[P];
};

interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductWithoutId = RemoveId<Product>;
// { name: string; price: number; }
```

**Conditional Types:**

**Basic Syntax:** `T extends U ? X : Y`

```typescript
// If T is string, return number, else return boolean
type IsString<T> = T extends string ? number : boolean;

type T1 = IsString<string>; // number
type T2 = IsString<number>; // boolean
```

**Practical Examples:**

```typescript
// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type T1 = ArrayElement<string[]>; // string
type T2 = ArrayElement<number[]>; // number
type T3 = ArrayElement<string>;   // never

// Extract Promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type T4 = UnwrapPromise<Promise<string>>; // string
type T5 = UnwrapPromise<number>;          // number

// Function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }
```

**Distributive Conditional Types:**

```typescript
// Conditional types distribute over unions
type ToArray<T> = T extends any ? T[] : never;

type T1 = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// Non-distributive (wrap in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type T2 = ToArrayNonDist<string | number>;
// (string | number)[]
```

**Complex Example - Deep Readonly:**

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface User {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

type ReadonlyUser = DeepReadonly<User>;
// All nested properties are readonly

const user: ReadonlyUser = {
  id: 1,
  profile: {
    name: "John",
    address: {
      street: "123 Main St",
      city: "NYC"
    }
  }
};

user.profile.address.city = "LA"; // ❌ Error: readonly
```

**Combining Mapped and Conditional Types:**

```typescript
// Make all function properties optional
type OptionalFunctions<T> = {
  [P in keyof T]: T[P] extends Function ? T[P] | undefined : T[P];
};

interface API {
  getData: () => Promise<string>;
  postData: (data: string) => Promise<void>;
  version: string;
}

type PartialAPI = OptionalFunctions<API>;
// {
//   getData: (() => Promise<string>) | undefined;
//   postData: ((data: string) => Promise<void>) | undefined;
//   version: string;
// }
```

---

## Generics

### Q8: What are Generics and why are they useful? Provide examples.

**Answer:**

**Generics** allow you to write reusable, type-safe code that works with multiple types.

**Problem Without Generics:**

```typescript
// Without generics - need separate functions for each type
function identityString(value: string): string {
  return value;
}

function identityNumber(value: number): number {
  return value;
}

// Or lose type safety
function identity(value: any): any {
  return value; // ❌ Loses type information
}

const result = identity("hello"); // Type: any (not string)
```

**Solution With Generics:**

```typescript
// Generic function - works with any type
function identity<T>(value: T): T {
  return value;
}

const str = identity<string>("hello"); // Type: string
const num = identity<number>(42);      // Type: number
const bool = identity(true);           // Type: boolean (inferred)
```

**Generic Functions:**

```typescript
// Array operations
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first1 = firstElement([1, 2, 3]);      // Type: number | undefined
const first2 = firstElement(["a", "b", "c"]); // Type: string | undefined

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair("hello", 42);    // Type: [string, number]
const p2 = pair(true, "world");  // Type: [boolean, string]

// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John", email: "john@example.com" };
const name = getProperty(user, "name");  // Type: string
const id = getProperty(user, "id");      // Type: number
// getProperty(user, "invalid"); // ❌ Error
```

**Generic Interfaces:**

```typescript
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// Generic interface with methods
interface Repository<T> {
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  async getById(id: number): Promise<User> {
    // Implementation
    return { id, name: "John", email: "john@example.com" };
  }
  
  async getAll(): Promise<User[]> {
    // Implementation
    return [];
  }
  
  // ... other methods
}
```

**Generic Classes:**

```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
```

**Generic Constraints:**

```typescript
// Constraint: T must have length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");        // ✅ OK - string has length
logLength([1, 2, 3]);      // ✅ OK - array has length
logLength({ length: 10 }); // ✅ OK - object has length
// logLength(123);         // ❌ Error - number doesn't have length

// Multiple constraints
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

function process<T extends Printable & Saveable>(item: T): void {
  item.print();
  item.save();
}
```

**Default Generic Types:**

```typescript
interface Response<T = any> {
  data: T;
  status: number;
  message: string;
}

// Use default
const response1: Response = {
  data: "anything",
  status: 200,
  message: "OK"
};

// Override default
const response2: Response<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "OK"
};
```

**Real-World Example - API Client:**

```typescript
class ApiClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as Promise<T>;
  }
  
  async post<T, U = T>(url: string, data: U): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json() as Promise<T>;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

const api = new ApiClient();

// Type-safe API calls
const user = await api.get<User>("/api/users/1");
console.log(user.name); // ✅ Type: string

const newUser = await api.post<User, CreateUserDto>("/api/users", {
  name: "John",
  email: "john@example.com"
});
```

---

## Classes & OOP

### Q9: How do access modifiers (`public`, `private`, `protected`) work in TypeScript?

**Answer:**

TypeScript adds access modifiers to control property and method visibility.

**1. `public` (Default):**

```typescript
class User {
  public id: number; // Explicitly public
  name: string;      // Implicitly public (default)
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  
  public greet(): void {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const user = new User(1, "John");
console.log(user.id);   // ✅ OK - public
console.log(user.name); // ✅ OK - public
user.greet();           // ✅ OK - public
```

**2. `private` - Only accessible within the class:**

```typescript
class BankAccount {
  private balance: number = 0;
  
  deposit(amount: number): void {
    this.balance += amount; // ✅ OK - within class
  }
  
  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount; // ✅ OK - within class
    }
  }
  
  getBalance(): number {
    return this.balance; // ✅ OK - within class
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // ✅ OK - 100
// console.log(account.balance);   // ❌ Error - private property
```

**3. `protected` - Accessible in class and subclasses:**

```typescript
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  protected makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says Woof!`); // ✅ OK - protected accessible in subclass
    this.makeSound(); // ✅ OK
  }
}

const dog = new Dog("Buddy");
dog.bark(); // ✅ OK
// console.log(dog.name);  // ❌ Error - protected property
// dog.makeSound();        // ❌ Error - protected method
```

**Parameter Properties (Shorthand):**

```typescript
// Long way
class User1 {
  private id: number;
  public name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// Shorthand with parameter properties
class User2 {
  constructor(
    private id: number,
    public name: string
  ) {
    // Properties automatically created and assigned
  }
  
  getId(): number {
    return this.id;
  }
}

const user = new User2(1, "John");
console.log(user.name);    // ✅ OK - public
// console.log(user.id);   // ❌ Error - private
console.log(user.getId()); // ✅ OK - 1
```

**Private Fields (ECMAScript Private Fields):**

```typescript
class Counter {
  #count = 0; // ECMAScript private field (runtime private)
  
  increment(): void {
    this.#count++;
  }
  
  getCount(): number {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 1
// console.log(counter.#count);  // ❌ Syntax error - truly private at runtime
```

**Comparison:**

| Modifier | Class | Subclass | Outside |
|----------|-------|----------|---------|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |
| `#private` (ES) | ✅ | ❌ | ❌ |

**Note:** TypeScript's `private` and `protected` are compile-time only. They don't exist in JavaScript runtime. Use `#private` for runtime privacy.

---

### Q10: Explain `abstract` classes and when to use them.

**Answer:**

**Abstract Classes** are base classes that cannot be instantiated directly and may contain abstract methods that must be implemented by subclasses.

**Basic Example:**

```typescript
abstract class Animal {
  constructor(public name: string) {}
  
  // Abstract method - must be implemented by subclasses
  abstract makeSound(): void;
  
  // Concrete method - inherited by subclasses
  move(): void {
    console.log(`${this.name} is moving`);
  }
}

// ❌ Cannot instantiate abstract class
// const animal = new Animal("Generic"); // Error

class Dog extends Animal {
  // Must implement abstract method
  makeSound(): void {
    console.log(`${this.name} says Woof!`);
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log(`${this.name} says Meow!`);
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Buddy says Woof!
dog.move();      // Buddy is moving

const cat = new Cat("Whiskers");
cat.makeSound(); // Whiskers says Meow!
```

**Abstract Properties:**

```typescript
abstract class Shape {
  abstract readonly name: string;
  abstract area(): number;
  abstract perimeter(): number;
  
  describe(): void {
    console.log(`${this.name}: Area = ${this.area()}, Perimeter = ${this.perimeter()}`);
  }
}

class Circle extends Shape {
  readonly name = "Circle";
  
  constructor(private radius: number) {
    super();
  }
  
  area(): number {
    return Math.PI * this.radius ** 2;
  }
  
  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  readonly name = "Rectangle";
  
  constructor(
    private width: number,
    private height: number
  ) {
    super();
  }
  
  area(): number {
    return this.width * this.height;
  }
  
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle(5);
circle.describe(); // Circle: Area = 78.54, Perimeter = 31.42

const rectangle = new Rectangle(4, 6);
rectangle.describe(); // Rectangle: Area = 24, Perimeter = 20
```

**When to Use Abstract Classes:**

**1. Shared Implementation:**
```typescript
abstract class Repository<T> {
  protected items: T[] = [];
  
  // Concrete methods - shared implementation
  getAll(): T[] {
    return this.items;
  }
  
  getById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }
  
  // Abstract methods - must be implemented
  abstract validate(item: T): boolean;
  abstract save(item: T): void;
}

class UserRepository extends Repository<User> {
  validate(user: User): boolean {
    return user.email.includes("@");
  }
  
  save(user: User): void {
    if (this.validate(user)) {
      this.items.push(user);
    }
  }
}
```

**2. Template Method Pattern:**
```typescript
abstract class DataProcessor {
  // Template method
  process(data: string): void {
    const loaded = this.loadData(data);
    const processed = this.processData(loaded);
    this.saveData(processed);
  }
  
  // Abstract steps
  protected abstract loadData(data: string): any;
  protected abstract processData(data: any): any;
  protected abstract saveData(data: any): void;
}

class JSONProcessor extends DataProcessor {
  protected loadData(data: string): any {
    return JSON.parse(data);
  }
  
  protected processData(data: any): any {
    // Process JSON data
    return data;
  }
  
  protected saveData(data: any): void {
    console.log("Saving JSON:", data);
  }
}
```

**Abstract Class vs Interface:**

```typescript
// Interface - only contract
interface IAnimal {
  name: string;
  makeSound(): void;
}

// Abstract class - contract + shared implementation
abstract class Animal {
  constructor(public name: string) {}
  
  abstract makeSound(): void;
  
  // Shared implementation
  move(): void {
    console.log(`${this.name} is moving`);
  }
}

// When to use which:
// - Interface: Pure contract, multiple inheritance needed
// - Abstract class: Shared implementation, single inheritance
```

**Multiple Inheritance with Interfaces:**

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Can implement multiple interfaces
class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Duck is flying");
  }
  
  swim(): void {
    console.log("Duck is swimming");
  }
}

// But can only extend one class
abstract class Bird {
  abstract makeSound(): void;
}

// ❌ Cannot extend multiple classes
// class Penguin extends Bird, Animal { }

// ✅ Can extend one class and implement multiple interfaces
class Penguin extends Bird implements Swimmable {
  makeSound(): void {
    console.log("Squawk!");
  }
  
  swim(): void {
    console.log("Penguin is swimming");
  }
}
```

---

## Best Practices

### Q11: What are some TypeScript best practices you follow?

**Answer:**

**1. Enable Strict Mode:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    // Or enable individually:
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

**2. Avoid `any`, Use `unknown`:**

```typescript
// ❌ Bad
function process(data: any) {
  return data.value; // No type safety
}

// ✅ Good
function process(data: unknown) {
  if (typeof data === "object" && data !== null && "value" in data) {
    return (data as { value: string }).value;
  }
  throw new Error("Invalid data");
}
```

**3. Use Type Inference:**

```typescript
// ❌ Redundant type annotation
const name: string = "John";
const age: number = 30;

// ✅ Let TypeScript infer
const name = "John"; // Type: string
const age = 30;      // Type: number

// ✅ Annotate when needed
function getUser(): User { // Return type annotation helpful
  return { id: 1, name: "John", email: "john@example.com" };
}
```

**4. Prefer Interfaces for Objects, Types for Unions:**

```typescript
// ✅ Interface for object shapes
interface User {
  id: number;
  name: string;
}

// ✅ Type for unions
type Status = "pending" | "approved" | "rejected";
type ID = string | number;
```

**5. Use Readonly and Const Assertions:**

```typescript
// Immutable data
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// Const assertion for literal types
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"
```

**6. Avoid Non-Null Assertions:**

```typescript
// ❌ Dangerous
const button = document.getElementById("submit")!;
button.addEventListener("click", handleClick);

// ✅ Safe
const button = document.getElementById("submit");
if (button) {
  button.addEventListener("click", handleClick);
}

// ✅ Or use optional chaining
button?.addEventListener("click", handleClick);
```

**7. Use Discriminated Unions:**

```typescript
// ✅ Discriminated union for type-safe state
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.log(result.error); // TypeScript knows error exists
  }
}
```

**8. Organize Types:**

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
}

// Import and use
import { User, UserRole, CreateUserDto } from "./types/user";
```

**9. Use Utility Types:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// ✅ Use utility types instead of duplicating
type PublicUser = Omit<User, "password">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;
```

**10. Document with JSDoc:**

```typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier for the user
 * @returns Promise resolving to User object
 * @throws {Error} If user not found
 */
async function fetchUser(userId: number): Promise<User> {
  // Implementation
}
```

---

## TypeScript Configuration

### Q12: Explain important `tsconfig.json` options.

**Answer:**

**Essential Compiler Options:**

```json
{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",
    
    // Module system
    "module": "commonjs", // or "esnext", "es2020"
    
    // Output directory
    "outDir": "./dist",
    
    // Root directory of source files
    "rootDir": "./src",
    
    // Enable all strict type checking options
    "strict": true,
    
    // Module resolution strategy
    "moduleResolution": "node",
    
    // Allow importing JSON files
    "resolveJsonModule": true,
    
    // Ensure consistent casing in imports
    "forceConsistentCasingInFileNames": true,
    
    // Skip type checking of declaration files
    "skipLibCheck": true,
    
    // Enable interoperability between CommonJS and ES Modules
    "esModuleInterop": true,
    
    // Allow default imports from modules with no default export
    "allowSyntheticDefaultImports": true,
    
    // Generate source maps for debugging
    "sourceMap": true,
    
    // Generate .d.ts declaration files
    "declaration": true,
    
    // Remove comments in output
    "removeComments": true,
    
    // Do not emit output if any errors
    "noEmitOnError": true,
    
    // Report errors for unused locals
    "noUnusedLocals": true,
    
    // Report errors for unused parameters
    "noUnusedParameters": true,
    
    // Report error when not all code paths return a value
    "noImplicitReturns": true,
    
    // Report errors for fallthrough cases in switch
    "noFallthroughCasesInSwitch": true,
    
    // Include type definitions
    "types": ["node", "jest"],
    
    // Base URL for module resolution
    "baseUrl": "./",
    
    // Path mapping for imports
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  
  // Files to include
  "include": ["src/**/*"],
  
  // Files to exclude
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

**Strict Mode Options (enabled with `"strict": true`):**

```json
{
  "compilerOptions": {
    // Raise error on expressions and declarations with implied 'any' type
    "noImplicitAny": true,
    
    // Enable strict null checks
    "strictNullChecks": true,
    
    // Enable strict checking of function types
    "strictFunctionTypes": true,
    
    // Enable strict checking of bind, call, and apply
    "strictBindCallApply": true,
    
    // Enable strict checking of property initialization in classes
    "strictPropertyInitialization": true,
    
    // Raise error on 'this' expressions with implied 'any' type
    "noImplicitThis": true,
    
    // Parse in strict mode and emit "use strict"
    "alwaysStrict": true
  }
}
```

---

This comprehensive TypeScript interview guide covers the most commonly asked questions with detailed explanations and practical examples. Each topic builds upon the previous ones to provide a complete understanding of TypeScript's type system and features.
