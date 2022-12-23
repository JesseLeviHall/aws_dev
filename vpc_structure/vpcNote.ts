/* 
This lesson steps through the design choices around VPC design and IP planning.


q: what is a vpc?
a: a virtual private cloud is a virtual network dedicated to your aws account. it is logically isolated from other virtual networks in the aws cloud. you can launch your aws resources, such as ec2 instances, into your vpc. you can configure your vpc to be a single tier or multi-tier architecture. you can configure your vpc to span multiple availability zones. you can also create a hardware virtual private cloud (hvpc) to connect your on-premises network to your vpc using a dedicated hardware connection.

vpc's are regionally isolated and regionally resilient


q: what is a nat instance?
a: a nat instance is a virtual machine that you launch into your public subnet. the nat instance forwards traffic from instances in your private subnet to the internet or other aws services, and then sends the response back to the instances. a nat instance must have a public ip address, and it must be associated with an elastic ip address. you can launch a nat instance using the amazon ec2 console, the aws cli, or the aws api. you can also launch a nat instance using a cloudformation template. you can launch a nat instance using a dedicated ip address. you can also launch a nat instance using a dedicated host.


q: what is a nat gateway?
a: a nat gateway is a managed service that makes it easy for you to connect to the internet from instances in a private subnet in your vpc.

q: what is a vpc endpoint?
a: a vpc endpoint enables you to privately connect your vpc to supported aws services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, nat device, vpn connection, or AWS Direct Connect connection. Instances in your vpc do not require public ip addresses to communicate with resources in the service. Traffic between your vpc and the other service does not leave the Amazon network.

aws vpc use same default ip range as azure production. 
aws vpc minimum ip /28 (16IP's) at most, maximum /16 (65536 IP's)
aws Services run from within subnets in the vpc, not from the vpc itself. A subnet rund in one availability zone, so you have to decide how many az's to set up. This impacts high availablity and resilience. By default use 3 with a spare, so (4)

starting tiers of a vpc are web, App, database, spare. 
web tier is public facing, app tier is private facing, database tier is private facing.

vpc is a logical construct, not a physical construct.

==============VPC subnets=================
Subnets are the building blocks of a VPC. They are the smallest network unit that can be created in a VPC. 

*****Subnets are used to divide a VPC into smaller networks. Each subnet must be in a single Availability Zone, meaning they are AZ resilient. Each AZ can have lots of subnets though.

each subnet gets an IPv4 CIDR by default, has to be within the range allocated to the vpc, cannot overlap with other subnets.

Optional IPv6 CIDR (/64 subset of the  /56 pvc = space for 256 IPs)

at default subnets in a vpc can communicate with eachother. 

web tier is a public subnet, app tier is a private subnet, database tier is a private subnet.

Every subnet has 5 reserved IPs:
-1st IP is the network address +0
-2nd IP is the default gateway for routing the subnet +1
-3rd IP is the default gateway for DNS +2
-4th IP is the reserved for future use IP +3
-5th IP is the broadcast address (last IP in subnet)

-assign public IP address is a setting that enables auto assignment of public IP addresses to instances launched into the subnet.
- auto assign IPv6 is also a setting
-Map public IP on launch is a setting that enables auto assignment of public IP addresses to instances launched into the subnet.
-configure DHCP is a setting that enables DHCP options for the subnet. DHCP options are the configuration settings for DHCP. 
DHCP stands for 
-Dynamic Host Configuration Protocol, It is a protocol used on TCP/IP networks to automatically assign an IP address to a computer from a pool of available addresses.



===========setup default VPC===================
- from vpc dashboard, we create vpc, IPv4 CIDRs 10.16.0.0/16, IPv6 CIDR amazon managed.
- 1st subnet: from vpc dashboard, we create subnet, select the vpc we created. subnet name sn-reserved-A, us-east-1a, 
10.16.0.0/20.  Select IpV6 /56 and type 00 for AZ (A).
- 2nd subnet: click add new subnet at the bottom, add sn-db-A, us-east-1a, 10.16.16.0/20, IpV6 /56 and type 01 for AZ (A) as well.  Do this for app and web. that sets up AZ-1. 

In planning decide early whether to choose default or dedicated tenancy. 
-Default tenancy is the default, and is the best choice for most workloads.
-Dedicated tenancy is best for workloads that require dedicated hardware.
-Host tenancy is best for workloads that require dedicated hardware and can be interrupted.

-IPv6 private CIDR Blocks are the main method for vpc network. A pool comes standard
-IPv4 public CIDR Blocks are the main method for vpc network. these are optional configurations
-DNS privided by r53 and available on the base IP of the vpc + 2
****** enable DnsHostnames is a setting that enables instances DNS Names
****** enable DnsSupport is a setting that enables DNS resolution in vpc. if true the DNS r53 option on the base IP +2 is not available. 

*/