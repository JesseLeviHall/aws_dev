/* 
This lesson steps through the design choices around VPC design and IP planning.
Nat

q: what is a vpc?
a: a virtual private cloud is a virtual network dedicated to your aws account. it is logically isolated from other virtual networks in the aws cloud. you can launch your aws resources, such as ec2 instances, into your vpc. you can configure your vpc to be a single tier or multi-tier architecture. you can configure your vpc to span multiple availability zones. you can also create a hardware virtual private cloud (hvpc) to connect your on-premises network to your vpc using a dedicated hardware connection.

q: what is a dedicated ip?
a: a dedicated ip address is a static ip address that is associated with your aws account. you can associate a dedicated ip address with an elastic ip address or an instance in your vpc. you can also associate a dedicated ip address with an instance in your on-premises network using a hardware virtual private cloud (hvpc). dedicated ip addresses are available in the us east (n. virginia), us west (oregon), us west (n. california), eu (ireland), eu (frankfurt), asia pacific (singapore), asia pacific (sydney), asia pacific (tokyo), and south america (sao paulo) regions.

q: what is a nat instance?
a: a nat instance is a virtual machine that you launch into your public subnet. the nat instance forwards traffic from instances in your private subnet to the internet or other aws services, and then sends the response back to the instances. a nat instance must have a public ip address, and it must be associated with an elastic ip address. you can launch a nat instance using the amazon ec2 console, the aws cli, or the aws api. you can also launch a nat instance using a cloudformation template. you can launch a nat instance using a dedicated ip address. you can also launch a nat instance using a dedicated host.


q: what is a nat gateway?
a: a nat gateway is a managed service that makes it easy for you to connect to the internet from instances in a private subnet in your vpc.

q: what is a vpc endpoint?
a: a vpc endpoint enables you to privately connect your vpc to supported aws services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, nat device, vpn connection, or AWS Direct Connect connection. Instances in your vpc do not require public ip addresses to communicate with resources in the service. Traffic between your vpc and the other service does not leave the Amazon network.

q: what is a vpc peering connection?
a: a vpc peering connection is a networking connection between two vpcs that enables you to route traffic between them privately. instances in either vpc can communicate with each other as if they are within the same network. you can create a vpc peering connection between your own vpcs, or with a vpc in another aws account. you cannot peer with a vpc in a different region.

q: what is a hardware virtual private cloud (hvpc)?
a: a hardware virtual private cloud (hvpc) is a dedicated network connection between your on-premises network and your vpc. you can use hvpc to extend your existing on-premises network into the aws cloud. you can also use hvpc to establish a private connection between your vpc and another aws account. hvpc is available in the us east (n. virginia), us west (n. california), us west (oregon), eu (ireland), eu (frankfurt), asia pacific (sydney), asia pacific (tokyo), and south america (sao paulo) regions.
*/