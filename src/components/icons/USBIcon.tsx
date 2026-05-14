import React from 'react'
import { Usb } from 'lucide-react'

interface USBConnectorIconProps {
  className?: string
}

export function USBConnectorIcon({ className }: USBConnectorIconProps) {
  return <Usb className={className} />
}
