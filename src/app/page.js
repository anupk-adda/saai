'use client'

import { useState, useEffect } from 'react'
import { ServicesAIAssistant } from '../lib/ai-assistant.js'
import { ServicesAustraliaService } from '../lib/services.js'
import ChatInterface from '../components/ChatInterface.js'
import UserDashboard from '../components/UserDashboard.js'
import ServiceOverview from '../components/ServiceOverview.js'
import { MessageCircle, User, Home, Settings } from 'lucide-react'

export default function HomePage() {
  const [currentView, setCurrentView] = useState('chat')
  const [selectedUser, setSelectedUser] = useState('user_001')
  const [aiAssistant] = useState(new ServicesAIAssistant())
  const [services] = useState(new ServicesAustraliaService())
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Load demo users
    const demoUsers = services.getAllUsers()
    setUsers(demoUsers)
  }, [services])

  const currentUser = users.find(user => user.id === selectedUser)

  const navigationItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'dashboard', label: 'My Services', icon: User },
    { id: 'overview', label: 'Service Overview', icon: Home },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sa-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  {/* Australian Government Logo Placeholder */}
                  <div className="w-8 h-8 bg-sa-white rounded flex items-center justify-center">
                    <span className="text-sa-blue font-bold text-sm">AU</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold sa-header-text">
                      Services Australia
                    </h1>
                    <p className="text-xs text-sa-white opacity-90">
                      AI Assistant
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-sa-white">
                  Demo User:
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-2 border border-sa-white rounded-lg bg-sa-white text-sa-dark-blue focus:ring-2 focus:ring-sa-accent-blue focus:border-sa-accent-blue outline-none transition-all duration-200"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.personalDetails.firstName} {user.personalDetails.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={currentView === item.id ? 'nav-button-active' : 'nav-button'}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {/* User Info Panel */}
            {currentUser && (
              <div className="mt-8 sa-card">
                <h3 className="text-lg font-semibold text-sa-dark-blue mb-3">
                  Current User
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-sa-gray">Name:</span>{' '}
                    <span className="text-sa-dark-blue">
                      {currentUser.personalDetails.firstName} {currentUser.personalDetails.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sa-gray">Age:</span>{' '}
                    <span className="text-sa-dark-blue">
                      {services.calculateAge(currentUser.personalDetails.dateOfBirth)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sa-gray">Status:</span>{' '}
                    <span className={`sa-badge ${
                      currentUser.status === 'active' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {currentUser.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sa-gray">Children:</span>{' '}
                    <span className="text-sa-dark-blue">
                      {currentUser.familyDetails.children.length}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sa-gray">Income:</span>{' '}
                    <span className="text-sa-dark-blue">
                      {services.formatCurrency(currentUser.financialDetails.income)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentView === 'chat' && (
              <ChatInterface
                aiAssistant={aiAssistant}
                services={services}
                userId={selectedUser}
                user={currentUser}
              />
            )}
            
            {currentView === 'dashboard' && (
              <UserDashboard
                services={services}
                userId={selectedUser}
                user={currentUser}
              />
            )}
            
            {currentView === 'overview' && (
              <ServiceOverview
                services={services}
                userId={selectedUser}
                user={currentUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
