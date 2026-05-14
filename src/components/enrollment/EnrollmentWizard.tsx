'use client'

import { useState } from 'react'
import { X, UserPlus, ArrowLeft } from 'lucide-react'
import EnrollmentStep2 from './EnrollmentStep2'
import EnrollmentStep3 from './EnrollmentStep3'

interface EnrollmentStep1Data {
  fullLegalName: string
  ageOrDOB: string
  identificationMarks: string
}

interface EnrollmentWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: EnrollmentStep1Data) => void
}

export default function EnrollmentWizard({ isOpen, onClose, onComplete }: EnrollmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<EnrollmentStep1Data>({
    fullLegalName: '',
    ageOrDOB: '',
    identificationMarks: '',
  })

  const handleInputChange = (field: keyof EnrollmentStep1Data, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (formData.fullLegalName.trim()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSaveStep2 = (files: any) => {
    console.log('Step 2 completed with files:', files)
    setCurrentStep(3)
  }

  const handleCompleteEnrollment = () => {
    console.log('Enrollment completed:', formData)
    onComplete(formData)
    handleClose()
  }

  const handleClose = () => {
    setCurrentStep(1)
    setFormData({ fullLegalName: '', ageOrDOB: '', identificationMarks: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div
        className={`border-2 rounded shadow-2xl flex flex-col relative transition-all ${
          currentStep === 2 ? 'w-[900px] h-[700px]' : currentStep === 3 ? 'w-[900px] h-[600px]' : 'w-[560px]'
        }`}
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        {/* Accent top border */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: '#3B82F6' }} />

        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: '#24324A' }}>
          <div className="flex items-center gap-3">
            {currentStep === 3 ? (
              <>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22C55E' }}>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                </div>
                <h2 className="text-lg font-bold uppercase tracking-tight" style={{ color: '#E5E7EB' }}>
                  Subject Enrollment Confirmation
                </h2>
              </>
            ) : (
              <>
                <UserPlus size={24} style={{ color: '#3B82F6' }} />
                <h2 className="text-lg font-bold uppercase tracking-tight" style={{ color: '#E5E7EB' }}>
                  Subject Enrollment - Step {currentStep}
                </h2>
              </>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:opacity-80 transition-opacity"
            style={{ color: '#94A3B8' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden" style={{ backgroundColor: '#121A2B' }}>
          {currentStep === 1 && (
            <div className="p-6 space-y-6 h-full flex flex-col">
              <>
                {/* Name and Age Row */}
                <div className="grid grid-cols-12 gap-4">
                {/* Full Legal Name */}
                <div className="col-span-8 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Full Legal Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.fullLegalName}
                      onChange={(e) => handleInputChange('fullLegalName', e.target.value)}
                      placeholder="Enter identification name..."
                      className="w-full rounded px-4 py-2 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: '#0B1020',
                        borderColor: '#24324A',
                        color: '#E5E7EB',
                        border: '1px solid #24324A',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                      onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                    />
                  </div>
                </div>

                {/* Age/DOB */}
                <div className="col-span-4 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Age / DOB Est.
                  </label>
                  <input
                    type="number"
                    value={formData.ageOrDOB}
                    onChange={(e) => handleInputChange('ageOrDOB', e.target.value)}
                    placeholder="--"
                    className="w-full rounded px-4 py-2 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: '#0B1020',
                      borderColor: '#24324A',
                      color: '#E5E7EB',
                      border: '1px solid #24324A',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                    onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Subject Identification Marks / Description
                  </label>
                  <span className="text-xs" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>
                    AUTO-SAVE ENABLED
                  </span>
                </div>
                <textarea
                  value={formData.identificationMarks}
                  onChange={(e) => handleInputChange('identificationMarks', e.target.value)}
                  placeholder="Describe distinct physical characteristics, clothing, or behavioral patterns observed during encounter..."
                  rows={6}
                  className="w-full rounded px-4 py-2 text-sm outline-none transition-all resize-none"
                  style={{
                    backgroundColor: '#0B1020',
                    borderColor: '#24324A',
                    color: '#E5E7EB',
                    border: '1px solid #24324A',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                  onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                />
              </div>

              {/* Biometric Status */}
              <div
                className="p-3 rounded flex items-center gap-3 border"
                style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
                <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                  Biometric capture device:{' '}
                  <span style={{ color: '#22C55E' }}>CONNECTED // READY</span>
                </span>
              </div>
            </>
            </div>
          )}

          {currentStep === 2 && (
            <EnrollmentStep2 onBack={handleBack} onSave={handleSaveStep2} />
          )}

          {currentStep === 3 && (
            <EnrollmentStep3 personData={formData} onBack={handleBack} onComplete={handleCompleteEnrollment} />
          )}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t flex justify-between items-center"
          style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
        >
          {currentStep === 1 && (
            <>
              <button
                onClick={handleClose}
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: '#94A3B8' }}
              >
                <X size={16} />
                Cancel
              </button>

              <div className="flex items-center gap-4">
                {/* Step indicator */}
                <div className="flex gap-1">
                  <div className="w-2 h-1" style={{ backgroundColor: '#3B82F6' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                </div>

                {/* Next Step Button */}
                <button
                  onClick={handleNextStep}
                  disabled={!formData.fullLegalName.trim()}
                  className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded flex items-center gap-2 transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: formData.fullLegalName.trim() ? '#3B82F6' : '#424754',
                    color: '#FFF',
                  }}
                >
                  Next Step
                  <span>→</span>
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <button
                onClick={handleBack}
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: '#94A3B8' }}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleClose}
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                  style={{ color: '#94A3B8' }}
                >
                  Cancel Enrollment
                </button>

                {/* Step indicator */}
                <div className="flex gap-1">
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#3B82F6' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleSaveStep2(null)}
                  className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: '#3B82F6',
                    color: '#FFF',
                  }}
                >
                  Next
                  <span>→</span>
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <button
                onClick={handleBack}
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: '#94A3B8' }}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleClose}
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                  style={{ color: '#94A3B8' }}
                >
                  Abort Enrollment
                </button>

                {/* Step indicator */}
                <div className="flex gap-1">
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#24324A' }} />
                  <div className="w-2 h-1" style={{ backgroundColor: '#3B82F6' }} />
                </div>

                {/* Complete Button */}
                <button
                  onClick={handleCompleteEnrollment}
                  className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: '#3B82F6',
                    color: '#FFF',
                  }}
                >
                  Complete Enrollment
                  <span>✓</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
