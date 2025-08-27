// Utility functions for the app

// Note: crypto-js not available, using placeholder implementation

// Query URL parameter
export function queryUrl(name: string): string {
  if (typeof window === 'undefined')
    return ''

  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  return r != null ? decodeURIComponent(r[2] || '') : ''
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined')
    return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// AES encryption (placeholder implementation)
export function aesEncode(data: string): string {
  // Placeholder implementation - in production, implement actual AES encryption
  if (typeof window !== 'undefined') {
    return btoa(data)
  }
  return btoa(data)
}

// AES decryption (placeholder implementation)
export function aesDecode(data: string): string {
  // Placeholder implementation - in production, implement actual AES decryption
  try {
    if (typeof window !== 'undefined') {
      return atob(data)
    }
    return atob(data)
  }
  catch {
    return data
  }
}
