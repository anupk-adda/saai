# ServicesAI Demo Guide

## 🎯 Quick Start

### Option 1: Automated Setup
```bash
./setup.sh
```

### Option 2: Manual Setup
```bash
# Fix npm cache issues (if needed)
sudo chown -R $(whoami) ~/.npm

# Install dependencies
npm install

# Start the demo
npm run dev
```

### Option 3: Alternative Installation
```bash
# Use temporary cache directory
npm install --cache /tmp/.npm

# Start the demo
npm run dev
```

## 🎮 Demo Walkthrough

### 1. Access the Application
- Open your browser to `http://localhost:3000`
- You'll see the ServicesAI interface with three demo users

### 2. Demo Users
Select different users from the dropdown to explore different scenarios:

#### Sarah Johnson (Single Mother)
- **Profile**: 38 years old, single mother with one child (Emma, 5 years old)
- **Services**: Family Tax Benefit, Child Care Subsidy, Medicare card
- **Income**: $45,000 annually
- **Demo Scenarios**:
  - "When is my next Family Tax Benefit payment?"
  - "I'm having another baby, what help is available?"
  - "How do I apply for Child Care Subsidy?"

#### Michael Chen (Married Father)
- **Profile**: 53 years old, married with two children (James, 8, and Sophie, 6)
- **Services**: Family Tax Benefit, Medicare card
- **Income**: $75,000 annually
- **Demo Scenarios**:
  - "What payments am I eligible for?"
  - "How much Family Tax Benefit do I get?"
  - "I lost my job, what support is available?"

#### Margaret Williams (Retired Senior)
- **Profile**: 65 years old, widowed, recently retired
- **Services**: Age Pension, Medicare card
- **Income**: $0 (retired)
- **Demo Scenarios**:
  - "When is my next Age Pension payment?"
  - "Am I eligible for Seniors Health Card?"
  - "How do I update my Medicare card?"

### 3. AI Assistant Features

#### Natural Language Queries
Try these example questions:

**Payment Enquiries:**
- "When is my next payment?"
- "How much will I get for Family Tax Benefit?"
- "What's my payment status?"

**Eligibility Questions:**
- "Am I eligible for JobSeeker Payment?"
- "Can I get Medicare as a temporary resident?"
- "Do I qualify for Age Pension?"

**Life Event Scenarios:**
- "I'm having a baby, what help is available?"
- "I lost my job, what payments can I get?"
- "I'm separated, what about child support?"
- "I'm turning 65, what do I need to do?"

**Application Help:**
- "How do I apply for Family Tax Benefit?"
- "What documents do I need for Medicare?"
- "How do I set up child support?"

### 4. Interface Navigation

#### AI Assistant Tab
- **Chat Interface**: Natural language conversations
- **Quick Suggestions**: Pre-written questions to try
- **Action Buttons**: Direct actions based on AI responses

#### My Services Tab
- **Payment Overview**: Current payments and amounts
- **Application Status**: Track submitted applications
- **Medicare Card**: Card details and expiry
- **Child Support**: Assessment details and amounts

#### Service Overview Tab
- **Service Categories**: Explore Centrelink, Medicare, Child Support
- **Life Events**: Guided support for major life changes
- **Quick Actions**: Common tasks and applications

### 5. Key Demo Scenarios

#### Scenario 1: New Parent
1. Select Sarah Johnson
2. Ask: "I'm having another baby, what help is available?"
3. Explore the life event guidance
4. Check eligibility for different payments

#### Scenario 2: Job Loss
1. Select Michael Chen
2. Ask: "I lost my job, what support is available?"
3. See JobSeeker Payment eligibility
4. Explore Health Care Card options

#### Scenario 3: Retirement
1. Select Margaret Williams
2. Ask: "I'm turning 65, what do I need to do?"
3. Check Age Pension eligibility
4. Explore seniors services

#### Scenario 4: Relationship Breakdown
1. Select any user with children
2. Ask: "I'm separated, what about child support?"
3. Explore child support assessment process
4. See impact on other payments

### 6. Technical Features to Explore

#### AI Capabilities
- **Multi-intent Recognition**: Ask complex questions
- **Context Awareness**: Follow-up questions work naturally
- **Service Integration**: Seamless switching between services
- **Personalized Responses**: Based on user profile

#### Data Integration
- **Real-time Calculations**: Payment amounts update based on circumstances
- **Eligibility Checking**: Instant eligibility assessments
- **Life Event Processing**: Coordinated service recommendations
- **Status Tracking**: Application and payment status

#### User Experience
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: Screen reader compatible
- **Modern UI**: Clean, government-appropriate design
- **Quick Actions**: Streamlined common tasks

## 🔧 Troubleshooting

### Common Issues

#### npm Installation Problems
```bash
# Fix npm cache permissions
sudo chown -R $(whoami) ~/.npm

# Or use alternative cache
npm install --cache /tmp/.npm
```

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Performance Tips
- Use Chrome or Firefox for best performance
- Clear browser cache if experiencing issues
- Disable browser extensions that might interfere

## 📊 Demo Data

### Payment Rates (2024)
- **JobSeeker Payment**: $668.40 fortnightly
- **Family Tax Benefit**: $191.24 fortnightly per child
- **Age Pension**: $1,006.50 fortnightly
- **Child Care Subsidy**: Varies by income and hours

### Eligibility Thresholds
- **Family Tax Benefit**: Income under $100,000
- **Age Pension**: Age 67+, assets under $500,000
- **JobSeeker**: Age 22-65, unemployed, meeting obligations

## 🎯 Demo Objectives

### For Stakeholders
- **Service Integration**: See how AI can coordinate across services
- **User Experience**: Experience natural language interaction
- **Life Event Support**: Understand coordinated service delivery
- **Accessibility**: See inclusive design principles

### For Developers
- **Architecture**: Explore modular, scalable design
- **AI Integration**: Understand natural language processing
- **Data Models**: See comprehensive service modeling
- **API Design**: Review RESTful service architecture

### For Users
- **Ease of Use**: Experience intuitive government services
- **Comprehensive Support**: See full service coverage
- **Personalized Guidance**: Understand tailored recommendations
- **24/7 Availability**: Experience always-available assistance

## 🚀 Next Steps

After exploring the demo:

1. **Provide Feedback**: Share thoughts on user experience
2. **Suggest Improvements**: Recommend additional features
3. **Explore Code**: Review implementation details
4. **Consider Integration**: Think about real-world deployment

## 📞 Support

For technical issues or questions about the demo:
- Check the troubleshooting section above
- Review the README.md for detailed information
- Open an issue in the repository

---

**Remember**: This is a demonstration system with simulated data. No real personal information is processed or stored.
