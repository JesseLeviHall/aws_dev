/* 
# Install Docker Engine on EC2 Instance connected via instant connect
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

LOGOUT and re login as user 

sudo su - ec2-user

# Build Docker Image
cd container
docker build -t containerofcats .
docker images --filter reference=containerofcats

# Run Container from Image
docker run -t -i -p 80:80 containerofcats

# Upload Container to Dockerhub (optional)
docker login --username=YOUR_USER
docker images
docker tag IMAGEID YOUR_USER/containerofcats
docker push YOUR_USER/containerofcats:latest
 */