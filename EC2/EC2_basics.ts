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
Instance types names: (family, generation, features, size)




*/