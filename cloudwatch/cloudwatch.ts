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

CloudWatch Data resolution: 
In Amazon CloudWatch, data resolution refers to the frequency at which data is collected and aggregated for a metric.

CloudWatch collects data from various sources, such as Amazon Elastic Compute Cloud (EC2) instances, Amazon Relational Database Service (RDS) databases, and other AWS resources. It then aggregates this data and stores it in the form of metrics, which are time-series data sets that represent the values of a particular metric over a period of time.

The data resolution for a metric determines how often the metric is sampled and the period of time over which the metric data is aggregated. For example, if a metric has a data resolution of 1 minute, it means that the metric data is sampled and aggregated over a period of 1 minute.

CloudWatch offers several options for data resolution, including 1 minute, 5 minutes, and 1 hour. The data resolution that you choose will depend on your specific needs and the requirements of your workload. Higher data resolution can provide more detailed and accurate data, but it also consumes more CloudWatch storage and may result in higher costs. On the other hand, lower data resolution can provide a broad overview of the data, but may not capture all of the details.
- 1 minute for metrics with a retention period of less than 15 days
- 5 minutes for metrics with a retention period of 63 days or longer
- 1 hour for metrics with a retention period of 455 days or longer
As data ages, its aggregated and stored for longer with less resolution. 



*/