/* 
An R53 Hosted zone is defined as a collection (globally resilient DB) of DNS records that are hosted by Amazon Route 53. A hosted zone is a container for resource record sets that have the same DNS name suffix, such as example.com. You can use a hosted zone to define record sets for the same DNS name in multiple environments, such as test.example.com and prod.example.com. You can also use a hosted zone to define record sets for subdomains, such as www.example.com and store.example.com. You can create a maximum of 100 hosted zones that have the same name and that you own. You can create a maximum of 100 resource record sets that have the same combination of DNS name and type in a hosted zone.

==================R53 Public Hosted Zones================
A public hosted zone is a container that holds information about how you want to route traffic on the internet for a specific domain which is accessible from the public internet, and VPC Instances are already configured (if enabled) with the VPC +2 address as their DNS resolver - this allows querying of R53 public and internet hosed DNS zones. 
==================R53 Private Hosted Zones================
A private hosted zone is a container that holds information about how you want Amazon Route 53 to respond to DNS queries for a domain and its subdomains within one or more VPCs that you create with the Amazon VPC service.
Split Horizon or View: 
If you have a VPC to support some business applications, and a private hosted zone with the same domain name as the public web apps, this would allow apps with the same domain names to be only internally accessible. 
==================R53 Alias V CNAME Records================
An 'A' name maps a name to an IP
A 'CNAME' maps a name to another name, but not an apex or naked domain. (this means if given a DNS name, using an elastic load balancer with CNAMEs would not work) This is what ALIAS records fix. 
An Alias record maps a NAME to an aws resource and it can be the naked domain. AWS encourage Alias use by making it free for reqs that point to a AWS resource.
An Alias is a subtype - you can have an A record alias and a CNAME alias
So you need to match the alias record type with the type of the record youre pointing at. 
Aliases are an AWS creation only avialable in AWS route 53that is outside the DNS global servers. 
==================R53 Simple Routing================
Simple routing lets you configure standard DNS records, with no special Route 53 routing such as weighted or latency. With simple routing, you typically route traffic to a single resource, for example, to a web server for your website. Healthcheck is not supported, all values are returned for a record when queried.
==================R53 Health Checks================
Amazon Route 53 health checks monitor the health and performance of your web applications, web servers, and other resources. Each health check that you create can monitor one of the following:
The health of a specified resource, such as a web server
The status of other health checks
The status of an Amazon CloudWatch alarm
Health checks are seperate (configured independently) from but used by records. 
Health checkers are distributed globally and can be used to check anything with an IP address. 
Checks are every 30 secs default 10 secs for $.
3 type of checks: 
1.EndPoint, 2.CloudWatch Alarm, 3.Checks of Checks (calculated) with lots of individual points. Moniter distributed applications. 
===================Failover Routing=============
Failover routing lets you route traffic to a resource when the resource is healthy or to a different resource when the first resource is unhealthy. Commonly used for a 'out of band' failure/maintenance page. 
=================Multi Value Routing================
Multivalue answer routing lets you configure Amazon Route 53 to return multiple values, such as IP addresses for your web servers, in response to DNS queries. You can specify multiple values for almost any record, but multivalue answer routing also lets you check the health of each resource, so Route 53 returns only values for healthy resources.
-A mix of simple and failover. Up to 8 healthy records are returned, if more exist then 8 are randomly chosen, the client picks one and connects to the resource. This feature aims to improve HA
=================Weighted Routing====================
Weighted routing lets you associate multiple resources with a single domain name (catagram.io) and choose how much traffic is routed to each resource. This can be useful for a variety of purposes, including load balancing and testing new versions of software. EG: 5% of reqs go to a new version. A record is returned based on its wieght in relation to the total wieght. 
=================Latency Routing=====================
If your application is hosted in multiple AWS Regions, you can improve performance for your users by serving their requests from the AWS Region that provides the lowest latency. Given on record of the same name in each region. AWS maintains a db of latency between locations and regions tagged in the records. Checks this and health, then returns best option.
=================Geolocation Routing=================
Geolocation routing lets you choose the resources that serve your traffic based on the geographic location of your users, meaning the location that DNS queries originate from. You tag the records with the location - generally a country or continent - in USA you can tag the state. This feature lets you choose the relavent records to return based on the req, not necessarily the closest. Good for Language specific apps or load balancing across regions. Priority = subtdivision(State), Country, Continent, default
=================Geoproximity Routing=================
Aims to calculate the distance from the user to the record and return the shortest distance. We can adjust how r53 handles the calculation by defining a + or - bias.
Geoproximity routing lets Amazon Route 53 route traffic to your resources based on the geographic location of your users and your resources. You can also optionally choose to route more traffic or less to a given resource by specifying a value, known as a bias. A bias expands or shrinks the size of the geographic region from which traffic is routed to a resource.
=================Interoperability=========================
Route53 provides Registrar and DNS Hosting features and architectures where it is used for BOTH, or only one of those functions - and integrates with other registrars or DNS hosting. Most commonly, Registered domain elsewhere, hosting on aws. 
==================CloudFront Architecture====================
CloudFront is a Content Delivery network (CDN) within AWS.
A CDN is a content delivery network of distributed servers (network) that deliver webpages and other web content to a user based on the geographic locations of the user, the origin of the webpage and a content delivery server.
Origin - anyting with a publicly routable ipv4 - where your content is served from.
Distribution - the 'configuration' unit of cloudfront
Edge Location - the location where content will be cached, this is seperate to an AWS region/availability zone. there are more - over 200
Regional Edge Cache - larger less frequenly accessed layer over the edge locations below it in the tree. 
Cache Hit - when the edge location has the requested resource already
Cache Miss - the resource has to be fetched back to orgin

Cloudfront integrates with aws ACM (certificate manager) to use SSL
Cloudfront integrates with AWS WAF and SHIELD  (web application firewall) to protect against DDoS attacks
Is functional only for dowloading traffic, not uploads. 
==================Distribution V Behaviors================
A lot of the important configuration is stored in behaviors, which are held within distributions. Behaviors work on pattern(path) matches. The default is (*) and there is always 1 behavior for each distribution.
the behavior can dictate which origin applies to which path, and protocol policy, http methods, and Restrict Viewer Access to a behavior. If you select restrict access, trusted key groups are the new way trusted signer is legacy. This means you nead signed cookies or signed urls to gain access. 
Lambda funcitons are at behavior level too

The distribution level sets WAF(product) ACL then associate it with this dist. Here you also configure a CNAME and SSL
=================TTL / Invalidations======================
TTL - Time to Live - how long a resource is cached for. (defalt 24h,  min, max) it is possilbe to specify per object TTL, but if you dont the default attatched to the behavior applies.  
Object specific ttls are in the various headers:
Cache-Control s-maxage(seconds)
Cache-Control-max-age(seconds), no-cache, no-store, must-revalidate
Expires(date and time)

For any of these headers, the minimum TTL and max TTL specified are both limiters to the per object set TTL. So values below the minimum TTL of the behavior will mean that the minimum TTL is used rather than the per object setting. likewise a per object setting that is above max, the max TTL setting is used instead. 

Invalidations - when you change a resource, you need to invalidate the cache so that the new resource is served.
Object Valitity - if you change the object, you need to invalidate the cache, but invalidations cost, so make broader invalidations less often. 

These are settings usable for s3 objects or custom origins. if custom origins, these can be injected by your app or web server. On S3 these are defined in object metadata, which is set via API, command line, or console UI

Cache Invalidations - performed on a distribution, applies to all edge locations, takes a bit of time. Immediately expire any objects regardless of their TTL based on the behavior pattern(path) that you specify. There is a cost to send cache invalidations, it is there for fixing errors basically. Avoidable if using versioned s3. Cloudfront will use the latest object version in a bucket by default
versioned filenames is different than s3 object versioning. Object versioning allows you to have different data(objects) which use the same name. versioning filenames means no objects have the same name - cached independently.
=================CloudFront SSL==============================
Every CF Distribution gets a default domain name (CNAME DNS) something.cloudfront.net and *.cloudfront.net is the ssl default cert

With your own alternate CNAME you have to use a SSL cert that matches the name given to the CF Distribution. Typically this cert is provided by AWS Cert Manager, (ACM) is a regional service so you need add a cert in the same region as the service you use or for a global service like CF, ALWAYS make it us-east-1

A cloudfront connection is of two protocols:
1. The connection between the user and the edge location (Viewer)
2. The connection between the edge location and the origin (Origin)
Both of these connections need valid public certs (and any intermediates in the chain) So, self-sign certs will NOT work with cloudfront

Historically every server needed a seperate IP, and then 2003 Server Name Indication (SNI) was added to TLS HTTP protocol, allows a client to add which domain it is trying to access, before HTTP is even involved, so the server can host more than one site with seperate IPs. This comes for free as part of cloudfront in SNI mode. Otherwise a dedicated ip is needed for each edge location. This costs $600/month per distribution
===================CF Origin Types and Architecture========
CloudFront origins store content distributed via edge locations.
The features available differ based on using S3 origins vs Custom origins.
S3 origins - can be used for static content, dynamic content, or both.
AWS media Store Contianer Endpoints
AWS media package channel endpoints
Custom origins - can be used for dynamic content, but not static content.    default port is 80 for http, 443 for https. 
 any questions about custom ports, configuring origin protocol policy, or min ssl protocol versions, its a custom origin. Custom origins also provide custom headers that can ensure the origin is only reachable through cloudfront
Origin Groups - if you have more than one origin in a region, a group will allow the whole group to be used by a behavior. 
====================ACM Amazon Cert Manager====================
digital cert for Either SSL or TLS tunnel for https to movethrough. 
ACM either generates or imports certs. If generated, they auto renew.
Not may AWS services integrate with ACM, usually only cloudfront, API Gateways, and load balancers. s3 does not use ACM, Not even ec2, because we could always get to them with root access to the OS. 
Certs cannot leave the region they were generated in. So, a load balancer in a region, needs a cert generated or imported in that same region in ACM
if its generated in any other region it will not work with cloudfront. 
Real-Time logs are available with kenesis when setting up an origin
==============CF Security OAI & Custom Origins=========
Security from Origin to Edges 
 the main ways to secure origins from direct access (bypassing CloudFront):

Origin Access identities (OAI) - for S3 Origins
  An OAI is a type of identity that can be associated with a CF distribution, so it can assume that id, so it can be included in bucket policies - typically to deny anything that isnt that cloudfront origin id. Generally its easier to manage, to give one OAI to one distribution. 
  -The new method for this is Origin Access Control(OAC)
Custom Headers - For Custom Origins
  Custom headers are a way to add custom headers to the request that CF makes to the origin. This is useful for custom origins, because you can add a header that is unique to CF, and then use that header in your origin to ensure that the request is coming from CF.
IP Based FW Blocks - For Custom Origins
  You can use IP based FW rules to block access to your origin from any IP that isnt a CF edge location. This is a bit more complex to manage, but it is possible.


==============Lambda@Edge========
Lambda@Edge allows cloudfront to run lambda function at CloudFront edge locations to modify traffic between the viewer and edge location and edge locations and origins.
Currently Only supports Node.js and Python
Only runs in AWS public space (NOT VPC)
Lambda layers are not supported, and not the usual size limits. 
Lambda@Edge is not a replacement for CloudFront functions, which are a different product.
This could be useful for A/B testing - Viewer Request function
or gradually migrating trafic by percentage to a new origin - origin request function
or serving different objects based on req devices - origin request
or serve content based on country - origin request
=======CF private behaviors signed urls and cookies=======
architecture of a private CloudFront distribution (or more specifically making 1 or more behaviors of a distribution private).
Any content distributed in cloudfront is public by default, or private, meaning deny to viewers without signed URLs or cookies. 
CloudFront keys, and TRUSTED SIGNERS are the legacy way. 
-Now recommended method is create trusted key groups and assign those as signers. 
the key groups determine which keys can be used to create signed URLS and cookies. No need to use account root user to manage the keys
-signed URLs provide access to ONE object, and should be used if the client doesnt support cookies.
-signed cookies provide access to multiple or all objects, and if you want to maintian structured custom urls, you should be used if the client supports cookies.
==================CF GeoRestriction==============
There are two common architectures for restricting access to content via CloudFront.

Cloudfront Geo Restriction - 
 Whitelist or Blacklist Countries Only 

3rd party geolocation - Whatever customizations you can implement yourself. 
==================Field-Level Encryption==========
Field-Level encryption allows CloudFront to encrypt certain sensitive data at the edge using a public key, ensuring its protection through all levels of an application stack. Only the corresponding private key can decrypt the data, meaning you have complete control over who has access.
-happens seperately from the HTTPS tunnel, in the edge location using a public key to protect data at all levels on travel through the internet. 

q: does cloudfront cache dynamic content?
a: yes, but it is not recommended. Cloudfront is for static content.

q: To use an ACM cert with CloudFront what region must it be created in?
a: us-east-1

q: What region must certificates be created in when using ACM?
a: the region the service which uses them is in

q: You have a TCP based application which is used globally. You want to improve the network performance for global users. Which service might support this requirement?
a: Global Accelerator

q: what is global accelerator?
a: a service that improves the performance of your applications for global users. It provides static IP addresses that are anycast from 170+ edge locations. This allows users to access your application by using the nearest edge location.

*/