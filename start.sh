#!/bin/bash

# QuestionPaperz - Automated Deployment Script for AWS EC2 (Ubuntu)
# This script installs dependencies, builds the app, and starts it using PM2.

echo "🚀 Starting Deployment Process..."

# 1. Update and Install System Dependencies
echo "📦 Updating system and installing Node.js..."
sudo apt update && sudo apt upgrade -y
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. Install Project Dependencies
echo "📥 Installing npm packages..."
npm install

# 3. Setup Database (Prisma)
echo "🗄️ Syncing database schema..."
npx prisma generate
npx prisma db push

# 4. Build Production Bundle
echo "🏗️ Building Next.js application..."
npm run build

# 5. Setup PM2 (Process Manager)
echo "🔄 Starting application with PM2..."
sudo npm install -g pm2
pm2 delete questionpapers 2>/dev/null || true
pm2 start npm --name "questionpapers" -- start

# Save PM2 state to restart on reboot
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# 6. Nginx Setup (Optional but recommended)
if ! command -v nginx &> /dev/null; then
    echo "🌐 Installing and configuring Nginx..."
    sudo apt install nginx -y
    
    # Get Public IP
    PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
    
    # Create Nginx Config
    sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'
    sudo systemctl restart nginx
fi

echo "✅ Deployment Complete!"
echo "📍 Your app is live at: http://$(curl -s http://checkip.amazonaws.com)"
