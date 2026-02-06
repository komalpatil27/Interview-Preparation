# Software Design Complete Guide

## L1 - Design Principles

### KISS (Keep It Simple, Stupid)

**Principle:** Simplicity should be a key goal. Avoid unnecessary complexity.

```javascript
// ❌ Complex
function getUserData(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          reject(new Error('User not found'));
        }
      }
    });
  });
}

// ✅ Simple
async function getUserData(id) {
  const result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return result[0];
}
```

### DRY (Don't Repeat Yourself)

**Principle:** Avoid code duplication. Extract common logic.

```javascript
// ❌ Repetitive
function createUser(data) {
  const user = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data
  };
  return db.insert('users', user);
}

function createPost(data) {
  const post = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data
  };
  return db.insert('posts', post);
}

// ✅ DRY
function createEntity(table, data) {
  const entity = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data
  };
  return db.insert(table, entity);
}

const createUser = (data) => createEntity('users', data);
const createPost = (data) => createEntity('posts', data);
```

### YAGNI (You Aren't Gonna Need It)

**Principle:** Don't add functionality until it's needed.

```javascript
// ❌ Over-engineering
class User {
  constructor(name) {
    this.name = name;
    this.settings = {}; // Not needed yet
    this.preferences = {}; // Not needed yet
    this.history = []; // Not needed yet
  }
  
  // Methods for features that don't exist yet
  updateSettings() {}
  updatePreferences() {}
  addToHistory() {}
}

// ✅ YAGNI
class User {
  constructor(name) {
    this.name = name;
  }
  
  // Add features when actually needed
}
```

### Programming Paradigms

**OOP (Object-Oriented Programming):**
```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  
  deposit(amount) {
    this.balance += amount;
  }
  
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
```

**FP (Functional Programming):**
```javascript
// Pure functions, immutability, no side effects
const deposit = (balance, amount) => balance + amount;
const withdraw = (balance, amount) => 
  amount <= balance ? balance - amount : balance;

let balance = 1000;
balance = deposit(balance, 500);
balance = withdraw(balance, 200);

// Higher-order functions
const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
const names = users.map(u => u.name);
const adults = users.filter(u => u.age >= 18);
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
```


## L2 - Architectural Patterns & Design Patterns

### Architectural Patterns

**1. Layered Architecture:**
```
Presentation Layer (UI)
    ↓
Business Logic Layer (Services)
    ↓
Data Access Layer (Repositories)
    ↓
Database
```

```javascript
// Presentation Layer
app.get('/users/:id', async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.json(user);
});

// Business Logic Layer
class UserService {
  async getUser(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}

// Data Access Layer
class UserRepository {
  async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}
```

**2. Client-Server:**
```javascript
// Server
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from server' });
});

app.listen(3000);

// Client
fetch('http://localhost:3000/api/data')
  .then(res => res.json())
  .then(data => console.log(data));
```

**3. MVC (Model-View-Controller):**
```javascript
// Model
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  async save() {
    return await db.insert('users', this);
  }
}

// View (React component)
function UserView({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Controller
class UserController {
  async getUser(req, res) {
    const user = await User.findById(req.params.id);
    res.render('user', { user });
  }
  
  async createUser(req, res) {
    const user = new User(req.body.name, req.body.email);
    await user.save();
    res.redirect('/users');
  }
}
```

### Design Patterns

**1. Singleton:**
```javascript
class Database {
  static instance = null;
  
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = this.connect();
    Database.instance = this;
  }
  
  connect() {
    return { /* connection */ };
  }
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

**2. Factory:**
```javascript
class UserFactory {
  static createUser(type, data) {
    switch (type) {
      case 'admin':
        return new AdminUser(data);
      case 'customer':
        return new CustomerUser(data);
      case 'guest':
        return new GuestUser(data);
      default:
        throw new Error('Invalid user type');
    }
  }
}

const admin = UserFactory.createUser('admin', { name: 'Alice' });
const customer = UserFactory.createUser('customer', { name: 'Bob' });
```

**3. Decorator:**
```javascript
// Base component
class Coffee {
  cost() {
    return 5;
  }
}

// Decorators
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 1;
  }
}

let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 8
```

### SOLID Principles

**S - Single Responsibility:**
```javascript
// ❌ Multiple responsibilities
class User {
  constructor(name) {
    this.name = name;
  }
  
  save() {
    db.insert('users', this);
  }
  
  sendEmail() {
    emailService.send(this.email, 'Welcome!');
  }
  
  generateReport() {
    return `User: ${this.name}`;
  }
}

// ✅ Single responsibility
class User {
  constructor(name) {
    this.name = name;
  }
}

class UserRepository {
  save(user) {
    db.insert('users', user);
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    this.send(user.email, 'Welcome!');
  }
}

class ReportGenerator {
  generateUserReport(user) {
    return `User: ${user.name}`;
  }
}
```

**O - Open/Closed:**
```javascript
// Open for extension, closed for modification

