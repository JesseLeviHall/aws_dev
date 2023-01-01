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
- Defines the Image and PORT, points to the container in the registry and defines exposed ports. 
- A container definition is required to run Docker containers in Amazon ECS.
- A container definition is a JSON document that describes a single container.
- You must specify at least the image parameter in a container definition.


Task Definitions:
- Security and container(s) resources 
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
- Service Definitions help provide high availability and scalability by replacing failed tasks or distributing load accross multiple copies of the same task. 

Basically, you deploy a cluster, then deploy tasks and services to the cluster. 


========Cluster types: ec2 v Fargate==============
With EC2 mode you pay for the EC2 instances regardless of container usage

Fargate mode uses shared AWS infrastructure, and ENI's which are injected into your VPC

You pay only for container resources used while they are running.

This lesson steps through the key architectures of both.

start with ECS management components - lay ground works
________EC2 MODE _____
An ECS cluster is created within a VPC in your account - this benefits from the multiple AZ's in your VPC 

When you run ECS in EC2 mode, you have full control over the instances that are used to host your containers. You can choose the instance type, network configuration, and other settings for your instances, and you are responsible for managing the instances and the underlying operating system.

EC2 mode is well-suited for applications that require a high degree of customization or that need to be tightly integrated with other AWS services. It is also a good option if you have existing EC2 instances that you want to use to host your containers.

_________FARGATE MODE________
Fargate mode allows you to run ECS containers without the need to manage the underlying EC2 instances. Fargate takes care of all of the infrastructure management for you, making it easier to get started with ECS and focus on developing and deploying your applications.
This is running in the Fargate Shared Infrastructure platform. 
Fargate still deploys a cluster in a VPC on your account in AZ's, but the fargate shared resources get injected into your vpc and is given an Elastic Net Interface (ENI) IP address within the VPC. 
You can have it create a new VPC or use a custom one you have already designed. 

-If your biz already uses containers, has large workloads and is price contious, ECS EC2 mode maybe a good option(with spot pricing especially). If containerization is not needed, just run an EC2. 

-If your biz is new to containers, and is not price contious, ECS Fargate mode is a good option, because of the reduction in overhead management setting up the ec2 mode system. 

-Small biz / burst workloads, Fargate maybe best option . 
-Batch or periodic workloads, Fargate. 

-Using default VPC in fargate already configures instances with public IPs, otherwise you need to give a CIDR block and subnet ips. In AWS, CIDR blocks are used to specify the range of IP addresses that are allowed to access a particular resource. For example, you might specify a CIDR block for a VPC to specify the range of IP addresses that are allowed to access resources within the VPC. You can also use CIDR blocks to specify the range of IP addresses that are allowed to access a security group or an Amazon S3 bucket.

First we create a cluster in default VPC, create a task definition, create contianer definition, set it to docker image, give port number and soft memory limit. create it. 
Then go to clusters, click the cluster, and the task tab, hit run a new task... select the fargate run type and linus operating sys, scroll down and deploy into the default VPC and select two subnets to give capacity, after it is running, click the task link, the public ip will be there. 

==========Kubernetes 101=========
Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery. Kubernetes builds upon 15 years of experience of running production workloads at Google, combined with best-of-breed ideas and practices from the community.

-Cluster - 
A cluster is a set of nodes that run containerized applications. A deployment of Kubenetes, management, orchestration.

-Node -
A node is a worker machine in Kubernetes, previously known as a minion. A node may be a VM or physical machine, depending on the cluster. Each node is managed by the master. A node has the services necessary to run pods and is managed by the master components. The services on a node include the container runtime, kubelet and kube-proxy. See Working with nodes for more details.

-Pods-
A pod (as in a pod of whales or pea pod) is a group of one or more containers (such as Docker containers), with shared storage/network, and a specification for how to run the containers. A pod's contents are always co-located and co-scheduled, and run in a shared context. A pod models an application-specific "logical host": it contains one or more application containers which are relatively tightly coupled. In non-cloud contexts, applications executed on the same physical or virtual machine are analogous to cloud applications executed on the same logical host.

-Service-
A Kubernetes Service that identifies a set of pods using label selectors. Unless mentioned otherwise, Services are assumed to have virtual IPs only routable within the cluster network.

-Job-
A Job creates one or more Pods and ensures that a specified number of them successfully terminate. As pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete. Deleting a Job will clean up the Pods it created.

-Ingres-
An Ingress is a collection of rules that allow inbound connections to reach the cluster services.

-Ingress Controller - 
An Ingress Controller is responsible for fulfilling the Ingress, usually with a loadbalancer, though it may also configure your edge router or additional frontends to help handle the traffic in an HA manner. EG AWS Load Balance Controller uses ALB/NLB, also Enginx. 

any storage in Kubernetes is ephemeral. 

-Persistant Storage- 
Persistent storage is a storage volume that is provisioned for a specific purpose. The data in a persistent volume exists independently of the lifecycle of any individual pod that might use it. This data is preserved even if the pod is deleted, the node it runs on is deleted, or the cluster itself is deleted.

==========EKS Elastic Kubernetes Service=========
EKS is a managed Kubernetes service. It runs the Kubernetes control plane for you across multiple AWS availability zones to eliminate a single point of failure. EKS is certified Kubernetes conformant so you can use existing tooling and plugins from the Kubernetes community. Applications running on EKS are fully compatible with applications running on any standard Kubernetes environment, whether running in on-premises data centers or public clouds. This means that you can easily migrate any standard Kubernetes application to Amazon EKS without any code modification required.

-Outposts, EKS Anywhere, Eks Distro
-Integrates with aws services: ECR, ELV, IAM, VPC
-Managed control plane scales and runs on multiple AZs
-EKS Cluster = EKS control plane and EKS Nodes
-etcd distributed across multiple AZs
-Nodes - self managed, managed node groups or fargate pods
-Node groups - EC2 instances, managed by EKS control plane
-storage providers - EBS, EFS, FSx Lustre, FSz for NetApp ONTAP
=============

*/