/* 

Policy Interpretations begin by identfying how many statements there, how they overlap permissions, and whether the conditions apply.  Check for nots.

deny allow deny...
if there is no explicit allow, you start denied. 

to interpret policy docs, start with zero permissions stance. 

explicity denies always win.  Even if your policy allows something, then denies, it results in deny. 

with a conditions block, the effect action and resource statements only apply if the conditions are met. 

Be aware that if a pocicy only has a singe statement that deny's, it will typically be used with another policy that handles allow. 

Policy statements are evaluated in order.  If a statement is not applicable, it is skipped.

******************
NotAction is the inverse of actions, so instead of saying deny these actions, it would be deny everything that isnt one of these actions.  

StringNotEquals is another one
Basically nots mean anything that is not listed right here. 
******************

the policy2_regions: 
This AWS policy denies all actions, except for those specified in the "NotAction" field, for all resources, unless the requested region is either "ap-southeast-2" or "eu-west-1". In other words, it allows actions for CloudFront, IAM, Route53, and Support in the specified regions, and denies all other actions in all other regions. This could be used, for example, to restrict access to certain AWS services to only certain regions.


policy 3 homefolder: 
This AWS policy allows users to list all their S3 buckets and get the location of any bucket they have access to. It also allows users to list the contents of the "cl-animals4life" bucket, provided that the prefix of the requested object is either empty, "home/", or "home/${aws:username}/". Finally, it allows all S3 actions on objects within the "cl-animals4life/home/${aws:username}" and "cl-animals4life/home/${aws:username}/" prefixes. This policy could be used, for example, to give users access to their own directories within a shared S3 bucket, while restricting access to the rest of the bucket.


The policy evaluation process in AWS works as follows:

1. The user makes a request to access a resource in AWS.

2. AWS checks the user's permissions to determine whether the request is allowed or denied.

3. If the user has a single AWS account, AWS checks the policies that are associated with the user, the resource, and the user's AWS identity (e.g., IAM user or role) to determine whether the request is allowed or denied.

4. If the user has multiple AWS accounts, AWS checks the policies that are associated with the user, the resource, and the user's AWS identity in each account. If any of the policies allow the request, the request is allowed. If all of the policies deny the request, the request is denied.

5.If the request is allowed, AWS grants the user access to the resource. If the request is denied, AWS returns an error message to the user.

This process applies to both single-account and multi-account access scenarios, with the main difference being the number of policies that are checked during the evaluation. In a multi-account scenario, all of the policies associated with the user's AWS identities in each account are checked, whereas in a single-account scenario, only the policies associated with the user's AWS identity in that account are checked.

SCP = service control policy

******************
CloudHSM is required to achieve compliance with certain security standards such as FIPS 140-2 Level 3
while KMS is L2 Overall.

HSM stands for 
Hardware Security Module
these can be provisioned on premises - fully customer managed. 

cloud HSM uses industry standard APIs - PKCS#11, Java Cryptography extensions(JCE) Microsoft CryptoNG(CNG) libraries

they are not highly available they run in one AZ. they can be kept in sync with clusters

KMS can use CloudHSM as a custom key store

by default there is no integration btw HSM and S3-SSE
but you can use HSM on the client side before uploadign to s3

HSM Can offload the ssl/tls processing for web servers

HSM can enable transparent data encryption TDE for Oracle Databases

HSM can be used to encrypt private keys for an issuing certificate authority (CA)

Basically HSM is good for integrating encryption with things outside of aws products and services

KMS is good for encrypting data within aws products and services.



*/