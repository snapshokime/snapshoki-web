import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Represents a signed-in Google user.
 */
export type AuthUser = {
    id: string
    email: string
    name?: string
    picture?: string
}

/**
 * Auth state — stores Google session and access token.
 */
interface State {
    user: AuthUser | null
    accessToken: string | null
}

/**
 * Actions for updating auth state.
 */
interface Actions {
    setUser: (user: AuthUser | null) => void
    setAccessToken: (token: string | null) => void
    clearAuth: () => void
}

const initialState: State = {
    user: null,
    accessToken: null,
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set) => ({
    ...initialState,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
    clearAuth: () => set(initialState),
})

const persistedStore = persist(stateCreator, {
    name: 'auth-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
    }),
})

export type AuthStore = Store
export const useAuthStore = create<Store>()(persistedStore)
