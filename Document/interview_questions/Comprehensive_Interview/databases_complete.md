# Database Complete Guide

## SQL Databases

### L1 - SQL Fundamentals

**SELECT Statement:**
```sql
-- Basic SELECT
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- WHERE clause
SELECT * FROM users WHERE age > 18;

-- ORDER BY
SELECT * FROM users ORDER BY name ASC;
SELECT * FROM users ORDER BY created_at DESC;

-- LIMIT
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20; -- Pagination

-- DISTINCT
SELECT DISTINCT country FROM users;

-- Aggregate functions
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MAX(salary), MIN(salary) FROM employees;
SELECT SUM(price) FROM orders;

-- GROUP BY
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country;

-- HAVING (filter groups)
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 100;
```

**Primary Key (PK) vs Foreign Key (FK):**
```sql
-- Primary Key - unique identifier for each row
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100)
);

-- Foreign Key - references primary key in another table
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**JOINs:**
```sql
-- INNER JOIN - only matching rows
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN - all from left table
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;
-- Returns all users, even without posts

-- RIGHT JOIN - all from right table
SELECT users.name, posts.title
FROM users
RIGHT JOIN posts ON users.id = posts.user_id;
-- Returns all posts, even without users

-- FULL OUTER JOIN - all from both tables
SELECT users.name, posts.title
FROM users
FULL OUTER JOIN posts ON users.id = posts.user_id;
-- Returns all users and all posts
```

**Data Normalization:**
- **1NF** - Atomic values, no repeating groups
- **2NF** - 1NF + no partial dependencies
- **3NF** - 2NF + no transitive dependencies

```sql
-- Not normalized (1NF violation)
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  items VARCHAR(500) -- "item1,item2,item3"
);

-- Normalized
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**DML (Data Manipulation Language):**
```sql
-- INSERT
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 25);

-- INSERT multiple rows
INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@example.com', 30),
  ('Charlie', 'charlie@example.com', 35);

-- UPDATE
UPDATE users
SET age = 26
WHERE name = 'Alice';

-- DELETE
DELETE FROM users
WHERE age < 18;

-- MERGE (UPSERT)
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@example.com')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  email = VALUES(email);

-- TRUNCATE (delete all rows, faster than DELETE)
TRUNCATE TABLE users;
```

**DDL (Data Definition Language):**
```sql
-- CREATE
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER
ALTER TABLE products
ADD COLUMN description TEXT;

ALTER TABLE products
MODIFY COLUMN price DECIMAL(12, 2);

ALTER TABLE products
DROP COLUMN description;

-- DROP
DROP TABLE products;
```

### L2 - Advanced SQL

**Data Access Abstraction Layers:**
```javascript
// Raw SQL
const users = await db.query('SELECT * FROM users WHERE age > ?', [18]);

// Query Builder (Knex.js)
const users = await knex('users')
  .where('age', '>', 18)
  .select('*');

// ORM (Sequelize)
const users = await User.findAll({
  where: {
    age: { [Op.gt]: 18 }
  }
});

// ODM (Mongoose for MongoDB)
const users = await User.find({ age: { $gt: 18 } });
```

**Transactions:**
```sql
-- Start transaction
START TRANSACTION;

-- Execute queries
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit if successful
COMMIT;

-- Or rollback if error
ROLLBACK;
```

```javascript
// Node.js with Sequelize
const t = await sequelize.transaction();

try {
  await Account.update(
    { balance: balance - 100 },
    { where: { id: 1 }, transaction: t }
  );
  
  await Account.update(
    { balance: balance + 100 },
    { where: { id: 2 }, transaction: t }
  );
  
  await t.commit();
} catch (error) {
  await t.rollback();
}
```

**ACID Properties:**
- **Atomicity** - All or nothing
- **Consistency** - Data remains valid
- **Isolation** - Transactions don't interfere
- **Durability** - Committed data persists

