/* 

The function needs permission to call CloudWatch Logs. Update the execution role to grant the permission. You can use the managed policy of AWSLambdaBasicExecutionRole.

Each time a developer publishes a new version of an AWS Lambda function, all the dependent event source mappings need to be updated with the reference to the new version’s Amazon Resource Name (ARN). These updates are time consuming and error-prone.

Which combination of actions should the developer take to avoid performing these updates when publishing a new Lambda version? (Select TWO.)
POint a Lambda alias to a new version of the Lambda function.( A Lambda alias is a pointer to a specific Lambda function version.)
Update the event source mappings with the lambda alias ARN. ( Instead of using ARNs for the Lambda function in event source mappings, you can use an alias ARN. You do not need to update your event source mappings when you promote a new version or roll back to a previous version.)

A company is working on a project to enhance its serverless application development process. The company hosts applications on AWS Lambda. The development team regularly updates the Lambda code and wants to use stable code in production.

Which combination of steps should the development team take to configure Lambda functions to meet both development and production requirements? (Select TWO.)
Create a new lambda version every time a new code release needs testing
( Lambda function versions are designed to manage deployment of functions. They can be used for code changes, without affecting the stable production version of the code.)
create two lambda aliases, name one prod and one dev, point prod alias to prad ARN, point the dev alias to the $LATEST version. (By creating separate aliases for Production and Development, systems can initiate the correct alias as needed. A Lambda function alias can be used to point to a specific Lambda function version. Using the functionality to update an alias and its linked version, the development team can update the required version as needed. The $LATEST version is the newest published version.)

A developer built an application that stores data in an Amazon RDS Multi-AZ DB instance. The database performs reads and writes constantly and is responding slowly. The intensive read requests are received unpredictably several times each hour. The application cannot tolerate reading stale data. The developer must increase the retrieval speed for the intensive read requests.

Which strategy will meet these requirements?
Use an ElastiCache cluster with a writethrough stragtegy. config the app to direct the intensive read ops to elasticache. An ElastiCache cluster with a write-through strategy will allow for the read requests to be redirected to ElastiCache efficiently. The strategy will allow for the most up-to-date data to be retrieved.

An ecommerce company deploys more than 20 services behind Amazon API Gateway. The interaction between services is complex. Each service can potentially call several others, making performance issues and errors difficult to identify. Some individual API calls have experienced slow response times. The development team needs to quickly identify the underlying causes of the slowdowns.

Which approach would MOST quickly identify the underlying cause of performance issues?
configure and use x-ray to fine the service invocations with slow response times. use cloudwatch metrics and logs to examine these services to discover their perfomance issues. ( Unlike metrics or logs, X-Ray can help users quickly identify services by their relative response times. X-Ray can identify a poorly performing service from within a web of interacting services. Once identified, CloudWatch provides the context, including the logs and metrics necessary to study specific issues.)


A developer tests code running on the developer's laptop. The code is using the AWS SDK for Python (Boto3) to access AWS services. The .aws/credentials file is set up with the user's IAM user name and password. The developer runs the code and receives this error message:

An error occurred (InvalidAccessKeyId)

Which action will resolve this error?
Replace the IAM user name and password with an access key id and secret access key. (AWS software development kits (SDKs) require an access key ID and a secret access key to make programmatic calls to AWS. An IAM user name and password are used for AWS Management Console access.)

A developer uses the AWS SDK for C++ to retrieve data from an Amazon DynamoDB table. The data is sometimes retrieved using a known key, and sometimes the key is not known, resulting in multiple items being returned. The developer wants to ensure the code returns only one item when retrieving data without keys.

Which DynamoDB setting will meet these requirements?
Set the scan limit parameter to 1. (Set the limit parameter to 1 to set the maximum number of items that need to be retrieved with a DynamoDB scan operation.)

A company is developing a Python application that submits data to an Amazon DynamoDB table. The company requires client-side encryption of specific data items and end-to-end protection for the encrypted data in transit and at rest.

Which combination of steps will meet the requirement to encrypt specific data items? (Select TWO.)
Generate symmetric encryption keys with aws kms. (When you configure the DynamoDB Encryption Client to use AWS KMS, the DynamoDB Encryption Client uses a KMS key that is always encrypted when the key is used outside of AWS KMS. This cryptographic materials provider returns a unique encryption key and a signing key for every table item. This method of encryption uses a symmetric KMS key.)
Use generated keys with the DDB encryption Client. (The DynamoDB Encryption Client provides end-to-end protection for your data in transit and at rest. You can encrypt selected items or attribute values in a table.)

A company hosts its web application backend on Amazon Elastic Container Service (Amazon ECS). The application's Amazon ECS tasks run behind an Application Load Balancer (ALB). The application supports three environments: production, testing, and development. The application uses the ALB to route traffic to the correct environment.

The company has configured three listener rules for the ALB to forward traffic to a different target group based on the port number (Port 80 for production target group, Port 8080 for testing target group, and Port 8081 for development target group).

The company decides to migrate the application backend to a serverless architecture by using an Amazon API Gateway API backed by AWS Lambda functions. The company plans to use the URI path pattern to access the desired environment instead of the port number. The company has created the Lambda functions for the application backend. Each Lambda function has three aliases (production, testing, and development).

Which option includes the next steps the company must take to complete the process?

Create an API Gateway API, config the route to proxy integrateion, target the lamda function ARN with the expression ${stageVariables.LambdaAlias}. modify the lambda resource-based policy by adding hte permission lambda:InvodeFunction. Create prod, test, and dev stages, add the LamdaAlias stage variable to the corresponding stage. 

To add "stageVariable" to the Lambda ARN, you should use the following format: ${stageVariable.stageVariableName}.

To add "stageVariable" to the Lambda ARN, you do not use the Lambda alias name. You should use the following format: ${stageVariable.stageVariableName}.
*/