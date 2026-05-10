export interface LoginCredentials {
  operatorId: string
  secureKey: string
}

export interface AuthState {
  isAuthenticated: boolean
  operatorId?: string
  error?: string
}

export interface USBAuthState {
  isDetected: boolean
  isScanning: boolean
  pin: string
  error?: string
}
