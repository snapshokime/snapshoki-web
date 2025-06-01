import { useEffect } from 'react'
import { useThemeStore } from '@/stores/useThemeStore'

export default function ThemeInit() {
    const darkMode = useThemeStore((s) => s.darkMode)

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    return null
}
