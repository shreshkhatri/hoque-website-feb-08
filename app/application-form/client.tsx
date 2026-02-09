'use client'

import React from "react"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, Upload, AlertCircle } from 'lucide-react'

export function ApplicationFormClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [countrySearch, setCountrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    highestQualification: '',
    applyingFor: '',
    subjectArea: '',
    preferredCourseName: '',
    preferredIntake: '',
    universityName: '',
    studentType: '',
    additionalInfo: '',
  })
  const [files, setFiles] = useState<Record<string, File | null>>({
    upload10th: null,
    upload12th: null,
    degreeCertificate: null,
    mastersCertificate: null,
    transcript: null,
    consolidatedMarkSheet: null,
    passport: null,
    cv: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false)

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
    'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
    'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
    'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
    'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
    'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ].sort()
  const qualifications = ['12th/Diploma or WAEC/NECO', 'Graduate', 'Postgraduate']
  const applyingForOptions = ['Foundation', 'Graduate', 'Postgraduate', 'PhD', 'Pre Masters']
  const subjectAreas = [
    'Business and Management',
    'Engineering and Technology',
    'Computer Science and IT',
    'Law',
    'Medicine and Healthcare',
    'Social Sciences',
    'Humanities',
    'Natural Sciences',
    'Arts and Design',
    'Education',
    'Psychology',
    'Environmental Sciences',
    'Media and Communication',
    'Architecture and Construction',
    'Hospitality and Tourism',
    'Biotechnology and Pharmacy',
    'Other',
  ]
  const intakes = ['September', 'January', 'May', 'Other']
  const universities = [
    'University of Greenwich',
    'Middlesex University London',
    'Northumbria University London',
    'Northumbria University Newcastle',
    'Ulster University',
    'University of Bedfordshire',
    'University of Creative Arts',
    'Queens University of Belfast',
    'Glyndwr University',
    'University of Bolton',
    'De Montfort University',
    'Keele University',
    'University of South Wales',
    'Bangor University',
    'University of Dundee',
    'University of Bradford',
    'University of Roehampton',
    'Ravensbourne University London',
    'London Metropolitan University',
    'Solent University',
  ]
  const studentTypes = ['British Citizen', 'International / Foreign Student', 'UK Visa', 'International Student transferring within the UK']

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) return `${name} is required`
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address'
    }
    if (name === 'phone' && !/^\+?[\d\s\-()]{10,}$/.test(value)) {
      return 'Please enter a valid phone number with country code'
    }
    return ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, [fieldName]: 'File size must be less than 10MB' }))
        return
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [fieldName]: 'Only PDF, JPG, PNG, and DOC files are allowed' }))
        return
      }
      setFiles((prev) => ({ ...prev, [fieldName]: file }))
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    const requiredFields = {
      1: ['fullName', 'email', 'phone', 'country'],
      2: ['highestQualification', 'applyingFor', 'subjectArea'],
      3: ['preferredCourseName', 'preferredIntake', 'universityName', 'studentType'],
      4: [Object.keys(files).some((k) => files[k]) ? 'documents' : ''].filter(Boolean),
    }

    const fieldsToCheck = requiredFields[step as keyof typeof requiredFields] || []
    fieldsToCheck.forEach((field) => {
      if (field && !formData[field as keyof typeof formData]) {
        newErrors[field] = `This field is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToPrivacy) {
      setErrors((prev) => ({ ...prev, privacy: 'You must agree to the privacy notice' }))
      return
    }
    if (validateStep(4)) {
      setSubmitted(true)
      console.log('Form submitted:', { formData, files })
    }
  }

  const goToStep = (step: number) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step)
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-card rounded-lg border border-border p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Application Submitted Successfully</h1>
              <p className="text-foreground/60 mb-8">Thank you for your application! Our team will review your submission and contact you within 2-3 business days.</p>
              <Button onClick={() => window.location.href = '/'} className="bg-primary hover:bg-primary/90">
                Return to Home
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Student Application Form</h1>
            <p className="text-foreground/60">Complete your application to Hoque</p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between mb-12 gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                onClick={() => step < currentStep && goToStep(step)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                } ${step < currentStep ? 'cursor-pointer' : ''}`}
              />
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {['Personal', 'Education', 'Program', 'Documents'].map((label, i) => (
              <div key={i} className="text-center">
                <div className={`text-sm font-semibold ${i + 1 === currentStep ? 'text-primary' : 'text-foreground/60'}`}>
                  Step {i + 1}
                </div>
                <div className={`text-xs ${i + 1 === currentStep ? 'text-primary' : 'text-foreground/40'}`}>{label}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number (with country code) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
                      >
                        <span>{formData.country || 'Select a country'}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                          <div className="p-3 border-b border-border">
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full px-3 py-2 rounded border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                          </div>
                          <div className="max-h-72 overflow-y-auto">
                            {countries
                              .filter((country) =>
                                country.toLowerCase().includes(countrySearch.toLowerCase())
                              )
                              .map((country) => (
                                <div
                                  key={country}
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, country }))
                                    setShowCountryDropdown(false)
                                    setCountrySearch('')
                                    const newErrors = { ...errors }
                                    delete newErrors.country
                                    setErrors(newErrors)
                                  }}
                                  className={`px-4 py-3 cursor-pointer transition-colors ${
                                    formData.country === country
                                      ? 'bg-primary text-primary-foreground'
                                      : 'hover:bg-muted text-foreground'
                                  }`}
                                >
                                  {country}
                                </div>
                              ))}
                            {countries.filter((country) =>
                              country.toLowerCase().includes(countrySearch.toLowerCase())
                            ).length === 0 && (
                              <div className="px-4 py-3 text-foreground/60 text-sm">No countries found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.country && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.country}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Educational Background */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Educational Background</h2>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select qualification</option>
                      {qualifications.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    {errors.highestQualification && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.highestQualification}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="applyingFor"
                      value={formData.applyingFor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select program level</option>
                      {applyingForOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.applyingFor && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.applyingFor}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Subject Area <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subjectArea"
                      value={formData.subjectArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select subject area</option>
                      {subjectAreas.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subjectArea && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.subjectArea}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Program Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Program Preferences</h2>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Preferred Course Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="preferredCourseName"
                      value={formData.preferredCourseName}
                      onChange={handleInputChange}
                      placeholder="e.g., Bachelor of Business Administration"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.preferredCourseName && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.preferredCourseName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Preferred Intake <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredIntake"
                      value={formData.preferredIntake}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select intake</option>
                      {intakes.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    {errors.preferredIntake && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.preferredIntake}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      University Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select university</option>
                      {universities.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                    {errors.universityName && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.universityName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Student Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select student type</option>
                      {studentTypes.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.studentType && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {errors.studentType}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Documents & Additional Info */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Documents & Additional Information</h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { key: 'upload10th', label: 'Upload 10th Mark Sheet' },
                      { key: 'upload12th', label: 'Upload 12th/Diploma or WAEC/NECO' },
                      { key: 'degreeCertificate', label: 'Upload Degree Certificate' },
                      { key: 'mastersCertificate', label: 'Upload Masters Certificate' },
                      { key: 'transcript', label: 'Upload Transcript' },
                      { key: 'consolidatedMarkSheet', label: 'Upload Consolidated Mark Sheet' },
                      { key: 'passport', label: 'Upload Passport' },
                      { key: 'cv', label: 'Upload CV' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, key)}
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            className="hidden"
                            id={key}
                          />
                          <label
                            htmlFor={key}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 cursor-pointer transition-colors"
                          >
                            <Upload size={18} className="text-primary" />
                            <span className="text-sm text-foreground/60">{files[key as keyof typeof files]?.name || 'Choose file'}</span>
                          </label>
                        </div>
                        {errors[key] && (
                          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                            <AlertCircle size={16} />
                            {errors[key]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Any Additional Information (Optional)</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Tell us anything else we should know about your application..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={agreeToPrivacy}
                      onChange={(e) => {
                        setAgreeToPrivacy(e.target.checked)
                        if (e.target.checked) {
                          setErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.privacy
                            return newErrors
                          })
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-sm text-foreground/80 cursor-pointer">
                      By submitting this form, you agree to the Hoque privacy notice and terms of service. We will process your data securely.
                    </label>
                  </div>
                  {errors.privacy && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      {errors.privacy}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-8"
              >
                Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => goToStep(currentStep + 1)}
                  className="px-8 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="px-8 bg-primary hover:bg-primary/90">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
