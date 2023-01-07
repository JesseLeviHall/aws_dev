/* 
=========CI/CD in aws==============================
CI/CD is handled within AWS by CodeCommit, CodeBuild, CodeDeploy and CodePipeline.
These generally corespond to 4 stages of a development pipeline:
Code (source control), Build, Test, Deploy

the above are all isolated products, and AWS code pipeline brings them together.  

When it comes to architecting a codepipeline there must be a source code stage where the code is kept. 
************ The source must be tied to one and only one branch within a repository.

One common method is to create a Dev pipeline, and a Main pipeline
Each with a source stage which uses AWS CodeCommit. If a commit is added to dev pipeline, it would go through test and build and deploy to maybe elastic beanstalk or other aws services which form part of the dev or test env. 

The main pipeline would be triggered by a commit to the main branch. This would then go through the same stages as the dev pipeline, but would deploy to a production environment.

two files that you need to understand:
Buildspec:
This is a file that is used by AWS CodeBuild to build your application. It is a YAML or JSON file that defines the commands to run, and the environment to run them in.
The buildspec file is stored in the root of your source code repository.

appspec: 
This is a file that is used by AWS CodeDeploy to deploy your application. It is a YAML or JSON file that defines the commands to run, and the environment to run them in.

Code Deploy can deploy out to one or more ec2 instances using a dployment group. Or directly into Elastic Beanstalk or OpsWorks.
deploying to elastic beanstalk requires an environment name. With OpsWorks you need to specify a stack and a layer. Code Deploy can also deploy to cloudformation to create a new stack or update one or create or update and change set. It can also deploy to ECS (elastic containter) and optionally with blue/green deployment model. Code Deploy also deploys to Service Catalog or Alexa Skills Kit. Also, just to store the built version of repo in s3 bucket. 

CodeCommit: 
When you create a repo, you can connect using HTTPS / SSH (keyPair)
with HTTPS: you need to authenticate using a username and password
Both connections are configured in the IAM (users), select user,  sec credentials tab. 

-In repo settings, set notifications or create triggers which say on a commit invoke a lambda function. This where event driven workflows happen

CodePipeline:
continuous delivery service you can use to model, visualize, and automate the steps required to release your software. You can quickly model and configure the different stages of a software release process. CodePipeline is the glue that automates the steps required to release your software changes continuously. 

pipelines are built from stages, you can have as many as you want. 
Each stage has one or more actions, single, sequential or parallel.
Each action has a provider, which is the service that performs the action. Movement between stages can require manual approval. 
Actions within stages can consume or generate artifacts (like files stored on an s3 bucket linked to the pipeline)

Any changes to the state of the pipeline, stages, or actions, generate an event which is published to the event bridge event bus. From there you can use any consumer of events such as lambda or notifications. 

You can interact with pipelines in CloudTrail for monitoring API calls or throught the console UI

CodeBuild:
fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy. With CodeBuild, you don’t need to provision, manage, and scale your own build servers. CodeBuild scales continuously and processes multiple builds concurrently, so your builds are not left waiting in a queue.
You only pay for the compute resources consumed during build process. 
Designed to be alternative to something like Jenkins. 
- Used for both build and test environments.
- Can be used to build artifacts for deployment to AWS services such as Elastic Beanstalk, AWS Lambda, or Amazon ECS.
- Can be used to build artifacts for deployment to on-premises servers.
- Can be used to build artifacts for deployment to any server that can access the artifacts in an Amazon S3 bucket.
- Uses docker for build env by default, can be customized. 
- integrates with KMS for encryption, IAM for permissinos, VPC for networking, CloudTrail for API or auditing, s3 and cloudwatch for logs and can store build metrics there. It pushes build events to eventbridge

Architecturally, it gets source from github, codecommit, codepipeline, or s3. Then builds and tests.  This is customized using the buildspec.yml (this file HAS to be in the root of the source) SPELLED buildspec.yml
The buildspec.yml has four parts (phases):
It defines ENV variables, inc from parameter store or secrets-manager, and the Artifacts(what stuff to put where)
- install: install base levels of env (frameworks, not dependencies)
- pre_build: sign into things or install package dependencies
- build: build commands
- post_build: push docker image, explicit notifications

CodeDeploy:
a deployment service that automates application deployments to Amazon EC2 instances, on-premises instances, serverless Lambda functions, or Amazon ECS services.
- Deploys Code, not resources 
- Can be used to deploy code, prebuilt apps, web, configuration, EXE files, Packages, Scripts, media and more. 
- Integrates with other aws services esp AWS Code* Tools
- To use codedeploy on-premises or on EC2 you have to have an agent installed which communicates with the product and performs deploys when instructed. 

This Tool is based on the appspec.yml or JSON file which defines deployments - config + lifecycle event hooks

- Config: defines Files(EC2/ON-Premise): Which things are installed.
 Resources(ECS/Lambda):Name, Alias, Current Version and Target Version for Lamda. And task defs or container port details for ECS. 
 Permissions(EC2/On-Premises): special permission and how they should be applied to the files directories and folders of the Files Section.
 The things that surround deployment but not the core of deployment itself. 
- Lifecycle event Hooks: IF you use ec2 or on-premise, 
  then each of these lifecycle event hooks run one or more scripts. If you use lambda or ecs, then each of these hooks specify lambda functions to run during each stage of the deployment lifecycle. 
  **********
  Remeber this: ApplicationStop(prepare for deploy), DownloadBundle(when the codeDeploy agent copies the app to a temp location),BeforeInstall(decrypt files, create backup, other configuration), Install(copy the temp files to the final dest. You cant run any scripts during this setp), AfterInstall(changing file permissions, apply licensing), AppStart(restart the stopped app), ValidateService*(allows codedeploy to determine if the deployment was successful or not, check application logs, perform tests)
  *ValidateService is only for ECS and Lambda
  
ECR Elastic Container Registry
- A fully managed Docker container registry that makes it easy for developers to store, manage, and deploy Docker container images.
- Each AWS account has a public and a private registry.
- Each registry can have many repositories (like GitHub)
- Each repository can have many images 
- Each image can have many tags (each must be unique whithin registry)

A public registry gives read only access. read/write requires permission
  Anyone can pull, but to push you need permissions
A private registry requires permission for read or read/write

ECR is integrated with IAM, so you can use IAM policies to control access to your repositories and images.

Image scanning Basic or Enhanced
- Enhanced scans images OS or Packages for vulnerabilities and notify you when new vulnerabilities are found. 

Near realtime metrics to cloudwatch EG: Auth, push, pull

ECR logs all API actions into CloudTrail, and generates events to eventbridge providing event driven workflow involving container images. 

Offers replication accross regions and accross acounts. 
======================================================
STAGE 1 : Configure Security & Create a CodeCommit Repo
STAGE 2 : Configure CodeBuild to clone the repo, create a container image and store on ECR
STAGE 3 : Configure a CodePipeline with commit and build steps to automate build on commit.
STAGE 4 : Create an ECS Cluster, TG's , ALB and configure the code pipeline for deployment to ECS Fargate



*/