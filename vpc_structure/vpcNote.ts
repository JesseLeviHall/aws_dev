/* 
This lesson steps through the design choices around VPC design and IP planning.
Nat

q: what is a vpc?
a: a virtual private cloud is a virtual network dedicated to your aws account. it is logically isolated from other virtual networks in the aws cloud. you can launch your aws resources, such as ec2 instances, into your vpc. you can configure your vpc to be a single tier or multi-tier architecture. you can configure your vpc to span multiple availability zones. you can also create a hardware virtual private cloud (hvpc) to connect your on-premises network to your vpc using a dedicated hardware connection.

q: what is a dedicated ip?
a: a dedicated ip address is a static ip address that is associated with your aws account. you can associate a dedicated ip address with an elastic ip address or an instance in your vpc. you can also associate a dedicated ip address with an instance in your on-premises network using a hardware virtual private cloud (hvpc). dedicated ip addresses are available in the us east (n. virginia), us west (oregon), us west (n. california), eu (ireland), eu (frankfurt), asia pacific (singapore), asia pacific (sydney), asia pacific (tokyo), and south america (sao paulo) regions.
*/