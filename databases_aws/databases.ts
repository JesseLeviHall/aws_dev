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
RDS is a DB server, not a DB.
RDS isnt a DBAAS, it is more acurately a DBSAAS - Database Server as a service. 
Provides a choice between MySQL, MariaDB, PostgreSQL, Oracle, Microsoft SQL Server. 
Amazon aurora is a seperate product altogether. 
RDS is a managed service, so no access to OS or SSH access unless using RDS Custom

RDS can be accessed from the VPC or any connected private network (VPN or Direct Connect)
RDS can be accessed from the internet, but this is not recommended.

If you want to split databases between different sets of subnets, you need multible DB subnet groups - best overall flexibility way is one DB subnet group for on RDS deployment

An RDS instance can have mubltiple Databases, and every RDS Instance has its own dedicated storage provided by EBS. This is different than Aurora. 

RDS Costs:
- RDS instance cost billed per sedonc
- Multi-AZ or not is a big difference
- Storage is billed per GB per month, provisioned IOPS cost more
- Data Transfer cost
- Backups and snapshot cost per gb per month
- Licensing commercial DB's
==============RDS multi-AZ Cluster=================
Until clusters, you had to set up multi-instances in different AZ's, where the primary was the only connectable db, and was synchronously replicated in a failover architecture and a 1-2 min delay in failure. same region only. system back ups occur from the duplicate replica so no outage on production env while copy to s3
Multi-AZ is a feature of RDS that provides a warm standby replica in another AZ.
The cluster has a reader and writer distinction, and writer synchronously updates the readers with transaction logs, readers are viewable for read operations through the read endpoint, and there can only be 2 readers (different AZs). with aurora, you can have more though.  There are instance specific enpoints too, for testing/fault finding. Clusters are faster - gravaton + NVME SSD storage and failover is quicker - 35 secs. writes are commited when one reader has confirmed. 
=============RDS Backup snapshot restore=================
RDS is capable of performing Manual Snapshots and Automatic backups. Both go to s3, regionaly resilient

Manual snapshots are performed manually and live past the termination of an RDS instance.  Incremental updates to the s3. they are not deleted when the rds instance is deleted.

Automatic backups can be taken of an RDS instance with a 0 (Disabled) to 35 Day retention.

Automatic backups also use S3 for storing transaction logs every 5 minutes - allowing for point in time recovery or five minute recovery point objective. The snapshot restores the db, and the transaction logs 'replay' to desired point in time. (GOOD RPO) but restores are not fast either way

Automatic backups can store snapshots and transaction logs. this is NOT DEFAULT
Charges apply for the cross-region data copy and the storage in the destination. 

Snapshots can be restored .. but create a new RDS instance, meaning you have to update database endpoint addresses.
================RDS Read Replicas===================
allow for RDS to meet really low recovery time objectives if data is not corrupted, corrupt data will be replicated.

RDS Read Replicas can be added to an RDS Instance - 5 direct per primary instance, each providing an additional instance of read performance

They can be in the same region, or cross-region replicas.

They provide read performance scaling for the instance, but also offer low RTO recovery for any instance failure issues

Read replicas are asynchronous, so they are not a true hot standby.

these are not part of the instance, they have their own enpoints. 

read replicas can have their own read replicas, but then lag is a problem, or can give makeshift cloudfront-like read perfomance improvement if distributed clients. 

In General Snapshots and backups improve RPO but RTO is a problem 
Read replicas offer near 0 RPO, and very low RTO but good for failure only, not corruption. 






*/