// ❌ Modifying existing code
class PaymentProcessor {
  process(type, amount) {
    if (type === 'credit') {
      // Process credit card
    } else if (type === 'paypal') {
      // Process PayPal
    }
    // Adding new payment method requires modifying this class
  }
}

// ✅ Extending without modification
class PaymentProcessor {
  process(paymentMethod, amount) {
    paymentMethod.pay(amount);
  }
}

class CreditCardPayment {
  pay(amount) {
    console.log(`Paid ${amount} with credit card`);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Paid ${amount} with PayPal`);
  }
}

// Add new payment method without changing PaymentProcessor
class BitcoinPayment {
  pay(amount) {
    console.log(`Paid ${amount} with Bitcoin`);
  }
}
```

**L - Liskov Substitution:**
```javascript
// Subtypes must be substitutable for their base types

class Bird {
  fly() {
    console.log('Flying');
  }
}

class Sparrow extends Bird {
  fly() {
    console.log('Sparrow flying');
  }
}

// ❌ Violates LSP
class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly');
  }
}

// ✅ Correct design
class Bird {
  move() {
    console.log('Moving');
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log('Flying');
  }
}

class Penguin extends Bird {
  swim() {
    console.log('Swimming');
  }
}
```

**I - Interface Segregation:**
```javascript
// Clients should not depend on interfaces they don't use

// ❌ Fat interface
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Human implements Worker {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Worker {
  work() {}
  eat() {} // Robots don't eat!
  sleep() {} // Robots don't sleep!
}

// ✅ Segregated interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Workable {
  work() {}
}
```

**D - Dependency Inversion:**
```javascript
// Depend on abstractions, not concretions

// ❌ High-level depends on low-level
class MySQLDatabase {
  save(data) {
    console.log('Saving to MySQL');
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Tightly coupled
  }
  
  saveUser(user) {
    this.db.save(user);
  }
}

// ✅ Depend on abstraction
interface Database {
  save(data): void;
}

class MySQLDatabase implements Database {
  save(data) {
    console.log('Saving to MySQL');
  }
}

class MongoDatabase implements Database {
  save(data) {
    console.log('Saving to MongoDB');
  }
}

class UserService {
  constructor(private db: Database) {} // Depends on abstraction
  
  saveUser(user) {
    this.db.save(user);
  }
}

// Inject dependency
const service = new UserService(new MySQLDatabase());
```


## L3 - Advanced Patterns

### n-Tier Architecture
```
Client Tier (Browser)
    ↓
Presentation Tier (Web Server)
    ↓
Application Tier (API Server)
    ↓
Business Logic Tier (Services)
    ↓
Data Access Tier (Repositories)
    ↓
Database Tier
```

### SOA (Service-Oriented Architecture)
```javascript
// Independent services communicating via APIs

// User Service
app.post('/api/users', async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});

// Order Service
app.post('/api/orders', async (req, res) => {
  // Call User Service
  const user = await fetch(`http://user-service/api/users/${req.body.userId}`)
    .then(r => r.json());
  
  const order = await createOrder(req.body, user);
  res.json(order);
});
```

### Event-Driven Architecture
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Subscribers
emitter.on('user.created', (user) => {
  console.log('Send welcome email to', user.email);
});

emitter.on('user.created', (user) => {
  console.log('Create user profile for', user.name);
});

// Publisher
function createUser(data) {
  const user = { id: 1, ...data };
  db.insert('users', user);
  
  emitter.emit('user.created', user);
  
  return user;
}
```

### Microservices
```javascript
// Each service is independent, deployable separately

// User Service (port 3001)
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
});

app.listen(3001);

// Order Service (port 3002)
const app2 = express();

app2.get('/orders/:id', async (req, res) => {
  const order = await getOrderById(req.params.id);
  
  // Call User Service
  const user = await fetch(`http://user-service:3001/users/${order.userId}`)
    .then(r => r.json());
  
  res.json({ ...order, user });
});

app2.listen(3002);
```

### Dependency Injection
```javascript
// Constructor injection
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }
  
  async createUser(data) {
    const user = await this.userRepository.create(data);
    await this.emailService.sendWelcome(user);
    return user;
  }
}

// Dependency injection container
class Container {
  constructor() {
    this.services = {};
  }
  
  register(name, factory) {
    this.services[name] = factory;
  }
  
  get(name) {
    return this.services[name](this);
  }
}

const container = new Container();

container.register('userRepository', () => new UserRepository());
container.register('emailService', () => new EmailService());
container.register('userService', (c) => 
  new UserService(
    c.get('userRepository'),
    c.get('emailService')
  )
);

const userService = container.get('userService');
```

### GRASP (General Responsibility Assignment Software Patterns)

**Key principles:**
- **Information Expert** - Assign responsibility to class with most information
- **Creator** - Class A creates B if A contains/aggregates B
- **Controller** - Handle system events
- **Low Coupling** - Minimize dependencies
- **High Cohesion** - Keep related functionality together

This comprehensive guide covers all software design principles and patterns!
