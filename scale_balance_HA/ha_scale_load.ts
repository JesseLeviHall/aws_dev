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

User req => R53 DNS layer => Health Checks => CDN Cloudfront Edge Caches => Enter Regions/Load Balancer or API Gateway => compute resource(EC2)/storage(EBS, EFS, s3) => DB tier(RDS,redshift) => Application Services(Kinesis, Step Functions, SQS, SNS)
===============Elastic Load Balancer=================
(ELB) V1 was introduced in 2009 with the 'now called' Classic Load Balancer. V1 is not really layer 7. 

Two new versions the v2: Application and v2 Network load balancers are now the recommended solutions.

Application Load Balancer: HTTP(s)/WebSocket
Network Load Balancer: TCP, TLS & UDP


*/