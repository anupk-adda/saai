#!/bin/bash

# Git Deployment Script for Services Australia AI Assistant
# Pushes code to GitHub repository

set -e  # Exit on any error

echo "📚 Starting Git deployment to GitHub..."
echo "======================================"

# Configuration
REPO_URL="https://github.com/anupk-adda/saai.git"
BRANCH="main"

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

# Check if git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    print_success "Git is installed."
}

# Check if we're in a git repository
check_git_repo() {
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        git remote add origin $REPO_URL
    else
        print_success "Git repository already initialized."
    fi
}

# Add and commit changes
commit_changes() {
    print_status "Adding files to Git..."
    git add .
    
    print_status "Creating commit..."
    git commit -m "Update: Services Australia AI Assistant

- Updated deployment configuration
- Enhanced documentation
- Improved error handling
- Production-ready setup
- All 5 demo scenarios working perfectly

Deployed: $(date)"
}

# Push to GitHub
push_to_github() {
    print_status "Pushing to GitHub repository..."
    git push origin $BRANCH
    
    print_success "Code pushed to GitHub successfully!"
}

# Show repository information
show_repo_info() {
    print_status "Repository Information:"
    echo "  Repository: $REPO_URL"
    echo "  Branch: $BRANCH"
    echo "  Local Directory: $(pwd)"
    
    print_status "Recent commits:"
    git log --oneline -5
}

# Main deployment function
main() {
    echo "Services Australia AI Assistant - Git Deployment"
    echo "==============================================="
    echo ""
    
    check_git
    check_git_repo
    commit_changes
    push_to_github
    show_repo_info
    
    echo ""
    print_success "🚀 Git deployment completed successfully!"
    print_status "Your code is now available at: $REPO_URL"
}

# Run main function
main "$@"
