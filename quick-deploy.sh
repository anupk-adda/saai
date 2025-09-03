#!/bin/bash

# Quick Deployment Script for IBM Cloud Code Engine
# Services Australia AI Assistant

echo "🚀 Quick Deploy to IBM Cloud Code Engine"
echo "========================================"

# Configuration - Update these values for your deployment
PROJECT_NAME="services-ai-project"
APP_NAME="services-ai-app"
REGISTRY_NAMESPACE="services-ai-namespace"

echo "📋 Configuration:"
echo "   Project: $PROJECT_NAME"
echo "   App: $APP_NAME"
echo "   Registry: $REGISTRY_NAMESPACE"
echo ""

# Step 1: Build and push image
echo "🔨 Building and pushing Docker image..."
docker build -t services-ai-app .
docker tag services-ai-app us.icr.io/$REGISTRY_NAMESPACE/services-ai-app:latest
docker push us.icr.io/$REGISTRY_NAMESPACE/services-ai-app:latest

# Step 2: Deploy to Code Engine
echo "🚀 Deploying to Code Engine..."
ibmcloud ce app create \
  --name $APP_NAME \
  --image us.icr.io/$REGISTRY_NAMESPACE/services-ai-app:latest \
  --port 3000 \
  --cpu 0.5 \
  --memory 1Gi \
  --min-scale 1 \
  --max-scale 10 \
  --env NODE_ENV=production

# Step 3: Get URL
echo "🌐 Getting application URL..."
APP_URL=$(ibmcloud ce app get --name $APP_NAME --output url)
echo ""
echo "✅ Deployment completed!"
echo "🌐 Your app is available at: $APP_URL"
echo ""
echo "🧪 Test these scenarios:"
echo "   1. When is my next payment?"
echo "   2. Am I eligible for Family Tax Benefit?"
echo "   3. How do I apply for Medicare?"
echo "   4. I am having a baby, what help is available?"
echo "   5. I lost my job, what payments can I get?"
