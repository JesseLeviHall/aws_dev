/* 
-Local Networking = ethernet for example, or wifi

-Remote Networking = internet, start and end of data transfer

-Protocol = rules for data transfer

-Port = a specific endpoint for data transfer

-IP Address = a unique identifier for a device on a network

OSI 7 Layer Model:
1. Physical Layer
    electrical tranmission cable or wire - copper wire. unstructured raw bit stream, no device addressing, collisions occur
2. Data Link Layer
    MAC address for each peice of hardware is globally unique. frames. controlled access to layer 1. 
    ethernet, wifi, bluetooth, etc. - structured raw bit stream, device addressing, no collisions. 
3. Network Layer 
    The network layer adds the ability for cross-network addressing (IP Addresses). It allows packets to be routed across different layer 2 networks, via L2 Frame encapsulation and forwarding decisions using routes and route tables. Its Layer 3 which allows the internet to function.
4. Transport Layer
    The transport layer adds Ports, error correction, retransmission, flow control and a connection orientated architecture.
5. Session Layer
    The session layer adds the ability to establish and maintain a connection between two devices. It also adds the ability to manage the connection, including the ability to terminate the connection.
6. Presentation Layer
    The presentation layer adds the ability to translate data between different formats. It also adds the ability to encrypt and decrypt data.
7. Application Layer
    The application layer adds the ability to communicate with applications. It also adds the ability to manage the application, including the ability to terminate the application.

You need two sets of rules on a network ACL within AWS.  One for the initiating part (laptop to server) and one for the response (server to laptop). the terms ephemeral ports or hight ports refer to the port range that the client picks as the source port. 


 a ddos attack is a distributed denial of service attack. it is an attack where a large number of computers are used to send a large amount of traffic to a single computer or network. the goal is to make the target computer or network unavailable to its intended users.


TCP/IP 4 Layer Model:
1. Application Layer
2. Transport Layer
3. Internet Layer
4. Network Access Layer

q: what is the difference between a protocol and a port?
a: a protocol is a set of rules for data transfer, and a port is a specific endpoint for data transfer

q: what is the difference between a port and an IP address?
a: a port is a specific endpoint for data transfer, and an IP address is a unique identifier for a device on a network


============Decimal to binary conversion=========
q: what is decimal to binary conversion?
a: 1. divide the decimal number by 2
2. write down the remainder
3. divide the quotient by 2
4. write down the remainder
5. repeat until the quotient is 0
6. read the remainders from bottom to top
7. the binary number is the remainders read from bottom to top
8. if the binary number is not 8 bits long, add 0s to the front until it is 8 bits long
9. the binary number is the binary representation of the decimal number

============Binary to decimal conversion=========
what is binary to decimal conversion? each number in the ip address is 8 bits long, so 8 bits = 1 byte
1. read the binary number from right to left
2. multiply each digit by 2 to the power of its position
3. add all of the products together
4. the decimal number is the sum of all of the products
5. the decimal number is the decimal representation of the binary number

q: what is transport session?
a: a transport session is a connection between two devices that allows for data transfer

q: what is a socket?
a: a socket is a connection endpoint for data transfer. 

q: what is network address translation?
a: network address translation is a process that translates a private IP address to a public IP address

q: what is DNSSEC?
a: DNSSEC is a security extension to DNS that provides authentication and integrity for DNS data using digital signatures based on public key cryptography. 

q: what is a DNS record?
a: a DNS record is a resource record that contains information about a domain name

q: what is a DNS zone?
a: a DNS zone is a collection of DNS records

q: what is the recovery time objextive (rto)?
a: the recovery time objective (rto) is the maximum amount of time that a system can be down before it is considered a failure

q: what is the recovery point objective (rpo)?
a: the recovery point objective (rpo) is the maximum amount of data that can be lost before it is considered a failure
*/
