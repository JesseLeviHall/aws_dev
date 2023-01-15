/* 
===========API Gateway=====================
twp parts:
methods - within each resource you create methods, ie GET. this is also where integrations are configured ie Lambda or other sevice

resources - created in API configuration, points of functionality

Creating an API Gateway assuming we have users means they request an invoke URL.  This URL contains the api gateway endpoint DNS name, stage, and resource. 

A stage is a ligical configuration within the gatway service that APIs are deployed into in order to, you can do a prod, dev, and test stage of an API, or versions

APIs can only be accessed and changes only take effect when deployed into a stage,

When creating an API integrated with Lambda, selecting Use Proxy Integration means the API Gateway will forward the request to the Lambda function as is, without any modifications. This means that the request will be forwarded to the Lambda function with the same HTTP method, headers, body, path, query string parameters, stage variables, and context as the original request that was received by API Gateway.
----------------Gateway Integrations-------------------
You choose an API integration type according to the types of integration endpoint you work with and how you want data to pass to and from the integration endpoint. For a Lambda function, you can have the Lambda proxy integration, or the Lambda custom integration. For an HTTP endpoint, you can have the HTTP proxy integration or the HTTP custom integration. For an AWS service action, you have the AWS integration of the non-proxy type only. API Gateway also supports the mock integration, where API Gateway serves as an integration endpoint to respond to a method request.
Lambda - invoke a Lambda function
StepFunctions - API directly to step functions
HTTP - invoke a HTTP endpoint (req + res configurations required + mapping templates so API Gateway can understand). Can use this type to connect to a standard node server for example. 
HTTP Proxy - pass through unmodified both ways(backend needs to understand the format from API gateway and pass back what API gateway understands) No mapping templates
VPC Link - invoke a HTTP endpoint in a VPC
Mock - return a response without invoking a backend
AWS Service - invoke an AWS service action (you have to set up necessary mappings + req + res)
AWS Service Proxy - (Lambda) pass through unmodified both ways, lambda function manages configuration so API gateway can understand. No Mapping template required but function requires additional code.
DDB - Direct integration
SNS - direct integration

(client) Method req => integration req - this can be translated or proxied(untouched)...
Integration Res => Method res (client)

Mapping template is used for AWS(Lambda) and HTTP NON Proxy integrations. The template modifies or renames params between the method and the integration. Can also modify the body and headers and perform filtering. Uses Velocity Template Language (VTL) and sits between the Client and the integration endpoint translating data both ways. Only used when not using proxying. Example is using API gateway to integrate a SOAP endpoint.
----------------Stages and Deployments-----------

*/