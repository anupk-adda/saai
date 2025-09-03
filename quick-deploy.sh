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

# Step 1: Create API key and registry secret
echo "🔑 Creating API key and registry secret..."
API_KEY_OUTPUT=$(ibmcloud iam api-key-create codeengine-icr-key --output json)
API_KEY=$(echo $API_KEY_OUTPUT | jq -r '.apikey')
ibmcloud ce secret create --name icr-secret --format registry --server us.icr.io --username iamapikey --password $API_KEY

# Step 2: Create build configuration
echo "🏗️ Creating build configuration..."
ibmcloud ce build create \
  --name services-ai-build \
  --source https://github.com/anupk-adda/saai \
  --context-dir . \
  --dockerfile Dockerfile \
  --strategy dockerfile \
  --image us.icr.io/$REGISTRY_NAMESPACE/services-ai-app:latest \
  --registry-secret icr-secret

# Step 3: Submit build
echo "📦 Building application from GitHub..."
ibmcloud ce buildrun submit \
  --build services-ai-build \
  --name services-ai-buildrun-1 \
  --wait

# Step 4: Deploy to Code Engine
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

# Step 5: Get URL
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
