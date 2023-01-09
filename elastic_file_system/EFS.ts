/* 
The Elastic File System (EFS) is an AWS managed implementation of NFS(network file system v4, fairly common) which allows for the creation of shared 'filesystems' which can be mounted within multi EC2 instances.

EFS can play an essential part in building scalable and resilient systems.

content can be stored outside of the instance running the app, provides big benefits for scaling and self healing architecture - essentially moving the ec2 instances closer to being stateless.

-Can be mounted on Linux
-Shared betw many EC2
-Private Service, via mount targets inside a VPC
-Can be accessed from on-premises, vpn, DX, Peering, or aws direct connect (a physical private network connection between a vpc and existing on premises networks). 

Architecture is: it runs in a VPC, create file sys with POSIX permissions(linux interperability standard). It is made available via mount targets running to subnets in the VPC. For HA put mount targets in multiple AZs, every AZ of the VPC.

EFS is for linux only
two performancy modes:
General purpose - default for 99%
Max IO - for Big Data, media processing, scientific analysis - anythig highly parallel

two throughput modes: 
Bursting - scales up with more files
Provisioned - for apps that require consistent performance

two storage classes:
Standard - default for 99%
Infrequent access - for data accessed less than once a week
Ablity to use lifecycle policies like in s3, to be used with classes. 

example: mount a efs on a ec2, create a file, mount another ec2 and see the file what was create on the first instance...
# INSTANCE A

df -k
sudo mkdir -p /efs/wp-content
sudo yum -y install amazon-efs-utils
cd /etc
sudo nano /etc/fstab

file-system-id:/ /efs/wp-content efs _netdev,tls,iam 0 0 

sudo mount /efs/wp-content
df -k
cd /efs/wp-content
sudo touch amazingtestfile.txt

# INSTANCE B

df -k
sudo yum -y install amazon-efs-utils
sudo mkdir -p /efs/wp-content
sudo nano /etc/fstab
file-system-id:/ /efs/wp-content efs _netdev,tls,iam 0 0
sudo mount /efs/wp-content
ls -la

============FSx for windows=============
FSx for Windows Servers provides a native windows file system as a service which can be used within AWS, or from on-premises environments via VPN or Direct Connect

FSx is an advanced shared file system accessible over SMB, and integrates with Active Directory (either managed, or self-hosted).

It provides advanced features such as VSS, Data de-duplication, backups, encryption at rest and forced encryption in transit.

This is different from EFS. It is similar to how RDS is architected, but instead of db you file shares

integrates with directory service or self-managed active directory provision. 

can be deployed in either single or multi-az within a VPC. It used Elastic Net Interfaces in the VPC

It replicates by default, to ensure resilience to hardware failure. Backup features include client-side and aws-side features. 

The file sys is accessible from within the vpc, peering connections, VPN, and physical direct connect

It can be used for workloads such as file server, web server, application server, and HPC.

If a enterprise 'workspace' is launched in a VPC, it requires a direcroty service (or active directory), but for any shared file system needs it can also use FSx

Access protocol is SMB, standard for windowns env

Suports volume shadow copies... file level versioning.(right click and see previous versions)
VSS - User Driven REstores

Supports DFS - 
Distributed File System - allows for a single namespace to be shared across multiple servers.

Managed - no file server admin
============FSx for Lustre=============
FSx for Lustre is a managed file system which uses the FSx product designed for high performance computing

It delivers extreme performance for scenarios such as Big Data, Machine Learning and Financial Modeling, SageMaker

relatively niche. 

 It is a parallel file system, which means it can be used by multiple EC2 instances at the same time.

It is designed to be used with HPC workloads, and is optimized for parallel workloads. HPC-Linux Clients(POSIX)

Can scale to 100s GB/s throughput and sub millisecond latency when accessing storage accross many different clients or instances

Two deployment types:
PERSISTENT - data is retained after the file system is deleted. Long term self-healing HA, ONE AZ ONLY, better resilience. 50, 100, or 200MB/s per TiB storage

SCRATCH - Highly optimised for short term. data is deleted after the file system is deleted. No replication
Not much HA or resilience. Base 200MB/s per TiB storage

Both burst up to 1300MB/s per TiB(credit system) earn credits when you use performance below your baseline, use credits when above baseline.

Access over VPN or direct connect from on-premises, from within a VPC and anything connected to VPC via private networking

Data lives in the file system while processing occurs
when you create a FS, you can associate it with a repository(and s3 bucket). This way the objects in the s3 are visible in the file system and not actually stored within the lustre file system...when the data is accessed by a client the data is lazy loaded into the file system from the s3 repository the first time it is loaded, then it is present in the file system. 

The lustre file system is seperate, you can just use an s3 as a foundation. You can sync changes made in the fs system back to the s3 repo using the hsm_archive command, but it is not automatically in-sync, and its in the actual lustre fs system where the data processing occurs. 

Lustre splits data up when is storing to discs. There are different elements or types of data stored in the file system:
Metadata - info about the file system, such as the file names, file sizes, and file locations, targets (MSTs) one per files system
Data - the actual data in the file system stored on object storage targets (OSTs) 1.17TiB in size. By spliting the data into these is how performance is achieved. 
Logs - logs of the file system activity
Checkpoints - used to recover from failures

One ENI from the VPC to the Lustre file servers and storage volumes.

The larger the file sys, the more servers and disks, and more chance of failure in SCRACH deployments

Persistent gives replication of those resources but only in one AZ

You can back up to s3 with both, manual or auto 0-35 day retention

*/