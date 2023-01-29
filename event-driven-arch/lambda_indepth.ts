/* 
===========Lambda In Depth====================
Lambda functions have lifecycles. They are executed in an environment
First - Init phase (extention init, runtime init, function init)
Second - Invoke phase (cold start or warm start)
Third - ShutDown phase terminates execution env (runtime shutdown, extension shutdown)

Function initialization code is run once every cold start, during func init stage. Then the handler is run every invocation. 

A good lambda function should assume cold start everytime, but also take advantage of warm starts. 
Provisioned concurrency will warm them up in advance

By default Lambda timeout is 3 seconds. You have to configure it to be more
==============Lambda Versions=====================
Lambda versions are immutable. You can't change them. You can only create new versions. You get a unique ARN for each vertion, refered to as a qualified ARN. An unqualified ARN points to the $Latest

You can use versions to manage the deployment of your functions. For example, you can publish a new version of a function for beta testing without affecting users of the stable production version. Lambda creates a new version of your function each time that you publish the function. The new version is a copy of the unpublished version of the function. 

A function version includes the following information:

The function code and all associated dependencies.
The Lambda runtime that invokes the function.
All of the function settings, including the environment variables.

A unique Amazon Resource Name (ARN) to identify the specific version of the function.
==============Lambda Aliases=====================
You can create one or more aliases for your Lambda function. A Lambda alias is like a pointer to a specific function version. Users can access the function version using the alias Amazon Resource Name (ARN).

Aliases can be static, so Aliases can point at a single version, or be configured to perform weighted routing between 2 versions.

Aliases can be used to manage the deployment of your functions. For example, you can publish a new version of a function for beta testing without affecting users of the stable production version.

The default execution role comes with basic permissions enough to log into cloudwatch logs.
=============Lambda ENV Variables=================
An environment variable is a pair of strings that are stored in a function's version-specific configuration. The Lambda runtime makes environment variables available to your code and sets additional environment variables that contain information about the function and invocation request.
By default they are associated with $Latest, which remains editable. 
Associated with a version they become immutable
Accessible from the execution env. Can be encrypted with KMS.
==============Monitor Log and Trace===============
You can use the AWS SDK, the AWS CLI, or an HTTP API to manage your function's log files. 
Lambda integrates with other AWS services to help you monitor and troubleshoot your Lambda functions. Lambda automatically monitors Lambda functions on your behalf and reports metrics through Amazon CloudWatch. To help you monitor your code when it runs, Lambda automatically tracks the number of requests, the invocation duration per request, and the number of requests that result in an error - useful for incremental deployment


stdout or stderr - will print to logs

X-Ray shows the flow or requests through your application 
Enable Active Tracing on a particular function - In ClI it is update-function-configuration --function-name -my-function --tracing-config Mode=Active
Permissions are needed via execution role for AWSXRayDaemonWriteAccess managed policy, then you can use XRay SDK in your function.
The execution env also offers xray related env variables like AWS_XRAY_DAEMON_ADDRESS for connection details including PORT for the XRAY Daemon

using Lambda functions from within a VPC and configuring them to use an EFS file system.
===================Lambda Layers==================
You can configure your Lambda function to pull in additional code and content in the form of layers. A layer is a .zip file archive that contains libraries, a custom runtime, or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package.
===============Lambda Container Images============
You can package your code and dependencies as a container image using tools such as the Docker CLI. You can then upload the image to your container registry hosted on Amazon Elastic Container Registry (Amazon ECR).

AWS provides a set of open-source base images that you can use to build the container image for your function code. You can also use alternative base images from other container registries. AWS also provides an open-source runtime client that you add to your alternative base image to make it compatible with the Lambda service.

Additionally, AWS provides a runtime interface emulator for you to test your functions locally using tools such as the Docker CLI.

The package LambdaRuntimeAPI gets included in your container images. 
The Lambda Runtime Interface Emulator Package (RIE) - lets you emulate many of the interfaces for Lambda so you can test it without using Lambda For Real. 
==============Lambda ALB Integration==============
You can use a Lambda function to process requests from an Application Load Balancer. Elastic Load Balancing supports Lambda functions as a target for an Application Load Balancer. Use load balancer rules to route HTTP requests to a function, based on path or header values. Process the request and return an HTTP response from your Lambda function.

Elastic Load Balancing invokes your Lambda function synchronously with an event that contains the request body and metadata.

Essentially, the ALB translates HTTP(S) into lambda compatible 'event' JSON, Lambda sends response JSON, ALB translates back to HTTP(S) for the respose.

Not using multi-value headers means the ALB sends the last value sent by the client which often causes people problems. Use multiValueQueryStringParameters 
=============Lambda Resource Policies=============
You can use resource policies to control access to your Lambda functions. A resource policy is an IAM policy that you attach to a Lambda function. You can use a resource policy to grant permissions to other AWS accounts or IAM users to invoke your function. You can also use a resource policy to grant permissions to other AWS accounts or IAM users to access your function's version-specific configuration settings.

Every Lambda function has two forms of security:
IAM Role - assumed by the function, determines What the function CAN do
Resource Policy - Determines WHO can do What with the function. 

Cross Account means you need Identity Policy OUT of account a, and Resource policy to allow a in account b. 

When Another service needs to invoke the function it requieres either to assume a role, or the resource policy must explicitly allow it.

Full control via the CLI/API

q: Which of the following controls the permissions a lambda function receives, execution role permission policy or execution role trust policy?
a: Execution role permission policy

q: Which of the following controls WHAT can invoke a lambda function?
a: Resource policy


*/