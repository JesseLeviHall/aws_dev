/* 
=============Security S3================
S3 is private by default, so rather than identity policies, we configure access via bucket policies (resource policies).  Fortunately, the policy can allow access from outside the root account. 
can grant anonymous access. 
one policy per bucket. 
the sid is where you can add a statement ID. it is useful for debugging and troubleshooting.
In AWS, the Sid (short for "statement ID") is a unique identifier for a specific policy statement. It is used to identify a specific policy statement within a policy document. This can be useful if you need to modify or delete a specific statement within a policy. The Sid parameter is optional, but it is a good practice to include it in your policy statements to make it easier to manage your policies.

typically access to a bucket from within the account is done via an identity policy, and access from outside the account is done via a bucket policy. anonymous access is not authenticated.

the policy is attached to the bucket, not the user.
but you can have a controled access from within your aws accout to a bucket in another account. and the bucket policy also has to allow it. 

block public access (a new feature) added another boundry where settings are at the bucket level, and apply no matter what the bucket policy says, and only apply to anonymous principles permissionls done wrong can result in data breaches

*/