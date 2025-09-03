import { NextResponse } from 'next/server'
import { ServicesAustraliaService } from '../../../lib/services.js'

// Initialize services
const services = new ServicesAustraliaService()

export async function POST(request) {
  try {
    const { action, userId, data } = await request.json()

    if (!action || !userId) {
      return NextResponse.json(
        { error: 'Action and userId are required' },
        { status: 400 }
      )
    }

    let result = {}

    switch (action) {
      case 'check_application_status':
        result = await handleApplicationStatus(userId, data)
        break
      
      case 'view_payment_details':
        result = await handleViewPaymentDetails(userId, data)
        break
      
      case 'check_ccs_eligibility':
        result = await handleCCSEligibility(userId, data)
        break
      
      case 'view_payment_history':
        result = await handlePaymentHistory(userId, data)
        break
      
      case 'report_issue':
        result = await handleReportIssue(userId, data)
        break
      
      case 'update_details':
        result = await handleUpdateDetails(userId, data)
        break
      
      case 'process_payment':
        result = await handleProcessPayment(userId, data)
        break
      
      // NEW ASSISTANCE WORKFLOW ACTIONS
      case 'view_upcoming_payments':
        result = await handleViewUpcomingPayments(userId, data)
        break
      
      case 'check_eligibility_guidance':
        result = await handleEligibilityGuidance(userId, data)
        break
      
      case 'setup_reminders':
        result = await handleSetupReminders(userId, data)
        break
      
      case 'appointment_guidance':
        result = await handleAppointmentGuidance(userId, data)
        break
      
      case 'contextual_recommendations':
        result = await handleContextualRecommendations(userId, data)
        break
      
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      action: action,
      result: result
    })

  } catch (error) {
    console.error('Action API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleApplicationStatus(userId, data) {
  const application = services.getApplication(data.applicationId)
  
  if (!application) {
    return {
      success: false,
      message: 'Application not found'
    }
  }

  // Simulate processing status updates
  const statusUpdates = {
    'submitted': {
      status: 'in_review',
      message: 'Your application is currently being reviewed by our assessors.',
      estimatedCompletion: '5-10 business days',
      nextSteps: ['Document verification', 'Eligibility assessment', 'Decision notification']
    },
    'in_review': {
      status: 'approved',
      message: 'Great news! Your application has been approved.',
      approvedAmount: '$1,500.00',
      nextPaymentDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU'),
      nextSteps: ['Payment processing', 'Notification letter sent']
    }
  }

  const update = statusUpdates[application.status]
  
  if (update) {
    // Update the application status
    application.status = update.status
    application.lastUpdated = new Date()
    
    if (update.status === 'approved') {
      application.approvedAt = new Date()
      application.assessor = 'Sarah Mitchell'
    }
  }

  return {
    success: true,
    application: application,
    update: update,
    message: update?.message || `Your application status is: ${application.status}`
  }
}

async function handleViewPaymentDetails(userId, data) {
  const payment = services.getPayment(data.paymentId)
  
  if (!payment) {
    return {
      success: false,
      message: 'Payment not found'
    }
  }

  // Generate payment history
  const paymentHistory = generatePaymentHistory(payment)
  
  return {
    success: true,
    payment: payment,
    history: paymentHistory,
    nextPayment: {
      date: payment.nextPaymentDate,
      amount: payment.amount,
      status: 'scheduled'
    }
  }
}

async function handleCCSEligibility(userId, data) {
  const user = services.getUser(userId)
  
  if (!user) {
    return {
      success: false,
      message: 'User not found'
    }
  }

  // Calculate CCS eligibility based on user's circumstances
  const eligibility = {
    eligible: true,
    reason: 'You meet the basic eligibility criteria',
    estimatedSubsidy: calculateCCSSubsidy(user),
    requirements: [
      'Child must be under 13 (or under 18 if disabled)',
      'Child must attend approved childcare',
      'You must meet activity test requirements',
      'Family income must be under $354,305'
    ],
    nextSteps: [
      'Complete CCS application',
      'Provide childcare provider details',
      'Submit activity test information'
    ]
  }

  return {
    success: true,
    eligibility: eligibility,
    message: 'You appear to be eligible for Child Care Subsidy'
  }
}

async function handlePaymentHistory(userId, data) {
  const payment = services.getPayment(data.paymentId)
  
  if (!payment) {
    return {
      success: false,
      message: 'Payment not found'
    }
  }

  const history = generatePaymentHistory(payment)
  
  return {
    success: true,
    payment: payment,
    history: history
  }
}

async function handleReportIssue(userId, data) {
  // Simulate creating an issue report
  const issueReport = {
    id: `issue_${Date.now()}`,
    userId: userId,
    paymentId: data.paymentId,
    type: 'payment_not_received',
    status: 'open',
    priority: 'high',
    createdAt: new Date(),
    estimatedResolution: '2-3 business days'
  }

  return {
    success: true,
    issueReport: issueReport,
    message: 'Your payment issue has been reported and will be investigated within 2-3 business days.',
    nextSteps: [
      'Our team will investigate the issue',
      'You will receive an update within 24 hours',
      'If confirmed, payment will be processed immediately'
    ]
  }
}

async function handleUpdateDetails(userId, data) {
  const payment = services.getPayment(data.paymentId)
  
  if (!payment) {
    return {
      success: false,
      message: 'Payment not found'
    }
  }

  return {
    success: true,
    message: 'I can help you update your payment details. What would you like to change?',
    options: [
      {
        type: 'bank_account',
        title: 'Update Bank Account',
        description: 'Change your payment bank account details'
      },
      {
        type: 'payment_frequency',
        title: 'Change Payment Frequency',
        description: 'Modify how often you receive payments'
      },
      {
        type: 'payment_method',
        title: 'Change Payment Method',
        description: 'Switch between bank transfer and other methods'
      }
    ]
  }
}

async function handleProcessPayment(userId, data) {
  const payment = services.getPayment(data.paymentId)
  
  if (!payment) {
    return {
      success: false,
      message: 'Payment not found'
    }
  }

  // Simulate payment processing
  const processingResult = {
    status: 'processing',
    transactionId: `TXN_${Date.now()}`,
    amount: payment.amount,
    processingTime: '1-2 business days',
    confirmationNumber: `CONF_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  // Update next payment date
  payment.nextPaymentDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  payment.lastUpdated = new Date()

  return {
    success: true,
    processing: processingResult,
    message: `Payment of $${payment.amount} is being processed and will appear in your account within 1-2 business days.`,
    nextPayment: {
      date: payment.nextPaymentDate,
      amount: payment.amount
    }
  }
}

function generatePaymentHistory(payment) {
  const history = []
  const now = new Date()
  
  // Generate last 6 payments
  for (let i = 0; i < 6; i++) {
    const paymentDate = new Date(now.getTime() - (i * 14 * 24 * 60 * 60 * 1000))
    history.push({
      id: `hist_${i}`,
      date: paymentDate,
      amount: payment.amount,
      status: 'completed',
      reference: `PAY_${paymentDate.getTime().toString().substr(-8)}`
    })
  }
  
  return history.reverse()
}

function calculateCCSSubsidy(user) {
  // Simplified CCS calculation
  const baseSubsidy = 0.85 // 85% base rate
  const incomeAdjustment = Math.max(0, (user.financialDetails.income - 50000) / 100000 * 0.3)
  const finalRate = Math.max(0.2, baseSubsidy - incomeAdjustment) // Minimum 20%
  
  return {
    percentage: Math.round(finalRate * 100),
    hourlyRate: Math.round(finalRate * 12.50 * 100) / 100, // Based on $12.50/hour childcare
    annualCap: user.financialDetails.income < 70000 ? 10000 : 5000
  }
}

// NEW ASSISTANCE WORKFLOW HANDLERS

async function handleViewUpcomingPayments(userId, data) {
  const payments = data.payments || []
  const paymentDetails = payments.map(payment => ({
    ...payment,
    nextPaymentDate: new Date(payment.nextPaymentDate).toLocaleDateString('en-AU'),
    daysUntil: Math.ceil((new Date(payment.nextPaymentDate) - new Date()) / (1000 * 60 * 60 * 24)),
    status: 'scheduled'
  }))

  return {
    success: true,
    message: `Here are the details for your upcoming ${payments.length} payment(s). You can view more information or contact us if you have any questions.`,
    paymentDetails: paymentDetails,
    viewedAt: new Date().toISOString()
  }
}

async function handleEligibilityGuidance(userId, data) {
  const user = services.getUser(userId)
  const suggestedServices = data.suggestedServices || []
  
  const eligibilityInfo = suggestedServices.map(service => ({
    service,
    requirements: getServiceRequirements(service),
    estimatedAmount: calculateEstimatedAmount(service, user),
    nextSteps: ['Check detailed eligibility criteria', 'Gather required documents', 'Submit application']
  }))

  return {
    success: true,
    message: `I can help you check your eligibility for ${suggestedServices.length} services. Here's what you need to know and the steps to apply.`,
    eligibilityInfo: eligibilityInfo,
    guidanceProvidedAt: new Date().toISOString()
  }
}

async function handleSetupReminders(userId, data) {
  const deadlines = data.deadlines || []
  
  const reminderOptions = deadlines.map(deadline => ({
    ...deadline,
    reminderOptions: [
      { type: '3_days_before', description: '3 days before deadline' },
      { type: '1_day_before', description: '1 day before deadline' },
      { type: '2_hours_before', description: '2 hours before deadline' }
    ]
  }))

  return {
    success: true,
    message: `I can help you set up reminders for ${deadlines.length} important deadlines. Choose which reminders you'd like to receive.`,
    reminderOptions: reminderOptions,
    setupAt: new Date().toISOString()
  }
}

async function handleAppointmentGuidance(userId, data) {
  const appointments = data.appointments || []
  
  const appointmentInfo = appointments.map(appointment => ({
    ...appointment,
    bookingOptions: [
      { type: 'online', description: 'Book online through myGov' },
      { type: 'phone', description: 'Call Centrelink to book' },
      { type: 'in_person', description: 'Visit a service center' }
    ],
    requiredDocuments: ['Photo ID', 'Proof of income', 'Supporting documents']
  }))

  return {
    success: true,
    message: `I can help you book ${appointments.length} required appointments. Here are your options and what you'll need to bring.`,
    appointmentInfo: appointmentInfo,
    guidanceProvidedAt: new Date().toISOString()
  }
}

async function handleContextualRecommendations(userId, data) {
  const user = services.getUser(userId)
  const recommendations = data.recommendations || []
  
  return {
    success: true,
    message: `🧠 Based on your profile and usage patterns, I have ${recommendations.length} personalized recommendations for you.`,
    recommendations: recommendations,
    generatedAt: new Date().toISOString()
  }
}

// Helper functions for automated workflows

function calculateEstimatedAmount(service, user) {
  const income = user.financialDetails.income
  const children = user.familyDetails.children
  
  switch (service) {
    case 'Parenting Payment (Single)':
      return Math.max(0, 800 - (income * 0.4))
    case 'Child Care Subsidy':
      return Math.min(85, income * 0.02)
    case 'School Kids Bonus':
      return children.length * 200
    case 'Low Income Health Care Card':
      return 0 // No monetary value, but provides benefits
    case 'Single Parent Support':
      return Math.max(0, 600 - (income * 0.3))
    default:
      return 0
  }
}

function getServiceRequirements(service) {
  const requirements = {
    'Parenting Payment (Single)': [
      'Single parent with dependent children',
      'Income under $45,000',
      'Australian resident'
    ],
    'Child Care Subsidy': [
      'Child under 13 (or under 18 if disabled)',
      'Attending approved childcare',
      'Meeting activity test requirements'
    ],
    'School Kids Bonus': [
      'Receiving Family Tax Benefit',
      'Child attending school',
      'Income under $60,000'
    ],
    'Low Income Health Care Card': [
      'Income under $40,000',
      'Australian resident',
      'Not receiving other health cards'
    ],
    'Single Parent Support': [
      'Single parent status',
      'Dependent children',
      'Income under $50,000'
    ]
  }
  
  return requirements[service] || ['Standard eligibility requirements apply']
}
