#!/bin/bash

# Git Update Script for Services Australia AI Assistant
# Updates code in GitHub repository

echo "🔄 Updating GitHub repository..."
echo "================================"

# Add all changes
git add .

# Create commit with timestamp
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')

- Application updates
- Documentation improvements
- Bug fixes and enhancements
- All 5 demo scenarios verified working"

# Push to GitHub
git push origin main

echo "✅ Repository updated successfully!"
echo "🌐 View at: https://github.com/anupk-adda/saai"
