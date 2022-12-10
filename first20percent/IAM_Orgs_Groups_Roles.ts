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

IAM roles are a temporary identity that you can use to grant permissions to AWS resources. they are not IAM users.

New users have no permissions when first created.
You need to attach custom JSON permissions or a stock policy to them. 

q: what is the difference between an IAM user and an IAM role?
a: IAM users are for long term access, and IAM roles are for short term access.

In an organization, you can invite existing accounts or you can create an account in the org. If you create an account in the org a role is automatically created for it. If you invite an external account the role has to be created.

In the [DEMO] Lesson we will create an organisation for the Animals4life business:
The GENERAL account will become the MANAGEMENT account for the organisation

We will invite the PRODUCTION account as a MEMBER account and create the DEVELOPMENT account as a MEMBER account.

Finally - we will create an OrganizationAccountAccessRole in the production account, and use this role to switch between accounts.


=============SCPs=================
An organizational unit is 
- a container for accounts within an organization. We have an OU development and an OU Production

Service Control Policies are 
- they allow you to manage which AWS services can be used in your organization.

- Organizations can allow restrictions to be placed on MEMBER accounts in the form of boundaries. Deny List Only (not by granted permision)

- SCPs can be applied to the organization, to OU's or to individual accounts.

- Member accounts can be affected, the MANAGEMENT account cannot. Root users cannot be limited but the account overall can be, which by effect does limit the root account. 

We add two new OU's and move one into each account in the organization, one DEV one PROD.  Then in policies we enable SPC's. 

we then create a policy and add: 
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        },
        {
            "Effect": "Deny",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}

this will deny access to s3 resources for whoever we apply it. We attach it to the PROD OU so only dev can access s3, and detach default full access policy 
*/