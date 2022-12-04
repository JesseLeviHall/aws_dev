//orgs and IAM policies
/* 
be able to read and write for the exam. 

IAM policies are JSON documents that define what an identity can do in AWS.

IAM policies are attached to IAM identities (users, groups, and roles) and AWS resources.

-Sid is a section in the policy that allows you to add a statement ID. This is useful for debugging and troubleshooting.

Sid - statement ID
Effect - Allow or Deny
Action - what the user can do
Resource - the resource that the policy applies to.

Priority  - explicit deny always overrides an explicit allow. If you have two statements that allow access to a resource, the statement with the lower priority value wins.

( Deny, Allow, Deny (implicit) ) - implicit deny is the default. If you don't specify an explicit allow or deny, the default is deny.

Inline policies - are policies that are embedded directly in an IAM identity. Best only used for special cases.

Managed policies - are policies that are created separately from IAM identities and then attached to those identities in bulk. 

IAM users are an identity used for anything requiring long term AWS access: human users, applications, and services.

A prinipal is an entity that can be authenticated and authorized to use AWS resources.

Access keys are used for applications and services to access AWS.

An ARN is an Amazon Resource Name. It is a unique identifier for single AWS resources. They are attached to IAM users, groups, and roles.

5,000 users per account
IAM user can be a member of up to 10 groups

IAM groups are a collection of IAM users. They are used to manage permissions for a collection of users. *You cannot log into a group

there is no built in root group, and no nested groups.

resources can have policies too, which allow access from specific identities, or groups of identities.  Done with reference to the ARN of the resource. The resourse policy can not grant access to a group, only an identity. 
*/