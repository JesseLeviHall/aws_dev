/* 
===========API Gateway=====================
twp parts:
methods - within each resource you create methods, ie GET. this is also where integrations are configured ie Lambda or other sevice

resources - created in API configuration, points of functionality

Creating an API Gateway assuming we have users means they request an invoke URL.  This URL contains the api gateway endpoint DNS name, stage, and resource. 

A stage is a ligical configuration reference to a lifecycle state of your API within the gatway service that APIs are deployed into. you can do a prod, dev, and test stage of an API, or versions

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
A stage is a named reference to a deployment, which is a snapshot of the API. You use a Stage to manage and optimize a particular deployment. For example, you can configure stage settings to enable caching, customize request throttling, configure logging, define stage variables, or attach a canary release for testing.

Editing changes in an API Gateway are NOT live until you deploy to a stage. Every stage is entirely seperate from the others but they are NOT immutable they can be overwritten or rolled back, unlike Lambda functions.

For versioning the use of stage variable is useful. 
stage variables ei (env = prod, beta, or dev) for associated stages, then we can check this variable in the resources to reference different lambda aliases rather than pointing at them explicitly.  Common ei dev points to $Latest lambda function, prod to set lambda, beta points to newer function under construction. 
---------------Swagger and OPENAPI---------------
Swagger is a specification for describing RESTful APIs. It is a JSON or YAML file that describes the APIs endpoints and operations. It is used to generate documentation, client SDKs, and server stubs for testing.

You can use API Gateway to import a REST API from an external definition file into API Gateway. Currently, API Gateway supports OpenAPI v2.0 and OpenAPI v3.0 definition files. You can update an API by overwriting it with a new definition, or you can merge a definition with an existing API.

Formally known as Swagger v2:
OpenAPI (v3) Spec (OAS) is a standard laguange-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection

Format in yml or json. API Gateway is capable of importing this or generating this as an export, if you import a swagger file to use a lambda you have to manually update the resource policy of the lambda unlike creating the api from scratch.
*/