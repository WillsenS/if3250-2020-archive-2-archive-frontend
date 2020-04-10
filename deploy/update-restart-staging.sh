set -e

sudo su

chmod 755 /home/ubuntu/archive-frontend/
cd /home/ubuntu/archive-frontend/

# Install npm packages
echo "Running npm install -g"
npm install

echo "Starting npm on pm2"
pm2 start server.js --name frontend