/* 

The function needs permission to call CloudWatch Logs. Update the execution role to grant the permission. You can use the managed policy of AWSLambdaBasicExecutionRole.

Each time a developer publishes a new version of an AWS Lambda function, all the dependent event source mappings need to be updated with the reference to the new version’s Amazon Resource Name (ARN). These updates are time consuming and error-prone.

Which combination of actions should the developer take to avoid performing these updates when publishing a new Lambda version? (Select TWO.)
POint a Lambda alias to a new version of the Lambda function.( A Lambda alias is a pointer to a specific Lambda function version.)
Update the event source mappings with the lambda alias ARN. ( Instead of using ARNs for the Lambda function in event source mappings, you can use an alias ARN. You do not need to update your event source mappings when you promote a new version or roll back to a previous version.)

A company is working on a project to enhance its serverless application development process. The company hosts applications on AWS Lambda. The development team regularly updates the Lambda code and wants to use stable code in production.

Which combination of steps should the development team take to configure Lambda functions to meet both development and production requirements? (Select TWO.)
Create a new lambda version every time a new code release needs testing
( Lambda function versions are designed to manage deployment of functions. They can be used for code changes, without affecting the stable production version of the code.)
create two lambda aliases, name one prod and one dev, point prod alias to prad ARN, point the dev alias to the $LATEST version. (By creating separate aliases for Production and Development, systems can initiate the correct alias as needed. A Lambda function alias can be used to point to a specific Lambda function version. Using the functionality to update an alias and its linked version, the development team can update the required version as needed. The $LATEST version is the newest published version.)

*/