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
Running Databases directly on EC2 is considered bad practice, pretty much always.
Why you would:
- OS level access to DB system (questionable)
- Root access to advanced tune DB configuration (questionable)
- DB is not offered by AWS (questionable)
- Specific replication, security and resilience requirements
Why you Should Not (AWS best practices):
- The effort and Admin overhead is costly
- Backup and desaster recomer management is complex and costly
- EBS or EC2 are only AZ resilient. 
- EBS is not a DB, and is not optimized for DB workloads
- AWS DB's generally offer great features and performance that surpass the db you'd put on an ec2
- No sererless no easy scaling or (elasticity)
===================RDS======================
RDS isnt a DBAAS, it is more acurately a DBSAAS - Database Server as a service. 












*/