**Relationships:**
```sql
-- 1-to-1: User has one Profile
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE profiles (
  id INT PRIMARY KEY,
  user_id INT UNIQUE,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 1-to-Many: User has many Posts
CREATE TABLE posts (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Many-to-Many: Users and Roles (junction table)
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

**Subqueries:**
```sql
-- Subquery returning one row
SELECT name FROM users
WHERE id = (SELECT user_id FROM posts WHERE id = 1);

-- Subquery returning many rows
SELECT name FROM users
WHERE id IN (SELECT user_id FROM posts WHERE views > 1000);

-- Subquery returning many columns
SELECT * FROM users
WHERE (age, country) IN (
  SELECT age, country FROM top_users
);

-- Correlated subquery
SELECT name, (
  SELECT COUNT(*) FROM posts WHERE posts.user_id = users.id
) as post_count
FROM users;
```

### L4 - Database Administration

**Database vs DBMS:**
- **Database** - Collection of organized data
- **DBMS** - Software to manage database (MySQL, PostgreSQL, Oracle)

**Primary Key vs Foreign Key vs Candidate Key:**
- **Primary Key** - Unique identifier (chosen from candidate keys)
- **Foreign Key** - References primary key in another table
- **Candidate Key** - Columns that could be primary key

**Availability/Disaster Recovery:**
```sql
-- Backups
mysqldump -u root -p database_name > backup.sql

-- Restore
mysql -u root -p database_name < backup.sql

-- Replication (Master-Slave)
-- Master: Write operations
-- Slave: Read operations, backup

-- Monitoring
SHOW PROCESSLIST;
SHOW STATUS;
SHOW VARIABLES;
```


## NoSQL (MongoDB)

### L1 - MongoDB Basics

**Create Collection:**
```javascript
// Collections are created automatically
db.users.insertOne({ name: 'Alice', age: 25 });

// Or explicitly
db.createCollection('users');
```

**CRUD Operations:**
```javascript
// INSERT
db.users.insertOne({
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
});

db.users.insertMany([
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
]);

// FIND (Read)
db.users.find(); // All documents
db.users.find({ age: 25 }); // With filter
db.users.findOne({ name: 'Alice' }); // Single document

// UPDATE
db.users.updateOne(
  { name: 'Alice' },
  { $set: { age: 26 } }
);

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: 'minor' } }
);

// DELETE
db.users.deleteOne({ name: 'Alice' });
db.users.deleteMany({ age: { $lt: 18 } });
```

**Conditional Operators:**
```javascript
// Comparison
db.users.find({ age: { $gt: 18 } }); // Greater than
db.users.find({ age: { $gte: 18 } }); // Greater than or equal
db.users.find({ age: { $lt: 65 } }); // Less than
db.users.find({ age: { $lte: 65 } }); // Less than or equal
db.users.find({ age: { $ne: 25 } }); // Not equal
db.users.find({ age: { $in: [25, 30, 35] } }); // In array

// Logical
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { age: { $lte: 65 } }
  ]
});

db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } }
  ]
});

// Element
db.users.find({ email: { $exists: true } });
db.users.find({ tags: { $type: 'array' } });

// Array
db.users.find({ tags: 'javascript' }); // Contains
db.users.find({ tags: { $all: ['javascript', 'nodejs'] } }); // Contains all
db.users.find({ tags: { $size: 3 } }); // Array length
```

### L2 - Advanced MongoDB

**Indexes:**
```javascript
// Create index
db.users.createIndex({ email: 1 }); // Ascending
db.users.createIndex({ age: -1 }); // Descending

// Compound index
db.users.createIndex({ country: 1, age: -1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index (for search)
db.posts.createIndex({ title: 'text', content: 'text' });
db.posts.find({ $text: { $search: 'javascript' } });

// List indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex('email_1');
```

**When to Normalize in MongoDB:**
- Large documents (> 16MB limit)
- Frequently updated subdocuments
- Need to query subdocuments independently

```javascript
// Denormalized (embedded)
{
  _id: 1,
  name: 'Alice',
  posts: [
    { title: 'Post 1', content: '...' },
    { title: 'Post 2', content: '...' }
  ]
}

// Normalized (referenced)
// users collection
{ _id: 1, name: 'Alice' }

// posts collection
{ _id: 101, user_id: 1, title: 'Post 1' }
{ _id: 102, user_id: 1, title: 'Post 2' }
```

**Join Collections (Lookup):**
```javascript
db.users.aggregate([
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'user_id',
      as: 'user_posts'
    }
  }
]);
```

**Limit, Sort, Group:**
```javascript
// Limit
db.users.find().limit(10);

