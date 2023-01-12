/* 
LOAD BALANCE H.A. and SCALING
we can define 3 general types of architectures:
1. Single Server - small scale, exist in one region or one country. 
2. One Location + DR requirement. One region but DR meaning the app fails over to a secondary region
3. Multi-Region distributed delivery (Netflix) 

In AWS: Global Service Location and Discovery
- AWS Global Accelerator:
And Contne Delivery Optimisation (CDN)
And Global health Checks and Failover

Regional Service components: 
- Regional entrypoint
- Regional edge cache
- Scaling and Resilience
- App services and components

User req => R53 DNS layer => Health Checks => CDN Cloudfront Edge Caches => Enter Regions/Load Balancer or API Gateway => compute resource(EC2 or other)/storage(EBS, EFS, s3) => DB tier(RDS,redshift) => Application Services(Kinesis, Step Functions, SQS, SNS)
===============Elastic Load Balancer=================
(ELB) V1 was introduced in 2009 with the 'now called' Classic Load Balancer. V1 is not really layer 7. 

Two new versions the v2: Application and v2 Network load balancers are now the recommended solutions.

Application Load Balancer: HTTP(s)/WebSocket -
Rules direct connections which arrive at a listener, and tell the LB what to do. They are processed in priority order, lastly the default (catchAll). Rule conditions ie: headers, req method, path-pattern, query string & source IP. Actions define rule behavior, can forward, redirect, provide fixed resp, authenticate open id & authenticate-cognito
- True Layer 7 protocol, but does not support SMTP, SSH, Gaming... and NO TCP/UDP/TLS Listeners. Able to inspect and react to content-type, cookies, custom headers, user location and app behaviour. NO end to end unbroken SSL connections(connection is terminated on the ALB and a new connection is made to the application). All ALBs that use HTTPS need SSLs on the LB. ALBs are slower than NLBs, but offer health checks at layer 7
Network Load Balancer: TCP, TLS & UDP - 
If you have to forward encrypted connections through to the instances and db without terminating them on the LB, you have to use NLBs with TCP listeners.  These are Layer 4 - NO visibility or understanding of HTTP, but REALLY Fast - 25% of ALB latency. Good for email, Games, Finance that isnt HTTP. Health checks only check ICMP and basic TCP handshaking. Can be allocated a static IP which is useful for whitelisting if you have corporate clients. Can forward TCP straight through to instances. USE NLBs if you need static IPs, Best performance possible without HTTP, or PrivateLink. Otherwise default to ALB

Basically a load balancer is designed to distribute customer connections accross any registered backend compute resources. So the physical infrastructure increases or decreases based on the amount of user reqs
- One SSL certificate per Host Rule. 

==============Key Architecture points===============
When provisioning a load balancer you have to decide on a few important config items: 
- IPv4 Only? or Dual Stack?
- What Availability Zones? (one Subnet per AZ, two or more AZs) ELB Nodes are created, all point to a single DNS A record.
- Should LB be internet facing or Internal? (controls IP addressing for the LB Nodes, if internet facing, you need to assign a public IP to the LB Nodes)
- Listener Configurations (ports, targets & protocol)

*******An internet facigng LB can connect to both public and private computes (EC2s), they do not have to be public. 
- LBs need 8 or more free IP addresses per Subnet they are depoloyed to in order to function(allows for scale) This means a /28 Subnet which provides a total of 16 IP addresses, minus 5 reserved for aws, leaving 11 free per Subnet. AWS suggest usign a /27 or larger Subnet to deploy an ELB.

- Internal LBs allow each tier to scale independently

- Cross Zone Load Balancing: Each Node in an AZ gets 100%/number of nodes of reqs in that AZ. This is enabled by default. Now, Cross Zone allows distribution accross instances in other AZs as standard as well.
==============EC2 Launch Config & Template============
Launch Configurations and Launch Templates provide the WHAT to Auto scaling groups.
They define WHAT gets provisioned
The AMI, the Instance Type, the networking & security, the key pair to use, the userdata to inject and IAM Role to attach.
Both are not editable, Launch Templates have versions.
Launch Templates have newer features including T2/T3 Unlimited CPU options, placemnet groups, Capacity reservations, Elastic Graphics.
AWS reccomend templates going forward. Configs are used for auto scaling groups, templates do the same but alos let you launch from the console, or CLI, 
================Auto Scaling Groups====================
Auto Scaling Groups provide the HOW to Auto Scaling.
An Auto Scaling group contains a collection of Amazon EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management. An Auto Scaling group also enables you to use Amazon EC2 Auto Scaling features such as health check replacements and scaling policies. Both maintaining the number of instances in an Auto Scaling group and automatic scaling are the core functionality of the Amazon EC2 Auto Scaling service.







*/