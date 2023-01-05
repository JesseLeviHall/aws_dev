/* 
===============Databases of AWS====================
Relational Database Service
DynamoDB - Wide Column database
Aurora
Aurora Serverless
Redshift (column store)
Neptune
DocumentDB
Amazon Keyspaces
Amazon Quantum Ledger Database
Amazon Timestream
Amazon Managed Streaming for Apache Kafka
Amazon ElastiCache

Types of NoSQL databases: 
Key-value stores - super fast
Document stores - flexible (MongoDB)
Wide-column stores - scalable:
  -Unique key (partition) or keys (composite) for a table (grouping) of flexible attributes
Graph databases - flexible
Time-series databases - flexible
In-memory databases - super fast

Most SQL databases are Row based tables, or Online Transaction Processing databases (OLTP). Redshift is a Column oriented sql db, 
or Online Analytical Processing database (OLAP). OLAP is used for data warehousing, and is optimized for queries that aggregate data for example reporting. 

Graph DB's store the actual connection (edges) between things (nodes - key value) along with the data, so the relationship doesnt need to be calculated in each query. Great for storing complex relationships like social media or HR systems. 
===================Databases On EC2=================



*/