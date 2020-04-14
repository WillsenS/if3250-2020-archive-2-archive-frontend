#!/bin/bash

set -e

sudo su

chmod 755 /home/ubuntu/archive-frontend/
cd /home/ubuntu/archive-frontend/

# Stop the previous pm2
echo "Killing previous pm2 and deleting frontend from pm2"
pm2 delete frontend

cd /home/ubuntu/

# Delete the old repository folder
rm -rf /home/ubuntu/archive-frontend/

# Clone the github repository staging branch (usually develop)
git clone -b develop --single-branch git@gitlab.informatika.org:if3250-2020-archive-2/archive-frontend.git

chmod 777 /home/ubuntu/archive-frontend/