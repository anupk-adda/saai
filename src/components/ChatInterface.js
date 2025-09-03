'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, RotateCcw } from 'lucide-react'

export default function ChatInterface({ aiAssistant, services, userId, user }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const resetChat = () => {
    // Only show confirmation if there are messages
    if (messages.length > 0) {
      const confirmed = window.confirm('Are you sure you want to start a new chat? This will clear your current conversation.')
      if (!confirmed) return
    }
    
    setMessages([])
    setInputMessage('')
    setIsLoading(false)
    setIsThinking(false)
    // The welcome message will be added automatically by the useEffect
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add keyboard shortcut for reset (Ctrl+R or Cmd+R)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault()
        resetChat()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [messages])

  useEffect(() => {
    // Initialize with personalized welcome message
    if (messages.length === 0 && user) {
      console.log('User data:', user) // Debug log
      let welcomeMessage = `Hello ${user.personalDetails.firstName}! I'm ServicesAI, your Australian Government AI Assistant.`
      
      // Add personalized content for Sarah Johnson
      if (user.id === 'user_001' && user.personalDetails.firstName === 'Sarah') {
        console.log('Sarah Johnson detected, adding personalized content') // Debug log
        welcomeMessage += ` I can see you're currently receiving Family Tax Benefit and Child Care Subsidy for Emma. I'm here to help you with all your Centrelink, Medicare, and Child Support needs.`
        
        // Check for any pending items
        const pendingApplications = services.getUserApplications(userId)?.filter(app => app.status === 'submitted')
        if (pendingApplications && pendingApplications.length > 0) {
          welcomeMessage += ` I notice you have a pending Parental Leave Pay application that I can help you track.`
        }
        
        // Add proactive actions for Sarah
        const proactiveActions = []
        
        if (pendingApplications && pendingApplications.length > 0) {
          proactiveActions.push({
            type: 'application_status',
            title: 'Check Application Status',
            description: 'I notice you have a pending Parental Leave Pay application. Would you like me to check its status?',
            action: 'check_application_status',
            applicationId: pendingApplications[0].id
          })
        }
        
        const payments = services.getUserPayments(userId)
        if (payments && payments.length > 0) {
          const nextPayment = payments.find(p => p.nextPaymentDate && new Date(p.nextPaymentDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
          if (nextPayment) {
            proactiveActions.push({
              type: 'payment_reminder',
              title: 'Upcoming Payment',
              description: `Your next ${nextPayment.type.replace('_', ' ')} payment of $${nextPayment.amount} is due soon.`,
              action: 'view_payment_details',
              paymentId: nextPayment.id
            })
          }
        }
        
        if (user.familyDetails.children.length === 1) {
          proactiveActions.push({
            type: 'service_recommendation',
            title: 'Child Care Subsidy',
            description: 'Since Emma is 5, you might be eligible for Child Care Subsidy if you use childcare.',
            action: 'check_ccs_eligibility'
          })
        }
        
        setMessages([{
          id: 'welcome',
          content: welcomeMessage,
          sender: 'assistant',
          type: 'welcome',
          proactiveActions: proactiveActions,
          timestamp: new Date()
        }])
      } else {
        welcomeMessage += ` I can help you with Centrelink payments, Medicare services, and Child Support.`
        welcomeMessage += ` What would you like to know?`
        
        setMessages([{
          id: 'welcome',
          content: welcomeMessage,
          sender: 'assistant',
          type: 'welcome',
          timestamp: new Date()
        }])
      }
    }
  }, [user, messages.length, userId, services])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: `msg_${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsThinking(true)

    // Add thinking delay for more realistic experience
    const thinkingDelay = Math.random() * 2000 + 1000 // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, thinkingDelay))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          userId: userId,
          context: {
            user: user,
            services: services
          }
        })
      })

      const result = await response.json()
      
      if (result.success) {
        console.log('API response:', result) // Debug log
        const assistantMessage = {
          id: `msg_${Date.now() + 1}`,
          content: result.response,
          sender: 'assistant',
          type: result.type,
          actions: result.actions || [],
          proactiveActions: result.proactiveActions || [],
          intent: result.intent,
          timestamp: new Date()
        }

        console.log('Assistant message created:', assistantMessage) // Debug log
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(result.error || 'Failed to process message')
      }
    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage = {
        id: `msg_${Date.now() + 1}`,
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        sender: 'assistant',
        type: 'error',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsThinking(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = async (action) => {
    if (action.type === 'proactive_action') {
      await handleProactiveAction(action)
    } else {
      const actionMessage = action.title || action.description
      setInputMessage(actionMessage)
      await handleSendMessage()
    }
  }

  const handleProactiveAction = async (action) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action.action,
          userId: userId,
          data: action
        })
      })

      const result = await response.json()
      
      if (result.success) {
        const assistantMessage = {
          id: `msg_${Date.now()}`,
          content: result.result.message,
          sender: 'assistant',
          type: 'action_result',
          result: result.result,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMessage = {
          id: `msg_${Date.now()}`,
          content: result.error || 'Sorry, I couldn\'t process that action right now.',
          sender: 'assistant',
          type: 'error',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error handling proactive action:', error)
      const errorMessage = {
        id: `msg_${Date.now()}`,
        content: 'Sorry, I\'m having trouble processing that action right now.',
        sender: 'assistant',
        type: 'error',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Thinking animation component
  const ThinkingAnimation = () => (
    <div className="flex items-center space-x-2 text-sa-gray">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-sa-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-sa-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-sa-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm">ServicesAI is thinking...</span>
    </div>
  )

  const formatMessage = (message) => {
    console.log('Formatting message:', message) // Debug log
    
    // Handle proactive actions
    if (message.proactiveActions && message.proactiveActions.length > 0) {
      console.log('Proactive actions found:', message.proactiveActions) // Debug log
      return (
        <div className="space-y-4">
          <p>{message.content}</p>
          <div className="sa-proactive-box">
            <h4 className="sa-proactive-title">💡 I noticed something that might help:</h4>
            <div className="space-y-2">
              {message.proactiveActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction({...action, type: 'proactive_action'})}
                  className="sa-proactive-button"
                >
                  <h5 className="sa-proactive-button-title">{action.title}</h5>
                  <p className="sa-proactive-button-desc">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // Handle action results
    if (message.type === 'action_result' && message.result) {
      return (
        <div className="space-y-4">
          <p>{message.content}</p>
          {message.result.processing && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Processing Complete</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Transaction ID:</strong> {message.result.processing.transactionId}</div>
                <div><strong>Amount:</strong> ${message.result.processing.amount}</div>
                <div><strong>Confirmation:</strong> {message.result.processing.confirmationNumber}</div>
              </div>
            </div>
          )}
          {message.result.nextSteps && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                {message.result.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }

    if (message.type === 'life_event' && message.actions) {
      return (
        <div className="space-y-4">
          <p>{message.content}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {message.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
              >
                <h4 className="font-semibold text-blue-900">{action.title}</h4>
                <p className="text-sm text-blue-700 mt-1">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (message.actions && message.actions.length > 0) {
      return (
        <div className="space-y-3">
          <p>{message.content}</p>
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="px-3 py-2 bg-gov-blue text-white text-sm rounded-lg hover:bg-blue-800 transition-colors"
              >
                {action.title}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return <p>{message.content}</p>
  }

  return (
    <div className="sa-card h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-sa-dark-blue">
            AI Assistant Chat
          </h2>
          {messages.length > 0 && (
            <span className="text-xs bg-sa-blue text-sa-white px-2 py-1 rounded-full">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={resetChat}
            className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 border ${
              messages.length > 0 
                ? 'bg-sa-blue hover:bg-sa-light-blue text-sa-white border-sa-blue hover:border-sa-light-blue' 
                : 'bg-sa-light-gray hover:bg-sa-gray text-sa-dark-blue border-sa-gray hover:border-sa-dark-blue'
            }`}
            title={messages.length > 0 ? "Start a new chat (will clear current conversation)" : "Start a new chat"}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{messages.length > 0 ? 'New Chat' : 'New Chat'}</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-sa-gray">
            <Bot className="w-4 h-4" />
            <span>Services Australia AI Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? 'sa-chat-bubble-user'
                  : 'sa-chat-bubble-assistant'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'assistant' && (
                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  {formatMessage(message)}
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <div className="sa-chat-bubble-assistant px-4 py-3 flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <ThinkingAnimation />
            </div>
          </div>
        )}
        
        {isLoading && !isThinking && (
          <div className="flex justify-start">
            <div className="sa-chat-bubble-assistant px-4 py-3 flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <Loader2 className="w-4 h-4 animate-spin text-sa-blue" />
              <span className="text-sm text-sa-gray">Processing...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about Centrelink, Medicare, or Child Support..."
          className="flex-1 sa-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="sa-button flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>

      {/* Quick Start Suggestions */}
      {messages.length <= 1 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Try asking:
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "When is my next payment?",
              "Am I eligible for Family Tax Benefit?",
              "How do I apply for Medicare?",
              "I'm having a baby, what help is available?",
              "I lost my job, what payments can I get?"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
