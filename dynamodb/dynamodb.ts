/* 
==========DynamoDB  (DDB)========================
DDB is a wide column NoSQL database service that supports key-value and document data structures.
Public service - public internet, vpc with either an internet gateway or a gateway VPC endpoint.

DDB is a managed service, so you don't have to manage the underlying infrastructure unlike RDS or Aurora or Aurora Serverless.

Manual/Automatic provisioned performance IN/OUT or On-Demand. More Capacity means more speed. On-Demand charges per operation, Or manually provition writes and reads (WCU = 1KB/S) and (RCU = 4KB/S)

High Resilient - Across AZs or globally - default replications, backups, point in time recovery, encryption at rest.

Backups are similar to RDS manual Snapshots - Kept until deleted. Can use to restore(with or without indexes, anc can change encryption settings), or migrate. 

Point-in-Time Recovery needs to be enabled on every table. Gives a 35 day continues replay to any point in time down to 1sec. 

Event-Driven integration...do things when data changes

Tables are the base intitiy within the DB product, all items within a table have the same primary key, its like a one row relational table with infinite items. Tables can have secondary indexes called a composite key, or (sort key) So every item in the table needs to use the same primary key and have a unique value. If the primary is also a composite key, then the combination of the PK and SK need to be unique in that table.

Every Item can have additional data called attributes. 
attributes can be the same. DDB is schemaless, so you can add attributes to an item at any time.
Items have to be less than 400KB

Access via CLI or API or Console UI
You can get a cheaper rate for long term storage commitments. 
==============Ops Consistency and Performance=====
DynamoDB is eventually consistent by default.
You can use transactions to make multiple changes to multiple items in a single operation.
You can use conditional writes to make sure that an item has not been modified since you last read it.
You can use strong consistency to read the latest version of an item, but this incurs a performance penalty.
EG Operations: 
- GetItem
- PutItem
- UpdateItem
- DeleteItem
- Query - a common way to retrieve data. only for pk or pk+sk.  takes a single partition key, and optional SK or range.  Capacity consumed is the size of all returned items. 
- Scan - a more flexible least efficient operation, moves through a table consuming the capacity of every ITEM, but you can specity any attributes you want to match in the items, it scans the entire table for you to grab any little data. 

When setting a table up it has two capacity modes:
- On-Demand - is simple but the cost can be 5times higher per r or w unit. Every operation consumes at least 1 r or w
- Provisioned - you set the capacity units per table, and you pay for what you use. You can scale up or down as needed.
- Every table has a burst pool of 300 seconds for r and w ops
Consistency refers to the process of how when data is updated and then imediately read, is that the updated data?
Can use two different consistency modes for read operations:
- Eventual Consistency - default, easier to implement returns the most recent data, eventually consistent after a short time. Scales better. half the cost of consumtion
- Strong (imediate) Consistency - returns a consistent copy of the data, but incurs a performance penalty and is more costly scales less well. Mandates reads from the leader node. 
Data is replicated in 3 AZs default, each called a storage node. One is the leader. 
Writes are always directed to the leader node.
Reads can be directed to any node, but the leader node is the only one that can return strong consistency.

If a operation consumes 2.5K average per item, it will round up to three WCU or RCU. Multiply that by operation per second to get requirements. 
EG: 10 2.k items/Sec = 10 RCU/sec strong and 5 RCU at eventual consistency requirement.
===============DDB Indexes=======================
Indexes are a way to improve data retrievel operations.
Query is most efficient but only works on one partition key at a time or a range of SK values. Indexes are alternative views on table data which allow the query operation to work in ways in otherwise couldnt. 
DDB has two types of indexes:
Local Secondary Indexes (LSI) and Global Secondary Indexes (GSI)
LSI - can only be created at table creation time with 5 maximum per table, and can only be created on a table with a composite key (SK).
LSI allow for alternative SK's and shared capacity with the table
whereas with GSIs you can use alternative PK and SK.
For both, when creating them you have the ability to choose which attributes from the base table are projected into them - this can massively impact efficiency. You can choose all, keys_only, or include (specify explicitly)
In LSI The indexes let us easily limit the data that we retrieve while using the query operation. LSI Indexes are known as sparse indexes - meaning only items from the base table which have a value for the attribute that we define as the new sort key are present in the index. 

GSI - can be created at any time, and can be created on a table with a single key. Limit of 20 per base table. They have their own RCU and WCU capacity values if you use provisioned capacity. Same choices of attributes to project as LSIs. GSIs are also sparse so only items which have values in the new PK and optional SK are added. GSIs are always eventually consistent because data is replicated from the base table to the index asynchronously. 

Queries on attributes NOT projected are expensive. 
AWS recomment GSIs as default and LSIs when only strong constistency is required. remember the term alternative access patterns
===============DDB Streams and Triggers===============
DynamoDB Streams are a 24 hour rolling window of time ordered change logs to ITEMS in a DynamoDB table

Streams have to be enabled on a per table basis, and have 4 view types

KEYS_ONLY - only records PK and optionally SK (we dont see what exactly was changed in that item)

NEW_IMAGE - stores the entire Item after the change(does not show what changed still)

OLD_IMAGE - can use to compare difference to current item in the table now

NEW_AND_OLD_IMAGES - provides before and after change image independent of actual data table. can calculate difference without consulting the actual DB

Streams can be used to trigger Lambda functions, or to send data to Kinesis Firehose or Kinesis Data Streams. DB Changes generate an event which contains the view type data. 
Lambda can be integrated to provide trigger functionality - invoking when new entries are added on the stream.
- Also useful for reporting and analytics, aggregations, messaging, or notifications. Cost effective serverless architecture. 
===============DDB Accelerator (DAX)==================
DAX is a fully managed, highly available, in-memory cache for DynamoDB. It should be your default choice for any DynamoDB caching related questions. Makes it easy to integrate data caching to your app. 

DAX is not a public space service
Operates from within a VPC and is designed to be deployed into multiple AZs in that VPC to ensure HA. There is a primary cluster node with read/write and the others are read replicas. 

Item Cache holds results of (Batch)GetItem. The query cache holds data based on query/scan params. 

Dax is accessed much like RDS, every DAX cluster has an endpoint which is used to loadbalance accross the cluster

Write-Through is supported. write to DDB then DAX, all with single APIs 

DAX delivers faster reads and reduced costs. Scales up or out (bigger instanc or more instances)

Not ideal for apps that require strongly consistent reads
==============DDB Global Tables====================
DynamoDB Global Tables provides multi-master global replication of DynamoDB tables which can be used for performance, HA or DR/BC reasons. No single table is viewed as the master.
Create tables in various regions then unify them in a global table. 
IF there's a data conflict the last writer wins.
Gererally sub-second replication between regions
Strongly consistent reads are only available in the region it is written to. 
=================Time-To-Live(TTL)===============
Amazon DynamoDB Time to Live (TTL) allows you to define a per-item timestamp to determine when an item is no longer needed. Shortly after the date and time of the specified timestamp, DynamoDB deletes the item from your table without consuming any write throughput. TTL is provided at no extra cost as a means to reduce stored data volumes by retaining only the items that remain current for your workload’s needs

Enabled per table basis. One process compates times and moves to expired. Another process later deletes expired items, for free. 

You can configure a stream on the TTL processes to generate events with a 24 hour window
=====================ELASTICACHE===================
Elasticache is a managed in-memory cache which provides a managed implementation of the redis or memcached engines.

its useful for read heavy workloads, scaling reads in a cost effective way and allowing for externally hosted user session state (useful for serverless apps). storing external session data allows the app to be built in a stateless way which is beyond HA and now faulttolerant.

Elasticache is a managed service, so you dont have to worry about patching, backups, or scaling.

Elasticache is a shared cache, so you can have multiple clients accessing the same cache.

Elasticache is a distributed cache, so you can have multiple nodes in a cluster, and the cache is distributed across all nodes.

Implementation requires changes to your application code.

Redis supports more advanced types of data than memcached, such as lists, sets, sorted sets, hashes, bit arrays and more. Redis also supports multi-AZ replication which improves read scales and resiliency. memcache does sharding to multiple nodes but not quite the same. 
Redis also supports back-up and restore, memcache dont. 
Memcached is multithreaded so it can take better advantage of multi core CPUs whereas redis is transaction based, better consistency requirements.

Instance types and sizes are available in elasticache. 



*/