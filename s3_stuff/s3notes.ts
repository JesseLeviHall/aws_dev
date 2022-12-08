/* 
=============Security S3================
S3 is private by default, so rather than identity policies, we configure access via bucket policies (resource policies).  Fortunately, the policy can allow access from outside the root account. 
can grant anonymous access. 
one policy per bucket. 
the sid is where you can add a statement ID. it is useful for debugging and troubleshooting.

*/