/* 
Virtualization means running different OS's on on peice of hardware. 
Containers on the other hand, are a way to run multiple isolated processes on a single OS instance.

On ec2 for example it would be a waste to run the same OS on mubliple instances and a different app on each instance, just use containers to use one instance and run multiple apps on that instance in seperate environments(containers)

Container Images are:
- A read-only template with instructions for creating a running container, built using a differential architecture. 
- some layers include the base or scratch FileSystem, then sofware packages and web server, then final customizations at the top

The Docker Container is then a running copy of the image with a read/write file sys layer instead of read only. The lower layers are shared between running containers generally, making saling up on the same os really efficient. 

Docker is a containerization platform that allows you to build, ship, and run distributed applications.
Docker Files are used to buile images, and these can be kept on docker hub like github but for docker. 

Ports are 'exposed' to the host and beyond
*/