// Data models for Services Australia AI Assistant

export const ServiceTypes = {
  CENTRELINK: 'centrelink',
  MEDICARE: 'medicare',
  CHILD_SUPPORT: 'child_support'
}

export const PaymentTypes = {
  // Centrelink Payments
  JOBSEEKER: 'jobseeker_payment',
  YOUTH_ALLOWANCE: 'youth_allowance',
  AGE_PENSION: 'age_pension',
  DISABILITY_SUPPORT: 'disability_support_pension',
  FAMILY_TAX_BENEFIT: 'family_tax_benefit',
  PARENTING_PAYMENT: 'parenting_payment',
  PARENTAL_LEAVE: 'parental_leave_pay',
  CHILD_CARE_SUBSIDY: 'child_care_subsidy',
  AUSTUDY: 'austudy',
  ABSTUDY: 'abstudy',
  CARER_PAYMENT: 'carer_payment',
  
  // Medicare Services
  MEDICARE_CARD: 'medicare_card',
  MEDICARE_CLAIM: 'medicare_claim',
  SAFETY_NET: 'safety_net',
  PBS: 'pharmaceutical_benefits_scheme',
  
  // Child Support
  CHILD_SUPPORT_ASSESSMENT: 'child_support_assessment',
  CHILD_SUPPORT_PAYMENT: 'child_support_payment'
}

export const LifeEvents = {
  HAVING_BABY: 'having_baby',
  JOB_LOSS: 'job_loss',
  RELATIONSHIP_BREAKDOWN: 'relationship_breakdown',
  TURNING_65: 'turning_65',
  MOVING_HOUSE: 'moving_house',
  STARTING_STUDY: 'starting_study',
  DISABILITY_ONSET: 'disability_onset',
  CARER_ROLE: 'carer_role'
}

export const UserStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  INACTIVE: 'inactive'
}

// User Profile Model
export class UserProfile {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.personalDetails = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      dateOfBirth: data.dateOfBirth || '',
      gender: data.gender || '',
      address: data.address || {},
      phone: data.phone || '',
      email: data.email || '',
      citizenship: data.citizenship || 'Australian',
      maritalStatus: data.maritalStatus || 'single'
    }
    this.familyDetails = {
      partner: data.partner || null,
      children: data.children || [],
      dependents: data.dependents || []
    }
    this.financialDetails = {
      income: data.income || 0,
      assets: data.assets || 0,
      employment: data.employment || {},
      bankAccounts: data.bankAccounts || []
    }
    this.serviceHistory = {
      centrelink: data.centrelink || {},
      medicare: data.medicare || {},
      childSupport: data.childSupport || {}
    }
    this.status = data.status || UserStatus.ACTIVE
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'user_' + Math.random().toString(36).substr(2, 9)
  }

  updatePersonalDetails(updates) {
    this.personalDetails = { ...this.personalDetails, ...updates }
    this.lastUpdated = new Date()
  }

  addChild(child) {
    this.familyDetails.children.push({
      id: 'child_' + Math.random().toString(36).substr(2, 9),
      ...child,
      addedAt: new Date()
    })
    this.lastUpdated = new Date()
  }

  updateFinancialDetails(updates) {
    this.financialDetails = { ...this.financialDetails, ...updates }
    this.lastUpdated = new Date()
  }
}

// Payment Model
export class Payment {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.userId = data.userId
    this.type = data.type
    this.service = data.service
    this.amount = data.amount || 0
    this.frequency = data.frequency || 'fortnightly'
    this.status = data.status || 'active'
    this.startDate = data.startDate || new Date()
    this.endDate = data.endDate || null
    this.nextPaymentDate = data.nextPaymentDate || this.calculateNextPayment()
    this.eligibility = data.eligibility || {}
    this.requirements = data.requirements || []
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'payment_' + Math.random().toString(36).substr(2, 9)
  }

  calculateNextPayment() {
    const next = new Date()
    if (this.frequency === 'fortnightly') {
      next.setDate(next.getDate() + 14)
    } else if (this.frequency === 'monthly') {
      next.setMonth(next.getMonth() + 1)
    } else if (this.frequency === 'weekly') {
      next.setDate(next.getDate() + 7)
    }
    return next
  }

  updateAmount(newAmount) {
    this.amount = newAmount
    this.lastUpdated = new Date()
  }

  suspend() {
    this.status = 'suspended'
    this.lastUpdated = new Date()
  }

  reactivate() {
    this.status = 'active'
    this.lastUpdated = new Date()
  }
}

