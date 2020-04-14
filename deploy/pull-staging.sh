#!/bin/bash

set -e

# Change to root
sudo su

# Stop the previous pm2
echo "Killing previous pm2 and deleting frontend from pm2"
pm2 delete frontend

# Pull staging
cd /home/ubuntu/archive-frontend/
git pull

chmod 777 /home/ubuntu/archive-frontend/