import { useState, useEffect } from 'react'

const listeners = new Set<() => void>()

export function useRouter() {
  return {
    push(path: string) {
      window.location.hash = path
      listeners.forEach((listener) => listener())
    },
    back() {
      window.history.back()
    },
    forward() {
      window.history.forward()
    },
    refresh() {
      window.location.reload()
    }
  }
}

export function usePathname() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || '/')
  
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.slice(1) || '/')
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    const customListener = () => {
      handleHashChange()
    }
    listeners.add(customListener)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      listeners.delete(customListener)
    }
  }, [])
  
  return hash
}
