# SQL vs NoSQL

<hr>

## Data Storage

### SQL

- Data is stored in relational model with rows and columns within tables.
- A table represents all entities with a common model.
- A row represents a single entity.
- Each column represents a piece of the entity and has a fixed type, size, etc.

### NoSQL

- An unstructured data storage database.
- Each document represents an entity.
- Each document can be entirely different from other documents.

<hr>

## Scalability

### SQL

- Data scales vertically.
- If you have more data you get more disc space.
- If you need faster data you get a faster computer.
- Replication of data across servers is complex and inefficient.
- Difficult to distribute data for load balancing.

### NoSQL

- Data scales horizontally.
- It is easy to spread data between multiple servers.
- Easy to get higher performance.

<hr>

## A.C.I.D

- **Automicity** - Transactions are all or nothing. If part of the transaction fails then it all fails and the database is left unchanged.
- **Consistency** - Each database transaction guarantees that the data is in a valid state.
- **Isolation** - Transactions executed one after another will happen in a serialized way.
- **Durability** - Once a transaction has been committed then the data is stored to disc and data will not be lost in the case of a server shutdown.

Most **SQL** databases conform to the ACID standard. **NoSQL** databases have varying degrees of ACID compliance.

#### Questions

1. What are some advantages and disadvantages of ACID compliance?

<hr>

## Automatic vs. Manual Transmission

> SQL databases are like automatic transmission and NoSQL databases are like manual transmission. Once you switch to NoSQL, you become responsible for a lot of work that the system takes care of automatically in a relational database system. Similar to what happens when you pick manual over automatic transmission. Secondly, NoSQL allows you to eke more performance out of the system by eliminating a lot of integrity checks done by relational databases from the database tier. Again, this is similar to how you can get more performance out of your car by driving a manual transmission versus an automatic transmission vehicle.
>
> However the most notable similarity is that just like most of us can’t really take advantage of the benefits of a manual transmission vehicle because the majority of our driving is sitting in traffic on the way to and from work, there is a similar harsh reality in that most sites aren’t at Google or Facebook’s scale and thus have no need for a Bigtable or Cassandra.
>
> [The NoSQL Debate - Automatic vs Manual Transmission](http://www.25hoursaday.com/weblog/2010/03/29/TheNoSQLDebateAutomaticVsManualTransmission.aspx)
