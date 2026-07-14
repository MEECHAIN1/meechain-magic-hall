# 🚀 MeeChain Magic Hall - Deployment Guide

## Overview

MeeChain Magic Hall is a React-based Command Center Dashboard that connects to your MeeChain infrastructure. This guide covers deployment to **Replit** and **Vercel**.

---

## 📋 Prerequisites

- Node.js 16+ installed
- npm 8+
- Git repository set up
- MeeChain infrastructure running (RPC, API, Faucet)

---

## 🔧 Local Development

### 1. Clone & Setup

```bash
cd /home/claude/meechain-magic-hall
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_RPC_ENDPOINT=http://20.24.56.157:8080
VITE_API_ENDPOINT=http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT=http://20.24.56.157:3001
VITE_CHAIN_ID=13390
VITE_ENVIRONMENT=development
```

### 3. Run Development Server

```bash
npm run dev
```

App will be available at `http://localhost:3000`

---

## 🌐 Deploy to Replit

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial Magic Hall commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/meechain-magic-hall.git
git push -u origin main
```

### Step 2: Create Replit Project

1. Go to https://replit.com
2. Click "Create" → "Import from GitHub"
3. Select `meechain-magic-hall` repository
4. Wait for import to complete

### Step 3: Configure Replit

1. Click "Secrets" (lock icon)
2. Add environment variables:

```
VITE_RPC_ENDPOINT=http://20.24.56.157:8080
VITE_API_ENDPOINT=http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT=http://20.24.56.157:3001
VITE_CHAIN_ID=13390
VITE_ENVIRONMENT=production
```

3. Click ".replit" file and update run command:

```bash
npm install && npm run dev
```

### Step 4: Deploy

1. Click "Run" button
2. Click "Invite" → "Share" to get public URL
3. Your app will be live at `https://PROJECTNAME--USERNAME.replit.dev`

---

## 📦 Deploy to Vercel

### Step 1: Connect GitHub Repository

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose `meechain-magic-hall` repo

### Step 2: Configure Project

In Vercel dashboard:

1. **Framework Preset:** Vite
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Install Command:** `npm install`

### Step 3: Set Environment Variables

Click "Environment Variables" and add:

```
VITE_RPC_ENDPOINT=http://20.24.56.157:8080
VITE_API_ENDPOINT=http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT=http://20.24.56.157:3001
VITE_CHAIN_ID=13390
VITE_ENVIRONMENT=production
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://meechain-magic-hall.vercel.app`

---

## 🔌 API Endpoint Configuration

### Production Setup (Recommended)

For production, use your domain with proper SSL:

```env
VITE_RPC_ENDPOINT=https://rpc.meechain.live
VITE_API_ENDPOINT=https://api.meechain.live
VITE_FAUCET_ENDPOINT=https://faucet.meechain.live
```

### Development Setup

For testing, use direct IP:

```env
VITE_RPC_ENDPOINT=http://20.24.56.157:8080
VITE_API_ENDPOINT=http://20.24.56.157:5000
VITE_FAUCET_ENDPOINT=http://20.24.56.157:3001
```

---

## 🌍 Domain & DNS Configuration

### Vercel Domain Setup

1. Go to Vercel project settings
2. Click "Domains"
3. Add custom domain (e.g., `magic.meechain.live`)
4. Follow DNS configuration steps
5. Update environment variables in Vercel

---

## 🔐 CORS & Security

### For Production

If deploying to a different domain than MeeChain APIs:

1. Update MeeChain API CORS headers:

```javascript
// In your server.js
app.use(cors({
  origin: [
    "https://magic.meechain.live",
    "https://meechain-magic-hall.vercel.app"
  ],
  credentials: true
}));
```

2. Ensure RPC endpoint accepts requests from your domain

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-Deploy to Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: vercel/actions/deploy-production@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

1. Go to Vercel → Settings → Tokens
2. Create a token and add to GitHub Secrets
3. Get Org ID and Project ID from Vercel dashboard
4. Add secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

---

## 🧪 Testing Deployment

### Local Build Test

```bash
npm run build
npm run preview
```

### Health Check

After deployment, verify endpoints:

```bash
# Test RPC
curl -X POST http://20.24.56.157:8080 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Test API
curl http://20.24.56.157:5000/bridge/status

# Test Faucet
curl http://20.24.56.157:3001/balance
```

---

## 🚨 Troubleshooting

### 1. CORS Errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
- Check MeeChain API CORS headers
- Add your Vercel/Replit domain to allowed origins
- Use proxy in Vite config (already configured)

### 2. RPC Connection Failed

**Problem:** "RPC endpoint unavailable"

**Solution:**
- Verify `VITE_RPC_ENDPOINT` is correct
- Check firewall rules on Azure VM
- Test with curl command above

### 3. Build Fails

**Problem:** "Cannot find module 'ethers'"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 4. Environment Variables Not Loaded

**Problem:** Undefined variables in browser

**Solution:**
- All variables must be prefixed with `VITE_`
- Restart dev server after changing `.env.local`
- In Vercel, add to "Environment Variables" section

---

## 📊 Monitoring & Logs

### Vercel Logs

1. Go to Vercel dashboard
2. Select project
3. Click "Logs" tab
4. View build and runtime logs

### Replit Logs

- Check console in Replit editor
- Click "Tools" → "Shell" for server logs

### Application Monitoring

Add monitoring to MeeChain API:

```javascript
// In api.js
MeeChainAPI.getNetworkStatus = async () => {
  const startTime = performance.now();
  try {
    // ... fetch logic
    const duration = performance.now() - startTime;
    console.log(`RPC latency: ${duration}ms`);
    return { ...data, latency: duration };
  } catch (error) {
    console.error('RPC failed:', error);
    throw error;
  }
};
```

---

## 🔄 Updates & Rollback

### Push New Version

```bash
git add .
git commit -m "Update Magic Hall features"
git push origin main
```

Auto-deployment on both Replit and Vercel will trigger.

### Rollback to Previous Version

```bash
# Check git history
git log --oneline

# Rollback to specific commit
git revert <COMMIT_HASH>
git push origin main
```

---

## 📈 Performance Optimization

### Enable Build Optimization

In `vite.config.js`:

```javascript
build: {
  outDir: "dist",
  sourcemap: false,
  minify: "terser",
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ["react", "react-dom"],
      },
    },
  },
},
```

### CDN Optimization (Vercel)

- Images auto-optimized
- CSS minified
- JS bundled and cached

---

## 🎯 Production Checklist

- ✅ Environment variables configured
- ✅ CORS headers set on API
- ✅ RPC endpoints responding
- ✅ Build passes locally
- ✅ No console errors in browser
- ✅ Wallet connection works
- ✅ API calls return data
- ✅ SSL certificate valid
- ✅ DNS records configured
- ✅ Monitoring/logging enabled

---

## 📞 Support

For issues:

1. Check logs in Vercel/Replit
2. Test endpoints with curl
3. Verify environment variables
4. Review console errors in browser DevTools
5. Check MeeChain infrastructure status

---

**Status:** ✅ Ready for Production Deployment

Date: July 14, 2026
Version: 1.0.0
