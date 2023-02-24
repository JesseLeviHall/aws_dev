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

















*/