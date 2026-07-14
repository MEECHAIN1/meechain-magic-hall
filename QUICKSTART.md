# 🚀 MeeChain Magic Hall - Quick Start & Deploy Guide

**Complete copy-paste commands to deploy Magic Hall to Replit & Vercel**

---

## 🏁 Step 0: Prepare Your Machine

### Clone and Setup

```bash
# Navigate to working directory
cd /home/claude

# Create Magic Hall directory
mkdir meechain-magic-hall
cd meechain-magic-hall

# Initialize as git repo
git init
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

---

## 🎯 Step 1: Setup Environment (.env)

### Create .env.local

```bash
cat > .env.local << 'EOF'
# MeeChain Magic Hall Configuration
VITE_RPC_ENDPOINT=http://20.24.56.157:8080
VITE_API_ENDPOINT=http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT=http://20.24.56.157:3001
VITE_CHAIN_ID=13390
VITE_ENVIRONMENT=development
VITE_DEBUG=false
EOF
```

### For Production (Vercel)

```bash
cat > .env.production << 'EOF'
# Production MeeChain Configuration
VITE_RPC_ENDPOINT=https://rpc.meechain.live
VITE_API_ENDPOINT=https://api.meechain.live
VITE_FAUCET_ENDPOINT=https://faucet.meechain.live
VITE_CHAIN_ID=13390
VITE_ENVIRONMENT=production
VITE_DEBUG=false
EOF
```

---

## ⚡ Step 2: Local Development

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Output should show:**
```
✓ built in 234ms

➜  Local:   http://localhost:3000/
```

Open http://localhost:3000 in your browser! 🎉

---

## 🌐 Step 3: Deploy to Vercel

### 3a. Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "🪄 Initial MeeChain Magic Hall deployment"

# Create GitHub repository
# Go to https://github.com/new
# Create repository: "meechain-magic-hall"
# Copy your repo URL

# Add remote and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/meechain-magic-hall.git
git branch -M main
git push -u origin main
```

### 3b. Connect to Vercel

**Option A: Via Vercel CLI**

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod
```

When prompted:
- Set up and deploy? → `y`
- Which scope? → Choose your account
- Link to existing project? → `n`
- Project name? → `meechain-magic-hall`
- In which directory is your code? → `./`
- Override? → `y`

**Option B: Via Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Paste: `https://github.com/YOUR_USERNAME/meechain-magic-hall.git`
5. Click "Import"

### 3c. Configure Environment Variables

In Vercel Dashboard:

```
Project → Settings → Environment Variables
```

Add these variables:

```
VITE_RPC_ENDPOINT = https://rpc.meechain.live
VITE_API_ENDPOINT = https://api.meechain.live
VITE_FAUCET_ENDPOINT = https://faucet.meechain.live
VITE_CHAIN_ID = 13390
VITE_ENVIRONMENT = production
VITE_DEBUG = false
```

### 3d. Verify Deployment

Your app will be live at:
```
https://meechain-magic-hall.vercel.app
```

Check deployment:

```bash
# View logs
vercel logs

# Open project dashboard
vercel dashboard
```

---

## 🔄 Step 4: Deploy to Replit

### 4a. Prepare GitHub Repository

Make sure your code is pushed to GitHub (see Step 3a above)

### 4b. Create Replit Project

1. Go to https://replit.com
2. Click "Create" button
3. Select "Import from GitHub"
4. Enter: `YOUR_USERNAME/meechain-magic-hall`
5. Click "Import"

Replit will clone your repo and create a project.

### 4c. Configure Secrets

In Replit Editor:

1. Click **"Secrets"** icon (lock on left sidebar)
2. Add each variable:

```
VITE_RPC_ENDPOINT = http://20.24.56.157:8080
VITE_API_ENDPOINT = http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT = http://20.24.56.157:3001
VITE_CHAIN_ID = 13390
VITE_ENVIRONMENT = production
VITE_DEBUG = false
```

### 4d. Configure Run Command

Click **".replit"** file and update:

```
run = "npm install && npm run dev"
```

### 4e. Deploy

1. Click the **"Run"** button
2. Wait for build to complete
3. Click **"Invite"** in top right
4. Click **"Copy"** to copy Replit URL
5. Share the URL!

