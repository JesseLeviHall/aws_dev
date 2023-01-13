/* 
=====Event Driven and Serverless Architecture======
Going from Monolith to Tiered simply means seperating for ex. the db insance from the app instance. Then each tier can be scaled horizontally and load balanced and highly available with redundancy. 

Next we could have a queue based design, to achieve improved asynchronous communications and scaling. This places a queue between application tiers which decouples them. 

Then we could have a microservices architecture, where we have a bunch of small services that are loosely coupled and can be scaled independently. A microservice is just a tiny self-sufficient application with its own logic, data, and input output components. 

Event Driven Architecture is a collection of event producers that react to something which is picked up by an event consumer (listener) ready and waiting for an event to occur and then do something. 

Components or services within an App can be both producers and consumers. The key thing about event-driven architecture is that neither the producers or consumers are sat around waiting for things to occur, consuming resources...while not needed they shut-down, unprovision, or move to dormant, then resurect when needed. A mature E-Driven Arch only consumes resources while handling events (serverless)

Best practice in event driven architecture is to use an event router - an HA central exchange point for events (BUS). Events are sent to the bus, it delivers to the appropriate event consumer. 




*/