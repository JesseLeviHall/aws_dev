/* 
============from mono ec2 to dedicated 2c2======
//typically bad architecture
# Backup of Source Database
mysqldump -u root -p a4lwordpress > a4lwordpress.sql


# Restore to Destination Database
mysql -h privateipof_a4l-mariadb -u a4lwordpress -p a4lwordpress < a4lwordpress.sql 

# Change WP Config
cd /var/www/html
sudo nano wp-config.php

replace MySQL hostname
define('DB_HOST', 'localhost');

with MySQL hostname 
define('DB_HOST', 'REPLACEME_WITH_MARIADB_PRIVATEIP'); 

sudo service mariadb stop

==================create a MYSQL RDS Instance=============
# Backup of Source Database
mysqldump -h PRIVATEIPOFMARIADBINSTANCE -u a4lwordpress -p a4lwordpress > a4lwordpress.sql


# Restore to Destination Database
mysql -h CNAMEOFRDSINSTANCE -u a4lwordpress -p a4lwordpress < a4lwordpress.sql 

# Change WP Config
cd /var/www/html
sudo nano wp-config.php

replaceMySQL hostname 
define('DB_HOST', 'PRIVATEIPOFMARIADBINSTANCE');

with MySQL hostname 
define('DB_HOST', 'REPLACEME_WITH_RDSINSTANCEENDPOINTADDRESS'); 
*/