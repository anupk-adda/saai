# ✅ **IBM Cloud Code Engine Deployment Checklist**

## 📋 **Pre-Deployment Checklist**

### **🔧 Prerequisites**
- [ ] IBM Cloud account with active subscription
- [ ] IBM Cloud CLI installed (`ibmcloud --version`)
- [ ] Code Engine CLI plugin installed (`ibmcloud plugin list`)
- [ ] Container Registry CLI plugin installed (`ibmcloud plugin list`)
- [ ] Docker installed and running (`docker --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed (`git --version`)

### **🏗️ Application Preparation**
- [ ] Application tested locally (`npm run build && npm start`)
- [ ] All 5 suggested questions working perfectly
- [ ] Dockerfile created and tested locally
- [ ] .dockerignore file created
- [ ] next.config.mjs updated with `output: 'standalone'`
- [ ] package.json has correct build scripts

### **🔐 IBM Cloud Setup**
- [ ] Logged into IBM Cloud (`ibmcloud login`)
- [ ] Target region set (`ibmcloud target -r us-south`)
- [ ] Resource group selected (`ibmcloud target -g your-rg`)
- [ ] Container Registry namespace created
- [ ] Code Engine project created

---

## 🚀 **Deployment Steps**

### **Step 1: Authentication**
```bash
# Login to IBM Cloud
ibmcloud login

# Set target region (choose your preferred region)
ibmcloud target -r us-south  # or eu-gb, au-syd, etc.

# Set resource group
ibmcloud target -g your-resource-group
```

### **Step 2: Create Code Engine Project**
```bash
# Create project
ibmcloud ce project create --name services-ai-project --select

# Verify project creation
ibmcloud ce project get
```

### **Step 3: Setup Container Registry**
```bash
# Create namespace
ibmcloud cr namespace-add services-ai-namespace

# Login to registry
ibmcloud cr login
```

### **Step 4: Build and Push Image**
```bash
# Build Docker image
docker build -t services-ai-app .

# Tag for IBM Container Registry
docker tag services-ai-app us.icr.io/services-ai-namespace/services-ai-app:latest

# Push to registry
docker push us.icr.io/services-ai-namespace/services-ai-app:latest
```

### **Step 5: Deploy Application**
```bash
# Deploy to Code Engine
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

### **Step 6: Verify Deployment**
```bash
# Get application URL
ibmcloud ce app get --name services-ai-app --output url

# Check application status
ibmcloud ce app get --name services-ai-app

# View logs
ibmcloud ce app logs --name services-ai-app
```

---

## 🧪 **Post-Deployment Testing**

### **✅ Application Health Check**
- [ ] Application URL accessible
- [ ] Home page loads correctly
- [ ] Services Australia branding visible
- [ ] User selector dropdown working
- [ ] Navigation between views working

### **✅ Chat Interface Testing**
- [ ] Chat interface loads correctly
- [ ] "New Chat" button working
- [ ] Thinking animation displays
- [ ] Proactive action boxes appear

### **✅ All 5 Suggested Questions**
- [ ] **"When is my next payment?"** → Shows payment breakdown
- [ ] **"Am I eligible for Family Tax Benefit?"** → Shows personalized eligibility
- [ ] **"How do I apply for Medicare?"** → Shows application guidance
- [ ] **"I am having a baby, what help is available?"** → Shows life event coordination
- [ ] **"I lost my job, what payments can I get?"** → Shows job loss support

### **✅ API Endpoints Testing**
- [ ] `/api/chat` endpoint working
- [ ] `/api/user` endpoint working
- [ ] `/api/actions` endpoint working
- [ ] `/api/eligibility` endpoint working

### **✅ Proactive Actions Testing**
- [ ] Payment details action working
- [ ] Service suggestions action working
- [ ] Application status action working
- [ ] Eligibility guidance action working

---

## 🔧 **Configuration Options**

### **Environment Variables**
```bash
# Set environment variables
ibmcloud ce app update \
  --name services-ai-app \
  --env NODE_ENV=production \
  --env PORT=3000 \
  --env HOSTNAME=0.0.0.0
```

### **Scaling Configuration**
```bash
# Scale application
ibmcloud ce app update \
  --name services-ai-app \
  --min-scale 2 \
  --max-scale 20 \
  --cpu 1 \
  --memory 2Gi
```

### **Custom Domain (Optional)**
```bash
# Create custom domain
ibmcloud ce domain create \
  --name services-ai-domain \
  --hostname your-domain.com

# Map domain to application
ibmcloud ce domain mapping create \
  --domain services-ai-domain \
  --app services-ai-app
```

---

## 📊 **Monitoring and Maintenance**

### **Application Monitoring**
- [ ] Set up application monitoring
- [ ] Configure log aggregation
- [ ] Set up performance metrics
- [ ] Configure alerting

### **Regular Maintenance**
- [ ] Monitor application logs regularly
- [ ] Check application performance
- [ ] Update dependencies as needed
- [ ] Scale resources based on usage

---

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Check Docker build
docker build -t services-ai-app . --no-cache

# Check Dockerfile syntax
docker run --rm -i hadolint/hadolint < Dockerfile
```

#### **Image Push Failures**
```bash
# Verify registry login
ibmcloud cr login

# Check namespace permissions
ibmcloud cr namespace-list
```

#### **Application Deployment Issues**
```bash
# Check application status
ibmcloud ce app get --name services-ai-app

# View deployment logs
ibmcloud ce app logs --name services-ai-app --tail 50
```

#### **Performance Issues**
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

## 🎯 **Quick Commands Reference**

### **Deployment Commands**
```bash
# Full deployment
./deploy.sh

# Quick deployment
./quick-deploy.sh

# Manual deployment
docker build -t services-ai-app .
docker tag services-ai-app us.icr.io/services-ai-namespace/services-ai-app:latest
docker push us.icr.io/services-ai-namespace/services-ai-app:latest
ibmcloud ce app create --name services-ai-app --image us.icr.io/services-ai-namespace/services-ai-app:latest --port 3000
```

### **Management Commands**
```bash
# Get application URL
ibmcloud ce app get --name services-ai-app --output url

# View logs
ibmcloud ce app logs --name services-ai-app --follow

# Update application
ibmcloud ce app update --name services-ai-app --image us.icr.io/services-ai-namespace/services-ai-app:latest

# Delete application
ibmcloud ce app delete --name services-ai-app
```

---

## ✅ **Deployment Success Criteria**

### **✅ All Tests Passing**
- [ ] All 5 suggested questions working perfectly
- [ ] All API endpoints responding correctly
- [ ] Proactive actions functioning properly
- [ ] Application accessible via public URL
- [ ] Performance meets requirements

### **✅ Production Ready**
- [ ] Application scaled appropriately
- [ ] Monitoring configured
- [ ] Logs accessible
- [ ] Error handling working
- [ ] Security measures in place

---

## 🎉 **Deployment Complete!**

Once all checklist items are completed, your Services Australia AI Assistant will be successfully deployed on IBM Cloud Code Engine and ready to serve users with intelligent, responsible AI assistance for government services!

**Next Steps:**
1. Share the application URL with stakeholders
2. Monitor application performance
3. Gather user feedback
4. Plan for future enhancements
5. Set up regular maintenance schedule
