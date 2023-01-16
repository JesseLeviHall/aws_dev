/* 
==============Elastic Beanstalk=================
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










*/