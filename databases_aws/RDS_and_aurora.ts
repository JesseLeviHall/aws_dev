/* 
===============RDS and Aurora====================
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
===========RDS Security======================
Authorization is handled by IAM, and authentication is handled by the DB engine.

Encyption in Transit - SSL TSL available for rds, can be mandatory. 

Encyption at Rest
KMS/EBS based is Handled by HOST/EBS. cannot be removed once added. Storage, Logs, Snapshos and replicas are all encrypted. In addition, MSSQL and Oracle support TDE (transparent data encryption) within the database engine, not aws. Oracle supports integration with CloudHSM - much stronger key controls because it is managed by you with no key exposure to aws. 
With Oracle keys via Cloud HSM removes aws from chain of trust. TDE is native to db engine so data is encrypted before leaving the instance. 
KMS provides aws or customer managed CMKs whih are used to generate data encr keys (DEKs) for RDS. 

Normally, logins to RDS instances are outside aws, but you can give IAM user login to db by creatign a local db user account configured to use aws auth token. Policy attached to Users or Roles map that IAM id onto the local rds user. token generated is 15 min valid. This is only AUthentication not authorization for permissions in the db. 
===============Aurora Architecture======================= 
Aurora is a AWS designed database engine officially part of RDS but seems like its own product.

Aurora implements a number of radical design changes which offer significant performance and feature improvements over other RDS database engines.

Uses a 'cluster', is a single primary instance + 0 or more replicas. These replicas arent like the rds standby ones because they can be used for reads during normal operation, giving the benefits of RDS multi-AZ and RDS read replicas.

No local storage, uses shared cluster volumes, spread out in 3 AZs usually a primary, and a few replicas. Much more resilient and less work to manage snapshots and point in time restorations. 

Have up to 15 replicas, any can be failovers, failover will be quick. 

High IOPS low latency all SSD Based. You are billed on consumption high water mark of storage that you use in a cluster. This is being changed and is no longer applicable. 

replicas can be added or removed without provisioning storage

like RDS, DNS endpoints are used to connect to the cluster. The cluster enpoint points to the primary, reader enpoints point to replicas, load balance is automatic. 

There is no free tier, but in comparison to anything beyond RDS single AZ micro, aurora is better value.  
compute- Billed hourly, per second, 10 minute min. 
storage - billed monthly, per GB, 10 GB min, IO cost per req
Free backup alocation. 

Restores will also create a brand new cluster, and manual backups work the same way. 

Aurora has a feature called backtrack, which allows you to restore your database to a point in time within a 1 minute granularity for up to 35 days. 

Fast-Clone makes a new db much faster than a snapshot restore.
===============aurora serverless==================
Aurora serverless makes use of ACU (aurora capacity units) which represent a certain amount of compute and corresponding memory. 
There is a min and max ACU, and the cluster adjusts based on load. Can go to 0 adn can be paused. 
Consumption billing per-second basis. 
Same resilience as provisioned(6 copies across AZs). 
Removes complexity of managing dbs and capacity, maybe more cost effective. 
Connections are a little more complex for aws - using a proxy fleet managed by aws. they broker the connection to the ACU, so the customer really does little. 
Good use cases: infrequently used, or new apps, variable or unpredictable workloads, development or tests because no bill for no load and can be paused, or multi-tenant apps. 
================Database Migration Service(DMS)==============
AWS Database Migration Service helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database. The AWS Database Migration Service can migrate your data to and from most widely used commercial and open-source databases.
- you need to define source and destination endpoints from source db to target db. 
- One db must be on aws
- runs using a replication instance on ec2
Jobs can be one of three types:
- Full load - copies all data from source to target(if you can afford an outage)
- Cdc - copies only new or changed data - used when using db native full load export 
- Full load and cdc - copies all data + copies new or changed data
If there are schema changes, aws SCT (schema conversion tool) can perform schema conversions. Used ONLY when converting from one db engine to another. 
You can use DMS in combo with Snowball, which is a petabyte-scale data transport physical solution that uses secure appliances to transfer large amounts of data into and out of AWS. this includes use of SCT. 
==================AWS Secrets Manager=================
AWS Secrets manager is a product which can manage secrets within AWS. There is some overlap between it and the SSM Parameter Store - but Secrets manager is specialised for secrets such as passwords, api keys. 

Secrets managed is capable of automatic credential rotation using Lambda.

For supported services it can even adjust the credentials of the service itself.

usable via console, cli, api, or sdk (software dev kit)
this service is designed to integrate within other aws apps such as RDS, integrates with IAM Permissions. 

Secrets are encrypted at rest with KMS. 

You should default to secrets manager when mention of sectret, rotation, and rds. If mention of anything other than secrets, like config info likely perameter store. 

q: What feature of RDS allows the system to scale for READS
a: Read replicas

q: Which feature of RDS provides HA Functionality
a: Multi-AZ

q: How is the standby node of an RDS MultiAZ accessed?
a: The standby node is accessed only after a failover when it becomes the primary instance. 

q: When restoring RDS from a snapshot or backup is any application reconfiguration required?
a: A different endpoint address is created when restoring..authentication remains the same. 

q: Which Managed SQL database product in AWS supports 3+ AZ Resilience
a: Aurora




*/