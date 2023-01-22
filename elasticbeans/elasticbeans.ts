/* 
==============Elastic Beanstalk=================
Charded only for the resources created by EB have a charge
Elastic Beanstalk is a Platform as a Service (Paas) environment which can create and manage infrastructure for application code.
Allows you to focus on code, low infrastructure overhead, it is fully customizable. it uses cloudformation under the hood. Requires the code to integrate with aws stuff. 


Beanstalks in different languages are refered to as platforms. There are three types: 
1. Preconfigured platforms:
    - Node.js
    - Python
    - PHP
    - Ruby
    - Go
    - Docker
    - Tomcat
    - .NET
2. Custom platforms via Packer:
    - You can create your own platform, use docker to run anything not natively supported. 
3. Multi-container platforms:
    - You can create your own platform with multiple containers

Beanstalks are made up of 3 components:
1. The Application:
    - A container for everything related to an app including infrastructure and resources.
2. Application version:
    - Specific labeled version of deployable code for an application. The source bundle is stored in s3 as zip or WAR files
3. Environment:
    - There are one or more per application
    - Containers of infrastructure and configurations that specific application versions are deployed into. EG env: prod, test, dev
    - when you create an env you have to specify a tier. either a web server tier or a worker tier.  Server tier is desinged to communicate with end users while worker tier is designed to process work in some way for the web server tier
    - Both env Tiers have within them autoscaling groups
    - The web servier tier coms with end user reqs via elastic load balancer, work is passed into SQS queue as messages, then they are recieved by the worker tier, which scales based on the size of the queue.
    - Each env has its own dns cName, a cname swap can exchange tow env's DNS - blue green deployment

Default practice is to provision DB's outside of Beanstalk
===================Deployment Policies=================
AWS Elastic Beanstalk provides several options for how deployments are processed when being deployed into environments, including deployment policies (Types):
All at once - all instances, brief outage, not great for prod
Rolling - deploy in baches, health check along the way. loss in capacity as baches are deployed. (two versions running at he same time while deploying)
Rolling with additional batch - maintain capacity while deploying, additional cost (two versions at once while deploying)
Immutable - all new instances created with new deployment, then dropped in place of old version. safe, easy to roll back.
Traffic splitting - same as immutable but split traffic to new deployment so you can A/B test before fully moving to new deployment. Costs more for the additional instances during dep.
Blue/Green - make a new env then switch dns records in CNAME swap or R53

 options that let you configure batch size and health check behavior during deployments.

If you perform version updates often, you need to set up some lifecycle management in the console to erase old bundles from s3
================lifecycle and decoupling rds=======
the process for database decoupling:
Take snapshot of RDS, Enable Delete Protection on the RDS instance, create new EB env with same app version, ensure the new env connects to the new DB, then swap the DNS records so the new env points to the decoupled db, then terminate old env which will fail to delete the db, go to cloudformation and manually delete and pick to retain stuck resources (RDS instance).
To create an rds instance for an EB, you need to point the env propties: RDS_HOSTNAME, 
RDS_PORT, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME to the rds instance.
===============EB Extensions========================
You can add AWS Elastic Beanstalk configuration files (.ebextensions) to your web application's source code to configure your environment and customize the AWS resources that it contains. Configuration files are YAML- or JSON-formatted documents with a .config file extension that you place in a folder named .ebextensions and deploy in your application source bundle.

.config files in the .ebextensions folder

option_settings allows you to set options of resources
resources allows entirely new resources (eg elasticache redis)
files allows you to add files to the env
commands allows you to run commands on the env
packages allows you to install packages on the env
container_commands allows you to run commands on the container... many more
===============EB and HTTPS=======================
you need to apply an SSL cert to the load balancer directly, via EB console => environment => load balancer config.  OR eb extensions/securelistener-[alb|nlb].config and update your security group configuration to allow port 443 to access loacbalancer and allow load balncer to connect to instances on relevant ports
================EB Cloning================
You can use an existing Elastic Beanstalk environment as the basis for a new environment by cloning the existing environment. For example, you might want to create a clone so that you can use a newer version of the platform branch used by the original environment's platform. Elastic Beanstalk configures the clone with the same environment settings used by the original environment. By cloning an existing environment instead of creating a new environment, you don't have to manually configure option settings, environment variables, and other settings. Elastic Beanstalk also creates a copy of any AWS resource associated with the original environment. However, during the cloning process, Elastic Beanstalk doesn't copy data from Amazon RDS to the clone. After you create the clone environment, you can modify environment configuration settings as needed.
================Using Docker===============
AWS Elastic Beanstalk can launch Docker environments by building an image described in a Dockerfile or pulling a remote Docker image. If you're deploying a remote Docker image, you don't need to include a Dockerfile. Instead, if you are also using Docker Compose, use a docker-compose.yml file, which specifies an image to use and additional configuration options. If you are not using Docker Compose with your Docker environments, use a Dockerrun.aws.json file instead.

EB Structure: Application => Environment => Application Version

q: Which of the following refers to the file you provide Elastic Beanstalk with your application?
a: Source bundle

q: What are valid file formats for providing EB with an application?
a: .zip, .war


*/