/* AWS resources created for a worker environment tier include an Auto Scaling group, one or more Amazon EC2 instances, and an IAM role. For the worker environment tier, Elastic Beanstalk also creates and provisions an Amazon SQS queue if you don’t already have one. When you launch a worker environment tier, Elastic Beanstalk installs the necessary support files for your programming language of choice and a daemon on each EC2 instance in the Auto Scaling group.

The daemon is responsible for pulling requests from an Amazon SQS queue and then sending the data to the web application running in the worker environment tier that will process those messages. If you have multiple instances in your worker environment tier, each instance has its own daemon, but they all read from the same Amazon SQS queue.

You can define periodic tasks in a file named cron.yaml in your source bundle to add jobs to your worker environment’s queue automatically at a regular interval. For example, you can configure and upload a cron.yaml file which creates two periodic tasks: one that runs every 12 hours and a second that runs at 11pm UTC every day.

Hence, using the cron.yaml is the correct configuration file to be used in this scenario.

Dockerrun.aws.json is incorrect because this configuration file is primarily used in multicontainer Docker environments that are hosted in Elastic Beanstalk. This can be used alone or combined with source code and content in a source bundle to create an environment on a Docker platform.

env.yaml is incorrect because this is primarily used to configure the environment name, solution stack, and environment links to use when creating your environment in Elastic Beanstalk.

appspec.ymlis incorrect because this is used to manage each application deployment as a series of lifecycle event hooks in CodeDeploy and not in Elastic Beanstalk.

In Lambda non-proxy (or custom) integration, you can specify how the incoming request data is mapped to the integration request and how the resulting integration response data is mapped to the method response.

There are two types of resharding operations: shard split and shard merge. In a shard split, you divide a single shard into two shards. In a shard merge, you combine two shards into a single shard. Resharding is always pairwise in the sense that you cannot split into more than two shards in a single operation, and you cannot merge more than two shards in a single operation.

Amazon SQS FIFO queues follow exactly-once processing. It introduces a parameter called Message Deduplication ID, which is the token used for deduplication of sent messages. Suppose a message with a particular message deduplication ID is sent successfully. In that case, any messages sent with the same message deduplication ID are accepted successfully but aren’t delivered during the 5-minute deduplication interval.

Databases employ locking mechanisms to ensure that data is always updated to the latest version and is concurrent. There are multiple types of locking strategies that benefit different use cases. Some of these are:

– Optimistic Locking

– Pessimistic Locking

– Overly Optimistic Locking

Optimistic locking is a strategy to ensure that the client-side item that you are updating (or deleting) is the same as the item in DynamoDB. If you use this strategy, then your database writes are protected from being overwritten by the writes of others — and vice-versa

CodeDeploy provides two deployment type options:

In-place deployment: The application on each instance in the deployment group is stopped, the latest application revision is installed, and the new version of the application is started and validated. You can use a load balancer so that each instance is deregistered during its deployment and then restored to service after the deployment is complete. Only deployments that use the EC2/On-Premises compute platform can use in-place deployments. AWS Lambda compute platform deployments cannot use an in-place deployment type.

Blue/green deployment: The behavior of your deployment depends on which compute platform you use:

– Blue/green on an EC2/On-Premises compute platform: The instances in a deployment group (the original environment) are replaced by a different set of instances (the replacement environment). If you use an EC2/On-Premises compute platform, be aware that blue/green deployments work with Amazon EC2 instances only.

– Blue/green on an AWS Lambda compute platform: Traffic is shifted from your current serverless environment to one with your updated Lambda function versions. You can specify Lambda functions that perform validation tests and choose the way in which the traffic shift occurs. All AWS Lambda compute platform deployments are blue/green deployments. For this reason, you do not need to specify a deployment type.

– Blue/green on an Amazon ECS compute platform: Traffic is shifted from the task set with the original version of a containerized application in an Amazon ECS service to a replacement task set in the same service. The protocol and port of a specified load balancer listener are used to reroute production traffic. During deployment, a test listener can be used to serve traffic to the replacement task set while validation tests are run.

To get the number of strong and eventual consistent read requests that your table can accommodate per second, you simply have to do the following steps:

Step #1 Multiply the value of the provisioned RCU by 4 KB

= 10 RCU x 4 KB

= 40

Step #2 To get the number of strong consistency requests, just divide the result of step 1 by 4 KB

= 40 / 4 KB

= 10 strongly consistent read requests

Step #3 To get the number of eventual consistency requests, just divide the result of step 1 by 2 KB

=40 / 2 KB

= 20 eventually consistent read requests

When you create a global secondary index on a provisioned mode table, you must specify read and write capacity units for the expected workload on that index. The provisioned throughput settings of a global secondary index are separate from those of its base table.

To decouple your database instance from your environment, you can run a database instance in Amazon RDS and configure your application to connect to it on launch. This enables you to connect multiple environments to a database, terminate an environment without affecting the database, and perform seamless updates with blue-green deployments.  Elastic Beanstalk will be unable to delete the environment’s security group because the database’s security group is dependent on it.  Before terminating the old Elastic Beanstalk environment, remove its security group rule first before proceeding

You can use the UpdateItem operation to implement an atomic counter — a numeric attribute that is incremented, unconditionally, without interfering with other write requests. (All write requests are applied in the order in which they were received). With an atomic counter, the updates are not idempotent. In other words, the numeric value will increment each time you call UpdateItem.










*/