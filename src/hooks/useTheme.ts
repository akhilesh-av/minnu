import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('minnnu-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#14090c' : '#faf6f1')
    localStorage.setItem('minnnu-theme', theme)
  }, [theme])

  return {
    theme,
    toggle: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }
}
