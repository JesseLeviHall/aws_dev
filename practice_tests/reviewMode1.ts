/* 

X-ray
Annotations are simple key-value pairs that are indexed for use with filter expressions. Use annotations to record data that you want to use to group traces in the console, or when calling the GetTraceSummaries API. X-Ray indexes up to 50 annotations per trace.
-Metadata are key-value pairs with values of any type, including objects and lists, but that are not indexed. Use metadata to record data you want to store in the trace but don’t need to use for searching traces. You can view annotations and metadata in the segment or subsegment details in the X-Ray console.

VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. Flow log data can be published to Amazon CloudWatch Logs and Amazon S3. After you’ve created a flow log, you can retrieve and view its data in the chosen destination.

The Lambda proxy integration allows the client to call a single Lambda function in the backend. The function accesses many resources or features of other AWS services, including calling other Lambda functions.

You can publish your own metrics to CloudWatch using the AWS CLI or an API. You can view statistical graphs of your published metrics with the AWS Management Console. CloudWatch stores data about a metric as a series of data points. Each data point has an associated time stamp. You can even publish an aggregated set of data points called a statistic set.

If your origin is an Elastic Load Balancing load balancer, you can use a certificate provided by AWS Certificate Manager (ACM). You can also use a certificate that is signed by a trusted third-party certificate authority and imported into ACM. Note that you can’t use a self-signed certificate for HTTPS communication between CloudFront and your origin.

Hence, setting the Viewer Protocol Policy to use Redirect HTTP to HTTPS and setting the Viewer Protocol Policy to use HTTPS Only are the correct answers in this scenario.

Resharding enables you to increase or decrease the number of shards in a stream in order to adapt to changes in the rate of data flowing through the stream. The Kinesis Client Library (KCL) ensures that for every shard there is a record processor running and processing that shard. It also tracks the shards in the stream using an Amazon DynamoDB table.
you should ensure that the number of instances does not exceed the number of open shards.

To create a Lambda function, you need a deployment package and an execution role. The deployment package contains your function code. The execution role grants the function permission to use AWS services,

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 1000. This limit can be raised by requesting for AWS to increase the limit of the concurrent executions of your account.

The two main components of Amazon Cognito are user pools and identity pools. User pools are user directories that provide sign-up and sign-in options for your app users. Identity pools enable you to grant your users access to other AWS services. You can use identity pools and user pools separately or together.

For serverless applications (also referred to as Lambda-based applications), the optional Transform section specifies the version of the AWS Serverless Application Model (AWS SAM) to use.

_X_AMZN_TRACE_ID: Contains the tracing header, which includes the sampling decision, trace ID, and parent segment ID. If Lambda receives a tracing header when your function is invoked, that header will be used to populate the _X_AMZN_TRACE_ID environment variable. If a tracing header was not received, Lambda will generate one for you.

AWS_XRAY_CONTEXT_MISSING: The X-Ray SDK uses this variable to determine its behavior in the event that your function tries to record X-Ray data, but a tracing header is not available. Lambda sets this value to LOG_ERROR by default.

AWS_XRAY_DAEMON_ADDRESS: This environment variable exposes the X-Ray daemon’s address in the following format: IP_ADDRESS:PORT. You can use the X-Ray daemon’s address to send trace data to the X-Ray daemon directly, without using the X-Ray SDK.

In a Canary deployment configuration, the traffic is shifted in two increments. You can choose from predefined canary options that specify the percentage of traffic shifted to your updated Lambda function version in the first increment and the interval, in minutes, before the remaining traffic is shifted in the second increment. Hence, this is the correct answer which will satisfy the requirement for the given scenario.

Linear is incorrect because this will cause the traffic to be shifted in equal increments with an equal number of minutes between each increment. You can choose from predefined linear options that specify the percentage of traffic shifted in each increment and the number of minutes between each increment.

All-at-once is incorrect because with this deployment configuration, the traffic is shifted from the original Lambda function to the updated Lambda function version all at once.

Rolling with additional batch is incorrect because this is only applicable in Elastic Beanstalk and not for Lambda.

In this scenario, the key point that you have to understand is that S3 is not part of your VPC, unlike your EC2 instances, EBS volumes, ELBs, and other services that typically reside within your private network. An EC2 instance needs to have access to the Internet, via the Internet Gateway or a NAT Instance/Gateway in order to access S3. Alternatively, you can also create a VPC endpoint so your private subnet would be able to connect to S3.

The GenerateDataKeyWithoutPlaintext API generates a unique data key. This operation returns a data key that is encrypted under a customer master key (CMK) that you specify. GenerateDataKeyWithoutPlaintext is identical to GenerateDataKey except that it returns only the encrypted copy of the data key.

If you have resources that are running inside AWS that need programmatic access to various AWS services, then the best practice is always to use IAM roles. However, applications running outside of an AWS environment will need access keys for programmatic access to AWS resources. For example, monitoring tools running on-premises and third-party automation tools will need access keys.

Access keys are long-term credentials for an IAM user or the AWS account root user. You can use access keys to sign programmatic requests to the AWS CLI or AWS API (directly or using the AWS SDK).
In order to use the AWS SDK for your application, you have to create your credentials file first at ~/.aws/credentials for Linux servers or at C:\Users\USER_NAME\.aws\credentials for Windows users and then save your access keys.


The metrics reported by API Gateway provide information that you can analyze in different ways. The list below shows some common uses for the metrics. These are suggestions 

 – Monitor the IntegrationLatency metrics to measure the responsiveness of the backend.

 – Monitor the Latency metrics to measure the overall responsiveness of your API calls.

 – Monitor the CacheHitCount and CacheMissCount metrics to optimize cache capacities to achieve a desired performance.

DynamoDB Streams enables solutions such as these, and many others. DynamoDB Streams captures a time-ordered sequence of item-level modifications in any DynamoDB table, and stores this information in a log for up to 24 hours. Applications can access this log and view the data items as they appeared before and after they were modified, in near real time.

If your application performs operations or workflows that take a long time to complete, you can offload those tasks to a dedicated worker environment in Elastic Beanstalk. Decoupling your web application front end from a process that performs blocking operations is a common way to ensure that your application stays responsive under load.

By using AWS_IAM as the method authorization type, it ensures that the API can only be accessed by IAM identities such as IAM users or IAM roles. Attaching a resource policy to the API that grants permission to the specified IAM role to invoke the execute-api:Invoke action allows the specified IAM role to make authorized requests to the API while denying access to any other unauthorized users or roles.

When an item in the table is modified, StreamViewType determines what information are written to the stream for this table. Valid values for StreamViewType are KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, and NEW_AND_OLD_IMAGES.

For the OLD_IMAGE type, the entire item which has the previous value as it appeared before it was modified is written to the stream. Hence, this is the correct answer in this scenario.

KEYS_ONLY is incorrect because it will only write the key attributes of the modified item to the stream. This choice is wrong since the question states that values should be copied as well.

NEW_IMAGE is incorrect because it will configure the stream to write the entire item with its new value as it appears after it was modified. This choice is wrong since the stream should capture the item’s pre-modified values.

NEW_AND_OLD_IMAGES is incorrect because although it writes the new values of the item in the stream, it also includes the old one as well. Since this type will send both the new and the old item images of the item to the stream, this option is wrong. Remember that it should only send a copy of the item’s previous value to the S3 bucket, and not the new value in the DynamoDB table. The most suitable one to use here is the OLD_IMAGE type.

to only allow authorized clients to invalidate an API Gateway cache entry when submitting API requests, you can just tick the Require Authorization checkbox in the Cache Settings of your API via the console and instruct the client to send a request which contains the Cache-Control: max-age=0 header. 

 Redis can provide a much more durable and powerful cache layer to the prototype distributed system, however, you should take note of one keyword in the requirement: multithreaded. In terms of commands execution, Redis is mostly a single-threaded server

To define a nested application in your serverless application, use the AWS::Serverless::Application resource type.

AWS::Serverless::Function is incorrect because this resource type describes configuration information for creating a Lambda function. You can describe any event source that you want to attach to the Lambda function—such as Amazon S3, Amazon DynamoDB Streams, and Amazon Kinesis Data Streams.

AWS::Serverless::LayerVersion is incorrect because this resource type creates a Lambda layer version (LayerVersion) that contains library or runtime code that’s needed by a Lambda function. When a serverless layer version is transformed, AWS SAM also transforms the logical ID of the resource so that old layer versions aren’t automatically deleted by AWS CloudFormation when the resource is updated.

AWS::Serverless::Api is incorrect because this resource type describes an API Gateway resource. It’s useful for advanced use cases where you want full control and flexibility when you configure your APIs. For most scenarios, it is recommended that you create APIs by specifying this resource type as an event source of your AWS::Serverless::Function resource.

In this scenario, there is an issue where the users are getting HTTP 504 errors in the serverless application. This means the Lambda function is working fine at times but there are instances when it throws an error. Based on this analysis, the most likely cause of the issue is the INTEGRATION_TIMEOUT error since you will only get an INTEGRATION_FAILURE error if your AWS Lambda integration does not work at all in the first place.

Hence, the root cause of this issue is that the API Gateway request has timed out because the underlying Lambda function has been running for more than 29 seconds.

By default, an alias points to a single Lambda function version. When the alias is updated to point to a different function version, incoming request traffic in turn instantly points to the updated version. This exposes that alias to any potential instabilities introduced by the new version. To minimize this impact, you can implement the routing-config parameter of the Lambda alias that allows you to point to two different versions of the Lambda function and dictate what percentage of incoming traffic is sent to each version. Hence, using Traffic Shifting for Lambda Aliases is the correct answer.

AWS CloudTrail is incorrect because this service simply increases visibility of your user and resource activity by recording the AWS Management Console actions and API calls they made. This service is not suitable to use in tracing the event source of your functions nor for troubleshooting any issues in its downstream calls.

With proxy integration, the setup is simple. You only need to set the HTTP method and the HTTP endpoint URI, according to the backend requirements, if you are not concerned with content encoding or caching.

With custom integration, setup is more involved. In addition to the proxy integration setup steps, you need to specify how the incoming request data is mapped to the integration request and how the resulting integration response data is mapped to the method response. API Gateway supports the following endpoint ports: 80, 443 and 1024-65535.

Programmatically, you choose an integration type by setting the type property on the Integration resource. For the Lambda proxy integration, the value is AWS_PROXY. For the Lambda custom integration and all other AWS integrations, it is AWS. For the HTTP proxy integration and HTTP integration, the value is HTTP_PROXY and HTTP, respectively. For the mock integration, the type value is MOCK.

Since the integration type that is being described in the scenario fits the definition of an HTTP custom integration, the correct answer in this scenario is to use the HTTP integration type.

AWS is incorrect because this type is only used for Lambda custom integration. Take note that the scenario uses an application hosted in EC2 and not in Lambda.

AWS_PROXY is incorrect because this type is primarily used for Lambda proxy integration. The scenario didn’t mention that it uses a serverless application or Lambda.

HTTP_PROXY is incorrect because this type is only used for HTTP proxy integration where you don’t need to do data mapping for your request and response data.

In Lambda non-proxy (or custom) integration, you can specify how the incoming request data is mapped to the integration request and how the resulting integration response data is mapped to the method response.

In general, when your object size reaches 100 MB, you should consider using multipart uploads instead of uploading the object in a single operation. Using multipart upload provides the following advantages:

    – Improved throughput – You can upload parts in parallel to improve throughput.

    – Quick recovery from any network issues – Smaller part size minimizes the impact of restarting a failed upload due to a network error.

    – Pause and resume object uploads – You can upload object parts over time. Once you initiate a multipart upload there is no expiry; you must explicitly complete or abort the multipart upload.

    – Begin an upload before you know the final object size – You can upload an object as you are creating it.

A task placement strategy is an algorithm for selecting instances for task placement or tasks for termination. Task placement strategies can be specified when either running a task or creating a new service.

Amazon ECS supports the following task placement strategies:

binpack – Place tasks based on the least available amount of CPU or memory. This minimizes the number of instances in use.

random – Place tasks randomly.

spread – Place tasks evenly based on the specified value. Accepted values are attribute key-value pairs, instanceId, or host.

DynamoDB supports two types of secondary indexes:

Global secondary index — an index with a partition key and a sort key that can be different from those on the base table. A global secondary index is considered “global” because queries on the index can span all of the data in the base table, across all partitions.

Local secondary index — an index that has the same partition key as the base table, but a different sort key. A local secondary index is “local” in the sense that every partition of a local secondary index is scoped to a base table partition that has the same partition key value.

To speed up queries on non-key attributes, you can create a global secondary index. A global secondary index contains a selection of attributes from the base table, but they are organized by a primary key that is different from that of the table. The index key does not need to have any of the key attributes from the table; it doesn’t even need to have the same key schema as a table.

AWS Lambda uses the VPC information you provide to set up ENIs that allow your Lambda function to access VPC resources. Each ENI is assigned a private IP address from the IP address range within the subnets you specify but is not assigned any public IP addresses.
 add a NAT gateway to your VPC. You should also ensure that the associated security group of the Lambda function allows outbound connections.

You can use Lambda@Edge to help authenticate and authorize users for the premium pay-wall content on your website, filtering out unauthorized requests before they reach your origin infrastructure. For example, you can trigger a Lambda function to authorize each viewer request by calling authentication and user management service such as Amazon Cognito.

Hence, using Lambda@Edge and Amazon Cognito to authenticate and authorize premium customers to download the firmware update is the correct answer for this scenario.

To read data from a table, you use operations such as GetItem, Query, or Scan. DynamoDB returns all of the item attributes by default. To get just some, rather than all of the attributes, use a projection expression.

A projection expression is a string that identifies the attributes you want. To retrieve a single attribute, specify its name. For multiple attributes, the names must be comma-separated.


If you configure CloudFront to require HTTPS both to communicate with viewers and to communicate with your origin, here’s what happens when CloudFront receives a request for an object. The process works basically the same way whether your origin is an Amazon S3 bucket or a custom origin such as an HTTP/S server:

1. A viewer submits an HTTPS request to CloudFront. There’s some SSL/TLS negotiation here between the viewer and CloudFront. In the end, the viewer submits the request in an encrypted format.

2. If the object is in the CloudFront edge cache, CloudFront encrypts the response and returns it to the viewer, and the viewer decrypts it.

3. If the object is not in the CloudFront cache, CloudFront performs SSL/TLS negotiation with your origin and, when the negotiation is complete, forwards the request to your origin in an encrypted format.

4. Your origin decrypts the request, encrypts the requested object, and returns the object to CloudFront.

5. CloudFront decrypts the response, re-encrypts it, and forwards the object to the viewer. CloudFront also saves the object in the edge cache so that the object is available the next time it’s requested.

6. The viewer decrypts the response.

You can configure one or more cache behaviors in your CloudFront distribution to require HTTPS for communication between viewers and CloudFront. You also can configure one or more cache behaviors to allow both HTTP and HTTPS, so that CloudFront requires HTTPS for some objects but not for others.

To implement this setup, you have to change the Origin Protocol Policy setting for the applicable origins in your distribution. If you’re using the domain name that CloudFront assigned to your distribution, such as dtut0rial5d0j0.cloudfront.net, you change the Viewer Protocol Policy setting for one or more cache behaviors to require HTTPS communication. With this configuration, CloudFront provides the SSL/TLS certificate.

Hence, configuring the Origin Protocol Policy as well as the Viewer Protocol Policy are the correct answers in this scenario.

Port mappings allow containers to access ports on the host container instance to send or receive traffic. Port mappings are specified as part of the container definition which can be configured in the task definition. (AWS ECS)

If you choose Canary10Percent10Minutes then 10 percent of your customer traffic is immediately shifted to your new version. After 10 minutes, all traffic is shifted to the new version.

However, if your pre-hook/post-hook tests fail, or if a CloudWatch alarm is triggered, CodeDeploy rolls back your deployment. The following table outlines other traffic-shifting options that are available:

Canary: Traffic is shifted in two increments. You can choose from predefined canary options. The options specify the percentage of traffic that’s shifted to your updated Lambda function version in the first increment, and the interval, in minutes, before the remaining traffic is shifted in the second increment.
Linear: Traffic is shifted in equal increments with an equal number of minutes between each increment. You can choose from predefined linear options that specify the percentage of traffic that’s shifted in each increment and the number of minutes between each increment.
All-at-once: All traffic is shifted from the original Lambda function to the updated Lambda function version at once.
Hence, the CodeDeployDefault.LambdaCanary10Percent5Minutes option is correct because 10 percent of your customer traffic is immediately shifted to your new version. After 5 minutes, all traffic is shifted to the new version. This means that the entire deployment time will only take 5 minutes

Take note that a User Pool doesn’t have an option to enable unauthenticated identities. Moreover, you won’t be able to provide your users access to upload their media files to S3 using a User Pool.
– Standard resolution, with data having a one-minute granularity
– High resolution, with data at a granularity of one second

s3 doesnt do post, only putObject



*/