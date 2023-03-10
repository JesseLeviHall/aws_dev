/* 

The function needs permission to call CloudWatch Logs. Update the execution role to grant the permission. You can use the managed policy of AWSLambdaBasicExecutionRole.

Each time a developer publishes a new version of an AWS Lambda function, all the dependent event source mappings need to be updated with the reference to the new version’s Amazon Resource Name (ARN). These updates are time consuming and error-prone.

Which combination of actions should the developer take to avoid performing these updates when publishing a new Lambda version? (Select TWO.)
POint a Lambda alias to a new version of the Lambda function.( A Lambda alias is a pointer to a specific Lambda function version.)
Update the event source mappings with the lambda alias ARN. ( Instead of using ARNs for the Lambda function in event source mappings, you can use an alias ARN. You do not need to update your event source mappings when you promote a new version or roll back to a previous version.)


*/