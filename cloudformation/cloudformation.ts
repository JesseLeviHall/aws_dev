/* 
CloudFormation is for automated templated physcial and logical resource creation

It begins with a template, yaml or json. 
template defines logical resources - the 'what'
templates are define the stack
stacks are physical resources - the 'how'

If the template chages the resources in the stack change

Non-portable templates are not best practice. 

Template Parameters: 
    - allow for reuse of templates with default values, allowed values, min and max length and allowed patterns, NoEcho and Types. 
    - accept input via console/CLI/API

Pseudo Parameters:
    - Values injected into the template by AWS in processing
    - AWS::AccountId

=========Intrinsic Functions================
Use intrinsic functions in your templates to assign values to properties that are not available until runtime.
Fn::Base64 & Fn::Sub
Ref & Fn::GetAtt
Fn::GetAZs & Fn::Select
Fn::Join & Fn::Split
Conditions(Fn::If, And, Equals, Not & Or)
Fn::Cidr to ref the IP range of a vpc - how many subnets to make from the input vpc range - limited to parent range, cant update CIDR Ranges from template.
=====================Mappings================
The optional Mappings section matches a key to a corresponding set of named values. For example, if you want to set values based on a region such as AMI, you can create a mapping that uses the region name as a key and contains the values you want to specify for each specific region. You use the Fn::FindInMap intrinsic function to retrieve values in a map.
=====================Outputs================
The optional Outputs section declares output values that you can import into other stacks (to create cross-stack references), return in response (to describe stack calls), or view on the AWS CloudFormation console. For example, you can output the S3 bucket name for a stack to make the bucket easier to find. 
- Visible when using CLI and console UI
- Accessible from a parent stack when using nesting
- Can be exported allowing cross-stack references
================Conditions===========================
The optional Conditions section contains statements that define the circumstances under which entities are created or configured. You might use conditions when you want to reuse a template that can create resources in different contexts, such as a test environment versus a production environment. In your template, you can add an EnvironmentType input parameter, which accepts either prod or test as inputs. Conditions are evaluated based on predefined pseudo parameters or input parameter values that you specify when you create or update a stack. Within each condition, you can reference another condition, a parameter value, or a mapping. After you define all your conditions, you can associate them with resources and resource properties in the Resources and Outputs sections of a template
- If a resource does not have a condition it is created regardless
- When the condition key val is present, the resource is only created if it evals to true. 
- Evaluated to True or False
- Processed before resources are created
- IF And Equals Not Or
==============DependsOn==========================
With the DependsOn attribute you can specify that the creation of a specific resource follows another. When you add a DependsOn attribute to a resource, that resource is created only after the creation of the resource specified in theDependsOn attribute.
- CloudFormation does things in parallel, and creates a dependency order. this allows you to explicitly configure parts the dependency order. 
-EX: creating an elastic IP associated with an ec2 in a subnet in a VPC that you create in the same template, this requires an Internet Gateway attacehd to the VPC. But there would be no dependency in the template to ref. Use DepndsOn to only create elastic IP after Internet Gateway attaches, after the VPC
======WaitContition, Creation Policy, dfn-signal===========
CreationPolicy, WaitConditions and cfn-signal can all be used together to prevent the status of a resource from reaching create complete until AWS CloudFormation receives a specified number of success signals or the timeout period is exceeded.The cfn-signal helper script signals AWS CloudFormation to indicate whether Amazon EC2 instances have been successfully created or updated.
- cfn-signal: tell sfn to hold for X number of successes, wait for timeout(12 hour max), if success signals recieved..then create complete or if failure, creation (stack) fails
-AWS suggest that when creating ec2 or auto-scaling groups you should use creation policies because its tied to the specific resource you are handling.
- If you have other requirements to signal outside of a specific resource (an external it sys) then you should use a wait condition.
_A wait condition is a specific logical resource, not something defined in an existing resource
_A wait condition can depend on other resources and ohter resources can depend on the waitcondition 
_A wait contition relies on an awaitHandle - another logical resource who's sole job is to create a presigned url which can be used to send signals to. Then we can use !GetAtt WatCondition.Data to query signal responses. 
==================Nested Stacks=======================
Nested stacks allow for a hierarchy of related templates to be combined to form a single product

A root stack can contain and create nested stacks .. each of which can be passed parameters and provide back outputs.

Nested stacks should be used when the resources being provisioned share a lifecycle and are related.

-Stack resource limit 500
-Stacks cant easily reference other stacks, so for complex projects or ones that use more than one stack, there are two popular optios, nested stacks and cross stack references
- Outputs of the nested stack are returned to the root stack, and then they can be refed ustin stack.outputs.xxxx
-you can only reference outputs when using nested stacks, not the logical resources. the outputs can be perameters to other stacks. 

- Choosing between using a nested stack and cross stack:
    - If you want to be able to re-use the template to deploy the same architecture more than once, nested stack is better. 
    - Generally nested stacks are used when everything you create is part of the same solution, lifecycle linked. 
    - Nested stacks can overcome the 500 resource limit
    - Nested stacks can be used to create a hierarchy of stacks
    - Modular templates to reuse code, make installation easier
==================Cross Stack References=============
Cross stack references allow you to reference resources in one stack from another stack.

Outputs in one stack reference logical resources or attributes in that stack

They can be exported, and then using the !ImportValue intrinsic function, referenced from another stack.

Example: one account running a vpc stack in us-east-1, we want it to be a shared services vpc which can be used by other stacks. Make sure anything we want to share is added as an output (Outputs:SHAREDVPCID, Value: !Ref VPC, Export: SHAREDVPCID) Then it can be imported to the new stack. 
-This only works in the same region. 

Cross stack refs are useful when you want to implement service-oriented architectures, providing services from one stack to another.  OR if you have microservies with different lifecycles. 

Basically nested stacks re-use templates, while cross stack re-uses resources. 
==================Stack Sets=========================
StackSets are a feature of CloudFormation allowing infrastructure to be deployed and managed across multiple regions and multiple accounts from a single location.

Additionally it adds a dynamic architecture - allowing automatic operations based on accounts being added or removed from the scope of a StackSet.

- StackSets are containers that contain stack instances (references) They are not stacks themselves

-security = either self-managed roles or service-managed roles. 
Service managed roles are 
-Service managed roles are when we use CFN in conjunction with aws organizations to automatically manage the roles. Self-managed is managing all the permissions yourself duh. 

In A4L example: An admin account has a CFN template, used in a stackset to create s3 buckets in target accounts in other regions. 

concurrent accouts:
If you are deploying a stackset which is deploying resources in to say 10 different target accounts, and you define a concurrent account value of 2, then only two accounts can be deployed into at any one time, which means that over 10 accounts you'll be doin five sets of two. (the more concurrent accounts that you set, in theory, the faster the resources will be deployed as part of a stackset)

Failure tolerance: 
If you are deploying a stackset which is deploying resources in to say 10 different target accounts, and you define a failure tolerance value of 2, then if two accounts fail to deploy, the stackset will still be considered to be deployed successfully.

Retain Stacks: 
If you are deploying a stackset which is deploying resources in to say 10 different target accounts, and you define a retain stacks value of true, then if you delete the stackset, the stacks that were deployed as part of the stackset will not be deleted.
============Deletion Policy================
The DeletionPolicy attribute allows you to specify what happens to a resource when it is deleted from a stack.

With the DeletionPolicy attribute you can preserve or (in some cases) backup a resource when its stack is deleted. You specify a DeletionPolicy attribute for each resource that you want to control. If a resource has no DeletionPolicy attribute, AWS CloudFormation deletes the resource by default.
...Delete(default), Retain or if supported Snapshot(EVS volume, elasticach, neptune, rds, redshift)
- Only applies to deletions, not replaces. 
===========Stack Roles====================
Stack roles allow an IAM role to be passed into the stack via PassRole

A stack uses this role, rather than the identity interacting with the stack to create, update and delete AWS resources.

It allows role separation and is a powerful security feature, because the identity creating the stack doesnt need resource permissions -  only PassRole permissions. 
============CFN-INIT=========================
Runs once as part of bootstrapping via user data
CloudFormationInit (the tool) and cfn-init(the script) are tools which allow a desired state configuration management system to be implemented within CloudFormation

Use the AWS::CloudFormation::Init type to include metadata on an Amazon EC2 instance for the cfn-init helper script. If your template calls the cfn-init script, the script looks for resource metadata rooted in the AWS::CloudFormation::Init metadata key. cfn-init supports all metadata types for Linux systems & It supports some metadata types for Windows
- compared to User-Data, User-Data is a HOW procedure, whereas CFN Init is a What (Desired State)

- Essentially you are defining what you want to occur but leaving it up to the system as to how that occurs. This means it can be cross platform, and cross OS
- cfn-init is idempotent, meaning: 
    - if you run it twice, it will only run the changes that are required. (if something is already in a certain state, it will leave it in that same state. )
=============CFN-HUP===================
The cfn-hup helper is a daemon that detects changes in resource metadata and runs user-specified actions when a change is detected. This allows you to make configuration updates on your running Amazon EC2 instances through the UpdateStack API action.
-you have to install into ec2 as part of the initial boostrap process. It will detect metadata changes and re-run cfn-init to apply that change.
===================Change Sets===================
When you need to update a stack, understanding how your changes will affect running resources before you implement them can help you update stacks with confidence. Change sets allow you to preview how proposed changes to a stack might impact your running resources, for example, whether your changes will delete or replace any critical resources, AWS CloudFormation makes the changes to your stack only when you decide to execute the change set, allowing you to decide whether to proceed with your proposed changes or explore other changes by creating another change set.
-Go to change set tab in stack console
==================Custom Resources====================
Custom resources enable you to write custom provisioning logic in templates that AWS CloudFormation runs anytime you create, update (if you changed the custom resource), or delete stacks

Custom resources let CFN integrate with anything it doesnt yet, or doesnt natively support





*/