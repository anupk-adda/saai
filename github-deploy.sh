#!/bin/bash

# GitHub-based IBM Cloud Code Engine Deployment Script
# Services Australia AI Assistant

set -e  # Exit on any error

echo "🚀 Starting GitHub-based deployment to IBM Cloud Code Engine..."
echo "=============================================================="

# Configuration
PROJECT_NAME="services-ai-project"
APP_NAME="services-ai-app"
BUILD_NAME="services-ai-build"
REGISTRY_NAMESPACE="services-ai-namespace"
GITHUB_REPO="https://github.com/anupk-adda/saai"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command -v ibmcloud &> /dev/null; then
        print_error "IBM Cloud CLI is not installed. Please install it first."
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_error "jq is not installed. Please install it first."
        exit 1
    fi
    
    print_success "All prerequisites are installed."
}

# Login to IBM Cloud
ibmcloud_login() {
    print_status "Logging into IBM Cloud..."
    
    if ! ibmcloud account show &> /dev/null; then
        print_status "Please login to IBM Cloud..."
        ibmcloud login
    else
        print_success "Already logged into IBM Cloud."
    fi
}

# Set up Code Engine project
setup_code_engine() {
    print_status "Setting up Code Engine project..."
    
    # Check if project exists
    if ibmcloud ce project get --name $PROJECT_NAME &> /dev/null; then
        print_success "Project $PROJECT_NAME already exists."
    else
        print_status "Creating Code Engine project: $PROJECT_NAME"
        ibmcloud ce project create --name $PROJECT_NAME --select
    fi
    
    # Select the project
    ibmcloud ce project select --name $PROJECT_NAME
}

# Set up Container Registry
setup_container_registry() {
    print_status "Setting up Container Registry..."
    
    # Check if namespace exists
    if ibmcloud cr namespace-list | grep -q $REGISTRY_NAMESPACE; then
        print_success "Container Registry namespace $REGISTRY_NAMESPACE already exists."
    else
        print_status "Creating Container Registry namespace: $REGISTRY_NAMESPACE"
        ibmcloud cr namespace-add $REGISTRY_NAMESPACE
    fi
}

# Create registry access secret
create_registry_secret() {
    print_status "Creating registry access secret..."
    
    # Check if secret already exists
    if ibmcloud ce secret get --name icr-secret &> /dev/null; then
        print_success "Registry secret icr-secret already exists."
        return
    fi
    
    # Create API key
    print_status "Creating API key for Code Engine..."
    API_KEY_OUTPUT=$(ibmcloud iam api-key-create codeengine-icr-key --output json)
    API_KEY=$(echo $API_KEY_OUTPUT | jq -r '.apikey')
    
    if [ -z "$API_KEY" ] || [ "$API_KEY" = "null" ]; then
        print_error "Failed to create API key"
        exit 1
    fi
    
    # Create registry secret
    print_status "Creating registry secret..."
    ibmcloud ce secret create \
        --name icr-secret \
        --format registry \
        --server us.icr.io \
        --username iamapikey \
        --password $API_KEY
    
    print_success "Registry secret created successfully"
}

# Create build configuration
create_build_config() {
    print_status "Creating build configuration..."
    
    # Check if build already exists
    if ibmcloud ce build get --name $BUILD_NAME &> /dev/null; then
        print_success "Build configuration $BUILD_NAME already exists."
    else
        print_status "Creating build configuration: $BUILD_NAME"
        ibmcloud ce build create \
            --name $BUILD_NAME \
            --source $GITHUB_REPO \
            --context-dir . \
            --dockerfile Dockerfile \
            --strategy dockerfile \
            --image us.icr.io/$REGISTRY_NAMESPACE/$APP_NAME:latest \
            --registry-secret icr-secret
        
        print_success "Build configuration created successfully"
    fi
}

# Submit build
submit_build() {
    print_status "Submitting build from GitHub repository..."
    
    BUILD_RUN_NAME="services-ai-buildrun-$(date +%s)"
    print_status "Build run name: $BUILD_RUN_NAME"
    
    ibmcloud ce buildrun submit \
        --build $BUILD_NAME \
        --name $BUILD_RUN_NAME \
        --wait
    
    print_success "Build completed successfully: $BUILD_RUN_NAME"
}

# Deploy to Code Engine
deploy_to_code_engine() {
    print_status "Deploying to Code Engine..."
    
    # Check if application exists
    if ibmcloud ce app get --name $APP_NAME &> /dev/null; then
        print_status "Updating existing application: $APP_NAME"
        ibmcloud ce app update \
            --name $APP_NAME \
            --image us.icr.io/$REGISTRY_NAMESPACE/$APP_NAME:latest
    else
        print_status "Creating new application: $APP_NAME"
        ibmcloud ce app create \
            --name $APP_NAME \
            --image us.icr.io/$REGISTRY_NAMESPACE/$APP_NAME:latest \
            --port 3000 \
            --cpu 0.5 \
            --memory 1Gi \
            --min-scale 1 \
            --max-scale 10 \
            --env NODE_ENV=production \
            --env PORT=3000 \
            --env HOSTNAME=0.0.0.0
    fi
    
    print_success "Application deployed successfully!"
}

# Get application URL
get_app_url() {
    print_status "Getting application URL..."
    
    APP_URL=$(ibmcloud ce app get --name $APP_NAME --output url)
    
    if [ -n "$APP_URL" ]; then
        print_success "Application is available at: $APP_URL"
        echo ""
        echo "🎉 Deployment completed successfully!"
        echo "🌐 Your Services Australia AI Assistant is now live at: $APP_URL"
        echo ""
        echo "📋 Test the following scenarios:"
        echo "   1. When is my next payment?"
        echo "   2. Am I eligible for Family Tax Benefit?"
        echo "   3. How do I apply for Medicare?"
        echo "   4. I am having a baby, what help is available?"
        echo "   5. I lost my job, what payments can I get?"
    else
        print_error "Failed to get application URL"
        exit 1
    fi
}

# Show application status
show_app_status() {
    print_status "Application Status:"
    ibmcloud ce app get --name $APP_NAME
}

# Main deployment function
main() {
    echo "Services Australia AI Assistant - GitHub-based IBM Cloud Deployment"
    echo "================================================================="
    echo ""
    
    check_prerequisites
    ibmcloud_login
    setup_code_engine
    setup_container_registry
    create_registry_secret
    create_build_config
    submit_build
    deploy_to_code_engine
    get_app_url
    show_app_status
    
    echo ""
    print_success "🚀 GitHub-based deployment completed successfully!"
    print_status "Your application is now running on IBM Cloud Code Engine."
    print_status "Source code is automatically pulled from: $GITHUB_REPO"
}

# Run main function
main "$@"
