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

*/