// Sort
db.users.find().sort({ age: -1 }); // Descending
db.users.find().sort({ name: 1 }); // Ascending

// Skip (pagination)
db.users.find().skip(20).limit(10);

// Count
db.users.countDocuments({ age: { $gte: 18 } });
```

**Redis Caching:**
```javascript
const redis = require('redis');
const client = redis.createClient();

// Set cache
await client.set('user:1', JSON.stringify(user), {
  EX: 3600 // Expire in 1 hour
});

// Get cache
const cached = await client.get('user:1');
if (cached) {
  return JSON.parse(cached);
}

// Delete cache
await client.del('user:1');

// Cache pattern
async function getUser(id) {
  // Try cache first
  const cached = await client.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await db.users.findOne({ _id: id });
  
  // Store in cache
  await client.set(`user:${id}`, JSON.stringify(user), { EX: 3600 });
  
  return user;
}
```

### L3 - MongoDB Advanced

**Aggregation:**
```javascript
db.orders.aggregate([
  // Stage 1: Match
  { $match: { status: 'completed' } },
  
  // Stage 2: Group
  {
    $group: {
      _id: '$customer_id',
      total: { $sum: '$amount' },
      count: { $sum: 1 },
      avg: { $avg: '$amount' }
    }
  },
  
  // Stage 3: Sort
  { $sort: { total: -1 } },
  
  // Stage 4: Limit
  { $limit: 10 },
  
  // Stage 5: Project
  {
    $project: {
      customer_id: '$_id',
      total: 1,
      count: 1,
      _id: 0
    }
  }
]);
```

**Sharding:**
- Horizontal partitioning across multiple servers
- Distributes data for scalability

```javascript
// Enable sharding on database
sh.enableSharding('mydb');

// Shard collection
sh.shardCollection('mydb.users', { user_id: 1 });
```

**Replication:**
- Replica Set - multiple copies of data
- Primary node - handles writes
- Secondary nodes - handle reads, backup

```javascript
// Replica set configuration
rs.initiate({
  _id: 'myReplicaSet',
  members: [
    { _id: 0, host: 'mongo1:27017' },
    { _id: 1, host: 'mongo2:27017' },
    { _id: 2, host: 'mongo3:27017' }
  ]
});
```

**Backup/Restore:**
```bash
# Backup
mongodump --db mydb --out /backup/

# Restore
mongorestore --db mydb /backup/mydb/

# Export to JSON
mongoexport --db mydb --collection users --out users.json

# Import from JSON
mongoimport --db mydb --collection users --file users.json
```

**ElasticSearch (Full-text Search):**
```javascript
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// Index document
await client.index({
  index: 'posts',
  document: {
    title: 'Introduction to Elasticsearch',
    content: 'Elasticsearch is a search engine...',
    tags: ['search', 'elasticsearch']
  }
});

// Search
const result = await client.search({
  index: 'posts',
  query: {
    match: { content: 'search engine' }
  }
});
```

### L4 - CAP Theorem

**CAP Theorem:**
In a distributed system, you can only guarantee 2 out of 3:

- **Consistency** - All nodes see same data
- **Availability** - System always responds
- **Partition Tolerance** - System works despite network failures

**Examples:**
- **CA** - Traditional RDBMS (MySQL, PostgreSQL)
- **CP** - MongoDB, HBase (consistency over availability)
- **AP** - Cassandra, DynamoDB (availability over consistency)

This comprehensive guide covers SQL and NoSQL databases!
