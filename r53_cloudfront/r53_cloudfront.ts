/* 
An R53 Hosted zone is defined as a collection (globally resilient DB) of DNS records that are hosted by Amazon Route 53. A hosted zone is a container for resource record sets that have the same DNS name suffix, such as example.com. You can use a hosted zone to define record sets for the same DNS name in multiple environments, such as test.example.com and prod.example.com. You can also use a hosted zone to define record sets for subdomains, such as www.example.com and store.example.com. You can create a maximum of 100 hosted zones that have the same name and that you own. You can create a maximum of 100 resource record sets that have the same combination of DNS name and type in a hosted zone.

==================R53 Public Hosted Zones================
A public hosted zone is a container that holds information about how you want to route traffic on the internet for a specific domain which is accessible from the public internet
=========================================================


==================R53 Private Hosted Zones================
This script will create a private hosted zone in Route53
and associate it with a VPC.
=========================================================

==================R53 Alias Records================
This script will create an alias record in Route53
and associate it with a CloudFront distribution.
=========================================================

==================R53 CNAME Records================
This script will create a CNAME record in Route53
and associate it with a CloudFront distribution.
=========================================================




*/