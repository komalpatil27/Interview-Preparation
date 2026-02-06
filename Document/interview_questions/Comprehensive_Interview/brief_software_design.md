# Software Design - Brief Theory

## Design Principles

### KISS (Keep It Simple, Stupid)
- Avoid unnecessary complexity
- Simple solutions are easier to maintain
- Don't over-engineer

### DRY (Don't Repeat Yourself)
- Avoid code duplication
- Extract common logic
- Single source of truth

### YAGNI (You Aren't Gonna Need It)
- Don't add functionality until needed
- Avoid premature optimization
- Build what's required now

## Programming Paradigms

**OOP (Object-Oriented Programming):**
- Encapsulation: Bundle data and methods
- Inheritance: Derive from parent class
- Polymorphism: Same interface, different implementations
- Abstraction: Hide complex details

**FP (Functional Programming):**
- Pure functions (no side effects)
- Immutability
- First-class functions
- Higher-order functions (map, filter, reduce)

## SOLID Principles

**S - Single Responsibility:**
- Class should have one reason to change
- One class, one responsibility

**O - Open/Closed:**
- Open for extension, closed for modification
- Add new features without changing existing code

**L - Liskov Substitution:**
- Subtypes must be substitutable for base types
- Child class should work wherever parent class works

**I - Interface Segregation:**
- Clients shouldn't depend on interfaces they don't use
- Many specific interfaces better than one general interface

**D - Dependency Inversion:**
- Depend on abstractions, not concretions
- High-level modules shouldn't depend on low-level modules

## Design Patterns

### Creational Patterns

**Singleton:**
- Ensure only one instance exists
- Global access point
- Use cases: Database connection, configuration

**Factory:**
- Create objects without specifying exact class
- Centralize object creation logic
- Use cases: Creating different user types

### Structural Patterns

**Decorator:**
- Add functionality to object dynamically
- Alternative to subclassing
- Use cases: Adding features to components

### Behavioral Patterns

**Dependency Injection:**
- Provide dependencies from outside
- Loose coupling
- Easier testing

## Architectural Patterns

**Layered Architecture:**
- Presentation Layer (UI)
- Business Logic Layer (Services)
- Data Access Layer (Repositories)
- Database Layer

**Client-Server:**
- Client requests services
- Server provides services
- Separation of concerns

**MVC (Model-View-Controller):**
- **Model:** Data and business logic
- **View:** User interface
- **Controller:** Handle user input, update model/view

**n-Tier:**
- Multiple physical tiers
- Client, Web Server, App Server, Database
- Scalable, maintainable

**SOA (Service-Oriented Architecture):**
- Independent services
- Communicate via APIs
- Reusable services

**Event-Driven:**
- Components communicate via events
- Loose coupling
- Asynchronous
- Use cases: Real-time systems, microservices

**Microservices:**
- Small, independent services
- Each service has own database
- Communicate via APIs
- Independently deployable
- Pros: Scalable, flexible, fault-isolated
- Cons: Complex, network overhead, distributed transactions

## GRASP Principles

**General Responsibility Assignment Software Patterns:**

**Information Expert:**
- Assign responsibility to class with most information

**Creator:**
- Class A creates B if A contains/aggregates B

**Controller:**
- Handle system events
- Coordinate operations

**Low Coupling:**
- Minimize dependencies between classes
- Easier to maintain and test

**High Cohesion:**
- Keep related functionality together
- Class should have focused purpose

## Non-Functional Requirements

**Performance:** Response time, throughput

**Scalability:** Handle increased load

**Availability:** Uptime percentage

**Reliability:** Consistent correct behavior

**Security:** Protect against threats

**Maintainability:** Easy to modify and fix

**Usability:** User-friendly interface

**Measurement:**
- Performance: Response time, requests/second
- Availability: Uptime percentage (99.9%, 99.99%)
- Scalability: Load testing, stress testing
