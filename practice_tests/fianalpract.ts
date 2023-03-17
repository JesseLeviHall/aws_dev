/* 
Correct
A role specifies a set of permissions that you can use to access AWS resources. In that sense, it is similar to an IAM User. A principal (person or application) assumes a role to receive temporary permissions to carry out required tasks and interact with AWS resources. The role can be in your own account or any other AWS account.

To assume a role, an application calls the AWS STS AssumeRole API operation and passes the ARN of the role to use. The operation creates a new session with temporary credentials. This session has the same permissions as the identity-based policies for that role.

When you call AssumeRole API, you can optionally pass inline or managed session policies. Session policies are advanced policies that you pass as a parameter when you programmatically create a temporary credential session for a role or federated user. You can pass a single JSON inline session policy document using the Policy parameter. You can use the PolicyArns parameter to specify up to 10 managed session policies. The resulting session’s permissions are the intersection of the entity’s identity-based policies and the session policies.

Thus, the correct answer is to use the AssumeRole API in this scenario.

AssumeRoleWithWebIdentity is incorrect because this only returns a set of temporary security credentials for federated users who are authenticated through public identity providers such as Amazon, Facebook, Google, or OpenID, which were not mentioned in the scenario.

AssumeRoleWithSAML is incorrect because this just returns a set of temporary security credentials for users who have been authenticated via a SAML authentication response. This operation provides a mechanism for tying an enterprise identity store or directory to role-based AWS access without user-specific credentials or configuration.

GetSessionToken is incorrect because this is primarily used to return a set of temporary credentials for an AWS account or IAM user only.

=======================

Modifying the cache settings to retrieve the latest data from DynamoDB if the request header’s authorization signature matches your API’s trusted clients list is incorrect because this configuration can’t be done. There is no feature in API Gateway Cache Settings which would allow you to make a list of authorized signatures that are allowed to invalidate cache entries.

=======================
Stage variables are name-value pairs that you can define as configuration attributes associated with a deployment stage of a REST API. They act like environment variables and can be used in your API setup and mapping templates.

For example, you can define a stage variable in a stage configuration, and then set its value as the URL string of an HTTP integration for a method in your REST API. Later, you can reference the URL string using the associated stage variable name from the API setup. This way, you can use the same API setup with a different endpoint at each stage by resetting the stage variable value to the corresponding URLs. You can also access stage variables in the mapping templates, or pass configuration parameters to your AWS Lambda or HTTP backend.

With deployment stages in API Gateway, you can manage multiple release stages for each API, such as alpha, beta, and production. Using stage variables you can configure an API deployment stage to interact with different backend endpoints. For example, your API can pass a GET request as an HTTP proxy to the backend web host (for example, http://tutorialsdojo.com). In this case, the backend web host is configured in a stage variable so that when developers call your production endpoint, API Gateway calls example.com. When you call your beta endpoint, API Gateway uses the value configured in the stage variable for the beta stage, and calls a different web host (for example, beta.tutorialsdojo.com). Similarly, stage variables can be used to specify a different AWS Lambda function name for each stage in your API.

You can also use stage variables to pass configuration parameters to a Lambda function through your mapping templates. For example, you may want to re-use the same Lambda function for multiple stages in your API, but the function should read data from a different Amazon DynamoDB table depending on which stage is being called. In the mapping templates that generate the request for the Lambda function, you can use stage variables to pass the table name to Lambda.

Stage variables are not applied to the security definitions section of the API specification. For example, you cannot use different Amazon Cognito user pools for different stages.

Hence, the correct answer in this scenario is to use stage variables.

=======================
STS: Sec Token Service
Create and provide trusted users with temporary security credentials that can control access to your AWS resources.
Temporary security credentials are short-term and are not stored with the user but are generated dynamically and provided to the user when requested.
By default, AWS STS is a global service with a single endpoint at https://sts.amazonaws.com.
Trust policies – resource-based policies that are attached to a role and define which principals can assume the role.

AssumeRole – Returns a set of temporary security credentials that you can use to access AWS resources that you might not normally have access to. These temporary credentials consist of an access key ID, a secret access key, and a security token. Typically, you use AssumeRole within your account or for cross-account access. 
You can include multi-factor authentication (MFA) information when you call AssumeRole. This is useful for cross-account scenarios to ensure that the user that assumes the role has been authenticated with an AWS MFA device.
AssumeRoleWithSAML – Returns a set of temporary security credentials for users who have been authenticated via a SAML authentication response. This allows you to link your enterprise identity store or directory to role-based AWS access without user-specific credentials or configuration.
AssumeRoleWithWebIdentity – Returns a set of temporary security credentials for users who have been authenticated in a mobile or web application with a web identity provider. Example providers include Amazon Cognito, Login with Amazon, Facebook, Google, or any OpenID Connect-compatible identity provider.
tokens:
GetFederationToken – Returns a set of temporary security credentials (consisting of an access key ID, a secret access key, and a security token) for a federated user. You must call the GetFederationToken operation using the long-term security credentials of an IAM user. A typical use is in a proxy application that gets temporary security credentials on behalf of distributed applications inside a corporate network.
GetSessionToken – Returns a set of temporary credentials for an AWS account or IAM user. The credentials consist of an access key ID, a secret access key, and a security token. You must call the GetSessionToken operation using the long-term security credentials of an IAM user. Typically, you use GetSessionToken if you want to use MFA to protect programmatic calls to specific AWS API operations.
Best Practices:
Lock Away Your AWS Account Root User Access Keys
Create Individual IAM Users
Use Groups to Assign Permissions to IAM Users
Use AWS Defined Policies to Assign Permissions Whenever Possible
Grant Least Privilege
Use Access Levels to Review IAM Permissions
Configure a Strong Password Policy for Your Users
Enable MFA for Privileged Users
Use Roles for Applications That Run on Amazon EC2 Instances
Use Roles to Delegate Permissions
Do Not Share Access Keys
Rotate Credentials Regularly
Remove Unnecessary Credentials
Use Policy Conditions for Extra Security
Monitor Activity in Your AWS Account


The target candidate has 1 or more years of hands-on experience in developing and maintaining applications by using AWS services.

Design architectures (for example, distributed systems, microservices, database schemas and modeling)
• Design and create CI/CD pipelines
• Administer IAM users and groups
• Administer servers and operating systems
• Design AWS networking infrastructure (for example, Amazon VPC, AWS Direct Connect)

*/