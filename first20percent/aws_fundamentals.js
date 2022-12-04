/* 

public vs private services from the networking perspective 
public services are accessible from the internet
private services are not accessible from the internet

aws private zones are called vpc's virtual private clouds
ec2 instances are vpc's that can only acced by the internet if you allow it and configure it

aws public zones are connected to the internet but not accessible by the public internet - eg s3 bucket

aws regions and edge locations allow services to be delivered faster. 

aws regions are geographically separated data centers that are connected by a low latency network. Laws of the region apply to your software where it is deployed. avaialbility zones are within regions, and allow for more granular distribution

the resilency of a service is defined as 
the ability of a service to recover from infrastructure or service disruptions, maintain the quality of service during outages, and recover the data to a point in time that meets the recovery point objective (RPO) and recovery time objective (RTO) of the application.
1. globally resilient 
2. regionally resilient
3. az resilient

an edge location is defined as 
a location where content is cached for the purpose of providing users with access to content in a local location. Edge locations are used to optimize the delivery of content to users.

an aws vpc is defined as
a virtual network dedicated to your aws account. It is logically isolated from other virtual networks in the aws cloud. You can launch your aws resources, such as amazon ec2 instances, into your vpc. You can configure your vpc to be a virtual representation of your own data center, with subnets and route tables and network gateways.

there is a maximum of one default vpc per region. You can have many custom vpcs per region. 

a default vpc is defined as
a vpc that is automatically created for you when you launch your first aws resource into your account. It is a fully functional vpc with a default configuration. The vpc cidr is the range of default ip addresses, and they are always the same: 172.31.00/16. each subnet in a vpc is in a distinct availability zone, making it resilient. You get an internet gateway, security group, and NACL

a custom vpc is defined as
a vpc that you create. You can create a custom vpc with a configuration that meets your specific needs. You can create a custom vpc in any range of ip addresses. You can create a custom vpc with a single subnet or multiple subnets. You can create a custom vpc with a single availability zone or multiple availability zones.

===================EC2==================
an ec2 instance is defined as
infrastructure as a service (IAAS). You have complete control over your instances and can run on aws hardware that is suited to your requirements.  
- Private service by default, uses VPC networking
- is AZ resiliant (fails if AZ fails)
- billed per second
- can be stopped and started
- local host or EBS (Elastic Block Store)
- has state (stopped, running, terminated) stopped still billed for space. 
an AMI is defined as 
a template that contains a software configuration (operating system, application server, and applications) required to launch your instance. You must specify an AMI when you launch an instance. You can launch multiple instances from a single AMI when you need multiple instances with the same configuration. You can use different AMIs to launch instances when you need instances with different configurations. Similar to a server image. it can create an ec2 and and ec2 can create an AMI. 
AMI can be, private, public, owned, or explicit
an EBS is defined as
a virtual hard drive that you can attach to your instance. You can use EBS volumes to store data that persists independently from the life of an instance. You can create and attach EBS volumes when you launch an instance, or you can create and attach them to a running instance at any time. 

to run windows on the remote desktop protocol, it runs through port 3389
for linux its ssh protocol on port 22

====================S3 Basics================
an s3 bucket is defined as
a public cloud storage resource available in aws. It is designed to make web-scale computing easier for developers. 
- public service by default
- is regionally resilient
- billed per GB
- can be stopped and started
- store videos photos and files
- has state (active, deleted)
- can be versioned
- can be encrypted
- can be accessed from anywhere via UI,ClI, or API/http
- objects stored in buckets
- objects are stored in key value pairs, key is the name of the object, value is the data and its metadata, can be up to 5tb!
- objects are stored in folders called prefixes
- buckets apply to the laws of the region you initiate and use it
- the name has to be unique across all of aws
- the name can be up to 63 characters long all lowercase no underscores. 
- stucture is flat. everything is root level
- folders are prefix names eg: /old/koala.jpg is in a folder called old. 
- per account 100 bucket soft 1000 hard limit
- not block storage means you cant mount an s3 to an ec2 instance
- block storage is basically a virtual hard disk
- in ec2 EBS is block storage with one user limit, so you can mount it as a drive. 
- s3 is good for large distribution of data, and is reduces storage cost of ec2 instance

=======Cloud Formation========
a cloud formation template is defined as
a json or yaml file that defines the resources you want to create in aws. You can use a template to create and delete a collection of resources together as a single unit (a stack). You can create a template manually, or you can use a tool to generate a template for you.
- All templates have mandatory list of resources 
- the template format version is the version of the template schema, the description follows this imediately 
- All templates have optional list of parameters
- the stack is the resources that are created from the template
- when executing the template the physical instances needed are created eg: ec2 or s3
Its cloud formations job to keep the physical resources in sync with the template.

=======shared responsibility model========
aws is responsible for the security of the cloud, you are responsible for the security in the cloud eg: regions, availablilty zones, edge locations, vpc's, ec2 instances, s3 buckets, cloud formation templates, and any software that manages those systems. 
we are responsible for security surrounding customer/user data, and the security of the software that manages the data.

============HA vs FT vs DR==========
High availability is the ability of a system to continue operating without interruption when one or more of its components fail.

Fault tolerance is the ability of a system to continue operating in the event of the failure of some of its components.

Disaster recovery is the ability of a system to recover from a disaster.

============DR vs BC vs DRP=========
Disaster recovery is the ability of a system to recover from a disaster.

Business continuity is the ability of a system to continue operating in the event of a disaster.

Disaster recovery planning is the process of creating a plan to recover from a disaster.
*/
