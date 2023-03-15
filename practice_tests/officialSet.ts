/* 

The function needs permission to call CloudWatch Logs. Update the execution role to grant the permission. You can use the managed policy of AWSLambdaBasicExecutionRole.

Each time a developer publishes a new version of an AWS Lambda function, all the dependent event source mappings need to be updated with the reference to the new version’s Amazon Resource Name (ARN). These updates are time consuming and error-prone.

Which combination of actions should the developer take to avoid performing these updates when publishing a new Lambda version? (Select TWO.)
POint a Lambda alias to a new version of the Lambda function.( A Lambda alias is a pointer to a specific Lambda function version.)
Update the event source mappings with the lambda alias ARN. ( Instead of using ARNs for the Lambda function in event source mappings, you can use an alias ARN. You do not need to update your event source mappings when you promote a new version or roll back to a previous version.)
=================
A company is working on a project to enhance its serverless application development process. The company hosts applications on AWS Lambda. The development team regularly updates the Lambda code and wants to use stable code in production.

Which combination of steps should the development team take to configure Lambda functions to meet both development and production requirements? (Select TWO.)
Create a new lambda version every time a new code release needs testing
( Lambda function versions are designed to manage deployment of functions. They can be used for code changes, without affecting the stable production version of the code.)
create two lambda aliases, name one prod and one dev, point prod alias to Unqualified prod ARN, point the dev alias to the $LATEST version. (By creating separate aliases for Production and Development, systems can initiate the correct alias as needed. A Lambda function alias can be used to point to a specific Lambda function version. Using the functionality to update an alias and its linked version, the development team can update the required version as needed. The $LATEST version is the newest published version.)
====================
A developer built an application that stores data in an Amazon RDS Multi-AZ DB instance. The database performs reads and writes constantly and is responding slowly. The intensive read requests are received unpredictably several times each hour. The application cannot tolerate reading stale data. The developer must increase the retrieval speed for the intensive read requests.

Which strategy will meet these requirements?
Use an ElastiCache cluster with a writethrough stragtegy. config the app to direct the intensive read ops to elasticache. An ElastiCache cluster with a write-through strategy will allow for the read requests to be redirected to ElastiCache efficiently. The strategy will allow for the most up-to-date data to be retrieved.
===========================
An ecommerce company deploys more than 20 services behind Amazon API Gateway. The interaction between services is complex. Each service can potentially call several others, making performance issues and errors difficult to identify. Some individual API calls have experienced slow response times. The development team needs to quickly identify the underlying causes of the slowdowns.

Which approach would MOST quickly identify the underlying cause of performance issues?
configure and use x-ray to fine the service invocations with slow response times. use cloudwatch metrics and logs to examine these services to discover their perfomance issues. ( Unlike metrics or logs, X-Ray can help users quickly identify services by their relative response times. X-Ray can identify a poorly performing service from within a web of interacting services. Once identified, CloudWatch provides the context, including the logs and metrics necessary to study specific issues.)

==========================
A developer tests code running on the developer's laptop. The code is using the AWS SDK for Python (Boto3) to access AWS services. The .aws/credentials file is set up with the user's IAM user name and password. The developer runs the code and receives this error message:

An error occurred (InvalidAccessKeyId)

Which action will resolve this error?
Replace the IAM user name and password with an access key id and secret access key. (AWS software development kits (SDKs) require an access key ID and a secret access key to make programmatic calls to AWS. An IAM user name and password are used for AWS Management Console access.)
=============================
A developer uses the AWS SDK for C++ to retrieve data from an Amazon DynamoDB table. The data is sometimes retrieved using a known key, and sometimes the key is not known, resulting in multiple items being returned. The developer wants to ensure the code returns only one item when retrieving data without keys.

Which DynamoDB setting will meet these requirements?
Set the scan limit parameter to 1. (Set the limit parameter to 1 to set the maximum number of items that need to be retrieved with a DynamoDB scan operation.)
=======================
A company is developing a Python application that submits data to an Amazon DynamoDB table. The company requires client-side encryption of specific data items and end-to-end protection for the encrypted data in transit and at rest.

Which combination of steps will meet the requirement to encrypt specific data items? (Select TWO.)
Generate symmetric encryption keys with aws kms. (When you configure the DynamoDB Encryption Client to use AWS KMS, the DynamoDB Encryption Client uses a KMS key that is always encrypted when the key is used outside of AWS KMS. This cryptographic materials provider returns a unique encryption key and a signing key for every table item. This method of encryption uses a symmetric KMS key.)
Use generated keys with the DDB encryption Client. (The DynamoDB Encryption Client provides end-to-end protection for your data in transit and at rest. You can encrypt selected items or attribute values in a table.)
=======================
A company hosts its web application backend on Amazon Elastic Container Service (Amazon ECS). The application's Amazon ECS tasks run behind an Application Load Balancer (ALB). The application supports three environments: production, testing, and development. The application uses the ALB to route traffic to the correct environment.

The company has configured three listener rules for the ALB to forward traffic to a different target group based on the port number (Port 80 for production target group, Port 8080 for testing target group, and Port 8081 for development target group).

The company decides to migrate the application backend to a serverless architecture by using an Amazon API Gateway API backed by AWS Lambda functions. The company plans to use the URI path pattern to access the desired environment instead of the port number. The company has created the Lambda functions for the application backend. Each Lambda function has three aliases (production, testing, and development).

Which option includes the next steps the company must take to complete the process?

Create an API Gateway API, config the route to proxy integrateion, target the lamda function ARN with the expression ${stageVariables.LambdaAlias}. modify the lambda resource-based policy by adding hte permission lambda:InvodeFunction. Create prod, test, and dev stages, add the LamdaAlias stage variable to the corresponding stage. 

To add "stageVariable" to the Lambda ARN, you should use the following format: ${stageVariable.stageVariableName}.

To add "stageVariable" to the Lambda ARN, you do not use the Lambda alias name. You should use the following format: ${stageVariable.stageVariableName}.
==================
When you configure the DynamoDB Encryption Client to use AWS KMS, the DynamoDB Encryption Client uses a KMS key that is always encrypted when the key is used outside of AWS KMS. This cryptographic materials provider returns a unique encryption key and a signing key for every table item. This method of encryption would require a symmetric KMS key, not an asymmetric key.

=======Sample questions==============
A developer is creating a web application that must give users the ability to post comments and receive feedback in near real time.
Which solutions will meet these requirements? (Select TWO.)

A, B – AWS AppSync simplifies application development by giving you the ability to create a flexible API to securely access, manipulate, and combine data from one or more data sources. AWS AppSync is a managed service that uses GraphQL to help applications get the exact data that they need. You can use AWS AppSync to build scalable applications that require real-time updates on a range of data sources, including Amazon DynamoDB.
In Amazon API Gateway, you can create a WebSocket API as a stateful frontend for an AWS service (such as AWS Lambda or DynamoDB) or for an HTTP endpoint. The WebSocket API invokes the backend based on the content of the messages that the API receives from client applications. Unlike a REST API, which receives and responds to requests, a WebSocket API supports two-way communication between client applications and the backend.
====================
A developer is adding sign-up and sign-in functionality to an application. The application must make an API call to a custom analytics solution to log user sign-in events.
Which combination of actions should the developer perform to meet these requirements? (Select TWO.)
A, E – Amazon Cognito adds user sign-up, sign-in, and access control to web and mobile applications. You can also create an AWS Lambda function to make an API call to a custom analytics solution and then invoke that function by using an Amazon Cognito post authentication trigger.
======================
4) A company is using Amazon API Gateway for its REST APIs in an AWS account. A developer wants to allow only IAM users from another AWS accounts to access the APIs.
Which combination of steps should the developer take to meet these requirements? (Select TWO.)
A, D – A resource policy can grant API access in one AWS account to users in a different AWS account by using Signature Version 4 (SigV4) protocols.
A) Create an IAM permission policy. Attach the policy to each IAM user. Set the method authorization type for the APIs to AWS_IAM. Use Signature Version 4 to sign the API requests.
D) Create a resource policy for the APIs to allow access for each IAM user only.
===============================
The new application must read the files as they arrive in Amazon S3 and must convert the files to .pdf files by using an AWS Lambda function. The developer has written an IAM policy to allow access to Amazon S3 and Amazon CloudWatch Logs.
What should the developer do to ensure that the Lambda function has the correct permissions?
A) Create a Lambda execution role by using AWS Identity and Access Management (IAM). Attach the IAM policy to the role. Assign the Lambda execution role to the Lambda function.
A – An AWS Lambda function's execution role grants the Lambda function permission to access AWS services and resources. You provide this role when you create a function, and Lambda assumes the role when a function is invoked.
===============================
A developer is working on an application that stores highly confidential data in a database. The developer must use AWS Key Management Service (AWS KMS) with envelope encryption to protect the data.
D) Encrypt the data by using a generated data key. Store the encrypted data and the encrypted data key in
the database.
===============================
7) A developer is adding Amazon ElastiCache for Memcached to a company's existing record storage application. The developer has decided to use lazy loading based on an analysis of common record handling patterns.
Which pseudocode example will correctly implement lazy loading?
B – Lazy loading is a caching strategy in which a record does not load until the record is needed. When you implement lazy loading, the application first checks the cache for a record. If the record is not present, the application retrieves the record from the database and stores the record in the cache.
===============================
8) A developer is building a web application that uses Amazon API Gateway. The developer wants to maintain different environments for development (dev) and production (prod) workloads. The API will be backed by an AWS Lambda function with two aliases: one for dev and one for prod.
How can the developer maintain these environments with the LEAST amount of configuration?
B – With deployment stages in Amazon API Gateway, you can manage multiple release stages for each API. You can configure stage variables so that an API deployment stage can interact with different backend endpoints. You can use API Gateway stage variables to reference a single AWS Lambda function with multiple versions and aliases.
B) Create one REST API. Integrate the API with the Lambda function by using a stage variable in place of an alias. Deploy the API to two different stages: dev and prod. Create a stage variable in each stage with different aliases as the values. Access the API by using the different stage URLs.
===============================
9) A developer wants to track the performance of an application that runs on a fleet of Amazon EC2 instances. The developer wants to view and track statistics, such as the average request latency and the maximum request latency, across the fleet. The developer wants to receive immediate notification if the average response time exceeds a threshold.
Which solution will meet these requirements?
C) Configure the application to write the response times to a log file. Install and configure the Amazon CloudWatch agent on the EC2 instances to stream the application log to CloudWatch Logs. Create a metric filter of the response time from the log. View the metrics graphs in the CloudWatch console. Create a CloudWatch alarm to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold.
===============================
When the developer tests the application remotely, the Lambda function does not run because of missing dependencies.
Which solution will resolve this issue?
D) Create a layer that contains the missing dependencies. Attach the layer to the Lambda function.

















*/