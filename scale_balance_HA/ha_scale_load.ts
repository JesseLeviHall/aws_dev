/* 
LOAD BALANCE H.A. and SCALING
we can define 3 general types of architectures:
1. Single Server - small scale, exist in one region or one country. 
2. One Location + DR requirement. One region but DR meaning the app fails over to a secondary region
3. Multi-Region distributed delivery (Netflix) 

In AWS: Global Service Location and Discovery
- Route 53: DNS
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

V2 was introduced in 2016 with the Application Load Balancer and Network Load Balancer.

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
- Internal LBs can be used to connect to private computes in other VPCs

- Cross Zone Load Balancing: Each Node in an AZ gets 100%/number of nodes of reqs in that AZ. This is enabled by default. Now, Cross Zone allows distribution accross instances in other AZs as standard as well.
==============EC2 Launch Config & Template============
Launch Configurations and Launch Templates provide the WHAT to Auto scaling groups.
They define WHAT gets provisioned
The AMI, the Instance Type, the networking & security, the key pair to use, the userdata to inject and IAM Role to attach.
Both are not editable, Launch Templates have versions.
Launch Templates have newer features including T2/T3 Unlimited CPU options, placemnet groups, Capacity reservations, Elastic Graphics.
AWS reccomend templates going forward. Configs are used for auto scaling groups, templates do the same but alos let you launch from the console, or CLI, 
================Auto Scaling Groups====================
Auto Scaling Groups provide automatic scaling and self-healing for EC2, defined in one specific version of a launch template or configs(you change the association but its one at a time). Thats how they know what to provision.
An Auto Scaling group contains a collection of Amazon EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management. An Auto Scaling group also enables you to use Amazon EC2 Auto Scaling features such as health check replacements and scaling policies. Both maintaining the number of instances in an Auto Scaling group and automatic scaling are the core functionality of the Amazon EC2 Auto Scaling service.

There are three values associated with the scaling group:
1. The minimum size
2. The desired capacity
3. The maximum size
Often expressed as X, Y, or Z.
The job of the scaling group is to approach the desired capacity by starting or terminating instances as needed.
- You can manage this completely manually, but normally scaling policies are used to automate it.
- The scaling group will never terminate more than 20% of the instances in a single action.
- Automation can be by schedule(time based), or dynamic
- Dynamic scaling is based on CloudWatch metrics, such as CPU Utilization, or a custom metric = (simple scaling) or Stepped scaling (Bigger +/- based on difference from normal - act quicker the bigger the difference. Usually prefered to simple) or Target Tracking (set desired aggregate CPU or I/O or req count per target ie 40% and ASG handles the provisioning to keep that metric )
The cooldown period is in seconds, how long to wait at the end of a scaling action before doing another
Auto-scaling groups also monitor the health of instances (default ec2 status checks) so if an instance fails, it replaces it to fix most problems isolated to a single instance. 
AS Groups integrate well with Load Balancers because the LB metrics that measure load on a system can be used to adjust the number of instances. 
Scaling processes within an Auto Scaling Group: There are a number of dif processes or functions performed by the ASG. These can be set to suspended or resumed. IE: launch and terminate(on or off), addtoloadbalancer(whether new instances are added to LBs), alarmnotification(connected to cloudwatch alarms), AZRebalance(balances evenly accross all AZs), HealthCheck(on or off), ReplaceUnhealthy, ScheduledActions, Standby or InService(a specific instance)
- ASGs are free you only pay for the resources they create
- Use cooldowns to avoid rapid scaling and associated costs
- Can be more cost effective if using more small instances than a few big ones(ajust in smaller steps)
- ASGs define when and where resources are launched, Templates define the What. 
=============lifecycle Hooks==============
Lifecycle hooks enable you to perform custom actions by pausing instances as an Auto Scaling group launches or terminates them. When an instance is paused, it remains in a wait state either until you complete the lifecycle action using the complete-lifecycle-action command or the CompleteLifecycleAction operation, or until the timeout period ends (one hour by default).
-Custom actions that occur during ASG actions
-Integrate with EventBridge or SNS Notifications which allow your system to perform event driven processing based on the launch or termination of ec2 instances within an ASG
Ex: when an instance is being launched in moves from pending to pending wait, to then perform the hook actions you def like ingest and index data. Then it moves to pending proceed and finally InService. A terminate hook is the same in reverse. 
=================ASG Health Check EC2 V ELB============
Amazon EC2 Auto Scaling can determine the health status of an instance using one or more of the following:

Status checks provided by Amazon EC2 to identify hardware and software issues that may impair an instance. The default health checks for an Auto Scaling group are EC2 status checks only.
Health checks provided by Elastic Load Balancing (ELB). These health checks are disabled by default but can be enabled. these make checks more app aware (layer 7)
Custom health checks (external system)
Your custom health checks (external system)
A health Check Grace period default of 300s gives adelay while an instance boostraps before starting checks, so it doesnt continually terminate and restart an instance forever. 

q: What is SSL Offload?
A: SSL Offload is a process where the SSL encryption is removed from the server and placed on a load balancer. This allows the server to focus on the application and not the encryption. This is a common practice in web applications.

q: Which load balancer is allocated with a static IP
A: Network Load Balancer

*/