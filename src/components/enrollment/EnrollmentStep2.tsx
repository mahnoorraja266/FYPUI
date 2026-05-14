import { useState } from 'react'
import { Upload, Check, Trash2, Loader, Info } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  progress: number
  status: 'uploading' | 'validated'
  thumbnail?: string
  embeddingId?: string
}

interface EnrollmentStep2Props {
  onBack: () => void
  onSave: (files: UploadedFile[]) => void
}

export default function EnrollmentStep2({ onBack, onSave }: EnrollmentStep2Props) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'IMG_7742_RAW.jpg',
      progress: 84,
      status: 'uploading',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBxfUceOHBh89bHnVqq63wl02yk756zeFgYWf994E5cwiRvSKj2IT-PqJH5AJs9DGEA8Vm3XsBN-aA2E-R0D5PKfMVlwjWx2G-93dp983zq5aAAXrqqACJ0n2zVETXIKJj5FrgBRHhuA0X7-D7ZQLM8nwwXzWPsOVq2ap0x4NzKEine4KnS2efOIeedNu1U_bRD3DkNLN-iw9rlb-Vs04IbxHGUZwRwIuTMoMnX2mmgEOcXYthg6DDcI5tNN28zP70dl9drc_iFrfQ',
    },
    {
      id: '2',
      name: 'REF_001_A.png',
      progress: 100,
      status: 'validated',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAETchVCaEV1yy9CZjGTSDUPAAI8S0KXGLUP86_I1EAp8wvhTRfEA_60sOcwUX0Zk5DaJNzms-POowEVF_gIUbQ-lUpLeGCSztBDvbufzEBWhzS-i_xDR0TEHUb5f4b_oc2WTu2-QpHAuk10R2Lr1Z2J1OztTwM3oG1WfYz9Lio7CPEw9URDx7hdDG4OymlYcx93X35CpPLHBxBGY_PHvRT2CeZW0LDGIAcTUQEqQwzp2sjI2NcKWsJC6Ju_I1dEOqkZLvznaJn0GE',
      embeddingId: 'EMB_229_X',
    },
  ])

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleSave = () => {
    if (uploadedFiles.length > 0) {
      onSave(uploadedFiles)
    }
  }

  const totalFiles = 5
  const uploadedCount = uploadedFiles.length

  return (
    <div className="flex w-full h-full gap-0">
      {/* Left side: Upload Zone */}
      <div className="w-1/2 p-8 border-r flex flex-col" style={{ borderColor: '#24324A', backgroundColor: '#0B1020' }}>
        {/* Upload Area */}
        <div
          className="flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:border-opacity-80"
          style={{ borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.02)' }}
        >
          <Upload size={64} style={{ color: '#3B82F6', marginBottom: '16px' }} />
          <h3 className="text-lg font-bold mb-2" style={{ color: '#E5E7EB' }}>
            Select Photo
          </h3>
          <p className="text-xs text-center" style={{ color: '#94A3B8', maxWidth: '250px' }}>
            Drop operational capture or select file for neural embedding analysis.
          </p>
        </div>

        {/* Requirements Info */}
        <div
          className="p-4 rounded-lg border flex gap-3 mt-6"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }}
        >
          <Info size={20} style={{ color: '#3B82F6', flexShrink: 0, marginTop: '2px' }} />
          <div className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
            <p className="font-bold mb-1" style={{ color: '#E5E7EB' }}>
              ENSURE SUBJECT IS FACING THE SENSOR DIRECTLY WITH NEUTRAL LIGHTING.
            </p>
            <p>MINIMUM RESOLUTION: 1080x1080PX.</p>
          </div>
        </div>
      </div>

      {/* Right side: Transmission Pipeline */}
      <div
        className="w-1/2 p-8 flex flex-col overflow-hidden"
        style={{ backgroundColor: '#0B1020' }}
      >
        {/* Pipeline Title */}
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: '#E5E7EB' }}>
          Transmission Pipeline
        </h3>

        {/* Files Container */}
        <div className="flex-1 space-y-4 overflow-y-auto mb-6 pr-2">
          {/* File 1 - Uploading */}
          <div
            className="p-4 rounded-lg border flex gap-4 items-start"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded bg-gradient-to-br from-slate-400 to-slate-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader size={20} className="animate-spin" style={{ color: '#3B82F6' }} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#E5E7EB' }}>
                IMG_7742_RAW.jpg
              </p>
              <p className="text-xs mt-1" style={{ color: '#3B82F6' }}>
                PROCESSING EMBEDDING...
              </p>
            </div>
            <div className="text-sm font-bold flex-shrink-0" style={{ color: '#3B82F6' }}>
              84%
            </div>
          </div>

          {/* File 2 - Validated */}
          <div
            className="p-4 rounded-lg border flex gap-4 items-start"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
          >
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded bg-gradient-to-br from-slate-400 to-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold truncate" style={{ color: '#E5E7EB' }}>
                  REF_001_A.png
                </p>
                <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ backgroundColor: '#10B981', color: '#000' }}>
                  VALIDATED
                </span>
              </div>
              <p className="text-xs" style={{ color: '#10B981' }}>
                ID: EMB_229_X
              </p>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 p-1">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 border-t pt-4" style={{ borderColor: '#24324A' }}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Total Transmission
            </span>
            <span className="text-xs font-bold" style={{ color: '#E5E7EB' }}>
              2 / 5 Files
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#1A253B' }}>
            <div className="h-full rounded-full transition-all" style={{ width: '40%', backgroundColor: '#3B82F6' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
