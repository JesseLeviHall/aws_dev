/* 
When you hear Cloudwatch, think Metrics.
Cloudwatch is a service that allows you to monitor your AWS resources, as well as the applications you run on AWS.
ingestion, storage, management of metrics...

-public service, integrates in other resources. 
-Can be used to monitor your own applications via API, as well as AWS resources.
-Inside certain things require an agent, for example:
    -EC2 instances
    -On-premises servers via agentAPI
    
-you can view coudwatch data via console UI CLI API dashboards and anomaly detection
-alarms can be set up to notify you when a metric crosses a threshold
- A namespace = acts as container for metrics. eg AWS/EC2 & AWS/Lamda (namespaces you create yourself wont start with aws.)
- A metric = a time ordered set of datapoints. eg: CPUUtilization, DiskWriteBytes (ec2). Every metric has a metric name and a namespace eg CPUUtiliztion and AWS/ec2
- Datapoint = the smallest components of cloudwatch. eg: timestamp, value, optional unit of measure.
- A dimension = name/value pair that is part of the identity of a metric. eg: InstanceId, AutoScalingGroupName. Add when you provide datapoints into cloudwatch, these are how the cpu utilization metric for ec2 differenciates between instances
- A statistic = a mathematical calculation that is applied to the metric data points over a specified period of time. eg: average, sum, minimum, maximum, sample count.
*/