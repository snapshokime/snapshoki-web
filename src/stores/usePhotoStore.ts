import { create, type StateCreator } from 'zustand'

/**
 * State for the selected photo and its tagging.
 */
interface State {
    selectedPhoto: {
        id: string
        url: string
        metadata?: Record<string, unknown>
    } | null
    description: string
    tags: string[]
}

/**
 * Actions for managing photo selection and tagging.
 */
interface Actions {
    setSelectedPhoto: (photo: State['selectedPhoto']) => void
    clearSelectedPhoto: () => void
    setDescription: (desc: string) => void
    setTags: (tags: string[]) => void
    resetTagging: () => void
}

const initialState: State = {
    selectedPhoto: null,
    description: '',
    tags: [],
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set) => ({
    ...initialState,
    setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
    clearSelectedPhoto: () => set({ selectedPhoto: null }),
    setDescription: (description) => set({ description }),
    setTags: (tags) => set({ tags }),
    resetTagging: () => set({ description: '', tags: [] }),
})

export type PhotoStore = Store
export const usePhotoStore = create<Store>()(stateCreator)
