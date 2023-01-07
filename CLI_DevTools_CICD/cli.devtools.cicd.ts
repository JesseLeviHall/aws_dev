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


*/