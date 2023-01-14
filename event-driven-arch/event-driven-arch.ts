/* 
=====Event Driven and Serverless Architecture======
Going from Monolith to Tiered simply means seperating for ex. the db insance from the app instance. Then each tier can be scaled horizontally and load balanced and highly available with redundancy. 

Next we could have a queue based design, to achieve improved asynchronous communications and scaling. This places a queue between application tiers which decouples them. 

Then we could have a microservices architecture, where we have a bunch of small services that are loosely coupled and can be scaled independently. A microservice is just a tiny self-sufficient application with its own logic, data, and input output components. 

Event Driven Architecture is a collection of event producers that react to something which is picked up by an event consumer (listener) ready and waiting for an event to occur and then do something. 

Components or services within an App can be both producers and consumers. The key thing about event-driven architecture is that neither the producers or consumers are sat around waiting for things to occur, consuming resources...while not needed they shut-down, unprovision, or move to dormant, then resurect when needed. A mature E-Driven Arch only consumes resources while handling events (serverless)

Best practice in event driven architecture is to use an event router - an HA central exchange point for events (BUS). Events are sent to the bus, it delivers to the appropriate event consumer. 
==================Lambda Intro=======================
Funcion as a Service (FaaS)
- A serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. Billed by 
the number of requests or duration of time your code executes.
- A lamda function has to define the runtime (eg Python 3.8) and it gets executed in that environment. You also define the amount of resources (memeory) and (CPU) allocation is then done automatically.
- Temp Storage Default is 512MB up to 10240MB
- Functions run for up to 900sec = 15 minutes. Step processes can extend the process but one function only gets 15 min. 
- Lamda functions are stateless, you have to provide every invocation with all the required variables and packages. 
- Generally, if you hear Docker, it means not Lambda. Docker is the antipatern for Serverless, even though lambda supports docker images.
- Custom runtimes such as Rust are possible using Layers
- Layers are a zip file containing libraries or other dependencies
- Lamda functions are invoked by events, such as an API call, a file upload to S3, a message in SQS, a change in DynamoDB, etc.
- IAM roles (execution roles) are what give Lambda functions permissions. 
----------Lambda permissions and networking---------
lambda has 2 networking modes:
Public - the default. Can access public aws services and the public internet ex:
   A VPC with an aurora db, ec2, and EFS for files
 Public networking gives best performance because no customer specific vpc networking is required. But no access to private vpc services unless configured with pub IP and permissions. This is the most common use, but This is a big limitation********
VPC - example, a VPC where Lambda is configed to run in a private subnet, with a db and efs. here the lamda func obeys all the same rules as anything else running in the vpc - freely access other resources there assuming any network ACLs and security groups allow it. The flipside is the function cant access anything outside the VPC (DynamoDB) unless gateways (NatGateway/IGW) are configured
You also need to give the func ec2 network permissions via the execution role (IAM Role)
- Instead of requiring an ENI per function execution, 
- Lambda functions can be configured to use a shared ENI. This is called "ENI pooling". AWS analyzing all the functions running in a region in an account and build up a set of unique combinations of security groups and subnets  requiring only one ENI. This config takes up to 90 secs but is only done once unless your network config is updated
----------------Lambda Security----------------
two parts of the permissions model to understand: 
1. The execution role (IAM Role) that gives the function permissions to access other AWS services. very simmilar to an ec2 permissoins role.
2. The resource policies - controls what can interact with a specific lambda function. Simmilar to s3 bucket policy. can manually change this via CLI or API, but currently not in the console UI. 
Eample role:
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Start*",
        "ec2:Stop*"
      ],
      "Resource": "*"
    }
  ]
}
------------------Logging---------------------
- Lambda logs are stored in CloudWatch Logs - and can use X-Ray for distributed user tracing. 
- Any metrics such as successes latency or failures and retries is stored in CloudWatch.
- ******in order to ouput logs you need to give lambda permissions via the execution role. 
-----------------Lambda Invocation---------------
There are three different methods to invoke a function:
1. Synchronous invocation - the default. The client waits for the function to return a response before continuing.
Can use CLI or API and API Gateway (used for serverless arch)generally a human interaction via web app...
2. Asynchronous invocation - the client receives a response immediately, and the function runs in the background. Typically used when AWS services invoke a function on your behalf. (eg an s3 buckte with events enabled, at upload event sends to lambda and does not wait for a response). If event fails lambda will retry between 0 and 2 times. Events can be sent to (DLQ) dead letter queue after repeated failed processing. the function has to be idempotent - always same output given the same input - doesnt change the state of the input. 
3. Event Source Mapping invocation - the client does not receive a response, and the function runs in the background. Generally used on (kinesis, SQS que, DynamoDB stream, aws managed streaming for apache kafka ) streams or things that dont generate events and polling is required. Stream section batched and sent as an event batch to lambda, has to work withing 15 min timeout. ******* Here the source isnt explicitly delivering an event, the mapping is reading from the source - So it uses permissions from the Lambda execution role to access the source service. 
-----------------Lambda Versions--------------------
- Lambda functions are immutable - you can't change the code of a function after you create it.
- You can create a new version of a function, which is a new function with the same configuration as the original function. $Latest points to the latest version. And there are Aliases (DEV, STAGE, PROD) to point to certain versions, aliases cant be changed either. 
------------------Lambda Startup Times---------------
- Lambda functions are started on demand, and the first time a function is invoked, it can take a few seconds to start up. This is called "cold start".
- If it is invoked before too long you can get an execution in the same env - a "warm start"
- One function runs per invocation context. 
- If you have a lot of concurrent invocations, you can get multiple instances of the same function running at the same time. There is a feature known as provisioned concurrency, where you can inform aws in advance to create execution contexts before expected invocations. 
- You can use /tmp space to pre-download things within and execution context.
- Anything you expect to be re-used in the contexts you can declare outside of the function handler.
- You can use layers to pre-download things across execution contexts
- You can use Lambda@Edge to pre-download things across regions.
===============Cloudwatch Events and EventBridge=====
- Cloudwatch Events is a serverless event bus that you can use to connect AWS services together (Near Realtime) EventBridge is a superset of CloudWatch Events that aws are phasing in to replace CW Events

They can monitor the default account event bus - and pattern match events flowing through and deliver these events to multiple targets.

They are also the source of scheduled events which can perform certain actions at certain times of day, days of the week, or multiple combinations of both - using the Unix CRON time expression format.

CW Events provides only one Bus for the account and it is not exposed in the console UI. You can use the CLI or API to create rules and targets either for your apps or third party procucts and services. Targets are often lambda functions.

Rules are created and linked to a specific bus.
- Event Pattern - a JSON object that defines the event that triggers the rule.
1. event pattern rule
2. schedule rule

In the general account, create an IAM Role as AWS service and Lambda, create policy, enter the JSON from above as example to start stop. 
Copy the instance ID of the EC2, create a lambda function in the UI Console and attach the execution role, Add env variable with instance ids. Create one for the start and stop functions. Test these work. 
Then deploy the protect function which will take an event that an instance hast stopped, and restart it. Go to eventbridge console, create a rule, in the pattern box open services and select ec2 and ec2 state-change-notification, rather than any state select a specific state as stopped from dropdown, and add specific instance ids. Next choose target type aws service, and lambda, and the protect function and create rule.
=============SNS Simple Notification Service==========
is a PUB SUB style notification system which is used within AWS products and services but can also form an essential part of serverless, event-driven and traditional application architectures. As a public service meaning to access it you need a public endpoint.

Messages can be up to 256 kilobytes.
SNS topics are the base entity of SNS, where permissions and configuration is set.

SNS topics can be subscribed to by multiple endpoints, which can be email addresses, SQS queues, HTTP endpoints, Lambda functions, mobile push notifications, SMS messages, and AWS IoT rules

SNS is used to communicate across aws cloudwatch and cloudformation. Delivery status works over http, lambda, and sqs. Delivery Retries, is HA and scalable, regionally resilient. Can perform server side encryption (SSE)
=============SQS Simple Queue Service==========
SQS queues are a managed message queue service in AWS which help to decouple application components, allow Asynchronous messaging or the implementation of worker pools.
Queues are highly available regionally resilient by default, are standard or FIFO. FIFO guarantee an order, standard try but maybe out of order.

standard - Atleast one delivery, like a multi-lane highway
Infinate scalability. Possibly multiple delivery of the same message and maybe out of order (best for decoupling worker pools, batches for future processing)

FIFO - Exactly one delivery like a single lane road. Performance 3000 messages/sec with batching or 300/s without. unexceptional levels of scaling. ******In order to be a valid FIFO, you have to have a .fifo suffix

SQS is a pull based system, where the consumer pulls messages from the queue.
messages are 256 KB max, for larger - link to it
Visibility Timeout - how long a message is hidden from other consumers after it is pulled from the queue. If the consumer does not delete the message within the visibility timeout, the message becomes visible again and can be pulled by another consumer.

Dead Letter Que - can be used for problem messages. Designed to help you handle recurring failures processing a message in a SQS queue. without it the visibility timeout could run indefinately, but each time the RecieveCount attribute is incremented. we can set a redrive policy which defines the maxReciveCount. if RecieveCount > maxReceiveCount, it moves to dead letter queue. From there you can configure an alarm, and set seperate isolated diagnostic alarms. understand that the message enqueue timestanp is not adjusted when entering the dead letter queue

Billed on requests. A request = 1-10 messages 64KB Total

Short polling: immediate, one req 

Long polling: WaitTimeSeconds up to 20seconds (if messages are available on the queue when you lodge the req, then they will be recieved. otherwise it will wait for messages to arrive, giving more cost effective req usage )

Server Side Encryption at rest with KMS, by defualt message encryption happens in transit.

Access to a queue is based on identity policies or a queue policy(same as s3 bucket policy). Only queue policy can allow access from external accounts.
------------SQS extended client library------------
Use this when messages need to transfer larger than 256KB by storing the large payload in s3. Deleting the message deletes the s3 file - up to 2GB. Versions of this library is available for most modern languages but it often talks about Java primarily. 
-------------SQS Delay Queues---------------------
Allow you to pospone the delivery of messages to consumers. provide an initial period of invisibility for messages. Predefine periods can ensure that processing of messages doesn't begin until this period has expired.
This is different than visibility Timeout. 
We configure a value called DelaySconds on the queue, then messages which are added to the queue start of in an invisible state for that period of time. Max 15 min. 
you cannot use this per-message setting on FIFO Queues

This is used when you need to build in a delay in processing. vs vis timeouts are used to re-do processing if the message wasnt deleted
==============AWS Step Functions===================
Step functions is a product which lets you build long running serverless workflow based applications within AWS which integrate with many AWS services.

designed to address some limitations of lambda. functions should be for one task at a time. Chaining them together is bad practice and gets messy. they are stateless.

Step functions create a state machine, to go from start>states>end. Max duration for step functions is 1 year

Two workflows:
1. standard - default, 1year ececution limit
2. express - for high volume such as IoT, streaming, and tranformation, mobile app backends. Up to 5 minutes.
When you create a state machine you need to choose between the two

State machines can be started via API gateway, IoT Rules, EventBridge, Lambda, or manually. Gererally used for backend processing.

Can use templates in ASL amazon States Language, based on json. Permissions via IAM Roles.

States are basically the 
States:
1. Task - run a lambda function, activity, or step function, a single unit of work inside a task machine. tasks can be integrated with other service like aws batch, dynamoDB, ECS, SNS, SQS, Glue, SageMaker, EMR, StepFunctions
2. Choice - make a decision based on the input, which is output of a task
3. Parallel - run multiple branches in parallel
4. Succeed - end the state machine
5. Fail - end the state machine with an error
6. Wait - wait for a specified amount of time or until a timestamp
7. Pass - do nothing, useful for passing data between states
8. Map - accepts a list of things ie orders, performs actions on each item. 
9. Retry - retry a task if it fails
===============API Gateway======================
API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. API Gateway acts as a front door for applications to access data, business logic, or functionality from your backend services, such as workloads running on Amazon Elastic Compute Cloud (Amazon EC2), code running on AWS Lambda, or any web application.

In the public sphere so connects to other enpoints, public internet, or on premises

This service sits between applications and other integrated services. HA, Scale, auth, throttling, caching, cors, transformation, OpenAPI spec, direct integration are all handled for you. 
So for things like writing into DynamoDB, starting a step function, or sending messages to SNS topics, you might not even need any backend computing. 

Can provide APIs that use http, rest, or websockets. 

Also integrates with cloudwatch logs.

API Gateway can provide a number of auth methods:
1. API Key
2. AWS IAM
3. Cognito User Pools (token)
4. Custom Auth
5. Lambda Authorizer
6. OpenID Connect

There Endpoint Types:
1. Edge Optimized - for low latency, global distribution, caching at edge locations. Routed to nearest cloudfront pop(point of presence)
2. Regional - for low latency, caching at regional edge locations, does not use cloudfront. Suitable when you have users in the same aws region. 
3. Private - for use with VPC endpoints, no caching, no access to the internet

When you deploy an API Configuration in API Gateway, you do so to a stage. for ex Prod and Dev stage
Stages can be enabled for canary deployments. If done, deployments are made to the canary not he stage itelf. When we're happy we can promote the canary to be the full base stage. 

Error codes generated by API Gateway are generally in one of two categories: 
1. Client errors - 4xx
  400 generic, 403 access denied, 429 ecceeded throttle
2. Server errors - 5xx
  500 generic, 502 bad gateway(bad output by lambda) , 503 service unavailable(endpoint offline?), 504 gateway timeout (api gateway timeout = 29s)

API Gateway can be used to create a custom domain name for your API. This is done by creating a domain name in API Gateway, then mapping it to a stage.

Caches can be from 500MB to 237GB default 300 secs, custom from 0 to 3600 seconds. *****Cache can be encrypted
============Kinesis Data Streams================
Kinesis Data Streams is a fully managed service that can ingest large amounts of data per second, durably store the data, and make the data available for real-time analysis. Kinesis Data Streams can continuously capture and store terabytes of data per hour from hundreds of thousands of sources such as web clickstreams, IoT devices, application logs, social media feeds, and financial transactions. You can use Kinesis Data Streams to process and analyze the data in real time or to buffer and replay the data later for batch processing.

Kinesis is HA and regionally resilient by design, in the public space. Default level of persistence is 24hour rolling window. can be increased to 365 days for more money. However much storage you use in that period is included in the price. 

The stream is the basis entity of kinesis. Streams can scale from low levels of data throughput to near infinite.

Producers send data into a kinesis stream. (ec2, onpremise servers, devices, mobile apps, IoT sensors)
Consumers read data from a kinesis stream. there can be many consumers per stream (ec2, lambda, on premise servers )
A stream is defined as: 
1. Name
2. Number of shards
3. Retention period

Shards are the fundamental throughput capacity unit of a stream. Each shard can support up to 1MB/s of data input and 2MB/s of data output. Each shard can support up to 1000 records per second. The more shards the more expensive, and the more performance. 

Data is stored in Kinesis data records max 1MB

Kinesis is great for data analytics and dashboards
==============Kinesis Data Firehose================
Kinesis Data Firehose is a stream based delivery service capable of delivering high throughput streaming data to supported destinations in near realtime, genreally around 1min as aposed to kenisis which is realtime. 

Its a member of the kinesis family and for the PRO level exam it's critical to have a good understanding of how it functions in isolation and how it integrates with AWS products and services.

The thing Kinesis doesnt provide is a persistent store once the data passes the rolling window. Firehose helps solve this by enabling piping into s3, data lake products, data stores, and analytic services. 

Firehose scales automatically, is serverless and resilient
It supports data transormation on the fly using Lambda, but this can add latency

You are billed as you go by amount of data passing through.

Valid Destinations: 
1. S3
2. Redshift - excludes lambda intermediary(it uses s3)
3. ElasticSearch
4. Splunk
5. Lambda
6. HTTP endpoint

Data can come directly from producers or from kinesis stream
==============Kinesis Data Analytics================
Amazon Kinesis Data Analytics is the easiest way to analyze streaming data, gain actionable insights, and respond to your business and customer needs in real time.

it is part of the kinesis family of products and is capable of operating in realtime on high throughput streaming data.

Real-time data processing using SQL

Input data from kinesis stream or Firehose, or can pull static data in s3. 

Supported destinations are:
1. Firehose
2. Redshift
3. S3
4. Elastic Search
5. Splunk
6. Lambda (realtiem)
7. Kenisis Streams (realtime)

A usecase is to enrich live gaming data by enriching relevant info about a player in real-time with SQL relations from reference tables in another DB. Or Time-series analytics...elections, realtime dashboards or leaderboards, security and response teams. 
This is not cheap
===============Cognito User and ID Pools=============
A user pool is a user directory in Amazon Cognito. With a user pool, your users can sign in to your web or mobile app through Amazon Cognito. Your users can also sign in through social identity providers like Google, Facebook, Amazon, or Apple, and through SAML identity providers. Whether your users sign in directly or through a third party, all members of the user pool have a directory profile that you can access through a Software Development Kit (SDK).

Amazon Cognito identity pools (federated identities) enable you to create unique identities for your users and federate them with identity providers. With an identity pool, you can obtain temporary, limited-privilege AWS credentials to access other AWS services. 

As a whole cognito provides authentication and authorization and user management for web/mobile apps
Two main peices of functionality: 
1. User Pools - user directory for your app - main goal is sign-in and get a json web token. But most aws services dont support jwt, you need actual aws credentials. API Gateway does, and Lambda Custom Authorisers do. User pools also provide a builtin customizable web user interface, security features like multifactor auth, check for compromised credentials, takeover protection and phone and email verification. User pools also allow social sign in from other platforms. 
2. Identity Pools - federated identities for your app, main point is to allow you to offer access to temporary AWS credentials, which can be used to access aws resources(guest access). Also, to swap external identity for temporary aws credentials, google facebook twitter and SAML and even user pool identities. ID Pools work by assuming an IAM role on behalf of the identity, which generates temporary credentials. 



*/