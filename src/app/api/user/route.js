import { NextResponse } from 'next/server'
import { ServicesAustraliaService } from '../../../lib/services.js'

// Initialize services
const services = new ServicesAustraliaService()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Get user data
    const user = services.getUser(userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get related data
    const payments = services.getUserPayments(userId)
    const applications = services.getUserApplications(userId)
    const medicareCard = services.getUserMedicareCard(userId)
    const childSupportAssessments = services.getUserChildSupportAssessments(userId)

    return NextResponse.json({
      success: true,
      user: user,
      payments: payments,
      applications: applications,
      medicareCard: medicareCard,
      childSupportAssessments: childSupportAssessments
    })

  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const { userId, updates } = await request.json()

    if (!userId || !updates) {
      return NextResponse.json(
        { error: 'userId and updates are required' },
        { status: 400 }
      )
    }

    // Update user data
    const updatedUser = services.updateUser(userId, updates)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    })

  } catch (error) {
    console.error('User update API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
