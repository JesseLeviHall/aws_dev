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
Geoproximity routing lets Amazon Route 53 route traffic to your resources based on the geographic location of your users and your resources. You can also optionally choose to route more traffic or less to a given resource by specifying a value, known as a bias. A bias expands or shrinks the size of the geographic region from which traffic is routed to a resource.
=================Interoperability=================







*/