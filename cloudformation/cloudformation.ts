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

==================Cross Stack References=============
*/