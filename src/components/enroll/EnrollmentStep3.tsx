'use client'

import { Check, ArrowLeft } from 'lucide-react'

interface EnrollmentStep3Props {
  personData?: {
    fullLegalName: string
    ageOrDOB: string
    identificationMarks: string
  }
  onBack: () => void
  onComplete: () => void
}

export default function EnrollmentStep3({ personData, onBack, onComplete }: EnrollmentStep3Props) {
  return (
    <div className="flex w-full h-full gap-0">
      {/* Left side: Identity Overview */}
      <div className="w-1/2 p-8 border-r flex flex-col justify-between" style={{ borderColor: '#24324A', backgroundColor: '#0B1020' }}>
        <div className="space-y-8">
          {/* Section Title */}
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#3B82F6' }}>
            Identity Overview
          </h3>

          {/* Full Legal Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Full Legal Name
            </label>
            <p className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
              {personData?.fullLegalName || 'DR. ELIAS VANCE'}
            </p>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Age
            </label>
            <p className="text-3xl font-bold" style={{ color: '#E5E7EB' }}>
              {personData?.ageOrDOB || '34'}
            </p>
          </div>

          {/* Subject Description */}
          <div className="space-y-2 flex-1">
            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Subject Description
            </label>
            <div
              className="p-4 rounded-lg border text-sm leading-relaxed overflow-y-auto max-h-[200px]"
              style={{
                backgroundColor: '#0B1020',
                borderColor: '#24324A',
                color: '#94A3B8',
              }}
            >
              {personData?.identificationMarks || 'Dr. Elias Vance is the primary overseer for the current sector development. High cognitive profile with significant experience in neural network architecture. No behavioral anomalies reported. Verification matches multiple historical data points within the Global Registry.'}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Captured Image */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center" style={{ backgroundColor: '#0B1020' }}>
        <div
          className="w-full h-96 rounded-lg border-2 flex items-center justify-center overflow-hidden mb-4"
          style={{ borderColor: '#24324A', backgroundColor: '#121A2B' }}
        >
          <div
            className="w-full h-full flex items-center justify-center text-center"
            style={{ backgroundColor: '#1A253B' }}
          >
            {/* Placeholder for captured image */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-48 h-56 rounded bg-gradient-to-br from-slate-400 to-slate-600" />
            </div>
          </div>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: '#94A3B8' }}>
          Capture: 1080x1350
        </p>
      </div>
    </div>
  )
}
