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
- other subnets: click add new subnet at the bottom, add sn-db-A, us-east-1a, 10.16.16.0/20, IpV6 /56 and type 01 for AZ (A) as well.  Do this for app and web. that sets up AZ-1. Do the same for the other AZ's (B) and (C) with name anc AZ east b or c.
For each subnet: select, actions dropdown, edit settings...enable auto asign IPv6 address
=====

In planning decide early whether to choose default or dedicated tenancy. 
-Default tenancy is the default, and is the best choice for most workloads.
-Dedicated tenancy is best for workloads that require dedicated hardware.
-Host tenancy is best for workloads that require dedicated hardware and can be interrupted.

-IPv6 private CIDR Blocks are the main method for vpc network. A pool comes standard
-IPv4 public CIDR Blocks are the main method for vpc network. these are optional configurations
-DNS privided by r53 and available on the base IP of the vpc + 2
****** enable DnsHostnames is a setting that enables instances DNS Names
****** enable DnsSupport is a setting that enables DNS resolution in vpc. if true the DNS r53 option on the base IP +2 is not available. 

================VPC Routing====================
-Route tables are used to route traffic between subnets and internet gateways.
-Route tables are associated with subnets.
-Route tables are stateful, meaning that if a response is sent to an instance, the response will go out the same interface that the request came in on.
-Every VPC has a router - Hightly available
-In every subnet.. 'network+1' address
-Every subnet has a default route table (Main)

-The destinaiton IP of a route is singular, but it could be an ip for a network. The more specific the route is the higher the priority (end number)

================Internet Gateway===================
-Internet gateways are used to allow communication between instances in a VPC and the internet. 
-Internet gateways are stateless, meaning that if a response is sent to an instance, the response will go out the internet gateway.
-Internet gateways are attached to one or zero VPCs (region resilient)
***** IPv4 Addresses with an internet gateway: 
for an ec2 example, a record is created which the IGW maintains - it links the instances private ip to the alocated public ip. the instance itself is not configured with that public IP. thats why when you make an ec2 and allocate it a public ipv4 address, Inside the operating system it only sees the private IP address. So:
-when you create an ec2 instance, the public IPv4 is not configures in the OS.
-Bastion hosts and Jumpbox are practiclly the same - and instance inside a public subnet, used to manage incoming connections and facilitate access to internal VPC resources. 
-When you create a NAT gateway, it is created in a public subnet, and it is used to allow instances in a private subnet to connect to the internet.
[DEMO] we implement an Internet Gateway, Route Tables and Routes within the Animals4life VPC to support the WEB public subnets. Create IGW, a4l-vpc1-igw name, attach it to a4l vpc. Then create a route table, edit subnet associattions, select the three web subnets webA b C, edit routes in bottom tabs and add route, for IPv4 add 0.0.0.0/0 (all), add the IGW as the target IP. for IPv6 add ::/0 (all) and the target IGW.
this creates two default routes that send any unknown traffic to the associated subnets to the ineternet gateway. Then we need to ensure that any resources launched in the web a b or c subnets are allocated with public IPv4 addresses. To do that go to subnets on the left, select web a b c, actions, edit settings, enable uato assign public IPv4.  Now if we go to create an ec2 scroll down to network settings and select the vpc, and the subnet webA and make sure auto assign IPs are enabled, and add a security group and launch. In instances, right click the instance and hit connect.  select it and in the detials panel below

if you dont associate a subnet with a route tabel id defaults to the main route table

****stateful v stateless firewalls: 
stateless: doesnt distiguish state of connection (inbound v outbound are two seperate unrelated parts)


=================NAT Gateway=========================

===================NAT Gateway=======================
*/