/* 
Test 5
You can use Amazon Cognito to deliver temporary, limited-privilege credentials to your application so that your users can access AWS resources. Amazon Cognito identity pools support both authenticated and unauthenticated identities. You can retrieve a unique Amazon Cognito identifier (identity ID) for your end-user immediately if you’re allowing unauthenticated users or after you’ve set the login tokens in the credentials provider if you’re authenticating users.
That is why the correct answer for this question is: Cognito ID.

The output of a state can be a copy of its input, the result it produces (for example, the output from a Task state’s Lambda function), or a combination of its input and result. Use ResultPath to control which combination of these is passed to the state output.
You can use a Catch field to capture the error in a Task and Parallel State. This field’s value must be an array of objects, known as catchers.
A catcher contains the following fields:
ErrorEquals – A non-empty array of strings that match error names.
Next – A string that must exactly match one of the state machine’s state names.
ResultPath – A path that determines what input is sent to the state specified in the Next field.
When a state reports an error and either there is no Retry field, or if retries fail to resolve the error, Step Functions scans through the catchers in the order listed in the array. When the error name appears in the value of a catcher’s ErrorEquals field, the state machine transitions to the state named in the Next field.
The four states that handle the application logic and error handling are as follows:
Choice State – “Yes or No”
Task State – “YesMessage” and “NoMessage”
Pass State – “Cause Of Error”
The workflow is initiated by passing an input of values “yes” or “no”. On the left side, we can see that an error has occurred during the “NoMessage” task state (as labeled by its orange color) when a “no” value was passed as an input.
On the right side, we can see that all data that passes through the nodes (input, error, output) are aggregated in a single step output.
This can be done by including a Catch field in the state machine definition to capture the error in a state and the ResultPath to include each node’s input with its output.

It’s important to note that basically everything that you’re doing outside of the handler function will block its execution. When it comes to thinking about pre handler code dependencies that you want to use, remember that less is more. The more targeted you are at the resource that you include, the better the overall performance your function will have during its execution.
You also have the option to tweak the power of the resources that run your function by increasing the memory allocated to your function to optimize its overall performance
Hence, the correct answers are:
– Reduce the deployment package’s size by including only the needed modules from the AWS SDK for Java.
– Increase the memory allocation setting for the Lambda function.

A task definition is required to run Docker containers in Amazon ECS. The following are some of the parameters you can specify in a task definition:
– The Docker image to use with each container in your task
– How much CPU and memory to use with each task or each container within a task
– The launch type to use, which determines the infrastructure on which your tasks are hosted
– The Docker networking mode to use for the containers in your task
– The logging configuration to use for your tasks
– Whether the task should continue to run if the container finishes or fails
– The command the container should run when it is started
– Any data volumes that should be used with the containers in the task
– The IAM role that your tasks should use
Before you can run Docker containers on Amazon ECS, you must create a task definition. You can define multiple containers and data volumes in a single task definition.

 Enable DynamoDB Streams to stream all the changes from the Customer service table and trigger a Lambda function to update the Payment service table.

Here are the SAM CLI commands needed to deploy serverless applications:
sam init – Initializes a serverless application with an AWS SAM template. The template provides a folder structure for your Lambda functions and is connected to an event source such as APIs, S3 buckets, or DynamoDB tables. This application includes everything you need to get started and to eventually extend it into a production-scale application.
sam build – The sam build command builds any dependencies that your application has, and copies your application source code to folders under .aws-sam/build to be zipped and uploaded to Lambda.
sam deploy – performs the functionality of sam package. You can use the sam deploy command to directly package and deploy your application.
the correct answer is: Build the SAM template in the local machine and call the sam deploy command to package and deploy the SAM template from an S3 bucket.

The AWS STS DecodeAuthorizationMessage API decodes additional information about the authorization status of a request from an encoded message returned in response to an AWS request.

Hence, the correct answers are:
– On the production account, create an IAM role and specify the development account as a trusted entity.
– Set the policy that will grant access to S3 for the IAM role created in the production account
– Log in to the development account and create a policy that will use STS to assume the IAM role in the production account. Attach the policy to corresponding IAM users.

States can perform a variety of functions in your state machine:
Task State – Do some work in your state machine
Choice State – Make a choice between branches of execution
Fail or Succeed State – Stop execution with failure or success
Pass State – Simply pass its input to its output or inject some fixed data, without performing work.
Wait State – Provide a delay for a certain amount of time or until a specified time/date.
Parallel State – Begin parallel branches of execution.
Map State – Dynamically iterate steps.
Out of all the types of State, only the Task State and the Parallel State can be used to run processes in the state machine. In the given scenario, the application logic inside the Lambda function process data synchronously. In this case, Task State should be used.

Task and Parallel states can have a field named Retry, whose value must be an array of objects known as retriers. An individual retrier represents a certain number of retries, usually at increasing time intervals.  you can use the Catch and Retry fields inside the state machine definition to capture an exception error and attempt to recover from it by automatically retrying the state.

You use the IAM Condition element to implement a fine-grained access control policy. By adding a Condition element to a permissions policy, you can allow or deny access to items and attributes in DynamoDB tables and indexes, based upon your particular business requirements.

In the given scenario, we are only required to restrict access to specific items in the table based on User Id which is the partition key. We can achieve this by inserting a dynamodb:LeadingKeys condition key to the IAM policy associated with the Identity provider’s role.

The --dry-run parameter checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun-Operation. Otherwise, it is UnauthorizedOperation. With the IAM policy simulator, you can test and troubleshoot identity-based policies, IAM permissions boundaries, Organizations service control policies (SCPs), and resource-based policies.

You can perform the following key management functions in AWS KMS:
– Create symmetric and asymmetric keys where the key material is only ever used within the service
– Create symmetric keys where the key material is generated and used within a custom key store under your control.
– Import your own symmetric key for use within the service.
– Create both symmetric and asymmetric data key pairs for local use within your applications.
– Define which IAM users and roles can manage keys.
– Define which IAM users and roles can use keys to encrypt and decrypt data.
– Choose to have keys that were generated by the service to be automatically rotated on an annual basis.
– Temporarily disable keys so they cannot be used by anyone.
– Re-enable disabled keys.
– Schedule the deletion of keys that you no longer use.
– Audit the use of keys by inspecting logs in AWS CloudTrail.
By default, AWS KMS creates the key material for a KMS key. You cannot extract, export, view, or manage this key material. Also, you cannot delete this key material; you must delete the KMS key. However, you can import your own key material into a KMS key or create the key material for it in the AWS CloudHSM cluster associated with an AWS KMS custom key store. There are also types of KMS keys that are not eligible for automatic key rotation such as asymmetric keys, keys in custom key stores, and keys with imported key material.
Hence, the correct answers are:
– Re-enabling disabled keys
– Creation of symmetric and asymmetric keys

With versioning, you don’t have to wait for an object to expire before CloudFront begins to serve a new version of it, and you don’t have to pay for object invalidation.
Hence, the correct answer is: Update the images by using versioned file names.

the correct answer is: Inside the .ebextensions folder.

The PassRole permission helps you make sure that a user doesn’t pass a role to an EC2 instance where the role has more permissions than you want the user to have. For example, Alice might be allowed to perform only EC2 and S3 actions. If Alice could pass a role to the EC2 instance that allows additional actions, she could log into the instance, get temporary security credentials via the role she passed, and make calls to AWS that you don’t intend.

TransactWriteItems is a synchronous and idempotent write operation that groups up to 25 write actions in a single all-or-nothing operation.

When Lambda runs your function, it passes a context object to the handler. This object provides methods and properties that provide information about the invocation, function, and execution environment. One of the properties that you can get from the context object is the log_stream_name which gives the log location of a function instance.
Hence, the correct answer is: Extract the log stream name from the Context object of the handler function.

You can use the AWS Management Console, or the AWS CLI or API, to specify customization settings for the built-in app UI experience. You can upload a custom logo image to be displayed in the app. You can also choose many CSS customizations.


You can authenticate with CodeCommit (HTTPS) in two ways:
1. Set-up a Git credential helper using your access key credentials specified in your AWS credential profile.
2. Generate HTTPS Git credentials for AWS CodeCommit. Specify the credentials in the Git Credential Manager.
The Git credential helper requires an AWS credential profile, which stores a copy of an IAM user’s AWS access key ID and AWS secret access key (along with a default AWS Region name and default output format). The Git credential helper uses this information to automatically authenticate with CodeCommit so you don’t need to enter this information every time you use Git to interact with CodeCommit.
If you intend to use HTTPS with the credential helper that is included in the AWS CLI instead of configuring Git credentials for CodeCommit, on the Configuring extra options page, make sure the Enable Git Credential Manager option is cleared. The Git Credential Manager is only compatible with CodeCommit if IAM users configure Git credentials.
Since the scenario requires the developer to authenticate with CodeCommit using his access key credentials, he should set up a Git credential helper.
Hence, the correct answer is: Configure the Git credential helper with the AWS credential profile.



*/