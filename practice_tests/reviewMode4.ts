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

If your identity store is not compatible with SAML 2.0, then you can build a custom identity broker application to perform a similar function. The broker application authenticates users, requests temporary credentials for users from AWS, and then provides them to the user to access AWS resources. To get temporary security credentials, the identity broker application calls either AssumeRole or GetFederationToken to obtain temporary security credentials, depending on how you want to manage the policies for users

1 RCU can do 1 strongly consistent read or 2 eventually consistent reads for an item up to 4KB.
To get the RCU with strongly consistent reads, do the following steps:
Step #1 Divide the average item size by 4 KB. Round up the result
Average Item Size = 17 KB
= 17KB/4KB
= 4.25 ≈ 5
Step #2 Multiply the number of reads per second by the resulting value from Step 1. (Divide the product by 2 for eventually consistent reads)
= 320 reads per second x 5
= 1,600 strongly consistent read requests
Hence, the correct answer is to set the provisioned RCU to 1600

Enhanced Monitoring metrics are useful when you want to see how different processes or threads on a DB instance use the CPU.
Hence, the correct answer is to use Enhanced Monitoring in RDS.

Random places tasks on instances at random yet still honors the other constraints that you specified, implicitly or explicitly. Specifically, it still makes sure that tasks are scheduled on instances with enough resources to run them.
Hence, the correct answer is to use a random task placement strategy for this scenario.

You might use manual approvals for these reasons:
– You want someone to perform a code review or change management review before a revision is allowed into the next stage of a pipeline.
– You want someone to perform manual quality assurance testing on the latest version of an application, or to confirm the integrity of a build artifact, before it is released.
– You want someone to review new or updated text before it is published to a company website.
When you create a topic, it is recommended that you give it a name that will identify its purpose, in formats such as tutorialsdojoManualApprovalPHL-us-east-2-approval.
Hence, the correct answer is to Implement a manual approval actions configuration in CodePipeline. Send the approval request to an SNS Topic. 

the valid considerations in improving the performance of Lambda functions are:
– An increase in memory size triggers an equivalent increase in CPU available to your function.
– The concurrent execution limit is enforced against the sum of the concurrent executions of all functions.

AWS Step Functions provides serverless orchestration for modern applications. Orchestration centrally manages a workflow by breaking it into multiple steps, adding flow logic, and tracking the inputs and outputs between the steps. 

Basic – Data is available automatically in 5-minute periods at no charge.
Detailed – Data is available in 1-minute periods for an additional cost. To get this level of data, you must specifically enable it for the instance. For the instances where you’ve enabled detailed monitoring, you can also get aggregated data across groups of similar instances.

After you develop and test your serverless application locally, you can deploy your application by using the sam package and sam deploy commands.

It is recommended that you use the following pattern to encrypt data locally in your application:
1. Use the GenerateDataKey operation to get a data encryption key.
2. Use the plaintext data key (returned in the Plaintext field of the response) to encrypt data locally, then erase the plaintext data key from memory.
3. Store the encrypted data key (returned in the CiphertextBlob field of the response) alongside the locally encrypted data.
Hence, the valid steps in this scenario are the following:
– Use the GenerateDataKey operation to get a data encryption key then use the plaintext data key in the response to encrypt data locally.
– Erase the plaintext data key from memory and store the encrypted data key alongside the locally encrypted data.

Imagine that you have an IAM user for working in the development environment and you occasionally need to work with the production environment at the command line with the AWS CLI. You already have an access key credential set available to you. This can be the access key pair that is assigned to your standard IAM user. Or, if you signed in as a federated user, it can be the access key pair for the role that was initially assigned to you. If your current permissions grant you the ability to assume a specific IAM role, then you can identify that role in a “profile” in the AWS CLI configuration files. That command is then run with the permissions of the specified IAM role, not the original identity.
Note that when you specify that profile in an AWS CLI command, you are using the new role. In this situation, you cannot make use of your original permissions in the development account at the same time. The reason is that only one set of permissions can be in effect at a time.
Hence, the correct answer is to create a new profile for the role in the AWS CLI configuration file then append the --profile parameter, along with the new profile name, whenever you run the CLI command.

With adaptive authentication, you can configure your user pool to require second-factor authentication in response to an increased risk level.
Hence, the correct answer in this scenario is to integrate multi-factor authentication (MFA) to a user pool in Cognito to protect the identity of your users.

You can use markers to record events in the workflow execution history for application specific purposes. Markers are useful when you want to record custom information to help implement decider logic. For example, you could use a marker to count the number of loops in a recursive workflow.
Using Signals is incorrect because it just enables you to inject information into a running workflow execution. Take note that in this scenario, you are required to record information in the workflow history of a workflow execution.
Using Timers is incorrect because it just enables you to notify your decider when a certain amount of time has elapsed and does not meet the requirement in this scenario.
Likewise, using Tags is incorrect because it just enables you to filter the listing of the executions when you use the visibility operations, which once again does not meet the requirement in this scenario.

You can send trace data to X-Ray in the form of segment documents.
Using AWS X-Ray SDK to upload a trace segment by executing PutTraceSegments API is incorrect because you should upload the segment documents with subsegments instead. A trace segment is just a JSON representation of a request that your application serves.

To upload data to X-Ray, the X-Ray daemon requires IAM permissions in the AWSXRayDaemonWriteAccess managed policy. These permissions are included in the Elastic Beanstalk instance profile.

The AWS X-Ray daemon is a software application that listens for traffic on UDP port 2000, gathers raw segment data, and relays it to the AWS X-Ray API.
Hence, the most suitable way to instrument your application is to use a user data script to install the X-Ray daemon.

To enable transparent data encryption for an RDS SQL Server DB instance, specify the TDE option in an RDS option group that is associated with that DB instance.

consider when using a global secondary index:
 – Queries or scans on this index consume capacity units from the index, not from the base table.
 – Queries on this index support eventual consistency only.

The AWSLambdaDynamoDBExecutionRole managed policy already includes these permissions.
Hence, the correct answers are:
– Create an event source mapping in Lambda to send records from your stream to a Lambda function.
– Select AWSLambdaDynamoDBExecutionRole managed policy as the function’s execution role.


*/