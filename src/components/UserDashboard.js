'use client'

import { useState, useEffect } from 'react'
import { 
  CreditCard, 
  FileText, 
  Heart, 
  Users, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function UserDashboard({ services, userId, user }) {
  const [payments, setPayments] = useState([])
  const [applications, setApplications] = useState([])
  const [medicareCard, setMedicareCard] = useState(null)
  const [childSupportAssessments, setChildSupportAssessments] = useState([])

  useEffect(() => {
    if (userId) {
      setPayments(services.getUserPayments(userId))
      setApplications(services.getUserApplications(userId))
      setMedicareCard(services.getUserMedicareCard(userId))
      setChildSupportAssessments(services.getUserChildSupportAssessments(userId))
    }
  }, [userId, services])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'badge-success'
      case 'pending':
      case 'submitted':
        return 'badge-warning'
      case 'suspended':
      case 'rejected':
        return 'badge-error'
      default:
        return 'badge-info'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
      case 'submitted':
        return <Clock className="w-4 h-4" />
      case 'suspended':
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="sa-card">
        <h2 className="text-2xl font-bold text-sa-dark-blue mb-2">
          Welcome back, {user?.personalDetails.firstName}!
        </h2>
        <p className="text-sa-gray">
          Here's an overview of your Services Australia account and services.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sa-card">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-sa-blue" />
            <div className="ml-3">
              <p className="text-sm font-medium text-sa-gray">Active Payments</p>
              <p className="text-2xl font-bold text-sa-dark-blue">
                {payments.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="sa-card">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-sa-green" />
            <div className="ml-3">
              <p className="text-sm font-medium text-sa-gray">Applications</p>
              <p className="text-2xl font-bold text-sa-dark-blue">
                {applications.length}
              </p>
            </div>
          </div>
        </div>

        <div className="sa-card">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-sa-red" />
            <div className="ml-3">
              <p className="text-sm font-medium text-sa-gray">Medicare</p>
              <p className="text-2xl font-bold text-sa-dark-blue">
                {medicareCard ? 'Active' : 'None'}
              </p>
            </div>
          </div>
        </div>

        <div className="sa-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-sa-orange" />
            <div className="ml-3">
              <p className="text-sm font-medium text-sa-gray">Child Support</p>
              <p className="text-2xl font-bold text-sa-dark-blue">
                {childSupportAssessments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Payments */}
        <div className="sa-card">
          <h3 className="text-lg font-semibold text-sa-dark-blue mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-sa-blue" />
            Current Payments
          </h3>
          
          {payments.length > 0 ? (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="border border-sa-light-gray rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sa-dark-blue">
                      {payment.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h4>
                    <span className={`sa-badge ${getStatusColor(payment.status)} flex items-center`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{payment.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-sa-gray">
                    <span>Amount: {services.formatCurrency(payment.amount)}</span>
                    <span>{payment.frequency}</span>
                  </div>
                  
                  {payment.nextPaymentDate && (
                    <div className="mt-2 text-sm text-sa-gray">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Next payment: {services.formatDate(payment.nextPaymentDate)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No active payments</p>
          )}
        </div>

        {/* Applications */}
        <div className="gov-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Applications
          </h3>
          
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {application.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h4>
                    <span className={`gov-badge ${getStatusColor(application.status)} flex items-center`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1">{application.status}</span>
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div>Submitted: {services.formatDate(application.submittedAt)}</div>
                    {application.processedAt && (
                      <div>Processed: {services.formatDate(application.processedAt)}</div>
                    )}
                    {application.assessor && (
                      <div>Assessor: {application.assessor}</div>
                    )}
                  </div>
                  
                  {application.notes.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Latest Note:</p>
                      <p className="text-sm text-gray-600">
                        {application.notes[application.notes.length - 1].content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No applications</p>
          )}
        </div>

        {/* Medicare Card */}
        <div className="gov-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Medicare Card
          </h3>
          
          {medicareCard ? (
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">Medicare Card</h4>
                  <span className={`gov-badge ${getStatusColor(medicareCard.status)} flex items-center`}>
                    {getStatusIcon(medicareCard.status)}
                    <span className="ml-1">{medicareCard.status}</span>
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Card Number: {medicareCard.cardNumber}</div>
                  <div>Expires: {services.formatDate(medicareCard.expiryDate)}</div>
                  <div>Cardholders: {medicareCard.cardholders.length}</div>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Cardholders:</h5>
                  <div className="space-y-1">
                    {medicareCard.cardholders.map((holder, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {index + 1}. {holder.firstName} {holder.lastName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No Medicare card on file</p>
          )}
        </div>

        {/* Child Support */}
        <div className="gov-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Child Support
          </h3>
          
          {childSupportAssessments.length > 0 ? (
            <div className="space-y-3">
              {childSupportAssessments.map((assessment) => (
                <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Child Support Assessment</h4>
                    <span className={`gov-badge ${getStatusColor(assessment.status)} flex items-center`}>
                      {getStatusIcon(assessment.status)}
                      <span className="ml-1">{assessment.status}</span>
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Amount: {services.formatCurrency(assessment.assessmentAmount)} {assessment.frequency}
                    </div>
                    <div>Children: {assessment.children.length}</div>
                    <div>Started: {services.formatDate(assessment.startDate)}</div>
                  </div>
                  
                  {assessment.careArrangement && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Care Arrangement:</h5>
                      <div className="text-sm text-gray-600">
                        <div>Your care: {assessment.careArrangement.payeeCare}%</div>
                        <div>Other parent's care: {assessment.careArrangement.payerCare}%</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No child support assessments</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="gov-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Report Change</h4>
            <p className="text-sm text-gray-600 mt-1">
              Update your circumstances
            </p>
          </button>
          
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Apply for Payment</h4>
            <p className="text-sm text-gray-600 mt-1">
              Start a new application
            </p>
          </button>
          
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Find Services</h4>
            <p className="text-sm text-gray-600 mt-1">
              Discover available services
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
