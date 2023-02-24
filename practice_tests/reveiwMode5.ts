/* 
Test 5
You can use Amazon Cognito to deliver temporary, limited-privilege credentials to your application so that your users can access AWS resources. Amazon Cognito identity pools support both authenticated and unauthenticated identities. You can retrieve a unique Amazon Cognito identifier (identity ID) for your end-user immediately if you’re allowing unauthenticated users or after you’ve set the login tokens in the credentials provider if you’re authenticating users.
That is why the correct answer for this question is: Cognito ID.

The output of a state can be a copy of its input, the result it produces (for example, the output from a Task state’s Lambda function), or a combination of its input and result. Use ResultPath to control which combination of these is passed to the state output.
You can use a Catch field to capture the error in a Task and Parallel State. This field’s value must be an array of objects, known as catchers.
A catcher contains the following fields:
ErrorEquals – A non-empty array of strings that match error names.
Next – A string that must exactly match one of the state machine’s state names.
ResultPath – A path that determines what input is sent to the state specified in the Next field.
When a state reports an error and either there is no Retry field, or if retries fail to resolve the error, Step Functions scans through the catchers in the order listed in the array. When the error name appears in the value of a catcher’s ErrorEquals field, the state machine transitions to the state named in the Next field.
The four states that handle the application logic and error handling are as follows:
Choice State – “Yes or No”
Task State – “YesMessage” and “NoMessage”
Pass State – “Cause Of Error”
The workflow is initiated by passing an input of values “yes” or “no”. On the left side, we can see that an error has occurred during the “NoMessage” task state (as labeled by its orange color) when a “no” value was passed as an input.
On the right side, we can see that all data that passes through the nodes (input, error, output) are aggregated in a single step output.
This can be done by including a Catch field in the state machine definition to capture the error in a state and the ResultPath to include each node’s input with its output.

It’s important to note that basically everything that you’re doing outside of the handler function will block its execution. When it comes to thinking about pre handler code dependencies that you want to use, remember that less is more. The more targeted you are at the resource that you include, the better the overall performance your function will have during its execution.
You also have the option to tweak the power of the resources that run your function by increasing the memory allocated to your function to optimize its overall performance
Hence, the correct answers are:
– Reduce the deployment package’s size by including only the needed modules from the AWS SDK for Java.
– Increase the memory allocation setting for the Lambda function.

A task definition is required to run Docker containers in Amazon ECS. The following are some of the parameters you can specify in a task definition:
– The Docker image to use with each container in your task
– How much CPU and memory to use with each task or each container within a task
– The launch type to use, which determines the infrastructure on which your tasks are hosted
– The Docker networking mode to use for the containers in your task
– The logging configuration to use for your tasks
– Whether the task should continue to run if the container finishes or fails
– The command the container should run when it is started
– Any data volumes that should be used with the containers in the task
– The IAM role that your tasks should use




*/