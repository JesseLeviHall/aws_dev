/* 
The Elastic File System (EFS) is an AWS managed implementation of NFS(network file system v4, fairly common) which allows for the creation of shared 'filesystems' which can be mounted within multi EC2 instances.

EFS can play an essential part in building scalable and resilient systems.

content can be stored outside of the instance running the app, provides big benefits for scaling and self healing architecture - essentially moving the ec2 instances closer to being stateless.

-Can be mounted on Linux
-Shared betw many EC2
-Private Service, via mount targets inside a VPC
-Can be accessed from on-premises, vpn, DX, Peering, or aws direct connect (a physical private network connection between a vpc and existing on premises networks). 

Architecture is: it runs in a VPC, create file sys with POSIX permissions(linux interperability standard). It is made available via mount targets running to subnets in the VPC. For HA put mount targets in multiple AZs, every AZ of the VPC.

EFS is for linux only
two performancy modes:
General purpose - default for 99%
Max IO - for Big Data, media processing, scientific analysis - anythig highly parallel

two throughput modes: 
Bursting - scales up with more files
Provisioned - for apps that require consistent performance

two storage classes:
Standard - default for 99%
Infrequent access - for data accessed less than once a week
Ablity to use lifecycle policies like in s3, to be used with classes. 

example: mount a efs on a ec2, create a file, mount another ec2 and see the file what was create on the first instance...
# INSTANCE A

df -k
sudo mkdir -p /efs/wp-content
sudo yum -y install amazon-efs-utils
cd /etc
sudo nano /etc/fstab

file-system-id:/ /efs/wp-content efs _netdev,tls,iam 0 0 

sudo mount /efs/wp-content
df -k
cd /efs/wp-content
sudo touch amazingtestfile.txt

# INSTANCE B

df -k
sudo yum -y install amazon-efs-utils
sudo mkdir -p /efs/wp-content
sudo nano /etc/fstab
file-system-id:/ /efs/wp-content efs _netdev,tls,iam 0 0
sudo mount /efs/wp-content
ls -la

============FSx for windows=============


*/