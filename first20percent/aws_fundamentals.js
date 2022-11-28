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
- has state (stopped, running, terminated)

*/
