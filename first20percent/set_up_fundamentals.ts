/* 
Here begins the course on aws developer cert. 
 
The cloned repo is in this folder periodically run a git pull in the folder.

The labs repo has mini projects that I should practice with. Pet Cuddle-o-tron is a serveless reminder app. 

The aws console is the place to go to manage your aws services.

Animals for life rescue organization, IoT and big data. Animal care, activists and lobbyists, as distributed business scenario that utilzes cloud architecture 

A company may use many aws accounts with emails and passwords.. each account is like a container, the account owner cannot limit the permissions for itself, but AIM accounts can be added to them with various permissions.

IAM is the service that manages users and permissions. IAM identities start with no permissions on an AWS Account, but can be granted permissions (almost) up to those held by the Account Root User. Least Priviledge access principle. 
======
IAM is a global service, it is not region specific. Globally resilent and secure across all regions. 

(Authorizes access, authenticates users, manages identities)

there are three idendity objects: 
1. Users: people or applications who use aws services.
2. Groups: collection of users. eg dev team, finance, HR
3. Roles: a way to grant external permissions to aws resources, Good for uncertain number of access grants. 

policies do nothing until attatched to a IAM

==========
simple systems might operate on a single aws account. Large app systems might use hundreds of accounts. 

multi-account management is part of the skillset. 

============steps to set up accounts====================

start with a Gerneal (management) account with a 'root' user. there can only be one per account. create multifactor auth, and IAM user called admin to do stuff in the account.  Then create a completely seperate new aws account for Production with an IAM account called admin. 
This is simpler with gmail as you can add +AWSAccount1@gmail.com as many times as needed. 

after starting new account go to account dropdown, update alternate contacts, and update IAM access checkbox. 

setup Multi-Factor Authentication (MFA) for the root user - virtual device. 

configure the budget: billing dashboard, billing preferences, check all the boxes, launch cost explorer, then go to budgets, create a monthly cost budget,

create an IAM user called admin, with an alias for keeping straight, uncheck password reset, and just management access, attach existing policies: administrator access. save log in url, sign in as this IAM from now on. Set up MFA again for this identity. 

=========Then IAM Access Keys and CLI===============
IAM users can have access keys, which are like passwords. They are used to asign programmatic requests to aws services. They do not change or update automatically = longterm credentials. IAM can have 0, 1, or 2 access keys. Generally 2 would be for rotating a new one every so often.  There is a key ID and a secret key that you can only view one time. 

then run aws configure --profile iamadmin-general, add credentials, default none output. 
test the connection by running aws s3 ls --profile iamadmin-general. returns empty string to begin.
Do this for prod (iamadmin-production) aswell


*/
