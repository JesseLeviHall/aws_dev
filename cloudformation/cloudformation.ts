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









*/