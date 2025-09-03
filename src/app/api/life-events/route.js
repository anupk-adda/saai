import { NextResponse } from 'next/server'
import { ServicesAustraliaService } from '../../../lib/services.js'

// Initialize services
const services = new ServicesAustraliaService()

export async function POST(request) {
  try {
    const { userId, lifeEvent, eventData } = await request.json()

    if (!userId || !lifeEvent) {
      return NextResponse.json(
        { error: 'userId and lifeEvent are required' },
        { status: 400 }
      )
    }

    // Process life event
    const result = services.processLifeEvent(userId, lifeEvent, eventData)

    return NextResponse.json({
      success: result.success,
      message: result.message,
      actions: result.actions || [],
      recommendations: result.recommendations || []
    })

  } catch (error) {
    console.error('Life events API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
