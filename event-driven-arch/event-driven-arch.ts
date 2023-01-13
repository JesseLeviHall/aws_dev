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
2. The resource policies - controls what can interact with a specific lambda function. Simmilar to s3 bucket policy. can manually change this via CLI or API, but currently not in the console UI
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
===============Cloudwatch Events and Event Bridge=====
- Cloudwatch Events is a serverless event bus that you can use to connect AWS services together.








*/