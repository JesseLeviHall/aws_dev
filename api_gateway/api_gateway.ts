/* 
===========API Gateway=====================
twp parts:
methods - within each resource you create methods, ie GET. this is also where integrations are configured ie Lambda or other sevice

resources - created in API configuration, points of functionality

Creating an API Gateway assuming we have users means they request an invoke URL.  This URL contains the api gateway endpoint DNS name, stage, and resource. 

A stage is a ligical configuration within the gatway service that APIs are deployed into in order to, you can do a prod, dev, and test stage of an API, or versions

APIs can only be accessed and changes only take effect when deployed into a stage,




*/