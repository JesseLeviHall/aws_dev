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
=================

Reboot/restarting ec2 is very different from stopping and starting.  stop and start usually changes it ipv4 it is hosted on, so the instance store will be lost. However, rebooting an instance will usully maintain the same ip host, so it might work. 

=====EBS Encryption=============
- EBS encryption Keys do not persist if the ec2 host IP is changed due to stop/start
- EBS encryption keys are not shared between AZs
- the same keys are used for snapshots of the vulumes they were used to encrypt. There is no cost so it kinda should be a default. 
- Accounts can be set to encrypt by default - default KMS Key
Otherwise Choose a KMS Key to use for EBS
- Each Volume uses 1 unique Data Encryption Key
- Each Snapshot uses 1 unique Data Encryption Key, a new volume from that snapshot will use the same keys.
- Once a volume is encrypted it cant be returned to unencrypted. 
- Once a volume is encrypted, it can only be attached to instances that support EBS encryption.
- EBS encryption is not supported on all instance types.
- The OS of the ec2 isnt aware of the encryption, it just sees plain text, no performance loss

q: will a vulume from an encrypted snapshot use the same keys?
a: yes, it will use the same keys.

=============Network Interfaces, Instance IPS, and DNS===========
****************
(When you launch a new Amazon Elastic Compute Cloud (Amazon EC2) instance, it is automatically assigned two IP addresses: a private IP address and a public IP address.

The private IP address is a unique IP address that is assigned to the instance within the Amazon Virtual Private Cloud (Amazon VPC) that it belongs to. It is used to communicate with other resources within the VPC, such as other EC2 instances, RDS databases, and VPC resources.

The public IP address is a unique IP address that is assigned to the instance when it is launched. It is used to communicate with the internet and is accessible from the internet. The public IP address can be either an Elastic IP address (EIP) or a public IP address from the Amazon pool of public IP addresses.

If you choose to use an EIP, it will be automatically associated with the instance when it is launched. If you choose to use a public IP address from the Amazon pool of public IP addresses, a new public IP address will be automatically assigned to the instance when it is launched.

You can also use a network interface to assign additional private and public IP addresses to an EC2 instance.)

- Elastic Network Interfaces (ENI) are virtual network cards that can be attached to EC2 instances. Every instance comes with one (primary)
- ENI can be detached and attached to other instances, within the same AZ but can be in other subnets. 
- they have a MAC address
- they have a private IP address, there can be one elastic IP per private IPv4 address. 0 or more IPv6, these are default public only
- they have a security group attached to the ivterface, so You have to set different Ipv4 via an ENI for different security groups
- Apart from the primary, ENIs can be detached and moved to other instances.
- when you allocate an elastic IP, you can associate it with a private ip, either on the primary or on the secondary ENI.  IF you do associate it with the primary ENI public IPv4, that elastic ip becomes the new primary ENI pulblic IP. Then when you remove that elastic ip, the instance will gain a new public IPv4 address, not the old one. 

-Secondary ENI + MAC = Licensing 
-There are a few reasons why you might want to use multiple network interfaces (NICs) rather than multiple IP addresses on a single network interface:
1.Network isolation: By using multiple network interfaces, you can isolate different types of traffic onto different interfaces. For example, you can use one interface for public traffic and another interface for private traffic. This can help to improve security and reduce the risk of network-based attacks.
2.Improved performance: Using multiple network interfaces can improve the performance of your EC2 instance, especially if you are running workloads that require high network throughput. Each interface can operate independently and can be optimized for the specific type of traffic that it handles.
3.Increased flexibility: Using multiple network interfaces allows you to configure different networking options, such as different security groups, network ACLs, and routing tables, for each interface. This can give you greater flexibility in how you configure and manage your network resources.

( the public IP address is a unique IP address that is assigned to the instance when it is launched. It is used to communicate with the internet and is accessible from the internet. The public IP address can be either an Elastic IP address (EIP) or a public IP address from the Amazon pool of public IP addresses. The public IP address is not directly visible to the OS and is not configured on the network interface of the instance.

Instead, the public IP address is mapped to the private IP address of the instance using Network Address Translation (NAT). This allows the instance to send and receive traffic from the internet using its public IP address, while the OS communicates with the instance using its private IP address.)
- The OS does NOT see the public IPv4, as far as the OS is concerned, you ALWAYS configure the private IPv4 address on the Interface.  
- The public IPv4 is NATed to the private IPv4, so the OS can communicate with the public IPv4, but it is not directly visible to the OS.
- NEVER configure a network interface inside an operating system with a public IPv4 Address inside aws.
it is not recommended to assign a public IP address to the network interface of an Amazon Elastic Compute Cloud (EC2) instance.
- It is not recommended to assign a public IP address to the network interface of an EC2 instance because doing so could potentially expose the instance to security risks and increase the risk of network-based attacks. It is generally best practice to use the private IP address for communication within the Amazon Virtual Private Cloud (VPC) and to use the public IP address only for communication with the internet.
- You can have up to 5 ENIs per instance, and up to 50 ENIs per region.
- The public DNS which is given to the instance for the public IPv4 address will resolve to the primary PRIVATE IPv4 address from within the VPC. this is done so if you have instance to instance communication using DNS inside the VPC it never leaves the VPC, so no ec2's need to go out the NAT IGW and back again to communicate.  Everywhere else, the public DNS resolves to the public IPv4 IP. 

================AMI======================
Amazon Machine Images (AMI) 's are the images which can create EC2 instances of a certain configuration.

In addition to using AMI's to launch instances, you can customize an EC2 instance to your bespoke business requirements and then generate a template AMI which can be used to create any number of customized EC2 instances.

Creating an Image from a stopped Instance:
(Creates a snapshot of any EBS volumes, copies device id and creates a block device mapping of the storage structure )
1. Stop the instance
2. Create an image from the stopped instance
3. Launch an instance from the image (make sure you set network settings to match the VPC and subnet you want, and enable auto assign IPs)
4. Start the instance

-KMS Keys are in general regional. So if copying an AMI to another region, you can initiate encryption on an image that wasnt encrypted, with KMS, or if you copy an already encrypted AMI, you need to re-encrypt as part of the transfer. 

AWS default KMS keys always start with 
aws/<alias>

**********AMI's are regional. You have to copy an AMI to another region to use it there, and a copied AMI is a completely different AMI than the original. 

*/ 