import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * UI-related persistent state.
 */
interface State {
    darkMode: boolean
    showOnlyUntagged: boolean
    hasReachedLimit: boolean
}

/**
 * Actions for updating UI state.
 */
interface Actions {
    setDarkMode: (value: boolean) => void
    toggleDarkMode: () => void
    toggleShowOnlyUntagged: () => void
    setLimitReached: (state: boolean) => void
}

const initialState: State = {
    darkMode: false,
    showOnlyUntagged: false,
    hasReachedLimit: false,
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set, get) => ({
    ...initialState,
    setDarkMode: (value) => set({ darkMode: value }),
    toggleDarkMode: () => set({ darkMode: !get().darkMode }),
    toggleShowOnlyUntagged: () =>
        set((state) => ({ showOnlyUntagged: !state.showOnlyUntagged })),
    setLimitReached: (hasReachedLimit) => set({ hasReachedLimit }),
})

const persistedStore = persist(stateCreator, {
    name: 'ui-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        darkMode: state.darkMode,
        showOnlyUntagged: state.showOnlyUntagged,
    }),
})

export type UIStore = Store
export const useUIStore = create<Store>()(persistedStore)
