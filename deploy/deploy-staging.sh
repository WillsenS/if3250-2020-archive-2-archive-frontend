#!/bin/bash

set -e

# Write the public key of our aws instance
eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

# Disable the host key checking
sudo mkdir -p ~/.ssh
sudo touch ~/.ssh/config
sudo bash -c 'echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'

# Deploy to staging server
echo "Deploying to ${STAGING_SERVER}"
ssh ubuntu@${STAGING_SERVER} 'bash' < ./deploy/clone-staging.sh

# Create .env variables
echo NODE_ENV=staging >> .env

scp ./.env ubuntu@${STAGING_SERVER}:/home/ubuntu/archive-frontend/

ssh ubuntu@${STAGING_SERVER} 'bash' < ./deploy/update-restart-staging.sh