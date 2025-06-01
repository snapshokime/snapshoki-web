import { create } from 'zustand'

interface ThemeState {
    darkMode: boolean
    toggleDarkMode: () => void

    // Derived Bootstrap-compatible values
    navbarBg: string
    navbarVariant: string
    navBarTextClass: string
    navBarButtonVariant: string
    buttonVariant: string
    textClass: string
}

export const useThemeStore = create<ThemeState>((set, get) => {
    const compute = (darkMode: boolean) => ({
        navbarBg: darkMode ? 'body-tertiary' : 'primary',
        navbarVariant: 'dark',
        navBarTextClass: 'text-light',
        navBarButtonVariant: 'outline-light',
        buttonVariant: darkMode ? 'outline-light' : 'outline-dark',
        textClass: darkMode ? 'text-light' : 'text-dark',
    })

    const setTheme = (darkMode: boolean) => {
        set({ darkMode, ...compute(darkMode) })
    }

    return {
        darkMode: false,
        ...compute(false),

        toggleDarkMode: () => {
            const next = !get().darkMode
            document.documentElement.setAttribute('data-bs-theme', next ? 'dark' : 'light')
            setTheme(next)
        },
    }
})
