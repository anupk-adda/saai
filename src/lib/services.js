// Services Australia Service Functions

import { 
  UserProfile, 
  Payment, 
  Application, 
  ChildSupportAssessment, 
  MedicareCard,
  ServiceTypes,
  PaymentTypes,
  UserStatus
} from './data-models.js'

export class ServicesAustraliaService {
  constructor() {
    this.users = new Map()
    this.payments = new Map()
    this.applications = new Map()
    this.medicareCards = new Map()
    this.childSupportAssessments = new Map()
    this.initializeDemoData()
  }

  initializeDemoData() {
    // Create demo users
    this.createDemoUsers()
    this.createDemoPayments()
    this.createDemoApplications()
    this.createDemoMedicareCards()
    this.createDemoChildSupportAssessments()
  }

  createDemoUsers() {
    const demoUsers = [
      {
        id: 'user_001',
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: '1985-03-15',
        gender: 'female',
        address: {
          street: '123 Collins Street',
          suburb: 'Melbourne',
          state: 'VIC',
          postcode: '3000'
        },
        phone: '0412 345 678',
        email: 'sarah.johnson@email.com',
        citizenship: 'Australian',
        maritalStatus: 'single',
        children: [
          {
            id: 'child_001',
            firstName: 'Emma',
            lastName: 'Johnson',
            dateOfBirth: '2018-07-22',
            relationship: 'daughter'
          }
        ],
        income: 45000,
        assets: 15000,
        employment: {
          status: 'employed',
          employer: 'ABC Corporation',
          hours: 'full-time'
        }
      },
      {
        id: 'user_002',
        firstName: 'Michael',
        lastName: 'Chen',
        dateOfBirth: '1970-11-08',
        gender: 'male',
        address: {
          street: '456 George Street',
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000'
        },
        phone: '0423 456 789',
        email: 'michael.chen@email.com',
        citizenship: 'Australian',
        maritalStatus: 'married',
        partner: {
          firstName: 'Lisa',
          lastName: 'Chen',
          dateOfBirth: '1972-05-12'
        },
        children: [
          {
            id: 'child_002',
            firstName: 'James',
            lastName: 'Chen',
            dateOfBirth: '2015-03-10',
            relationship: 'son'
          },
          {
            id: 'child_003',
            firstName: 'Sophie',
            lastName: 'Chen',
            dateOfBirth: '2017-09-18',
            relationship: 'daughter'
          }
        ],
        income: 75000,
        assets: 250000,
        employment: {
          status: 'employed',
          employer: 'XYZ Industries',
          hours: 'full-time'
        }
      },
      {
        id: 'user_003',
        firstName: 'Margaret',
        lastName: 'Williams',
        dateOfBirth: '1958-12-03',
        gender: 'female',
        address: {
          street: '789 Queen Street',
          suburb: 'Brisbane',
          state: 'QLD',
          postcode: '4000'
        },
        phone: '0434 567 890',
        email: 'margaret.williams@email.com',
        citizenship: 'Australian',
        maritalStatus: 'widowed',
        income: 0,
        assets: 180000,
        employment: {
          status: 'retired'
        }
      }
    ]

    demoUsers.forEach(userData => {
      const user = new UserProfile(userData)
      this.users.set(user.id, user)
    })
  }

  createDemoPayments() {
    const demoPayments = [
      {
        id: 'payment_001',
        userId: 'user_001',
        type: PaymentTypes.FAMILY_TAX_BENEFIT,
        service: ServiceTypes.CENTRELINK,
        amount: 191.24,
        frequency: 'fortnightly',
        status: 'active',
        startDate: new Date('2023-01-01'),
        nextPaymentDate: new Date('2024-01-15')
      },
      {
        id: 'payment_002',
        userId: 'user_001',
        type: PaymentTypes.CHILD_CARE_SUBSIDY,
        service: ServiceTypes.CENTRELINK,
        amount: 85.50,
        frequency: 'fortnightly',
        status: 'active',
        startDate: new Date('2023-06-01'),
        nextPaymentDate: new Date('2024-01-15')
      },
      {
        id: 'payment_003',
        userId: 'user_002',
        type: PaymentTypes.FAMILY_TAX_BENEFIT,
        service: ServiceTypes.CENTRELINK,
        amount: 382.48, // Two children
        frequency: 'fortnightly',
        status: 'active',
        startDate: new Date('2023-01-01'),
        nextPaymentDate: new Date('2024-01-15')
      },
      {
        id: 'payment_004',
        userId: 'user_003',
        type: PaymentTypes.AGE_PENSION,
        service: ServiceTypes.CENTRELINK,
        amount: 1006.50,
        frequency: 'fortnightly',
        status: 'active',
        startDate: new Date('2023-12-03'),
        nextPaymentDate: new Date('2024-01-15')
      }
    ]

    demoPayments.forEach(paymentData => {
      const payment = new Payment(paymentData)
      this.payments.set(payment.id, payment)
    })
  }

