#!/bin/bash

set -e

# Delete the old repository folder
sudo su
rm -rf /home/ubuntu/archive-frontend/

# Clone the github repository staging branch (usually develop)
cd /home/ubuntu/
git clone -b develop --single-branch git@gitlab.informatika.org:if3250-2020-archive-2/archive-frontend.git

chmod 777 /home/ubuntu/archive-frontend/