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
- EBS is a block storage service


*/