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









*/