Your app will be live at:
```
https://meechain-magic-hall--USERNAME.replit.dev
```

---

## ✅ Post-Deployment Checklist

### Test Your Deployment

```bash
# 1. Test RPC Endpoint
curl -X POST http://20.24.56.157:8080 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Expected output:
# {"jsonrpc":"2.0","result":"0x...","id":1}

# 2. Test API Endpoint
curl http://20.24.56.157:5000/bridge/status

# Expected output:
# {"status":"Active",...}

# 3. Test Faucet
curl http://20.24.56.157:3001/balance

# Expected output:
# {"balance":"...","status":"Online"}
```

### Verify Web App

- [ ] Open deployed URL in browser
- [ ] Header shows "MeeChain Magic Hall"
- [ ] Can navigate between halls (click sidebar)
- [ ] Network stats load (RPC health shows 🟢)
- [ ] Connect wallet button works
- [ ] No console errors (F12 → Console tab)

---

## 🔧 Update Deployment

### Push Updates to Production

```bash
# Make changes locally
# Edit files...

# Commit and push
git add .
git commit -m "Add new feature to Magic Hall"
git push origin main
```

**Vercel** will auto-deploy when you push to main branch.

**Replit** will auto-update from GitHub.

---

## 🆘 Troubleshooting

### Vercel Deployment Fails

```bash
# Check build logs
vercel logs --follow

# Common issues:
# 1. Missing env vars → Add to Vercel dashboard
# 2. Node version → Ensure Node 16+ in vercel.json
# 3. Build command → Should be "npm run build"

# Rebuild production
vercel --prod --force
```

### Replit App Won't Start

1. Check console for errors (bottom of screen)
2. Click "Tools" → "Shell" and run:

```bash
npm install
npm run dev
```

3. If still fails, restart project:
   - Click three dots menu → "Restart project"

### RPC Connection Error

```bash
# Verify RPC endpoint in .env
# Test directly:
curl -X POST http://20.24.56.157:8080 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}'

# If this fails:
# - RPC server is down
# - Firewall is blocking port 8080
# - Check Azure VM status
```

### CORS Errors in Browser

```
Access to XMLHttpRequest at 'http://...' from origin '...' 
has been blocked by CORS policy
```

**Solution:**
1. Add your Vercel/Replit domain to API CORS whitelist
2. In your MeeChain server.js:

```javascript
app.use(cors({
  origin: [
    "https://meechain-magic-hall.vercel.app",
    "https://meechain-magic-hall--USERNAME.replit.dev"
  ],
  credentials: true
}));
```

---

## 📊 Monitoring Your Deployment

### Vercel Analytics

1. Go to https://vercel.com/dashboard
2. Select project
3. Click "Analytics" tab
4. View page load times, traffic

### Replit Logs

```bash
# In Replit Shell
tail -f ~/.replit/log
```

### Uptime Monitoring

Add to crontab:

```bash
*/5 * * * * curl -s https://meechain-magic-hall.vercel.app > /dev/null || echo "Website down"
```

---

## 🎯 Next Steps

### 1. Custom Domain (Vercel)

```bash
# In Vercel dashboard:
Project Settings → Domains → Add custom domain

# Example: magic.meechain.live
# Update DNS records to point to Vercel
```

### 2. SSL Certificate

Vercel provides free SSL automatically.

For custom domains:
- Let's Encrypt (free)
- Cloudflare (free)
- AWS Certificate Manager (free)

### 3. Auto-Updates with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/actions/deploy-production@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 🎉 Success!

Your MeeChain Magic Hall is now live! 

- 🌐 **Vercel:** https://meechain-magic-hall.vercel.app
- 🔄 **Replit:** https://meechain-magic-hall--USERNAME.replit.dev

### Share Your Deployment

```
✨ I just deployed MeeChain Magic Hall! 🪄

🌐 Check it out: [YOUR_URL]

Features:
🏛️ Real-time network monitoring
⚡ Cross-chain bridge status
🎮 Gamified quests & badges
🤖 AI-powered MeeBot guide

Built with React + Tailwind + Web3

#MeeChain #Web3 #Blockchain
```

---

**🚀 Happy deploying! If you need help, check DEPLOYMENT.md for detailed info.**

Last Updated: July 14, 2026  
Status: ✅ Production Ready
