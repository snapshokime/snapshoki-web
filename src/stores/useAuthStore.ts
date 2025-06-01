import {create, type StateCreator} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {UserEntity} from "@/entities/UserEntity";

/**
 * Auth state — stores Google session and access token.
 */
interface State {
    user: UserEntity | null
    accessToken: string | null
}

/**
 * Actions for updating auth state.
 */
interface Actions {
    setUser: (user: UserEntity | null) => void
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
    setUser: (user) => set({user}),
    setAccessToken: (accessToken) => set({accessToken}),
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
