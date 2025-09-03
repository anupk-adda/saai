import { NextResponse } from 'next/server'
import { ServicesAustraliaService } from '../../../lib/services.js'

// Initialize services
const services = new ServicesAustraliaService()

export async function POST(request) {
  try {
    const { userId, paymentType } = await request.json()

    if (!userId || !paymentType) {
      return NextResponse.json(
        { error: 'userId and paymentType are required' },
        { status: 400 }
      )
    }

    // Check eligibility
    const eligibility = services.checkEligibility(userId, paymentType)
    
    // Calculate potential payment amount if eligible
    let calculatedAmount = 0
    if (eligibility.eligible) {
      calculatedAmount = services.calculatePaymentAmount(userId, paymentType)
    }

    return NextResponse.json({
      success: true,
      eligible: eligibility.eligible,
      reason: eligibility.reason,
      calculatedAmount: calculatedAmount,
      formattedAmount: services.formatCurrency(calculatedAmount),
      user: eligibility.user
    })

  } catch (error) {
    console.error('Eligibility API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
