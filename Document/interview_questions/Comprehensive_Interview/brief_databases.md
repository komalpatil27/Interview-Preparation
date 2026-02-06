# Databases - Brief Theory

## SQL Fundamentals

**SELECT Statement:**
- WHERE - Filter rows
- ORDER BY - Sort results
- LIMIT - Restrict number of rows
- GROUP BY - Group rows
- HAVING - Filter groups
- Aggregate functions: COUNT, SUM, AVG, MAX, MIN

**Keys:**
- **Primary Key:** Unique identifier for each row
- **Foreign Key:** References primary key in another table
- **Candidate Key:** Columns that could be primary key

**JOINs:**
- **INNER JOIN:** Only matching rows from both tables
- **LEFT JOIN:** All from left table, matching from right
- **RIGHT JOIN:** All from right table, matching from left
- **FULL OUTER JOIN:** All rows from both tables

**Normalization:**
- **1NF:** Atomic values, no repeating groups
- **2NF:** 1NF + no partial dependencies
- **3NF:** 2NF + no transitive dependencies
- **Purpose:** Reduce redundancy, improve data integrity

**DML (Data Manipulation):**
- INSERT - Add rows
- UPDATE - Modify rows
- DELETE - Remove rows
- MERGE - Insert or update (upsert)

**DDL (Data Definition):**
- CREATE - Create table/database
- ALTER - Modify structure
- DROP - Delete table/database

## Advanced SQL

**Transactions:** Group of operations that succeed or fail together
- BEGIN, COMMIT, ROLLBACK

**ACID Properties:**
- **Atomicity:** All or nothing
- **Consistency:** Data remains valid
- **Isolation:** Transactions don't interfere
- **Durability:** Committed data persists

**Relationships:**
- **1-to-1:** User has one Profile
- **1-to-Many:** User has many Posts
- **Many-to-Many:** Users have many Roles (junction table)

**Subqueries:** Query within a query
- Can return single value, multiple rows, or multiple columns

**ORM (Object-Relational Mapping):**
- Maps database tables to objects
- Examples: Sequelize, TypeORM, Prisma
- Pros: Easier to use, database agnostic
- Cons: Less control, potential performance issues

## MongoDB (NoSQL)

**Document-Based:** Store data as JSON-like documents

**CRUD Operations:**
- insertOne/insertMany - Create
- find/findOne - Read
- updateOne/updateMany - Update
- deleteOne/deleteMany - Delete

**Operators:**
- Comparison: $gt, $gte, $lt, $lte, $eq, $ne, $in
- Logical: $and, $or, $not
- Element: $exists, $type
- Array: $all, $size

**Indexes:** Improve query performance
- Single field, compound, unique, text

**When to Normalize:**
- Large documents (>16MB limit)
- Frequently updated subdocuments
- Need to query subdocuments independently

**Aggregation:** Process data and return computed results
- Stages: $match, $group, $sort, $limit, $project
- Pipeline: Data flows through stages

**Sharding:** Horizontal partitioning across servers
- Distributes data for scalability

**Replication:** Multiple copies of data
- Primary node: handles writes
- Secondary nodes: handle reads, backup

## Caching

**Redis:** In-memory key-value store
- Very fast (microsecond latency)
- Use cases: Session storage, caching, real-time analytics
- Data types: Strings, Lists, Sets, Hashes, Sorted Sets

**Cache Strategy:**
1. Check cache first
2. If miss, fetch from database
3. Store in cache
4. Return data

**ElasticSearch:** Full-text search engine
- Distributed, RESTful
- Near real-time search
- Use cases: Search, logging, analytics

## CAP Theorem

**In distributed systems, choose 2 of 3:**
- **Consistency:** All nodes see same data
- **Availability:** System always responds
- **Partition Tolerance:** Works despite network failures

**Examples:**
- **CA:** Traditional RDBMS (MySQL, PostgreSQL)
- **CP:** MongoDB, HBase (consistency over availability)
- **AP:** Cassandra, DynamoDB (availability over consistency)

**Database vs DBMS:**
- Database: Collection of organized data
- DBMS: Software to manage database (MySQL, PostgreSQL, MongoDB)

**Backup/Recovery:**
- Regular backups (daily, weekly)
- Replication for high availability
- Point-in-time recovery
- Disaster recovery plan
