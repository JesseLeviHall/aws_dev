/* AWS resources created for a worker environment tier include an Auto Scaling group, one or more Amazon EC2 instances, and an IAM role. For the worker environment tier, Elastic Beanstalk also creates and provisions an Amazon SQS queue if you don’t already have one. When you launch a worker environment tier, Elastic Beanstalk installs the necessary support files for your programming language of choice and a daemon on each EC2 instance in the Auto Scaling group.

The daemon is responsible for pulling requests from an Amazon SQS queue and then sending the data to the web application running in the worker environment tier that will process those messages. If you have multiple instances in your worker environment tier, each instance has its own daemon, but they all read from the same Amazon SQS queue.

You can define periodic tasks in a file named cron.yaml in your source bundle to add jobs to your worker environment’s queue automatically at a regular interval. For example, you can configure and upload a cron.yaml file which creates two periodic tasks: one that runs every 12 hours and a second that runs at 11pm UTC every day.

Hence, using the cron.yaml is the correct configuration file to be used in this scenario.

Dockerrun.aws.json is incorrect because this configuration file is primarily used in multicontainer Docker environments that are hosted in Elastic Beanstalk. This can be used alone or combined with source code and content in a source bundle to create an environment on a Docker platform.

env.yaml is incorrect because this is primarily used to configure the environment name, solution stack, and environment links to use when creating your environment in Elastic Beanstalk.

appspec.ymlis incorrect because this is used to manage each application deployment as a series of lifecycle event hooks in CodeDeploy and not in Elastic Beanstalk.

In Lambda non-proxy (or custom) integration, you can specify how the incoming request data is mapped to the integration request and how the resulting integration response data is mapped to the method response.

There are two types of resharding operations: shard split and shard merge. In a shard split, you divide a single shard into two shards. In a shard merge, you combine two shards into a single shard. Resharding is always pairwise in the sense that you cannot split into more than two shards in a single operation, and you cannot merge more than two shards in a single operation.

Amazon SQS FIFO queues follow exactly-once processing. It introduces a parameter called Message Deduplication ID, which is the token used for deduplication of sent messages. Suppose a message with a particular message deduplication ID is sent successfully. In that case, any messages sent with the same message deduplication ID are accepted successfully but aren’t delivered during the 5-minute deduplication interval.

Databases employ locking mechanisms to ensure that data is always updated to the latest version and is concurrent. There are multiple types of locking strategies that benefit different use cases. Some of these are:

– Optimistic Locking

– Pessimistic Locking

– Overly Optimistic Locking

Optimistic locking is a strategy to ensure that the client-side item that you are updating (or deleting) is the same as the item in DynamoDB. If you use this strategy, then your database writes are protected from being overwritten by the writes of others — and vice-versa

CodeDeploy provides two deployment type options:
In-place deployment: The application on each instance in the deployment group is stopped, the latest application revision is installed, and the new version of the application is started and validated. You can use a load balancer so that each instance is deregistered during its deployment and then restored to service after the deployment is complete. Only deployments that use the EC2/On-Premises compute platform can use in-place deployments. AWS Lambda compute platform deployments cannot use an in-place deployment type.

Blue/green deployment: The behavior of your deployment depends on which compute platform you use:

– Blue/green on an EC2/On-Premises compute platform: The instances in a deployment group (the original environment) are replaced by a different set of instances (the replacement environment). If you use an EC2/On-Premises compute platform, be aware that blue/green deployments work with Amazon EC2 instances only.

– Blue/green on an AWS Lambda compute platform: Traffic is shifted from your current serverless environment to one with your updated Lambda function versions. You can specify Lambda functions that perform validation tests and choose the way in which the traffic shift occurs. All AWS Lambda compute platform deployments are blue/green deployments. For this reason, you do not need to specify a deployment type.

– Blue/green on an Amazon ECS compute platform: Traffic is shifted from the task set with the original version of a containerized application in an Amazon ECS service to a replacement task set in the same service. The protocol and port of a specified load balancer listener are used to reroute production traffic. During deployment, a test listener can be used to serve traffic to the replacement task set while validation tests are run.

To get the number of strong and eventual consistent read requests that your table can accommodate per second, you simply have to do the following steps:

Step #1 Multiply the value of the provisioned RCU by 4 KB

= 10 RCU x 4 KB

= 40

Step #2 To get the number of strong consistency requests, just divide the result of step 1 by 4 KB

= 40 / 4 KB

= 10 strongly consistent read requests

Step #3 To get the number of eventual consistency requests, just divide the result of step 1 by 2 KB

=40 / 2 KB

= 20 eventually consistent read requests

When you create a global secondary index on a provisioned mode table, you must specify read and write capacity units for the expected workload on that index. The provisioned throughput settings of a global secondary index are separate from those of its base table.

To decouple your database instance from your environment, you can run a database instance in Amazon RDS and configure your application to connect to it on launch. This enables you to connect multiple environments to a database, terminate an environment without affecting the database, and perform seamless updates with blue-green deployments.  Elastic Beanstalk will be unable to delete the environment’s security group because the database’s security group is dependent on it.  Before terminating the old Elastic Beanstalk environment, remove its security group rule first before proceeding

You can use the UpdateItem operation to implement an atomic counter — a numeric attribute that is incremented, unconditionally, without interfering with other write requests. (All write requests are applied in the order in which they were received). With an atomic counter, the updates are not idempotent. In other words, the numeric value will increment each time you call UpdateItem.

If It is important that the client and backend interact directly with no intervention from API Gateway after the API method is set up, use HTTP_PROXY to pass as is (witout custom mappings). 

You can configure your Lambda function to pull in additional code and content in the form of layers. A layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package.

A principal (person or application) assumes a role to receive temporary permissions to carry out required tasks and interact with AWS resources. The role can be in your own account or any other AWS account. To assume a role, an application calls the AWS STS AssumeRole API operation and passes the ARN of the role to use.

The GetSessionToken API returns a set of temporary credentials for an AWS account or IAM user. The credentials consist of an access key ID, a secret access key, and a security token. Typically, you use GetSessionToken if you want to use MFA to protect programmatic calls to specific AWS API operations like Amazon EC2 StopInstances. 

Below are the optional subsegment fields:
namespace – aws for AWS SDK calls; remote for other downstream calls.
http – http object with information about an outgoing HTTP call.
aws – aws object with information about the downstream AWS resource that your application called.
error, throttle, fault, and cause – error fields that indicate an error occurred and that include information about the exception that caused the error.
annotations – annotations object with key-value pairs that you want X-Ray to index for search.
metadata – metadata object with any additional data that you want to store in the segment.
subsegments – array of subsegment objects.
precursor_ids – array of subsegment IDs that identify subsegments with the same parent that was completed prior to this subsegment.
You can use the “metadata” field in the segment section to add custom data for your tracing. If you want to trace all the AWS SDK calls of your application, then you can add a subsegment and set the “namespace” field to “AWS”. Alternatively, you can set the “namespace” value to “remote” if you want to trace other downstream calls.
Hence, the valid considerations in this scenario are:
– Set the namespace subsegment field to aws for AWS SDK calls and remote for other downstream calls.
– Set the metadata object with any additional custom data that you want to store in the segment.

Using server-side encryption with customer-provided encryption keys (SSE-C) allows you to set your own encryption keys.  It is important to note that Amazon S3 does not store the encryption key you provide. Instead, it is stored in a randomly salted HMAC value of the encryption key in order to validate future requests. The salted HMAC value cannot be used to derive the value of the encryption key or to decrypt the contents of the encrypted object. That means, if you lose the encryption key, you lose the object.
When you retrieve an object, you must provide the same encryption key as part of your request. Amazon S3 first verifies that the encryption key you provided matches, and then decrypts the object before returning the object data to you.
When using server-side encryption with customer-provided encryption keys (SSE-C), you must provide encryption key information using the following request headers:
x-amz-server-side-encryption-customer-algorithm – This header specifies the encryption algorithm. The header value must be “AES256”.
x-amz-server-side-encryption-customer-key – This header provides the 256-bit, base64-encoded encryption key for Amazon S3 to use to encrypt or decrypt your data.
x-amz-server-side-encryption-customer-key-MD5 – This header provides the base64-encoded 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure the encryption key was transmitted without error.

When you attach a policy to a user or group of users, it allows or denies the users permission to perform the specified tasks on the specified resources. Likewise, Amazon ECS container instances make calls to the Amazon ECS and Amazon EC2 APIs on your behalf, so they need to authenticate with your credentials. This authentication is accomplished by creating an IAM role for your container instances and associating that role with your container instances when you launch them. Hence, the most suitable solution in this scenario is: Create 4 different IAM Roles with the required permissions and attach them to each of the 4 ECS tasks.

The AWS X-Ray daemon is a software application that listens for traffic on UDP port 2000. For ECS containerized apps, the correct steps to properly instrument the application is to create a Docker image that runs the X-Ray daemon, upload it to a Docker image repository, and then deploy it to your Amazon ECS cluster. In addition, you also have to configure the port mappings and network mode settings in your task definition file to allow traffic on UDP port 2000.

If you create a Lambda function to process events from event sources that aren’t poll-based (for example, Lambda can process every event from other sources, like Amazon S3 or API Gateway), each published event is a unit of work, in parallel, up to your account limits. Therefore, the number of invocations these event sources make influences the concurrency.

If you set the concurrent execution limit for a function, the value is deducted from the unreserved concurrency pool. For example, if your account’s concurrent execution limit is 1000 and you have 10 functions, you can specify a limit on one function at 200 and another function at 100. The remaining 700 will be shared among the other 8 functions.

AWS Lambda will keep the unreserved concurrency pool at a minimum of 100 concurrent executions, so that functions that do not have specific limits set can still process requests. So, in practice, if your total account limit is 1000, you are limited to allocating 900 to individual functions.

By default, an AWS account’s concurrent execution limit is 1000 which will be shared by all Lambda functions. In this scenario, it is highly likely that the first function has more provisioned concurrency than the other one. It is possible that the concurrency execution limit of the first function is set to a significantly high value (e.g. 900) and the second function is set to use the unreserved account concurrency which may only contain the last 100 units out of the AWS account’s concurrent execution limit of 1000.
Hence, the correct solutions in this scenario are:
– Set the concurrency execution limit of both functions to 450
– Decrease the concurrency execution limit of the first function.

You can grant your IAM users permission to switch to roles within your AWS account or to roles defined in other AWS accounts that you own. In this way, you don’t need to create individual IAM users in each account and the users don’t have to sign out of one account and sign into another in order to access resources that are in different AWS accounts.
Hence, the most efficient answer in this scenario is to: Grant the developer cross-account access to the resources of Accounts B and C.

If the consumer of the data stream is configured to process the data every other day. Since the default data retention of the Kinesis data stream is only 24 hours, the data from the day before is already lost prior to the scheduled processing. Hence, the root cause of the problem in this scenario is that by default, the data records are only accessible for 24 hours from the time they are added to a Kinesis stream.

If a load balancer or other intermediary forwards a request to your application, X-Ray takes the client IP from the X-Forwarded-For header in the request instead of from the source IP in the IP packet. The client IP that is recorded for a forwarded request can be forged, so it should not be trusted.
Hence, the correct answer in this scenario is that, AWS X-Ray will fetch the client IP address from the X-Forwarded-For header of the request.

X-Ray compiles and processes segment documents to generate queryable trace summaries and full traces that you can access by using the GetTraceSummaries and BatchGetTraces APIs, respectively. In addition to the segments and subsegments that you send to X-Ray, the service uses information in subsegments to generate inferred segments and adds them to the full trace. Inferred segments represent downstream services and resources in the service map.

If you are using a CloudFormation template, you can configure the AWS::Lambda::Function resource which creates a Lambda function. To create a function, you need a deployment package and an execution role. The deployment package contains your function code. The execution role grants the function permission to use AWS services, such as Amazon CloudWatch Logs for log streaming and AWS X-Ray for request tracing. Under the AWS::Lambda::Function resource, you can use the Code property which contains the deployment package for a Lambda function. For all runtimes, you can specify the location of an object in Amazon S3.
For Node.js and Python functions, you can specify the function code inline in the template. Changes to a deployment package in Amazon S3 are not detected automatically during stack updates. To update the function code, change the object key or version in the template.
Hence, including your function source inline in the ZipFile parameter of the AWS::Lambda::Function resource in the CloudFormation template is the easiest way to deploy the Lambda function to AWS.

When you encrypt your data, your data is protected, but you have to protect your encryption key. One strategy is to encrypt it. Envelope encryption is the practice of encrypting plaintext data with a data key and then encrypting the data key under another key.
But, eventually, one key must remain in plaintext so you can decrypt the keys and your data. This top-level plaintext key encryption key is known as the master key.

DynamoDB supports two different kinds of primary keys:
1. Partition key
2. Partition key and sort key
Partition key – A simple primary key, composed of one attribute known as the partition key. DynamoDB uses the partition key’s value as input to an internal hash function. The output from the hash function determines the partition (physical storage internal to DynamoDB) in which the item will be stored. In a table that has only a partition key, no two items can have the same partition key value.
Partition key and sort key – Referred to as a composite primary key, this type of key is composed of two attributes. The first attribute is the partition key, and the second attribute is the sort key. DynamoDB uses the partition key value as input to an internal hash function. The output from the hash function determines the partition (physical storage internal to DynamoDB) in which the item will be stored. All items with the same partition key are stored together, in sorted order by sort key value.

There are two types of Lambda authorizers:
 – A token-based Lambda authorizer (also called a TOKEN authorizer) receives the caller’s identity in a bearer token, such as a JSON Web Token (JWT) or an OAuth token.
 – A request parameter-based Lambda authorizer (also called a REQUEST authorizer) receives the caller’s identity in a combination of headers, query string parameters, stageVariables, and $context variables.
It is possible to use an AWS Lambda function from an AWS account that is different from the one in which you created your Lambda authorizer function by using a Cross-Account Lambda Authorizer. But Cross-Account Lambda Authorizer is incorrect because this just enables you to use an AWS Lambda function from a different AWS account as your API authorizer function. Moreover, this is not a valid Lambda authorizer type.






*/