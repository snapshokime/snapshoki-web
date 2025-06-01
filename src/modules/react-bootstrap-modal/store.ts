import {create, type StateCreator} from 'zustand'
import type {ReactBootstrapModalProps} from "./types";

type State = Omit<ReactBootstrapModalProps, 'onHide'>

interface Actions {
    show: () => void
    hide: () => void
    toggle: () => void
    build: (props: Partial<ReactBootstrapModalProps>) => void
    update: (props: Partial<ReactBootstrapModalProps>) => void
}

const initialState: State = {
    isOpen: false,
    title: undefined,
    body: undefined,
    buttons: [],
}

type Store = State & Actions

const stateCreator: StateCreator<Store> = (set, get) => ({
    ...initialState,
    show: () => set({isOpen: true}),
    hide: () => set({isOpen: false}),
    toggle: () => set({isOpen: !get().isOpen}),
    build: (props: Partial<ReactBootstrapModalProps>) => set(() => ({
        ...initialState,
        ...props,
    })),
    update: (props: Partial<ReactBootstrapModalProps>) => set((state) => ({
        ...state,
        ...props,
    })),
})

export type ReactModalStore = Store
export const useReactModalStore = create<Store>()(stateCreator)
