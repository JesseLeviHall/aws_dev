/* 
All data in DynamoDB Streams is subject to a 24 hour lifetime. You can retrieve and analyze the last 24 hours of activity for any given table; however, data older than 24 hours is susceptible to trimming (removal) at any moment.
If you disable a stream on a table, the data in the stream will continue to be readable for 24 hours. 

The following are the Gateway response types which are associated with the HTTP 504 error in API Gateway:
INTEGRATION_FAILURE – The gateway response for an integration failed error. If the response type is unspecified, this response defaults to the DEFAULT_5XX type.
INTEGRATION_TIMEOUT – The gateway response for an integration timed out error. If the response type is unspecified, this response defaults to the DEFAULT_5XX type.
For the integration timeout, the range is from 50 milliseconds to 29 seconds for all integration types, including Lambda, Lambda proxy, HTTP, HTTP proxy, and AWS integrations.
In this scenario, there is an issue where the users are getting HTTP 504 errors in the serverless application. This means the Lambda function is working fine at times but there are instances when it throws an error. Based on this analysis, the most likely cause of the issue is the INTEGRATION_TIMEOUT error since you will only get an INTEGRATION_FAILURE error if your AWS Lambda integration does not work at all in the first place.
Hence, the root cause of this issue is that the underlying Lambda function has been running for more than 29 seconds causing the API Gateway request to time out.

AWS CodeStar makes it easy to centrally monitor application activity and manage day-to-day development tasks such as recent code commits, builds, and deployments. Because AWS CodeStar integrates with Atlassian JIRA, a third-party issue tracking, and project management tool, you can create and manage JIRA issues in the AWS CodeStar dashboard.

You should consider using AWS CloudHSM instead of AWS KMS if you require:
– Keys stored in dedicated, third-party validated hardware security modules under your exclusive control.
– FIPS 140-2 compliance.
– Integration with applications using PKCS#11, Java JCE, or Microsoft CNG interfaces.
– High-performance in-VPC cryptographic acceleration (bulk crypto).
Hence, the correct answer is to import the encryption keys from your on-premises key management service to AWS CloudHSM.

To upload an object to the S3 bucket which uses SSE-KMS, you have to send a request with an x-amz-server-side-encryption header with the value of aws:kms. There’s also an optional x-amz-server-side-encryption-aws-kms-key-id

It is recommended that you use the following pattern to encrypt data locally in your application:
1. Use the GenerateDataKey operation to get a data encryption key.
2. Use the plaintext data key (returned in the Plaintext field of the response) to encrypt data locally, then erase the plaintext data key from memory.
3. Store the encrypted data key (returned in the CiphertextBlob field of the response) alongside the locally encrypted data.
To decrypt data locally:
1. Use the Decrypt operation to decrypt the encrypted data key. The operation returns a plaintext copy of the data key.
2. Use the plaintext data key to decrypt data locally, then erase the plaintext data key from memory.

Another best practice they recommend is to delete root user access keys. You use an access key (an access key ID and secret access key) to make programmatic requests to AWS. However, the access key for your AWS account root user gives full access to all your resources for all AWS services, including your billing information. You cannot reduce the permissions associated with your AWS account root user access key. This is a common security concern that should be handled appropriately.
You should not use the root account for managing any resource. Create an IAM user with the necessary permissions instead to perform these tasks.
One recommended best practice is to use IAM roles when delegating permissions to users. 
– Grant only the permissions required by the resource to perform a task
– Delete root user access keys

In this scenario, we can expose the API endpoint to other stacks by adding the Export property in the Outputs section. In the example below, we use ‘SimpleAPI’ as the name of the value to be exported:
To reference the endpoint’s value in other templates, simply use the Fn::ImportValue function and specify SimpleAPI as its parameter.

in the given scenario, you can use Lambda@Edge to allow your Lambda functions to customize the content that CloudFront delivers and to execute the authentication process in AWS locations closer to the users. In addition, you can set up an origin failover by creating an origin group with two origins with one as the primary origin and the other as the second origin, which CloudFront automatically switches to when the primary origin fails. This will alleviate the occasional HTTP 504 errors that users are experiencing.

There are three options for retrieving data archived to AWS Glacier with varying access times and cost:
– Standard retrievals allow you to access any of your archives within several hours. Standard retrievals typically complete within 3–5 hours. This is the default option.  the correct answer is to use Standard Retrieval, 
– Bulk retrievals are Glacier’s lowest-cost retrieval option, which you can use to retrieve large amounts, even petabytes, of data inexpensively in a day. Bulk retrievals typically complete within 5–12 hours.
– Expedited retrievals allow you to quickly access your data when occasional urgent requests for a subset of archives are required. Expedited retrievals are typically made available within 1–5 minutes.

CacheMissCount tracks the number of requests served from the backend in a given period, when API caching is enabled. On the other hand, CacheHitCount track the number of requests served from the API cache in a given period.

To configure deduplication, you must do one of the following:
– Enable content-based deduplication. This instructs Amazon SQS to use a SHA-256 hash to generate the message deduplication ID using the body of the message – but not the attributes of the message.
– Explicitly provide the message deduplication ID (or view the sequence number) for the message.

To speed up queries on non-key attributes, you can create a global secondary index. A global secondary index contains a selection of attributes from the base table, but they are organized by a primary key that is different from that of the table. 
Local secondary is used for queries which use the same partition key value and in addition, you can’t add this index to an already existing table. A local secondary index has the same partition key as the base table, but has a different sort key. It is “local” in the sense that every partition of a local secondary index is scoped to a base table partition that has the same partition key value.

If you got your certificate from a third-party CA, import the certificate into ACM or upload it to the IAM certificate store.

For Lambda functions that process Kinesis or DynamoDB streams, the number of shards is the unit of concurrency. If your stream has 100 active shards, there will be at most 100 Lambda function invocations running concurrently. This is because Lambda processes each shard’s events in sequence
Remember that the Kinesis and Lambda integration is using a poll-based (not push based) event source, which means that the number of shards is the unit of concurrency for the function.

Dynamo DB adaptive capacity can’t solve larger issues with your table or partition design. To avoid hot partitions and throttling, optimize your table and partition structure.
consider one or more of the following solutions:
– Increase the amount of read or write capacity for your table to anticipate short-term spikes or bursts in read or write operations. If you decide later you don’t need the additional capacity, decrease it. Take note that Before deciding on how much to increase read or write capacity, consider the best practices in designing your partition keys.
– Implement error retries and exponential backoff. This technique uses progressively longer waits between retries for consecutive error responses to help improve an application’s reliability. If you’re using an AWS SDK, this logic is built‑in. If you’re using another SDK, consider implementing it manually.
– Distribute your read operations and write operations as evenly as possible across your table. A “hot” partition can degrade the overall performance of your table.
– Implement a caching solution, such as DynamoDB Accelerator (DAX) or Amazon ElastiCache. DAX is a DynamoDB-compatible caching service that offers fast in‑memory performance for your application. If your workload is mostly read access to static data, query results can often be served more quickly from a well‑designed cache than from a database.

One read request unit represents one strongly consistent read request, or two eventually consistent read requests, for an item up to 4 KB in size. Transactional read requests require 2 read request units to perform one read for items up to 4 KB.
To get the number of RCU required to handle 150 eventually consistent read requests with an average item size of 3.5 KB, you simply have to do the following steps:

Step #1 Get the Average Item Size by rounding up to 4 KB

= 3.5 KB = 4 KB (rounded up)

Step #2 Get the RCU per Item by dividing the Average Item Size by 8 KB

= 4 KB / 8 KB

= 0.5 

Step #3 Multiply the RCU per item to the number of items to be written per second

= 150 x 0.5 

= 75 eventually consistent read requests

Hence, the correct answer is 75.


Cross-region replication (CRR) enables automatic, asynchronous copying of objects across buckets in different AWS Regions.
– The source and destination buckets must have versioning enabled.
– The source and destination buckets must be in different AWS Regions.
– Amazon S3 must have permissions to replicate objects from that source bucket to the destination bucket on your behalf.

The Lambda proxy integration type (AWS_PROXY) lets an API method be integrated with the Lambda function invocation action with a flexible, versatile, and streamlined integration setup. This integration relies on direct interactions between the client and the integrated Lambda function. With this type of integration, also known as the Lambda proxy integration, you do not set the integration request or the integration response. API Gateway passes the incoming request from the client as the input to the backend Lambda function.
For an AWS service action, you have the AWS integration of the non-proxy type only. 

AWS CloudTrail increases visibility of AWS Management Console actions and API calls. You can identify which users and accounts called AWS, the source IP address from which the calls were made, and when the calls occurred. Hence, this is the correct service to use in this scenario.

Cluster queries are expressions that enable you to group objects. For example, you can group container instances by attributes such as Availability Zone, instance type, or custom metadata. You can add custom metadata to your container instances, known as attributes. Each attribute has a name and an optional string value. You can use the built-in attributes provided by Amazon ECS or define custom attributes.

create a new layer which contains the Custom Runtime for C++ and then launch a Lambda function which uses that runtime.

Consider a producer that experiences a network-related timeout after it makes a call to PutRecord, but before it can receive an acknowledgement from Amazon Kinesis Data Streams. The producer cannot be sure if the record was delivered to Kinesis Data Streams. Assuming that every record is important to the application, the producer would have been written to retry the call with the same data. If both PutRecord calls on that same data were successfully committed to Kinesis Data Streams, then there will be two Kinesis Data Streams records. Although the two records have identical data, they also have unique sequence numbers. Applications that need strict guarantees should embed a primary key within the record to remove duplicates later when processing.

Parameters stored in Systems Manager are mutable. Any time you use a template containing Systems Manager parameters to create/update your stacks, CloudFormation uses the values for these Systems Manager parameters at the time of the create/update operation. So, as parameters are updated in Systems Manager, you can have the new value of the parameter take effect by just executing a stack update operation. The Parameters section in the output for Describe API will show an additional ‘ResolvedValue’ field that contains the resolved value of the Systems Manager parameter that was used for the last stack operation.
Hence, the correct answer is to set up CloudFormation with Systems Manager Parameter Store to retrieve the latest AMI IDs for your template and whenever you decide to update the EC2 instances, call the update-stack API in CloudFormation in your CloudFormation template. 

If an EBS volume is the root device of an instance, you must stop the instance before you can detach the volume.

For serverless applications (also referred to as Lambda-based applications), the Transform section specifies the version of the AWS Serverless Application Model (AWS SAM) to use.

CloudWatch does not monitor the memory, swap, and disk space utilization of your instances. If you need to track these metrics, you can install a CloudWatch agent in your EC2 instances.

Amazon Cognito automatically tracks the association between identity and devices. Using the push synchronization, or push sync, feature, you can ensure that every instance of a given identity is notified when identity data changes. Push sync ensures that, whenever the sync store data changes for a particular identity, all devices associated with that identity receive a silent push notification informing them of the change.

Then to determine the write capacity unite per item, you need to divide the item size of the operation by 1 KB. Once you got the value, you just simply have to multiply it with the number of write request per second (1 x 100) hence, the WCU that you should provision is 100.

With HTTPS connections and Git credentials, you generate a static user name and password in IAM. You then use these credentials with Git and any third-party tool that supports Git user name and password authentication. This method is supported by most IDEs and development tools. It is the simplest and easiest connection method to use with CodeCommit.
With SSH connections, you create public and private key files on your local machine that Git and CodeCommit use for SSH authentication. You associate the public key with your IAM user, and you store the private key on your local machine.
Hence, you have to generate HTTPS Git credentials and generate new SSH keys and associate the public SSH key to each of your developer’s IAM user to properly grant your developers with CodeCommit access.

To perform a multipart upload with encryption using an AWS Key Management Service (AWS KMS) customer master key (CMK), the requester must have permission to the kms:Decrypt and kms:GenerateDataKey* actions on the key. These permissions are required because Amazon S3 must decrypt and read data from the encrypted file parts before it completes the multipart upload.
Hence, the correct answers in this scenario are:
– The AWS CLI S3 commands perform a multipart upload when the file is large.
– The developer does not have the kms:Decrypt permission

Below are some of the CORSRule elements:
MaxAgeSeconds  – Specifies the amount of time in seconds (in this example, 3000) that the browser caches an Amazon S3 response to a preflight OPTIONS request for the specified resource. By caching the response, the browser does not have to send preflight requests to Amazon S3 if the original request will be repeated.

ExposeHeader  – Identifies the response headers (in this example, x-amz-server-side-encryption, x-amz-request-id, and x-amz-id-2) that customers are able to access from their applications (for example, from a JavaScript XMLHttpRequest object).

Hence, the correct answers in this scenario are:
– It allows a user to view, add, remove or update objects inside the S3 bucket from the domain tutorialsdojo.com
– This will cause the browser to cache an Amazon S3 response of a preflight OPTIONS request for 1 hour

Elastic Beanstalk is ideal if you want to leverage the benefits of containers but just want the simplicity of deploying applications from development to production by uploading a container image. You can work with Amazon ECS directly if you want more fine-grained control for custom application architectures.

Hence, the correct answer in this scenario is ECS.

Elastic Beanstalk is incorrect because although it can be used to host Docker applications, it is more ideal to be used if you want the simplicity of deploying applications from development to production by uploading a container image. It does not provide fine-grained control for custom application architectures unlike ECS.

AWS Lambda directs events that cannot be processed to the specified Amazon SNS topic or Amazon SQS queue. Functions that don’t specify a DLQ will discard events after they have exhausted their retries.

Hence, the correct answer is to specify the Amazon Resource Name of the SQS Queue in the Lambda function’s DeadLetterConfig parameter.

 Your sign-in page URL has the following format, by default:
https://Your_AWS_Account_ID.signin.aws.amazon.com/console/
If you create an AWS account alias for your AWS account ID, your sign-in page URL looks like the following example.
https://Your_Alias.signin.aws.amazon.com/console/

===================round two================

Cluster queries are expressions that enable you to group objects. For example, you can group container instances by attributes such as Availability Zone, instance type, or custom metadata. You can add custom metadata to your container instances, known as attributes.
the correct ECS feature which provides you with expressions that you can use to group container instances by a specific attribute is Cluster Query Language.

 4 shards : 8 instances ratio is incorrect because launching more instances than the number of open shards will not improve the processing of the stream as it is only useful for failure standby purposes.

take note that CloudWatch does not monitor the memory, swap, and disk space utilization of your instances. If you need to track these metrics, you can install a CloudWatch agent in your EC2 instances.

the developer must perform end-to-end (E2E) testing using Cypress.
Which combination of actions should the developer take? (Select Two)
Connect the Github repository to AWS Amplify Hosting
Update the amplify.yml file with appropriate configuration settings for Cypress.
AWS Amplify is a set of purpose-built tools and features that enables frontend web and mobile developers to quickly and easily build full-stack applications on AWS.
Amplify provides two services:
-Amplify Hosting – provides a git-based workflow for hosting full-stack serverless web apps with continuous deployment.
-Amplify Studio – a visual development environment that simplifies the creation of scalable, full-stack web and mobile apps. Use can use Amplify Studio to build your frontend UI with a set of ready-to-use UI components, create an app backend with AWS resources, and then connect the two together.
Amplify Hosting provides deep integration with Cypress for End-to-End (E2E) testing, allowing developers to generate a UI report for their tests. To add Cypress tests to your application, you can update the build settings in the amplify.yml configuration file, which will enable Amplify to run the tests during the build process.

Transactions provide atomicity, consistency, isolation, and durability (ACID) in DynamoDB

To decrypt data locally:
1. Use the Decrypt operation to decrypt the encrypted data key. The operation returns a plaintext copy of the data key.
2. Use the plaintext data key to decrypt data locally, then erase the plaintext data key from memory.

Any mention of real-time, go with kinesis. 

*/