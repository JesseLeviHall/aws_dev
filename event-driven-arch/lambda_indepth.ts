/* 
===========Lambda In Depth====================
Lambda functions have lifecycles. They are executed in an environment
First - Init phase (extention init, runtime init, function init)
Second - Invoke phase (cold start or warm start)
Third - ShutDown phase terminates execution env (runtime shutdown, extension shutdown)

Function initialization code is run once every cold start, during func init stage. Then the handler is run every invocation. 

A good lambda function should assume cold start everytime, but also take advantage of warm starts. 

Provisioned concurrency will warm them up in advance


*/