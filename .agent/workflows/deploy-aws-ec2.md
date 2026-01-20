---
description: Deploy Next.js App to AWS EC2
---

# Deploying to AWS EC2 (Ubuntu 22.04 LTS)

Follow these steps to deploy your QuestionPaperz application on an AWS EC2 instance.

## 1. Prepare your EC2 Instance
- Launch a **t2.micro** (or larger) instance with **Ubuntu 22.04 LTS**.
- In **Security Groups**, ensure ports **22 (SSH)**, **80 (HTTP)**, and **443 (HTTPS)** are open.

## 2. Server Setup
SSH into your instance:
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

Update system and install Node.js:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 3. Clone and Install
Clone your repository:
```bash
git clone <your-repo-url>
cd questionpapers
npm install
```

## 4. Environment Configuration
Create a `.env` file and add your production variables:
```bash
nano .env
```
Add:
```text
DATABASE_URL="your_supabase_db_url"
NEXTAUTH_URL="http://your-ec2-ip"
NEXTAUTH_SECRET="your_secret"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_key"
```

## 5. Build and Database
Sync your database and build the production bundle:
```bash
npx prisma db push
npm run build
```

## 6. Process Management (PM2)
Install PM2 to keep your app running forever:
```bash
sudo npm install -g pm2
pm2 start npm --name "questionpapers" -- start
pm2 save
pm2 startup
```

## 7. Nginx Reverse Proxy
Install Nginx:
```bash
sudo apt install nginx -y
```

Configure Nginx:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the content with:
```nginx
server {
    listen 80;
    server_name your-domain-or-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

## 8. Finished!
Your app should now be live at `http://your-ec2-ip`.
