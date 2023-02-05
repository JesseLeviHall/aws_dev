/* 
q: Given a value of 10 WCU which of the statements below is correct? (Choose all that apply)
a: 10 WCU is the maximum amount of work that can be done in a second

q: why would you use a FIFO que
a: to ensure that the order of the items is maintained

q: Which of the following is not a valid DynamoDB data type?
a: String

q: why configure the visibility time-out value of 5 seconds
a: to ensure that the message is not processed more than once

Large bills for SQS worker pools - increase RecieveMessagesWaitTimeSeconds. Usually large bills are fro inefficient polling. Short polling pulls only the messages on the queue, long polling is more efficient and less API calls. 

If you want to limit access to s3 bucket with signed urls and you use cloudfront, you have to have an OAI (Origin Access Identity) for cloudfront and a bucket policy that only allows that identity. 

WAF is desinged to 
- protect web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources, whereas AWS Shield is desined to 
- protect applications from DDoS attacks.

To get cloudwatch agent to work on an ec2 with no internet connectivity you need to give it an instance role and an Interface endpoint in the VPC. Only DDB and s3 use gateway endpoints. Egress only Internet Gateway is only for IPv6.

To pass a query string perameter into api gateway in the url you use Stage Variables. 

The best practice for Cognito and access to s3 is to apply an Identity Policy to the role defined in Cognito, and use variables to control access. 

Eventually consistent is half teh RCU, and an RCU is 4KB and a WCU is 1KB

Lambda functions should be added to a target group, and the LoadBalancer should point to the target group. 

The VPC and Application resources hae seperate lifecycles, which means defining them in two stacks, generally speaking. Cross stack references allos you to deploy applications stacks wich reference the VPC stack and allow for many application stacks per VPC stack. 

Serveless App Model (SAM) and E beans use cloudformation under the hood. 

q: what is a CMK in relation to KMS?
a: a customer managed key, can enc/decrypt data up to 4KB

q: what is a DEK in relation to KMS?
a: a data encryption key, no size limit on encryption decryption size

q: what is SSE-C?
a: server side encryption with customer provided key

q: what is SSE-KMS?
a: server side encryption with KMS managed key

q: what is SSE-S3?
a: server side encryption with AWS managed key







*/