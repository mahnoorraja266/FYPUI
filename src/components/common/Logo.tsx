import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
}

export default function Logo({ size = 'md', centered = false }: LogoProps) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }
  
  return (
    <div className={`flex ${centered ? 'justify-center' : ''}`}>
      <img
        src="/placeholder-logo.svg"
        alt="Sentinel AI Logo"
        className={`${sizeMap[size]} object-contain`}
        onError={(e) => {
          // Fallback if the logo is missing
          e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
        }}
      />
    </div>
  )
}
