/* 
A local secondary index maintains an alternate sort key for a given partition key value. A local secondary index also contains a copy of some or all of the attributes from its base table;
Strongly consistent reads are not supported on global secondary indexes.

Minimum capacity and maximum capacity are both incorrect because these are the limits that you set for Auto Scaling actions, not for Manual scaling.

AWS WAF lets you choose one of the following behaviors:
Allow all requests except the ones that you specify – This is useful when you want CloudFront or an Application Load Balancer to serve content for a public website, but you also want to block requests from attackers.
Block all requests except the ones that you specify – This is useful when you want to serve content for a restricted website whose users are readily identifiable by properties in web requests, such as the IP addresses that they use to browse to the website.
Count the requests that match the properties that you specify – When you want to allow or block requests based on new properties in web requests, you first can configure AWS WAF to count the requests that match those properties without allowing or blocking those requests. This lets you confirm that you didn’t accidentally configure AWS WAF to block all the traffic to your website. When you’re confident that you specified the correct properties, you can change the behavior to allow or block requests.
Hence, the correct answer in this scenario is AWS WAF.
Amazon Guard​Duty is incorrect because this is just a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads.
AWS Firewall Manager is incorrect because this just simplifies your AWS WAF and AWS Shield Advanced administration and maintenance tasks across multiple accounts and resources.
Network Access Control List is incorrect because this is an optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets.

Including the core logic in the Lambda handler is incorrect because you have to separate the Lambda handler (entry point) from your core logic instead.

cfn-init: Use to retrieve and interpret resource metadata, install packages, create files, and start services.
cfn-signal: Use to signal with a CreationPolicy or WaitCondition, so you can synchronize other resources in the stack when the prerequisite resource or application is ready.
cfn-get-metadata: Use to retrieve metadata for a resource or path to a specific key.
cfn-hup: Use to check for updates to metadata and execute custom hooks when changes are detected.



*/