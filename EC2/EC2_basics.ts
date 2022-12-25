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



*/