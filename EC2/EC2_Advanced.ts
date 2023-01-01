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

Configuration settings and precedence

The AWS CLI uses credentials and configuration settings located in multiple places, such as the system or user environment variables, local AWS configuration files, or explicitly declared on the command line as a parameter. Certain locations take precedence over others. The AWS CLI credentials and configuration settings take precedence in the following order:

Command line options – Overrides settings in any other location. You can specify --region, --output, and --profile as parameters on the command line.

Environment variables – You can store values in your system's environment variables.

CLI credentials file – The credentials and config file are updated when you run the command aws configure. The credentials file is located at ~/.aws/credentials on Linux or macOS, or at C:\Users\USERNAME\.aws\credentials on Windows. This file can contain the credential details for the default profile and any named profiles.

CLI configuration file – The credentials and config file are updated when you run the command aws configure. The config file is located at ~/.aws/config on Linux or macOS, or at C:\Users\USERNAME\.aws\config on Windows. This file contains the configuration settings for the default profile and any named profiles.

Container credentials – You can associate an IAM role with each of your Amazon Elastic Container Service (Amazon ECS) task definitions. Temporary credentials for that role are then available to that task's containers. For more information, see IAM Roles for Tasks in the Amazon Elastic Container Service Developer Guide.

Amazon EC2 instance profile credentials – You can associate an IAM role with each of your Amazon Elastic Compute Cloud (Amazon EC2) instances. Temporary credentials for that role are then available to code running in the instance. The credentials are delivered through the Amazon EC2 metadata service. For more information, see IAM Roles for Amazon EC2 in the Amazon EC2 User Guide for Linux Instances and Using Instance Profiles in the IAM User Guide.


*/