'use client'

import { useState } from 'react'
import { 
  CreditCard, 
  Heart, 
  Users, 
  Info, 
  CheckCircle, 
  ArrowRight,
  Baby,
  Briefcase,
  HeartCrack,
  Calendar
} from 'lucide-react'

export default function ServiceOverview({ services, userId, user }) {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedLifeEvent, setSelectedLifeEvent] = useState(null)

  const serviceCategories = [
    {
      id: 'centrelink',
      name: 'Centrelink',
      description: 'Financial support and social services',
      icon: CreditCard,
      color: 'text-gov-blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      services: [
        {
          name: 'JobSeeker Payment',
          description: 'Financial support while looking for work',
          maxAmount: '$668.40 fortnightly',
          eligibility: 'Unemployed, aged 22-65, meeting mutual obligations'
        },
        {
          name: 'Family Tax Benefit',
          description: 'Help with the cost of raising children',
          maxAmount: '$191.24 fortnightly per child',
          eligibility: 'Has dependent children, meets income test'
        },
        {
          name: 'Age Pension',
          description: 'Income support for seniors',
          maxAmount: '$1,006.50 fortnightly',
          eligibility: 'Age 67+, meets residence and income/assets test'
        },
        {
          name: 'Disability Support Pension',
          description: 'Support for people with permanent disability',
          maxAmount: '$1,006.50 fortnightly',
          eligibility: 'Permanent disability, meets income/assets test'
        },
        {
          name: 'Parenting Payment',
          description: 'Support for parents and carers',
          maxAmount: '$820.20 fortnightly',
          eligibility: 'Parent or carer, meets income/assets test'
        }
      ]
    },
    {
      id: 'medicare',
      name: 'Medicare',
      description: 'Health care coverage and services',
      icon: Heart,
      color: 'text-gov-red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      services: [
        {
          name: 'Medicare Card',
          description: 'Access to health care services at low or no cost',
          maxAmount: 'Free',
          eligibility: 'Australian citizen, permanent resident, or eligible temporary resident'
        },
        {
          name: 'Medicare Claims',
          description: 'Claim back money for medical services',
          maxAmount: 'Up to 100% of scheduled fee',
          eligibility: 'Medicare card holder, eligible medical service'
        },
        {
          name: 'Safety Net',
          description: 'Additional benefits after reaching threshold',
          maxAmount: 'Up to 100% of scheduled fee',
          eligibility: 'Reached safety net threshold'
        },
        {
          name: 'Pharmaceutical Benefits Scheme (PBS)',
          description: 'Subsidised prescription medicines',
          maxAmount: 'Up to $30 per prescription',
          eligibility: 'Medicare card holder, prescribed PBS medicine'
        }
      ]
    },
    {
      id: 'child_support',
      name: 'Child Support',
      description: 'Child support arrangements and payments',
      icon: Users,
      color: 'text-gov-yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      services: [
        {
          name: 'Child Support Assessment',
          description: 'Calculate child support payments between separated parents',
          maxAmount: 'Based on income and care arrangements',
          eligibility: 'Separated parents with dependent children'
        },
        {
          name: 'Collection Service',
          description: 'Collect and transfer child support payments',
          maxAmount: 'Service fee may apply',
          eligibility: 'Child support assessment in place'
        },
        {
          name: 'Agreement Registration',
          description: 'Register private child support agreements',
          maxAmount: 'No fee',
          eligibility: 'Both parents agree to terms'
        }
      ]
    }
  ]

  const lifeEvents = [
    {
      id: 'having_baby',
      name: 'Having a Baby',
      icon: Baby,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      services: [
        {
          service: 'Medicare',
          action: 'Add baby to Medicare card',
          description: 'Register your newborn for Medicare coverage'
        },
        {
          service: 'Centrelink',
          action: 'Apply for Family Tax Benefit',
          description: 'Get financial help with raising your child'
        },
        {
          service: 'Centrelink',
          action: 'Apply for Parental Leave Pay',
          description: 'Get paid parental leave if eligible'
        },
        {
          service: 'Centrelink',
          action: 'Consider Child Care Subsidy',
          description: 'Prepare for future childcare costs'
        }
      ]
    },
    {
      id: 'job_loss',
      name: 'Job Loss',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      services: [
        {
          service: 'Centrelink',
          action: 'Apply for JobSeeker Payment',
          description: 'Get financial support while looking for work'
        },
        {
          service: 'Centrelink',
          action: 'Apply for Health Care Card',
          description: 'Get discounts on health services and medicines'
        },
        {
          service: 'Centrelink',
          action: 'Update Family Payments',
          description: 'Adjust your family payments based on new income'
        }
      ]
    },
    {
      id: 'relationship_breakdown',
      name: 'Relationship Breakdown',
      icon: HeartCrack,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      services: [
        {
          service: 'Child Support',
          action: 'Apply for Child Support Assessment',
          description: 'Set up child support arrangements'
        },
        {
          service: 'Centrelink',
          action: 'Update Relationship Status',
          description: 'Change your relationship status in Centrelink'
        },
        {
          service: 'Centrelink',
          action: 'Check Single Parent Payment',
          description: 'See if you qualify for parenting payment'
        },
        {
          service: 'Medicare',
          action: 'Separate Medicare Cards',
          description: 'Get separate Medicare cards if needed'
        }
      ]
    },
    {
      id: 'turning_65',
      name: 'Turning 65',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      services: [
        {
          service: 'Centrelink',
          action: 'Apply for Age Pension',
          description: 'Get income support for seniors'
        },
        {
          service: 'Centrelink',
          action: 'Apply for Seniors Health Card',
          description: 'Get discounts on health services'
        },
        {
          service: 'Medicare',
          action: 'Check Safety Net Status',
          description: 'Review your Medicare safety net'
        }
      ]
    }
  ]

  const checkEligibility = (serviceName) => {
    if (!user) return { eligible: false, reason: 'No user selected' }
    
    // Simple eligibility check based on user data
    const eligibilityChecks = {
      'JobSeeker Payment': user.employment?.status === 'unemployed',
      'Family Tax Benefit': user.familyDetails?.children?.length > 0,
      'Age Pension': services.calculateAge(user.personalDetails.dateOfBirth) >= 67,
      'Medicare Card': user.personalDetails.citizenship === 'Australian'
    }
    
    const eligible = eligibilityChecks[serviceName] || false
    return {
      eligible,
      reason: eligible ? 'You may be eligible' : 'Check specific requirements'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sa-card">
        <h2 className="text-2xl font-bold text-sa-dark-blue mb-2">
          Services Australia Overview
        </h2>
        <p className="text-sa-gray">
          Explore the range of services available through Centrelink, Medicare, and Child Support.
        </p>
      </div>

      {/* Service Categories */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-sa-dark-blue">Service Categories</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className={`sa-card cursor-pointer transition-all duration-200 hover:shadow-sa-lg border-2 ${
                  selectedService === category.id ? 'border-sa-blue bg-blue-50' : 'border-sa-light-gray'
                }`}
                onClick={() => setSelectedService(selectedService === category.id ? null : category.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${category.bgColor} ${category.borderColor} border`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-sa-dark-blue">
                      {category.name}
                    </h4>
                    <p className="text-sm text-sa-gray">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {selectedService === category.id && (
                  <div className="space-y-3">
                    {category.services.map((service, index) => {
                      const eligibility = checkEligibility(service.name)
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">
                              {service.name}
                            </h5>
                            <span className={`gov-badge ${
                              eligibility.eligible ? 'badge-success' : 'badge-info'
                            }`}>
                              {eligibility.eligible ? 'Eligible' : 'Check'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {service.description}
                          </p>
                          
                          <div className="text-sm text-gray-500 space-y-1">
                            <div><strong>Max Amount:</strong> {service.maxAmount}</div>
                            <div><strong>Eligibility:</strong> {service.eligibility}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Life Events */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Life Events</h3>
        <p className="text-gray-600">
          Get help navigating major life changes with coordinated service support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lifeEvents.map((event) => {
            const Icon = event.icon
            return (
              <div
                key={event.id}
                className={`gov-card cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                  selectedLifeEvent === event.id ? 'border-gov-blue bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedLifeEvent(selectedLifeEvent === event.id ? null : event.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${event.bgColor} ${event.borderColor} border`}>
                    <Icon className={`w-6 h-6 ${event.color}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {event.name}
                    </h4>
                  </div>
                </div>
                
                {selectedLifeEvent === event.id && (
                  <div className="space-y-3">
                    {event.services.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">
                            {service.action}
                          </h5>
                          <span className="gov-badge badge-info">
                            {service.service}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="gov-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Check Eligibility</h4>
                <p className="text-sm text-gray-600 mt-1">
                  See what payments you qualify for
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gov-blue transition-colors" />
            </div>
          </button>
          
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Start Application</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Begin a new application
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gov-blue transition-colors" />
            </div>
          </button>
          
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Report Change</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Update your circumstances
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gov-blue transition-colors" />
            </div>
          </button>
          
          <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-gov-blue hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-gov-blue">Get Help</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Contact support or find resources
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gov-blue transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
