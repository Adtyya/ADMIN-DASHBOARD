import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    let initialTheme = 'light'

    if (savedTheme) {
      initialTheme = savedTheme
    } else if (prefersDark) {
      initialTheme = 'dark'
    }

    setTheme(initialTheme)
    applyTheme(initialTheme)
    setIsLoading(false)
  }, [])

  const applyTheme = (newTheme) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
    isLoading,
    isDark: theme === 'dark',
  }
}
