import { NextResponse } from 'next/server'
import { ServicesAIAssistant } from '../../../lib/ai-assistant.js'
import { ServicesAustraliaService } from '../../../lib/services.js'

// Initialize services (in a real app, these would be singletons or from a service container)
const aiAssistant = new ServicesAIAssistant()
const services = new ServicesAustraliaService()

export async function POST(request) {
  try {
    const { message, userId, context } = await request.json()

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      )
    }

    // Get user data for context
    const user = services.getUser(userId)
    const enhancedContext = {
      ...context,
      user: user,
      services: services
    }

    // Process the message through the AI assistant
    const response = await aiAssistant.processMessage(userId, message, enhancedContext)

    return NextResponse.json({
      success: true,
      response: response.response,
      type: response.type,
      actions: response.actions,
      proactiveActions: response.proactiveActions,
      intent: response.intent,
      entities: response.entities,
      conversationId: response.conversationId
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'I\'m sorry, I\'m having trouble processing your request right now. Please try again.'
      },
      { status: 500 }
    )
  }
}

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

    // Get conversation history
    const conversation = aiAssistant.getConversationHistory(userId)
    
    return NextResponse.json({
      success: true,
      conversation: conversation
    })

  } catch (error) {
    console.error('Chat history API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
