/* 
ec2 is a virtualization service 
aws has their own virtualization stack called nitro which provides a lot of the high level features. 
ec2 hosts are either shared or dedicated
-shared hosts are cheaper but you have to share the resources with other customers
-dedicated hosts are more expensive but you have the resources to yourself. 
- ec2 is AZ resilient, they exist in one AZ - as do subnets.
-hosts = 1AZ, if AZ fails, host and all instances there fail.  
-instant store is temp ec2 local storage/memory. 
-ec2 can connect to storage - (EBS) which stands for elastic block storage.
-EBS is also AZ resilient, and lets you allocate volumes of persistent storage that can be alocated to instances in the same AZ
============Instance Types=====================
Instance type names: (family, generation, features, size)

Generally speaking:
- family: general purpose, compute optimized, memory optimized, storage optimized, accelerator optimized, etc
- generation: current, previous, etc
- features: burstable, compute optimized, memory optimized, storage optimized, etc
- size: size of the instance, small, medium, large, etc

Naming example R5dn.8xlarge (this is an instance type) and = 
- R5 = family, 5th generation
- dn = features and additional capabilities
- 8 = size
- xlarge = size

===============
connection caviat: ec2 instance connect wont work if your security group only allows connections from my local IP.
What you can do is add allow connect from the aws service ip for that region, and then ec2 instance connect will work, this is a good way to give a large group access to an instance connection because 
you can just add the aws service ip to the security group and then you dont have to worry about updating the security group every time you change your IP.
Otherwise, use sessions to connect to public or private instances

=================Storage for instances===================
Block Storage - volume presented to the OS as collection of blocks...no structure provided. mountable, bootable. Hard disks and SSDs. 

File Storage - volume presented to the OS as a file system. mountable, NOT bootable. File systems. (ready made file sys)

Object Storage - volume presented to the OS as a collection of objects. not mountable, not bootable. S3 buckets.

Three types of performance terms:
- IO (Block) Size - size of data blocks writing to disk
- IOPS - input/output operations per second
- throughput - amount of data that can be read or written per second (MB/s)

- ec2 instance store: (fast)
    - ephemeral storage,
    - local to the host,
    - not backed up,
    - not replicated,
    - not AZ resilient,
    - not persistent,
    - not shared,
    - not encrypted,
    - not a volume,
    - not a snapshot,
    - not a backup,
    - not a file system,
    - not a mount point,
  
- Network attached storage:
    - EBS
    - EFS
    - FSx for Windows
    - FSx for Lustre

- EBS: (slow)
    - persistent storage,
    - network attached,
    - backed up,
    - replicated,
    - AZ resilient,
    - persistent,
    - shared,
    - encrypted,
    - a volume,
    - a snapshot,
    - a backup,
    - a file system,
    - a mount point,

- EFS: (slow)
    - persistent storage,
    - network attached,
    - backed up,
    - replicated,
    - AZ resilient,
    - persistent,
    - shared,
    - encrypted,
    - a volume,
    - a snapshot,
    - a backup,
    - a file system,
    - a mount point,

- FSx for Windows: (slow)
    - persistent storage,
    - network attached,
    - backed up,
    - replicated,
    - AZ resilient,
    - persistent,
    - shared,
    - encrypted,
    - a volume,
    - a snapshot,
    - a backup,
    - a file system,
    - a mount point,

- FSx for Lustre: (slow)
    - persistent storage,
    - network attached,
    - backed up,
    - replicated,
    - AZ resilient,
    - persistent,
    - shared,
    - encrypted,
    - a volume,
    - a snapshot,
    - a backup,
    - a file system,
    - a mount point,

=================Elastic Block Store===================
- EBS is a block storage service - raw disk allocations (volume) can be encrypted using KMS
- EBS volumes are AZ resilient - if AZ fails, volume fails
- attatched to ONE ec2 or other service over a storage network. 
- Can be detached from on instance and reatached to another = persistent. 
- EBS volumes are not shared between instances.
- Snapshot (backup) into S3. Cerate volume from snapshot allows to migrate between AZs
- usually billed on per Gigabyte basis

-----------------Volume types-----------------
- General Purpose SSD (GP2) - balances price and performance for a wide variety of workloads.
    - 1GB to 16TB
    - An IO Credit is 16KB. IOPS Assume 16KB. 
    - 1 IOPS is 1 IO in 1 second. 
    - IO Credit Bucket Capacity 5.4 Million fills at rate of baseline performance, minimum 100 IO credits per second. 
    - 3 IOPS per GB with a baseline of 100 IOPS and a burst balance of 3000 IOPS.
    - Basically, have to ensure you arent depleting the bucket in normal operation. 
    - Good for boot volumes, low-latency interactive apps, dev and test env's. 
    - currently the default.
  - (GP3)
    - starts with 3,000 IOPS & 125 MB/s as standard
    - 1GB to 16TB
    - Base price 20% less tha gp2 at base rate
    - Simmilar use cases, (databases) can provide higher performance as hight costs. 

- Provisioned IOPS SSD (IO1 and IO2) - designed for I/O intensive workloads such as large relational or NoSQL databases.
    - IOPS are configurable independent of the size of the volume
    - Designed for super hight performance situations (low latentcy) 4x IOPS per vol vs GP2/3
    - 4GB to 16TB
  
- Throughput Optimized HDD (ST1) - big data, data warehouses, log processing. A low-cost HDD designed for frequently accessed, throughput-intensive workloads.
    - faster but not very agile
    - sequential access not good at random access. 
    - 125GB - 16TB, Max 500 IOPS at 1MB blocks
- Cold HDD (SC1) - lowest cost HDD volume for infrequently accessed workloads.  The lowest-cost HDD design for less frequently accessed workloads.
    - Max 250 IOPS at 1MB blocks
    - 125GB to 16 TB also
- Magnetic (standard) - lowest cost per GB of all EBS volume types that is bootable.

  -----------Max performance-----------------
    Per Instance:
    - io1: 260,000 IOPS & 7,500MB/s
    - io2: 160,000 IOPS & 4,750MB/s
    - io2 BLock Express: 260,000 IOPS & 7500MB/s
    Per Volume: 
    (GP2 and GP3) : up to 16000 IOPS
    (IO1/2) : up to 64,000 IOPS per EBS volume with bigger EC2's. 256,000 with IO2 block express)

    (Another option You can take lots of individual EBS volumes and create a RAID0 set, combined up to 260,000 IOPS)
    ***** 260,000 IOPS is max performance level of any EC2 with EBS**** (more available with instance store)

=============Instance Store Volumes===============
- Instance store volumes are physically attached to the host computer. thus provide highest performance in AWS, included in the price of the instance. You have to attach them at launch, cannot add them afterward. 
- Instance store volumes are temporary storage that is erased when the instance is stopped or terminated.

An instance store provides temporary block-level storage for your instance. This storage is located on disks that are physically attached to the host computer. Instance store is ideal for temporary storage of information that changes frequently, such as buffers, caches, scratch data, and other temporary content, or for data that is replicated across a fleet of instances, such as a load-balanced pool of web servers.

An instance store consists of one or more instance store volumes exposed as block devices. The size of an instance store as well as the number of devices available varies by instance type.

The virtual devices for instance store volumes are ephemeral[0-23]. Instance types that support one instance store volume have ephemeral0. Instance types that support two instance store volumes have ephemeral0 and ephemeral1, and so on.

EX: D3 = 4.6 GB/s throughput
    I3 = 16 Gb/s of sequential throughput. 

    --------choosing btw EBS and instance store------
    - EBS:
        - persistent
        - backed up
        - replicated
        - AZ resilient
        - shared
        - encrypted
        - a volume
        - a snapshot
        - a backup
        - a file system
        - a mount point
    - Instance Store:
        - ephemeral
        - local to the host
        - not backed up
        - not replicated
        - not AZ resilient
        - not persistent
        - not shared
        - not encrypted
        - not a volume
        - not a snapshot
        - not a backup
        - not a file system
        - not a mount point

  - For priority on persistence and resilience, Storage Isolaation from instance lifecycle ....EBS
  - If you need resilience but the app has built in replication...it depends
  - If you need super high performance...Instance Store
  - If you need low cost...Instance Store
  - If you need to share data between instances...EBS
  - If you need to share data between AZs...EBS
   Gerenally Speaking ********************
   Cheap = ST1 or SC1
   Throughput ... streaming... ST1
   Boot...NOT ST1 or SC1
  
==============SnapShots================
- Snapshots are point in time copies of volumes, usually stored on S3. 
- Since EBS volumes are AZ reslilient, snapshots become region resilient. 
- Snapshots are incremental, only changed blocks are stored. each snapshot is still selfsuficient as a back up though. 
- Volumes can be recreated from a snapshot, then. this allows for a cross region copy
- Up to 4 snaps per region
- FSR allows immediate restore.  Otherwise, snaps restore lazily. 
-Gigbyte-month billing means:
    - after initial store, just billed for the space the increments take up on top of the referenced snaps previously

      [ASSOCIATESHARED] [DEMO] EBS Volumes - PART2
Create an EBS Volume
Mount it to an EC2 instance
Create and Mount a file system
Generate a test file
Migrate the volume to another EC2 instance in the same AZ
verify the file system and file are intact
Create a EBS Snapshot from the volume
Create a new EBS Volume in AZ-B
Verify the filesystem and file are intact
Copy the snapshot to another region
Create an EC2 instance with instance store volumes
Create a filesystem and test file
Restart instance and verify the file system is intact
Stop and Start the instance
Verify the file system is no longer present - new EC2 Host.

*/