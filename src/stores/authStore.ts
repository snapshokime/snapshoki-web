import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserProfile {
    name: string;
    email: string;
    picture?: string;
}

interface AuthState {
    accessToken: string | null;
    profile: UserProfile | null;
    setAccessToken: (token: string | null) => void;
    setProfile: (profile: UserProfile | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            profile: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            setProfile: (profile) => set({ profile }),
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
