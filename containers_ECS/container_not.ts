/* 
Virtualization means running different OS's on on peice of hardware. 
Containers on the other hand, are a way to run multiple isolated processes on a single OS instance.

On ec2 for example it would be a waste to run the same OS on mubliple instances and a different app on each instance, just use containers to use one instance and run multiple apps on that instance in seperate environments(containers)

Container Images are:
- A read-only template with instructions for creating a running container, built using a differential architecture. 
- some layers include the base or scratch FileSystem, then sofware packages and web server, then final customizations at the top

The Docker Container is then a running copy of the image with a read/write file sys layer instead of read only. The lower layers are shared between running containers generally, making saling up on the same os really efficient. 

Docker is a containerization platform that allows you to build, ship, and run distributed applications.
Docker Files are used to buile images, and these can be kept on docker hub like github but for docker. 

Ports are 'exposed' to the host and beyond


Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

========Elastic Container Service (ECS) Concepts========
ECS is a container orchestration service that allows you to run and scale containerized applications on AWS. Takes away a lot of the overhead of self managing containers. 

the run in two modes: 
- EC2: you manage the EC2 instances that run your containers in ECS sofware
- Fargate: you let AWS manage the EC2 instances that run your containers

The elastic container registry (ECR) is equiv to docker hub, where you keep your images. 

Container Definitions:
- A container definition is required to run Docker containers in Amazon ECS.
- A container definition is a JSON document that describes a single container.
- You must specify at least the image parameter in a container definition.


Task Definitions:
- A task definition is required to run Docker containers in Amazon ECS.
- A task definition is a JSON document that describes one or more containers that form your application.
- You must specify at least one container definition in a task definition.
- You can optionally specify additional parameters that control your application's networking, volumes, logging, and other details.
-A task role is an IAM role that a task can assume. Task roles are the best practice way of giving containers in ECS permissions to access AWS products and services. 
Task Definitions are used to run containers in ECS.

Clusters:
- A cluster is a logical grouping of tasks and services that share the same networking configuration and deployment configuration.
- You can run multiple tasks and services on a single cluster.
- You can run multiple clusters within a single AWS account.
- You can run multiple clusters across multiple AWS accounts.

Clusters are used to run tasks and services in ECS.

Services:
- A service is a logical grouping of tasks that are all running the same container image.
- You can run multiple tasks on a single service.
- You can run multiple services on a single cluster.
- You can run multiple services across multiple clusters.

Services are used to run tasks in ECS.

*/