  createDemoApplications() {
    const demoApplications = [
      {
        id: 'app_001',
        userId: 'user_001',
        type: PaymentTypes.PARENTAL_LEAVE,
        service: ServiceTypes.CENTRELINK,
        status: 'submitted',
        submittedAt: new Date('2023-11-15'),
        requiredDocuments: ['birth certificate', 'employment certificate', 'bank details'],
        submittedDocuments: ['birth certificate', 'employment certificate']
      },
      {
        id: 'app_002',
        userId: 'user_003',
        type: PaymentTypes.AGE_PENSION,
        service: ServiceTypes.CENTRELINK,
        status: 'approved',
        submittedAt: new Date('2023-10-01'),
        approvedAt: new Date('2023-11-15'),
        assessor: 'John Smith'
      }
    ]

    demoApplications.forEach(appData => {
      const application = new Application(appData)
      this.applications.set(application.id, application)
    })
  }

  createDemoMedicareCards() {
    const demoMedicareCards = [
      {
        id: 'medicare_001',
        userId: 'user_001',
        cardNumber: '1234567890',
        cardholders: [
          {
            id: 'holder_001',
            firstName: 'Sarah',
            lastName: 'Johnson',
            dateOfBirth: '1985-03-15',
            position: 1
          },
          {
            id: 'holder_002',
            firstName: 'Emma',
            lastName: 'Johnson',
            dateOfBirth: '2018-07-22',
            position: 2
          }
        ],
        expiryDate: new Date('2028-03-15')
      },
      {
        id: 'medicare_002',
        userId: 'user_002',
        cardNumber: '2345678901',
        cardholders: [
          {
            id: 'holder_003',
            firstName: 'Michael',
            lastName: 'Chen',
            dateOfBirth: '1970-11-08',
            position: 1
          },
          {
            id: 'holder_004',
            firstName: 'Lisa',
            lastName: 'Chen',
            dateOfBirth: '1972-05-12',
            position: 2
          },
          {
            id: 'holder_005',
            firstName: 'James',
            lastName: 'Chen',
            dateOfBirth: '2015-03-10',
            position: 3
          },
          {
            id: 'holder_006',
            firstName: 'Sophie',
            lastName: 'Chen',
            dateOfBirth: '2017-09-18',
            position: 4
          }
        ],
        expiryDate: new Date('2028-11-08')
      }
    ]

    demoMedicareCards.forEach(cardData => {
      const card = new MedicareCard(cardData)
      this.medicareCards.set(card.id, card)
    })
  }

  createDemoChildSupportAssessments() {
    const demoAssessments = [
      {
        id: 'csa_001',
        payeeId: 'user_001',
        payerId: 'user_004', // Ex-partner not in our demo data
        children: [
          {
            id: 'child_001',
            firstName: 'Emma',
            lastName: 'Johnson',
            dateOfBirth: '2018-07-22'
          }
        ],
        assessmentAmount: 450,
        frequency: 'monthly',
        startDate: new Date('2023-06-01'),
        careArrangement: {
          payeeCare: 80,
          payerCare: 20
        },
        incomeDetails: {
          payee: { income: 45000 },
          payer: { income: 65000 }
        }
      }
    ]

    demoAssessments.forEach(assessmentData => {
      const assessment = new ChildSupportAssessment(assessmentData)
      this.childSupportAssessments.set(assessment.id, assessment)
    })
  }

  // User Management
  getUser(userId) {
    return this.users.get(userId)
  }

  getAllUsers() {
    return Array.from(this.users.values())
  }

  updateUser(userId, updates) {
    const user = this.users.get(userId)
    if (user) {
      Object.assign(user, updates)
      user.lastUpdated = new Date()
      return user
    }
    return null
  }

