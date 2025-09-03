# 🚀 **IBM Cloud Code Engine Deployment Guide**
## Services Australia AI Assistant

This guide provides step-by-step instructions for deploying the Services Australia AI Assistant on IBM Cloud Code Engine.

---

## 📋 **Prerequisites**

### **1. IBM Cloud Account**
- IBM Cloud account with active subscription
- Access to Code Engine service
- Container Registry access

### **2. Local Development Environment**
- Node.js 18+ installed
- Docker installed and running
- IBM Cloud CLI installed
- Git installed

### **3. GitHub Repository**
- GitHub account with access to [https://github.com/anupk-adda/saai](https://github.com/anupk-adda/saai)
- Repository cloned locally
- All code committed and pushed to GitHub

### **4. Required Tools Installation**

#### **Install IBM Cloud CLI**
```bash
# macOS
curl -fsSL https://clis.cloud.ibm.com/install/osx | sh

# Linux
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Windows (PowerShell)
iex(New-Object Net.WebClient).DownloadString('https://clis.cloud.ibm.com/install/powershell')
```

#### **Install Code Engine CLI Plugin**
```bash
ibmcloud plugin install code-engine
```

#### **Install Container Registry Plugin**
```bash
ibmcloud plugin install container-registry
```

---

## 🔧 **Step 1: Publish Code to GitHub**

### **1.1 Initialize Git Repository**
```bash
cd services-ai

# Initialize git repository
git init

# Set remote origin
git remote add origin https://github.com/anupk-adda/saai.git

# Verify remote
git remote -v
```

### **1.2 Add and Commit Files**
```bash
# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Services Australia AI Assistant

- Complete Next.js application with AI assistant
- All 5 demo scenarios working perfectly
- IBM Cloud Code Engine deployment ready
- Docker configuration included
- Comprehensive documentation
- Production-ready configuration"
```

### **1.3 Push to GitHub**
```bash
# Push to main branch
git push -u origin main
```

### **1.4 Verify GitHub Repository**
- Visit [https://github.com/anupk-adda/saai](https://github.com/anupk-adda/saai)
- Verify all files are uploaded
- Check README.md displays correctly

## 🔧 **Step 2: Prepare the Application**

### **2.1 Verify Application Structure**
Ensure your project has the following structure:
```
services-ai/
├── src/
├── public/
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── Dockerfile
├── .dockerignore
└── README.md
```

### **2.2 Test Local Build**
```bash
cd services-ai
npm install
npm run build
npm start
```

---

## 🐳 **Step 2: Create Docker Configuration**

### **2.1 Create Dockerfile**
```dockerfile
# Use the official Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### **2.2 Create .dockerignore**
```dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.env
.env.local
.env.production.local
.env.development.local
.git
.gitignore
.next
.vercel
coverage
.nyc_output
```

### **2.3 Update next.config.mjs for Standalone Build**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig
```

---

## 🔐 **Step 3: IBM Cloud Authentication**

### **3.1 Login to IBM Cloud**
```bash
ibmcloud login
```

### **3.2 Set Target Region**
```bash
# Set your preferred region (e.g., us-south, eu-gb, au-syd)
ibmcloud target -r us-south
```

### **3.3 Create or Select Resource Group**
```bash
# List existing resource groups
ibmcloud resource groups

# Create new resource group (optional)
ibmcloud resource group-create services-ai-rg

# Set target resource group
ibmcloud target -g services-ai-rg
```

---

## 🏗️ **Step 4: Create Code Engine Project**

### **4.1 Create Code Engine Project**
```bash
# Create a new Code Engine project
ibmcloud ce project create --name services-ai-project --select
```

### **4.2 Verify Project Creation**
```bash
# List projects
ibmcloud ce project list

# Get project details
ibmcloud ce project get
```

---

## 📦 **Step 5: Create Registry Access Secret**

### **5.1 Create API Key**
```bash
# Create API key for Code Engine
ibmcloud iam api-key-create codeengine-icr-key
```

### **5.2 Create Registry Secret**
```bash
# Create registry secret (replace YOUR_API_KEY with the actual key from step 5.1)
ibmcloud ce secret create \
  --name icr-secret \
  --format registry \
  --server us.icr.io \
  --username iamapikey \
  --password YOUR_API_KEY
```

## 🏗️ **Step 6: Build Application from GitHub Repository**

### **6.1 Create Build Configuration**
```bash
# Create build configuration using GitHub repository
ibmcloud ce build create \
  --name services-ai-build \
  --source https://github.com/anupk-adda/saai \
  --context-dir . \
  --dockerfile Dockerfile \
  --strategy dockerfile \
  --image us.icr.io/services-ai-namespace/services-ai-app:latest \
  --registry-secret icr-secret
```

### **6.2 Submit Build**
```bash
# Submit build run
ibmcloud ce buildrun submit \
  --build services-ai-build \
  --name services-ai-buildrun-1 \
  --wait
```

### **6.3 Verify Build**
```bash
# Check build status
ibmcloud ce buildrun get --name services-ai-buildrun-1

# List images in your namespace
ibmcloud cr images
```

---

## 🚀 **Step 7: Deploy to Code Engine**

### **7.1 Create Application**
```bash
# Create Code Engine application using the built image
ibmcloud ce app create \
  --name services-ai-app \
  --image us.icr.io/services-ai-namespace/services-ai-app:latest \
  --port 3000 \
  --cpu 0.5 \
  --memory 1Gi \
  --min-scale 1 \
  --max-scale 10 \
  --env NODE_ENV=production
```

### **7.2 Verify Application Deployment**
```bash
# Get application details
ibmcloud ce app get --name services-ai-app

# Get application URL
ibmcloud ce app get --name services-ai-app --output url
```

---

## 🌐 **Step 8: Configure Custom Domain (Optional)**

### **8.1 Create Custom Domain**
```bash
# Create custom domain
ibmcloud ce domain create \
  --name services-ai-domain \
  --hostname your-domain.com
```

### **8.2 Map Domain to Application**
```bash
# Map domain to application
ibmcloud ce domain mapping create \
  --domain services-ai-domain \
  --app services-ai-app
```

---

## 🔄 **Step 9: Continuous Deployment Setup**

### **9.1 Create Deployment Script**
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment to IBM Cloud Code Engine..."

# Submit new build from GitHub repository
echo "📦 Building application from GitHub repository..."
ibmcloud ce buildrun submit \
  --build services-ai-build \
  --name services-ai-buildrun-$(date +%s) \
  --wait

# Update application
echo "🔄 Updating Code Engine application..."
ibmcloud ce app update \
  --name services-ai-app \
  --image us.icr.io/services-ai-namespace/services-ai-app:latest

echo "✅ Deployment completed successfully!"
echo "🌐 Application URL: $(ibmcloud ce app get --name services-ai-app --output url)"
```

### **9.2 Make Script Executable**
```bash
chmod +x deploy.sh
```

---

## 📊 **Step 10: Monitoring and Logs**

### **10.1 View Application Logs**
```bash
# Stream application logs
ibmcloud ce app logs --name services-ai-app --follow

# Get recent logs
ibmcloud ce app logs --name services-ai-app --tail 100
```

### **10.2 Monitor Application Metrics**
```bash
# Get application status
ibmcloud ce app get --name services-ai-app

# List application revisions
ibmcloud ce revision list --app services-ai-app
```

---

## 🔧 **Step 11: Environment Variables**

### **11.1 Set Environment Variables**
```bash
# Set environment variables
ibmcloud ce app update \
  --name services-ai-app \
  --env NODE_ENV=production \
  --env PORT=3000 \
  --env HOSTNAME=0.0.0.0
```

### **11.2 Update Application with New Variables**
```bash
# Update application with environment variables
ibmcloud ce app update \
  --name services-ai-app \
  --env-file .env.production
```

---

## 🛠️ **Troubleshooting**

### **Common Issues and Solutions**

#### **1. Build Failures**
```bash
# Check build logs
docker build -t services-ai-app . --no-cache

# Verify Dockerfile syntax
docker run --rm -i hadolint/hadolint < Dockerfile
```

#### **2. Image Push Failures**
```bash
# Verify registry login
ibmcloud cr login

# Check namespace permissions
ibmcloud cr namespace-list
```

#### **3. Application Deployment Issues**
```bash
# Check application status
ibmcloud ce app get --name services-ai-app

# View deployment logs
ibmcloud ce app logs --name services-ai-app --tail 50
```

#### **4. Performance Issues**
```bash
# Scale application
ibmcloud ce app update \
  --name services-ai-app \
  --min-scale 2 \
  --max-scale 20

# Increase resources
ibmcloud ce app update \
  --name services-ai-app \
  --cpu 1 \
  --memory 2Gi
```

---

## 📋 **Deployment Checklist**

### **Pre-Deployment**
- [ ] IBM Cloud account active
- [ ] Required CLI tools installed
- [ ] Application tested locally
- [ ] Dockerfile created and tested
- [ ] Container registry namespace created

### **Deployment**
- [ ] IBM Cloud CLI authenticated
- [ ] Code Engine project created
- [ ] Docker image built and pushed
- [ ] Application deployed to Code Engine
- [ ] Application URL accessible

### **Post-Deployment**
- [ ] Application responding correctly
- [ ] All API endpoints working
- [ ] Environment variables set
- [ ] Monitoring configured
- [ ] Custom domain configured (if needed)

---

## 🎯 **Quick Deployment Commands**

### **One-Command Deployment**
```bash
# Complete deployment in one command
./deploy.sh
```

### **Manual Step-by-Step**
```bash
# 1. Create API key and registry secret
ibmcloud iam api-key-create codeengine-icr-key
ibmcloud ce secret create --name icr-secret --format registry --server us.icr.io --username iamapikey --password YOUR_API_KEY

# 2. Create build configuration
ibmcloud ce build create \
  --name services-ai-build \
  --source https://github.com/anupk-adda/saai \
  --context-dir . \
  --dockerfile Dockerfile \
  --strategy dockerfile \
  --image us.icr.io/services-ai-namespace/services-ai-app:latest \
  --registry-secret icr-secret

# 3. Submit build
ibmcloud ce buildrun submit \
  --build services-ai-build \
  --name services-ai-buildrun-1 \
  --wait

# 4. Deploy application
ibmcloud ce app create \
  --name services-ai-app \
  --image us.icr.io/services-ai-namespace/services-ai-app:latest \
  --port 3000 \
  --cpu 0.5 \
  --memory 1Gi \
  --min-scale 1 \
  --max-scale 10

# 5. Get URL
ibmcloud ce app get --name services-ai-app --output url
```

---

## 📞 **Support and Resources**

### **IBM Cloud Documentation**
- [Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [Container Registry Documentation](https://cloud.ibm.com/docs/container-registry)
- [CLI Reference](https://cloud.ibm.com/docs/cli)

### **Application Support**
- Check application logs: `ibmcloud ce app logs --name services-ai-app`
- Monitor application status: `ibmcloud ce app get --name services-ai-app`
- Scale application: `ibmcloud ce app update --name services-ai-app --min-scale 2`

---

## 🎉 **Deployment Complete!**

Your Services Australia AI Assistant is now successfully deployed on IBM Cloud Code Engine and ready to serve users with intelligent, responsible AI assistance for government services!

**Next Steps:**
1. Test all 5 suggested questions on the deployed application
2. Monitor application performance and logs
3. Set up custom domain if needed
4. Configure monitoring and alerting
5. Plan for scaling based on usage
