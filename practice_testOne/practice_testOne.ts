/* 
q: Given a value of 10 WCU which of the statements below is correct? (Choose all that apply)
a: 10 WCU is the maximum amount of work that can be done in a second

q: why would you use a FIFO que
a: to ensure that the order of the items is maintained

q: Which of the following is not a valid DynamoDB data type?
a: String

q: why configure the visibility time-out value of 5 seconds
a: to ensure that the message is not processed more than once

Large bills for SQS worker pools - increase RecieveMessagesWaitTimeSeconds. Usually large bills are fro inefficient polling. Short polling pulls only the messages on the queue, long polling is more efficient and less API calls. 
- you have to configure the VisibilityTimeout value to be larger than the processing time. 
- Generally you want to switch to long-polling, or Re-provision the instances using an ASG based on queue length. The idea is to use the length of the SQS queue as a metric to determine the number of instances needed to process the messages in the queue. If the queue length grows, indicating an increase in traffic, the ASG can be used to automatically add more instances to the worker tier to keep up with the increased demand. Conversely, if the queue length decreases, indicating a decrease in traffic, the ASG can be used to remove instances and reduce costs.

By re-provisioning instances based on queue length, you can ensure that the worker tier has the appropriate number of instances to handle the workload and optimize costs. This is an example of using AWS services in an auto-scaling architecture, where the number of instances is dynamically adjusted to meet the demands of the workload.


If you want to limit access to s3 bucket with signed urls and you use cloudfront, you have to have an OAI (Origin Access Identity) for cloudfront and a bucket policy that only allows that identity. 

WAF is desinged to 
- protect web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources, whereas AWS Shield is desined to 
- protect applications from DDoS attacks.

To get cloudwatch agent to work on an ec2 with no internet connectivity you need to give it an instance role and an Interface endpoint in the VPC. Only DDB and s3 use gateway endpoints. Egress only Internet Gateway is only for IPv6.

To pass a query string perameter into api gateway in the url you use Stage Variables. 

The best practice for Cognito and access to s3 is to apply an Identity Policy to the role defined in Cognito, and use variables to control access. 

Eventually consistent is half teh RCU, and an RCU is 4KB and a WCU is 1KB. 

Writes arent stronly or eventually consistent, they are just writes. 

Lambda functions should be added to a target group, and the LoadBalancer should point to the target group. 

The VPC and Application resources hae seperate lifecycles, which means defining them in two stacks, generally speaking. Cross stack references allos you to deploy applications stacks wich reference the VPC stack and allow for many application stacks per VPC stack. 

Serveless App Model (SAM) and E beans use cloudformation under the hood. 

q: what is a CMK in relation to KMS?
a: a customer managed key, can enc/decrypt data up to 4KB

q: what is a DEK in relation to KMS?
a: a data encryption key, no size limit on encryption decryption size

q: what is SSE-C?
a: server side encryption with customer provided key

q: what is SSE-KMS?
a: server side encryption with KMS managed key

q: what is SSE-S3?
a: server side encryption with AWS managed key

To build catagram with web identity federation, each user's images will be on s3. Data from one user should be isolated from another. the best architecture of the ansers is: Create a number of shared DDB Tables and a policy which uses variables to allocate specific items in each table to specific social identities. 

IAM can provide authentication for RDS, but not authorisation. 

If an ecom platform has a big uptick that crashes the dropshipper API - A common design pattern is to decouple two parts of a platform usin an SQS queue. A lambda function can run when items are on the queue and communicate with eh dropshipper API, and the lambda function concurrency should be set to something the API is able to handle. 

To use the same lambda funciton for multiple stages of an API Gateway, use stagevariables. 

Cfn-init downloads CFN metadata and configures an instance. 
Cfn-hup monitors the metadata for changes and can re-run init
Cfn-signal informs CFN when configuration has completed. 

q: The AWS API 'AssumeRole' is used to give a resource access to upload to an s3. 

Configure the method request in API Gateway to:
- include search string perameter
- Require authorization
- Use an IAM role
- Use the 'aws_iam' authorizer

q: a cloudwatch namespace is?
a: a logical grouping of metrics.

the order of priority for credentials with the AWS CLI is as follows:
Command line options: If you specify AWS access keys using command line options, the CLI will use those keys.

Environment variables: The AWS CLI will look for environment variables, such as AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, if they are set.

Configuration files: The CLI will check the configuration files in the following order:

~/.aws/credentials
~/.aws/config
AWS_SHARED_CREDENTIALS_FILE environment variable
AWS_CONFIG_FILE environment variable
Instance profile: If none of the above methods provide the required credentials, the AWS CLI will use the instance profile if it is available.

Note that the AWS CLI will use the first set of credentials it finds, so the order of priority matters.


If  to store files in S3 .. and they need to be encrypted at   rest. You need a solution which matches the FIPS 140-2 Level 3 framework the rest of your organisation works within. Which solution meets this requirement?

the Federal Information Processing Standard (FIPS) 140-2 Level 3 certification requires the use of a hardware security module (HSM) for key management, and AWS Key Management Service (KMS) does not currently meet this requirement. you can use the Amazon CloudHSM service to store and manage your encryption keys in a hardware security module that meets the FIPS 140-2 Level 3 standard. You can use the keys stored in CloudHSM to encrypt and decrypt your data stored in Amazon S3. CloudHSM requires ClientSide Encryption of the s3 (CCE)

For DDB, DAX is a VPC based system so it wouldnt work for serverless architecture. 





*/