  // Payment Management
  getUserPayments(userId) {
    return Array.from(this.payments.values()).filter(payment => payment.userId === userId)
  }

  getPayment(paymentId) {
    return this.payments.get(paymentId)
  }

  createPayment(paymentData) {
    const payment = new Payment(paymentData)
    this.payments.set(payment.id, payment)
    return payment
  }

  updatePayment(paymentId, updates) {
    const payment = this.payments.get(paymentId)
    if (payment) {
      Object.assign(payment, updates)
      payment.lastUpdated = new Date()
      return payment
    }
    return null
  }

  // Application Management
  getUserApplications(userId) {
    return Array.from(this.applications.values()).filter(app => app.userId === userId)
  }

  getApplication(applicationId) {
    return this.applications.get(applicationId)
  }

  createApplication(applicationData) {
    const application = new Application(applicationData)
    this.applications.set(application.id, application)
    return application
  }

  submitApplication(applicationId) {
    const application = this.applications.get(applicationId)
    if (application) {
      application.submit()
      return application
    }
    return null
  }

  // Medicare Management
  getUserMedicareCard(userId) {
    return Array.from(this.medicareCards.values()).find(card => card.userId === userId)
  }

  getMedicareCard(cardId) {
    return this.medicareCards.get(cardId)
  }

  createMedicareCard(cardData) {
    const card = new MedicareCard(cardData)
    this.medicareCards.set(card.id, card)
    return card
  }

  // Child Support Management
  getUserChildSupportAssessments(userId) {
    return Array.from(this.childSupportAssessments.values()).filter(
      assessment => assessment.payeeId === userId || assessment.payerId === userId
    )
  }

  getChildSupportAssessment(assessmentId) {
    return this.childSupportAssessments.get(assessmentId)
  }

  createChildSupportAssessment(assessmentData) {
    const assessment = new ChildSupportAssessment(assessmentData)
    this.childSupportAssessments.set(assessment.id, assessment)
    return assessment
  }

  // Eligibility Checking
  checkEligibility(userId, paymentType) {
    const user = this.getUser(userId)
    if (!user) return { eligible: false, reason: 'User not found' }

    const eligibilityRules = {
      [PaymentTypes.JOBSEEKER]: {
        check: (user) => {
          return user.employment.status === 'unemployed' && 
                 user.personalDetails.age >= 22 && 
                 user.personalDetails.age <= 65
        },
        reason: 'Must be unemployed, aged 22-65'
      },
      [PaymentTypes.FAMILY_TAX_BENEFIT]: {
        check: (user) => {
          return user.familyDetails.children.length > 0 && 
                 user.financialDetails.income < 100000
        },
        reason: 'Must have dependent children and income under $100,000'
      },
      [PaymentTypes.AGE_PENSION]: {
        check: (user) => {
          const age = this.calculateAge(user.personalDetails.dateOfBirth)
          return age >= 67 && 
                 user.financialDetails.assets < 500000
        },
        reason: 'Must be 67+ with assets under $500,000'
      },
      [PaymentTypes.MEDICARE_CARD]: {
        check: (user) => {
          return user.personalDetails.citizenship === 'Australian' || 
                 user.personalDetails.citizenship === 'Permanent Resident'
        },
        reason: 'Must be Australian citizen or permanent resident'
      }
    }

    const rule = eligibilityRules[paymentType]
    if (!rule) return { eligible: false, reason: 'Unknown payment type' }

    const eligible = rule.check(user)
    return {
      eligible,
      reason: eligible ? 'Eligible' : rule.reason,
      user: user
    }
  }

  // Payment Calculations
  calculatePaymentAmount(userId, paymentType) {
    const user = this.getUser(userId)
    if (!user) return 0

    const calculations = {
      [PaymentTypes.FAMILY_TAX_BENEFIT]: () => {
        const baseAmount = 191.24
        const childCount = user.familyDetails.children.length
        const incomeReduction = Math.max(0, (user.financialDetails.income - 50000) * 0.02)
        return Math.max(0, (baseAmount * childCount) - incomeReduction)
      },
      [PaymentTypes.AGE_PENSION]: () => {
        const maxAmount = 1006.50
        const incomeReduction = user.financialDetails.income * 0.5
        const assetReduction = user.financialDetails.assets * 0.02
        return Math.max(0, maxAmount - incomeReduction - assetReduction)
      },
      [PaymentTypes.JOBSEEKER]: () => {
        const maxAmount = 668.40
        const incomeReduction = user.financialDetails.income * 0.5
        return Math.max(0, maxAmount - incomeReduction)
      }
    }

    const calculator = calculations[paymentType]
    return calculator ? calculator() : 0
  }

