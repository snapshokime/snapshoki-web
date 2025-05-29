import { create, type StateCreator } from 'zustand'

/**
 * State for Google Photos albums and selected album filter.
 */
interface State {
    albums: { id: string; title: string }[]
    selectedAlbumId: string | null
}

/**
 * Actions to update album state.
 */
interface Actions {
    setAlbums: (albums: State['albums']) => void
    setSelectedAlbum: (albumId: string | null) => void
}

const initialState: State = {
    albums: [],
    selectedAlbumId: null,
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set) => ({
    ...initialState,
    setAlbums: (albums) => set({ albums }),
    setSelectedAlbum: (albumId) => set({ selectedAlbumId: albumId }),
})

export type AlbumStore = Store
export const useAlbumStore = create<Store>()(stateCreator)