// Application Model
export class Application {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.userId = data.userId
    this.type = data.type
    this.service = data.service
    this.status = data.status || 'draft'
    this.submittedAt = data.submittedAt || null
    this.processedAt = data.processedAt || null
    this.approvedAt = data.approvedAt || null
    this.rejectedAt = data.rejectedAt || null
    this.rejectionReason = data.rejectionReason || null
    this.requiredDocuments = data.requiredDocuments || []
    this.submittedDocuments = data.submittedDocuments || []
    this.notes = data.notes || []
    this.assessor = data.assessor || null
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'app_' + Math.random().toString(36).substr(2, 9)
  }

  submit() {
    this.status = 'submitted'
    this.submittedAt = new Date()
    this.lastUpdated = new Date()
  }

  approve(assessor) {
    this.status = 'approved'
    this.approvedAt = new Date()
    this.assessor = assessor
    this.lastUpdated = new Date()
  }

  reject(reason, assessor) {
    this.status = 'rejected'
    this.rejectedAt = new Date()
    this.rejectionReason = reason
    this.assessor = assessor
    this.lastUpdated = new Date()
  }

  addNote(note, author) {
    this.notes.push({
      id: 'note_' + Math.random().toString(36).substr(2, 9),
      content: note,
      author: author,
      timestamp: new Date()
    })
    this.lastUpdated = new Date()
  }
}

// Child Support Assessment Model
export class ChildSupportAssessment {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.payeeId = data.payeeId // Person receiving payments
    this.payerId = data.payerId // Person making payments
    this.children = data.children || []
    this.assessmentAmount = data.assessmentAmount || 0
    this.frequency = data.frequency || 'monthly'
    this.startDate = data.startDate || new Date()
    this.endDate = data.endDate || null
    this.status = data.status || 'active'
    this.careArrangement = data.careArrangement || {}
    this.incomeDetails = {
      payee: data.incomeDetails?.payee || {},
      payer: data.incomeDetails?.payer || {}
    }
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'csa_' + Math.random().toString(36).substr(2, 9)
  }

  calculateAssessment() {
    // Simplified calculation - in reality this would be much more complex
    const baseAmount = 1000 // Base monthly amount
    const childMultiplier = this.children.length * 0.3
    const incomeAdjustment = this.incomeDetails.payer.income * 0.1
    
    this.assessmentAmount = Math.max(0, baseAmount + (baseAmount * childMultiplier) - incomeAdjustment)
    this.lastUpdated = new Date()
  }

  updateCareArrangement(arrangement) {
    this.careArrangement = { ...this.careArrangement, ...arrangement }
    this.calculateAssessment()
  }
}

// Medicare Card Model
export class MedicareCard {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.userId = data.userId
    this.cardNumber = data.cardNumber || this.generateCardNumber()
    this.cardholders = data.cardholders || []
    this.expiryDate = data.expiryDate || this.calculateExpiry()
    this.status = data.status || 'active'
    this.issueDate = data.issueDate || new Date()
    this.replacementReason = data.replacementReason || null
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'medicare_' + Math.random().toString(36).substr(2, 9)
  }

  generateCardNumber() {
    // Generate a realistic Medicare card number format
    const firstDigit = Math.floor(Math.random() * 9) + 1
    const remainingDigits = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
    return `${firstDigit}${remainingDigits}`
  }

  calculateExpiry() {
    const expiry = new Date()
    expiry.setFullYear(expiry.getFullYear() + 5) // Medicare cards valid for 5 years
    return expiry
  }

  addCardholder(cardholder) {
    this.cardholders.push({
      id: 'holder_' + Math.random().toString(36).substr(2, 9),
      ...cardholder,
      addedAt: new Date()
    })
    this.lastUpdated = new Date()
  }

  replace(reason) {
    this.status = 'replaced'
    this.replacementReason = reason
    this.lastUpdated = new Date()
  }
}

// AI Conversation Model
export class Conversation {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.userId = data.userId
    this.messages = data.messages || []
    this.context = data.context || {}
    this.intent = data.intent || null
    this.entities = data.entities || {}
    this.status = data.status || 'active'
    this.createdAt = data.createdAt || new Date()
    this.lastUpdated = data.lastUpdated || new Date()
  }

  generateId() {
    return 'conv_' + Math.random().toString(36).substr(2, 9)
  }

  addMessage(content, sender, type = 'text') {
    this.messages.push({
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      content,
      sender, // 'user' or 'assistant'
      type, // 'text', 'action', 'suggestion'
      timestamp: new Date()
    })
    this.lastUpdated = new Date()
  }

  updateContext(newContext) {
    this.context = { ...this.context, ...newContext }
    this.lastUpdated = new Date()
  }

  setIntent(intent, confidence = 1.0) {
    this.intent = { name: intent, confidence }
    this.lastUpdated = new Date()
  }
}