  // Life Event Processing
  processLifeEvent(userId, lifeEvent, eventData = {}) {
    const user = this.getUser(userId)
    if (!user) return { success: false, message: 'User not found' }

    switch (lifeEvent) {
      case 'having_baby':
        return this.processHavingBaby(user, eventData)
      case 'job_loss':
        return this.processJobLoss(user, eventData)
      case 'relationship_breakdown':
        return this.processRelationshipBreakdown(user, eventData)
      case 'turning_65':
        return this.processTurning65(user, eventData)
      default:
        return { success: false, message: 'Unknown life event' }
    }
  }

  processHavingBaby(user, eventData) {
    const actions = []
    
    // Add child to family
    if (eventData.child) {
      user.addChild(eventData.child)
      actions.push('Child added to family details')
    }

    // Check eligibility for Family Tax Benefit
    const ftbEligibility = this.checkEligibility(user.id, PaymentTypes.FAMILY_TAX_BENEFIT)
    if (ftbEligibility.eligible) {
      actions.push('Eligible for Family Tax Benefit')
    }

    // Check eligibility for Parental Leave Pay
    const plpEligibility = this.checkEligibility(user.id, PaymentTypes.PARENTAL_LEAVE)
    if (plpEligibility.eligible) {
      actions.push('Eligible for Parental Leave Pay')
    }

    return {
      success: true,
      message: 'Life event processed successfully',
      actions: actions,
      recommendations: [
        'Apply for Family Tax Benefit',
        'Apply for Parental Leave Pay',
        'Update Medicare card with new baby',
        'Consider Child Care Subsidy for future childcare'
      ]
    }
  }

  processJobLoss(user, eventData) {
    const actions = []
    
    // Update employment status
    user.updateFinancialDetails({
      employment: { status: 'unemployed', ...eventData.employmentDetails }
    })
    actions.push('Employment status updated')

    // Check eligibility for JobSeeker Payment
    const jobseekerEligibility = this.checkEligibility(user.id, PaymentTypes.JOBSEEKER)
    if (jobseekerEligibility.eligible) {
      actions.push('Eligible for JobSeeker Payment')
    }

    // Check for Health Care Card eligibility
    actions.push('May be eligible for Health Care Card')

    return {
      success: true,
      message: 'Life event processed successfully',
      actions: actions,
      recommendations: [
        'Apply for JobSeeker Payment',
        'Apply for Health Care Card',
        'Update family payments if applicable',
        'Consider job search requirements'
      ]
    }
  }

  processRelationshipBreakdown(user, eventData) {
    const actions = []
    
    // Update relationship status
    user.updatePersonalDetails({
      maritalStatus: 'separated'
    })
    actions.push('Relationship status updated')

    // Check child support eligibility
    if (user.familyDetails.children.length > 0) {
      actions.push('May need child support assessment')
    }

    // Check single parent payment eligibility
    actions.push('May be eligible for Parenting Payment (Single)')

    return {
      success: true,
      message: 'Life event processed successfully',
      actions: actions,
      recommendations: [
        'Apply for child support assessment',
        'Check eligibility for Parenting Payment (Single)',
        'Update family payments',
        'Separate Medicare cards if needed'
      ]
    }
  }

  processTurning65(user, eventData) {
    const actions = []
    
    // Check Age Pension eligibility
    const agePensionEligibility = this.checkEligibility(user.id, PaymentTypes.AGE_PENSION)
    if (agePensionEligibility.eligible) {
      actions.push('Eligible for Age Pension')
    }

    // Check Seniors Health Card eligibility
    actions.push('May be eligible for Seniors Health Care Card')

    return {
      success: true,
      message: 'Life event processed successfully',
      actions: actions,
      recommendations: [
        'Apply for Age Pension',
        'Apply for Seniors Health Care Card',
        'Check Medicare Safety Net status',
        'Consider superannuation options'
      ]
    }
  }

  // Utility Methods
  calculateAge(dateOfBirth) {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }
}
