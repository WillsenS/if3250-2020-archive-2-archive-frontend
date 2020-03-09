set -e

sudo su

chmod 755 /home/ubuntu/archive-frontend/
cd /home/ubuntu/archive-frontend/

# Stop the previous pm2
echo "Killing previous pm2 and deleting frontend from pm2"
pm2 delete frontend

# Install npm packages
echo "Running npm install -g"
npm install -g

# Restart the node
echo "Restarting node..."
pm2 start app.js --name "frontend"
