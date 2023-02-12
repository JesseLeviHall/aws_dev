/* 
All data in DynamoDB Streams is subject to a 24 hour lifetime. You can retrieve and analyze the last 24 hours of activity for any given table; however, data older than 24 hours is susceptible to trimming (removal) at any moment.
If you disable a stream on a table, the data in the stream will continue to be readable for 24 hours. 

The following are the Gateway response types which are associated with the HTTP 504 error in API Gateway:
INTEGRATION_FAILURE – The gateway response for an integration failed error. If the response type is unspecified, this response defaults to the DEFAULT_5XX type.
INTEGRATION_TIMEOUT – The gateway response for an integration timed out error. If the response type is unspecified, this response defaults to the DEFAULT_5XX type.
For the integration timeout, the range is from 50 milliseconds to 29 seconds for all integration types, including Lambda, Lambda proxy, HTTP, HTTP proxy, and AWS integrations.
In this scenario, there is an issue where the users are getting HTTP 504 errors in the serverless application. This means the Lambda function is working fine at times but there are instances when it throws an error. Based on this analysis, the most likely cause of the issue is the INTEGRATION_TIMEOUT error since you will only get an INTEGRATION_FAILURE error if your AWS Lambda integration does not work at all in the first place.
Hence, the root cause of this issue is that the underlying Lambda function has been running for more than 29 seconds causing the API Gateway request to time out.

AWS CodeStar makes it easy to centrally monitor application activity and manage day-to-day development tasks such as recent code commits, builds, and deployments. Because AWS CodeStar integrates with Atlassian JIRA, a third-party issue tracking, and project management tool, you can create and manage JIRA issues in the AWS CodeStar dashboard.

You should consider using AWS CloudHSM instead of AWS KMS if you require:
– Keys stored in dedicated, third-party validated hardware security modules under your exclusive control.
– FIPS 140-2 compliance.
– Integration with applications using PKCS#11, Java JCE, or Microsoft CNG interfaces.
– High-performance in-VPC cryptographic acceleration (bulk crypto).
Hence, the correct answer is to import the encryption keys from your on-premises key management service to AWS CloudHSM.

To upload an object to the S3 bucket which uses SSE-KMS, you have to send a request with an x-amz-server-side-encryption header with the value of aws:kms. There’s also an optional x-amz-server-side-encryption-aws-kms-key-id

It is recommended that you use the following pattern to encrypt data locally in your application:
1. Use the GenerateDataKey operation to get a data encryption key.
2. Use the plaintext data key (returned in the Plaintext field of the response) to encrypt data locally, then erase the plaintext data key from memory.
3. Store the encrypted data key (returned in the CiphertextBlob field of the response) alongside the locally encrypted data.
To decrypt data locally:
1. Use the Decrypt operation to decrypt the encrypted data key. The operation returns a plaintext copy of the data key.
2. Use the plaintext data key to decrypt data locally, then erase the plaintext data key from memory.

Another best practice they recommend is to delete root user access keys. You use an access key (an access key ID and secret access key) to make programmatic requests to AWS. However, the access key for your AWS account root user gives full access to all your resources for all AWS services, including your billing information. You cannot reduce the permissions associated with your AWS account root user access key. This is a common security concern that should be handled appropriately.
You should not use the root account for managing any resource. Create an IAM user with the necessary permissions instead to perform these tasks.
One recommended best practice is to use IAM roles when delegating permissions to users.

In this scenario, we can expose the API endpoint to other stacks by adding the Export property in the Outputs section. In the example below, we use ‘SimpleAPI’ as the name of the value to be exported:
To reference the endpoint’s value in other templates, simply use the Fn::ImportValue function and specify SimpleAPI as its parameter.

in the given scenario, you can use Lambda@Edge to allow your Lambda functions to customize the content that CloudFront delivers and to execute the authentication process in AWS locations closer to the users. In addition, you can set up an origin failover by creating an origin group with two origins with one as the primary origin and the other as the second origin, which CloudFront automatically switches to when the primary origin fails. This will alleviate the occasional HTTP 504 errors that users are experiencing.


































*/