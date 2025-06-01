import {create, type StateCreator} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

/**
 * UI-related persistent state.
 */
interface State {
    showOnlyUntagged: boolean
    hasReachedLimit: boolean
}

/**
 * Actions for updating UI state.
 */
interface Actions {
    toggleShowOnlyUntagged: () => void
    setLimitReached: (state: boolean) => void
}

const initialState: State = {
    showOnlyUntagged: false,
    hasReachedLimit: false,
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set) => ({
    ...initialState,
    toggleShowOnlyUntagged: () =>
        set((state) => ({showOnlyUntagged: !state.showOnlyUntagged})),
    setLimitReached: (hasReachedLimit) => set({hasReachedLimit}),
})

const persistedStore = persist(stateCreator, {
    name: 'ui-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        showOnlyUntagged: state.showOnlyUntagged,
    }),
})

export type UIStore = Store
export const useUIStore = create<Store>()(persistedStore)
