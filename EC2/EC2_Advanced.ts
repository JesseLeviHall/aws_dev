/* 
==========BootStrapping EC2 using User Data=========
EC2 Bootstrapping is the process of configuring an EC2 instance to perform automated install & configuration steps 'post launch' before an instance is brought into service.

With EC2 this is accomplished by passing a script via the User Data part of the Meta-data service - which is then executed by the EC2 Instance OS

User Data is a part of the EC2 Meta-data service - which is a collection of information about the EC2 instance that is available to the instance itself.
  curl http://169.254.169.254/latest/user-data
Anything in User Data is executed by the instance OS ONCE, at Launch, uninterpreted...so it has to something it understands and is functional because theres no error handling. As such its a powerful feature but risky. 

User Data is a great way to automate the installation of software on an EC2 instance, but it is not secure, so dont pass longterm credentials ideally. 

User Data is limited to 16KB in size, so if you need to pass a larger script, you can use S3 or CloudFormation to pass a script to the instance.

User Data can be modified when an instance is stopped.

Optimal automated EC2 creation is a combo of AMI Baking and Bootstrappping. Example: add userdata to cloudformation yaml...UserData:
        Fn::Base64: !Sub |

Manually entering User Data by defualt is accepted as base64 encoded, but does it automatically unless you already encoded it, then select the already encoded box

to see what user-data was run:
curl http://169.254.169.254/latest/user-data
cd /var/log   // enter log folder
ls -la //show log files
two files of interest: cloud-init.log and clout-init-output.log
sudo cat cloud-init-output.log // shows the user data script

Because the user-data is visible - security credentials shouldnt not be included, a best practice option is SSM Parameter Store (below)

==========EC2 Instance Roles===========
EC2 Instance Roles are a way to assign permissions to EC2 instances without having to pass credentials to the instance.
EC2 Instance roles and Instance Profiles are how applications running on an EC2 instance can be given permissions to access AWS resources on your behalf.

Credentials are inside meta-data
iam/security-credentials/role-name
aws s3 ls
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

curl http://169.254.169.254/latest/meta-data/iam/security-credentials/A4LInstanceRole

Short Term Temporary credentials are available via the EC2 Instance Metadata and are renewed automatically by the EC2 and STS Services.

To attatch a role in the console, right click and hit modify IAM role - select the role or create new. 
When you create an instance role in the console, and instance profile is created with the same name. But when you use the comand line or cloud formation, you need to create the two things seperately. 

********Security Ethos: Roles should always be used in place of storing long term credentials. eg(access keys)
CLI tools use ROLE credentials automatically. 

Configuration settings and precedence: whenever you use the comand line interface to connect to aws each of these are checked in this order:

The AWS CLI uses credentials and configuration settings located in multiple places, such as the system or user environment variables, local AWS configuration files, or explicitly declared on the command line as a parameter. Certain locations take precedence over others. The AWS CLI credentials and configuration settings take precedence in the following order:

1 Command line options – Overrides settings in any other location. You can specify --region, --output, and --profile as parameters on the command line.

2 Environment variables – You can store values in your system's environment variables.

3 CLI credentials file – The credentials and config file are updated when you run the command aws configure. The credentials file is located at ~/.aws/credentials on Linux or macOS, or at C:\Users\USERNAME\.aws\credentials on Windows. This file can contain the credential details for the default profile and any named profiles.

4 CLI configuration file – The credentials and config file are updated when you run the command aws configure. The config file is located at ~/.aws/config on Linux or macOS, or at C:\Users\USERNAME\.aws\config on Windows. This file contains the configuration settings for the default profile and any named profiles.

5 Container credentials – You can associate an IAM role with each of your Amazon Elastic Container Service (Amazon ECS) task definitions. Temporary credentials for that role are then available to that task's containers. For more information, see IAM Roles for Tasks in the Amazon Elastic Container Service Developer Guide.

6 Amazon EC2 instance profile credentials – You can associate an IAM role with each of your Amazon Elastic Compute Cloud (Amazon EC2) instances. Temporary credentials for that role are then available to code running in the instance. The credentials are delivered through the Amazon EC2 metadata service. For more information, see IAM Roles for Amazon EC2 in the Amazon EC2 User Guide for Linux Instances and Using Instance Profiles in the IAM User Guide.

*****If you manually configure any long term credentials for the CLI tools as part of using aws configure, then they will take precidence over an instance profile.  But, you can re-use the instance profile to give instances a BEST practice way of providing them with access to aws products and services. 

==========SSM (sys manager) Parameter Store============
The SSM Parameter store is a service which is part of Systems Manager which allows the storage and retrieval of parameters either
 string, stringlist or secure string.
 
Usecase: License codes, Database Strings, Full Configs and Passwords. 

Supports Hierarchies adn versioning, changes can create events

PlainText and Ciphertext

The service supports encryption which integrates with KMS, versioning and can be secured using IAM.

The service integrates natively with many AWS services - and can be accessed using the CLI/APIs from anywhere with access to the AWS Public Spare Endpoints.

No cost using default settings. 

The permission to interact with encrypted strings comes from KMS wich is seperate from the permission to access perameters in the perameter store. Add --with-decryption to the get perameters command. 

========Install Cloudwatch Agent in EC2=======
Cloudwatch agent is a software agent that collects metrics and logs from EC2 instances and sends them to Cloudwatch.
-Adding cloudwatch agent requires Agent Configuration and Permissions. 
BEST practice for this type of architecture is to create and IAM role with permission to access cloudwatch logs. At scale this can be configured in cloudformation, using the Perameter Store to hold the Agent configurtion perams. 

===============Placement Groups===========
Placement groups are a way to group EC2 instances together in a single AZ.
Placement groups are used to optimize network performance for applications that have strict latency requirements, high network traffic, or both.
Placement groups are not free, they cost more than a standard EC2 instance.

-Cluster = Pack instances close together
  have to be launched in to single AZ - So as to use same rack, and even same ec2 host = direct connections = speed 10GB/S 
  1 AZ can be used by a cluster
  Offer little to no resilience because - cannot span AZs
  Can Span VPC Peers but big negative impact
  requires supported Instance Type, recommend same types for all, and launched all together. 

-Partition = Keep Instances separated
  designed for infrastructure with more than 7 instances per AZ but still distinct physical resources. Large scale parallel processing systems with HA and resiliency. 
  You control what instances go to which partition, so you can be sure replicated apps are on distinct resources.
  typology aware apps with HBase, Cassandra, HDFS

-Spread = groups of instances spread apart
  designed to give most HA and resiliancy = Distint racks and hosts per instance
  7 instances per group
  7 instances per AZ
  Not supported for dedicated instances or hosts

======enhanced networking and EBS Optimized============
- Enhanced networking is the AWS implementation of SR-IOV, a standard allowing a physical host network card to present many logical devices which can be directly utilized by instances.

This means lower host CPU usage, better throughput, lower and consistent latency
Higher packets-per-second PPS
No Charge - available on most EC2 Types

- EBS Optimized is a feature that allows you to get more IOPS from your EBS volumes.
  This is done by using a different network interface on the host, and is available on most instance types by default.
  EBS optimization on instances means dedicated bandwidth for storage networking - separate from data networking.
  ====================

q: How many AZs can be used by a cluster placement group?
a: 1

q: How many instances can be within a spread placement group
a: 7 per AZ

q: What is true of pricing for dedicated hosts?
a: You pay for the host and there is no charge for EC2 instances running on a dedicated host. 

q: how often does USer-Data get executed?
a: Once when provisioned, not when stopped then started. 

q: What is the difference between a placement group and a cluster?
a: A placement group is a logical grouping of instances within a single AZ. A cluster is a logical grouping of instances within a single AZ that are designed to provide low network latency, high network throughput, or both.
*/