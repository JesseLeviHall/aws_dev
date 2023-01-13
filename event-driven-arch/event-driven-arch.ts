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




*/