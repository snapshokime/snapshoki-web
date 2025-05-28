import {useEffect, useState} from 'react';
import {useAuthStore} from "@/stores/authStore";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

declare global {
    interface Window {
        google?: any;
    }
}

export function useGoogleAuth() {
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const accessToken = useAuthStore((s) => s.accessToken);
    const setProfile = useAuthStore((s) => s.setProfile);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadGis = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => setIsReady(true);
            document.head.appendChild(script);
        };

        if (!window.google) {
            loadGis();
        } else {
            setIsReady(true);
        }
    }, []);

    const login = () => {
        if (!window.google || !isReady) return;

        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: [
                //auth
                'https://www.googleapis.com/auth/userinfo.profile',
                'openid',
                'email',
                //photos
                'https://www.googleapis.com/auth/photoslibrary.appendonly',
                'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
                'https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata',
            ].join(' '),
            callback: async (response: any) => {
                if (response?.access_token) {
                    setAccessToken(response.access_token);
                    try {
                        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        });
                        const profile = await res.json();
                        setProfile({
                            name: profile.name,
                            email: profile.email,
                            picture: profile.picture,
                        });
                    } catch (e) {
                        console.error('Failed to fetch user profile', e);
                    }
                }
            },
        });


        client.requestAccessToken();
    };

    const logout = () => {
        setAccessToken(null);
    };

    return {
        login,
        logout,
        isReady,
        accessToken,
        isAuthenticated: !!accessToken,
    };
}
