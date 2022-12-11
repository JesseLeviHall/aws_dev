/* 
=============Security S3================
S3 is private by default, so rather than identity policies, we configure access via bucket policies (resource policies).  Fortunately, the policy can allow access from outside the root account. 

adding things to s3 uses the PUT uperation api 

can grant anonymous access. 
one policy per bucket. 
the sid is where you can add a statement ID. it is useful for debugging and troubleshooting.
In AWS, the Sid (short for "statement ID") is a unique identifier for a specific policy statement. It is used to identify a specific policy statement within a policy document. This can be useful if you need to modify or delete a specific statement within a policy. The Sid parameter is optional, but it is a good practice to include it in your policy statements to make it easier to manage your policies.

typically access to a bucket from within the account is done via an identity policy, and access from outside the account is done via a bucket policy. anonymous access is not authenticated.

the policy is attached to the bucket, not the user.
but you can have a controled access from within your aws accout to a bucket in another account. and the bucket policy also has to allow it. 

block public access (a new feature) added another boundry where settings are at the bucket level, and apply no matter what the bucket policy says, and only apply to anonymous principles permissionls done wrong can result in data breaches. There are 5 built in settings: 
1. Block all public access
2. Block public access to buckets and objects granted through new access control lists (ACLs)
3. Block public access to buckets and objects granted through any access control lists (ACLs)
4. Block public access to buckets and objects granted through new public bucket or access point policies
5. Block public access to buckets and objects granted through any public bucket or access point policies

two approaches, access control from the perspective of the bucket, or from the identies of the accounts. 

static website hosting has a small charge for operations such as requests.  It could be used to provide an out of service back up page for a site that runs on a compute servie if that service was down.

================static hosting================
create a bucket with the same name as the domain name, in properties at the bottome enable static hosting. copy the url it gives, go to objects and upload your files. Then grant permisions to anyone with a bucket policy in permissions. Edit a policy to grant read action to all principles at the ARN for the bucket. Then go to r53 and create a simple record from the wizard, add the first part of the bucket name missing from the domain as the subdomain. Change route trafic to to alias s3 endpoint, select region of the bucket and the bucket. 

=================S3 versioning================
versioning is a feature that allows you to keep multiple versions of an object in the same bucket. Once it is enabled you cannot undo it

Every object in e3 has an id key, when versioning is disabled, the id value is null. 

When versioning is enabled, and the object is modified, the old object is ketp but a new id is given to a new version of the object. if an object is reqed without saying what version, the current version will be sent, but you can req an old version


=================Upcloading================
Default one stream, which is slow. You gotta shoot for multipart uploads. Min data for multipart is 100mb.

transfer acceleration helps.  bucket name cant have periods, its in properties tab. 


=================KMS Key Management================
its a regional public zone service and be conneted to from anywere.  Keys never leave KMS. 
Remember FIPS 140-2 (level 2) that is a USA security standard. 
this is in most exams

AWS Key Management Service (AWS KMS) makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications. AWS KMS is a secure and resilient service that uses hardware security modules that have been validated under FIPS 140-2, or are in the process of being validated, to protect your keys.


Symmetric encryption uses the same key for both encrypting and decrypting data, while asymmetric encryption uses a different key for encrypting and decrypting data. In other words, with symmetric encryption, the sender and receiver of the encrypted data must both have the same key, while with asymmetric encryption, the sender and receiver can each have their own unique keys.

KMS does not do the encryption or decription, you do or the service your using that accesses KMS does. 

KMS Keys do not leave their region. 

After creating a customer managed key we entered the ShellTerminal and put: 
echo "find all the doggos, distract them with the yumz" > battleplans.txt
aws kms encrypt \
    --key-id alias/catrobot \
    --plaintext fileb://battleplans.txt \
    --output text \
    --query CiphertextBlob \
    | base64 --decode > not_battleplans.enc 
    
aws kms decrypt \
    --ciphertext-blob fileb://not_battleplans.enc \
    --output text \
    --query Plaintext | base64 --decode > decryptedplans.txt



=================S3 object encryption============
Buckets arent encrypted, objects are. Each obejct in a bucket could be using different encryption settings.

default bucket encryption settings:
- Client-Side Encryption
- SSE-C 
  or Server-Side Encryption with Customer-Provided Keys, is a feature in Amazon Web Services (AWS) that allows customers to manage their own encryption keys for data stored in AWS services. This means that customers have full control over the encryption and decryption of their data, rather than relying on AWS to manage the keys. SSE-C is available for several AWS services, including Amazon S3, Amazon EBS, and Amazon Glacier. It can be used to encrypt data at rest, ensuring that it remains secure even if the underlying storage is compromised.
- SSE-S3 
  or Server-Side Encryption with Amazon S3-Managed Keys, is a feature in Amazon S3 that automatically encrypts data at rest using keys managed by Amazon S3. This means that the encryption and decryption of data is handled by Amazon S3, and customers do not have to manage their own keys. SSE-S3 is a simple and effective way to protect data stored in Amazon S3, and it is enabled by default for all new Amazon S3 buckets.
  ****algorithm: AES-256 ********
- SSE-KMS
  or Server-Side Encryption with AWS KMS-Managed Keys, is a feature in Amazon Web Services (AWS) that allows customers to use keys managed by AWS Key Management Service (KMS) to encrypt their data at rest. This means that the encryption and decryption of data is handled by AWS KMS, and customers do not have to manage their own keys. SSE-KMS provides additional benefits over SSE-S3, such as the ability to audit and control permissions to access the keys used for encryption. It is available for several AWS services, including Amazon S3, Amazon EBS, and Amazon Glacier. (basically teams and employees to have s3 admin power without being able to decrypt objects)... add inline policy to the iamadmin with this:
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Deny",
            "Action": "kms:*",
            "Resource": "*"
        }
    ]
}

role seperation:
when utilizing sse-kms you need both kms permission and s3 permission to open an object.  Important for business that reqs private storage (medical reqs or something)


to set the bucket default we added the policy to the bucket properties. then every upload has this setting. 

As part of the lesson we review how SSE-KMS impacts permissions and how it can achieve role separation

you can add encryption per object:
Info: PUT operation with header "x-amz-server-side-encryption"
if you add this header and AES256 you will set SSE-S3
if you add this header and aws:kms you will set SSE-KMS


=================Object Storage Classes================
Amazon S3 Object Storage Classes are different storage tiers for Amazon S3 that offer varying levels of durability, availability, and performance for storing data. The different storage classes are designed to meet different needs and use cases, such as long-term storage, infrequent access, and data backup.

The four storage classes in Amazon S3 are:

1. S3 Standard: This is the default storage class and offers high durability, availability, and performance for frequently accessed data.

2. S3 Intelligent-Tiering: This storage class automatically moves data between different tiers based on usage patterns, providing cost savings for data with unknown or changing access patterns.

3. S3 Standard-Infrequent Access (S3 Standard-IA): This storage class offers lower storage costs for data that is accessed infrequently, but requires rapid access when needed.
 
4. S3 One Zone-Infrequent Access (S3 One Zone-IA): This storage class is similar to S3 Standard-IA, but is stored in a single availability zone and offers lower costs than S3 Standard-IA.

5. S3 Glacier: (instant or flexible) This storage class is designed for long-term data archiving and offers the lowest storage costs in Amazon S3. It is designed to provide secure, durable, and extremely low-cost storage for data that is infrequently accessed and for which retrieval times of 3–5 hours are suitable such as data backups, regulatory archives, and long-term data retention. You pay for the retrievial process, cannot be publicly accessible

Customers can choose the appropriate storage class for their data based on their specific needs and use cases. Amazon S3 also provides tools and features, such as Lifecycle Management, to help customers manage their data across different storage classes. 
glacier deep archive is data in a frozen state. 

*******
when objects are stored, a http/1.1 200 OK response is provided by teh s3 API


=================S3 lifecycle management================
Amazon S3 Lifecycle Configuration is a feature that allows customers to automatically manage the lifecycle of their objects stored in Amazon S3. Lifecycle Configuration enables customers to define rules for transitioning objects between different storage classes, and for deleting objects after a specified period of time. This can help customers save on storage costs and ensure that their data is stored in the appropriate storage class for its intended use.

For example, a customer can use Lifecycle Configuration to automatically transition objects from the S3 Standard storage class to the S3 Standard-IA storage class after 30 days, and then to the S3 Glacier storage class after 90 days. This will reduce storage costs for data that is accessed infrequently, while still making it available for retrieval when needed. Customers can also use Lifecycle Configuration to automatically delete objects that are no longer needed, such as data that has reached the end of its retention period.

Lifecycle Configuration can be applied to individual objects or to entire bucket, and can be managed using the AWS Management Console, the AWS CLI, or the S3 API.

- a set of rules
- rules consist of actions
- rules are applied in order
- rules can be applied to a bucket or a prefix or object or groups of
- transition actions move to a different storage classes
  -transisions dont happen upward, only down toward deep archive
- expiration actions delete the object

something you need to carefully plan beforehand. 


=================S3 Replication================
These options are designed to meet different needs and use cases, such as disaster recovery, data migration, and global distribution of content.

these are the replications options: 
all objects or a subset
storage class - default is to maintain
Ownership - default is source acc
RTC - Replication time control (eg: 15 minutes for app)

The different types of S3 replication are:

1 S3 Cross-Region Replication (CRR): This is a feature that automatically replicates objects across different regions within the same AWS account. It is useful for disaster recovery and for making data available in multiple regions for lower latency and higher performance.

2 S3 Replication Time Control (RTC): This is an extension of S3 CRR that allows customers to specify a replication schedule for their objects, rather than replicating them in real-time. This can be useful for controlling the timing and impact of replication on network and storage resources.

3 S3 Cross-Account Replication (CAR): This is a feature that allows customers to replicate objects across different AWS accounts. It is useful for sharing data with other organizations, or for migrating data between accounts.

4 S3 Transfer Acceleration: This is a feature that uses Amazon CloudFront edge locations to accelerate the transfer of large files to and from S3. It can improve the performance of replication and data transfer, particularly for users in remote locations or with slow network connections.

5 S3 Same-Region Replication (SRR) : 
This is a feature that allows customers to replicate objects within the same region. It is useful for creating multiple copies of objects for redundancy, or for creating a backup of objects in a different bucket.


****** 
–Replications are not retroactive and versioning needs to be on
–One way replication: source to destination
–works for unencrypted, SSE-S3, SSE-KMS, Not SSE-C because S3 –would not have access to the keys
-Source owner needs permissions to objects
-Lifecycle managements will not be replicated, or objects in clacier or deep archive. 
-Delete markers are not replicated either

Why use replication? 
-Log Aggregation - SRR
-PROD and TEST Sync - SRR
-Resilience with strict sovereignty 
-Global resilience CRR
-Latency reduction - CRR

===================presigned urls================
- You can create a URL for an object you have no access to
- whe using the URL has the same permissions as the identity that generated it (currently)
- An access denied error could mean the generating ID never had or doesnt now have access permissions
- Dont generate with a role - URL stopps working when the temp credentials expire
*/