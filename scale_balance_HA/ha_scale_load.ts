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

Application Load Balancer: HTTP(s)/WebSocket
Network Load Balancer: TCP, TLS & UDP

Basically a load balancer is designed to distribute customer connections accross any registered backend compute resources. So the physical infrastructure increases or decreases based on the amount of user reqs
==============Key Architecture points===============
When provisioning a load balancer you have to decide on a few important config items: 
- IPv4 Only? or Dual Stack?
- What Availability Zones? (one Subnet per AZ, two or more AZs) ELB Nodes are created, all point to a single DNS A record.
- Should LB be internet facing or Internal? (controls IP addressing for the LB Nodes, if internet facing, you need to assign a public IP to the LB Nodes)
- Listener Configurations (ports, targets & protocol)

*******An internet facigng LB can connect to both public and private computes (EC2s), they do not have to be public. 
- LBs need 8 or more free IP addresses per Subnet they are depoloyed to in order to function(allows for scale) This means a /28 Subnet which provides a total of 16 IP addresses, minus 5 reserved for aws, leaving 11 free per Subnet. AWS suggest usign a /27 or larger Subnet to deploy an ELB

*/