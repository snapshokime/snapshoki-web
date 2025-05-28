import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

declare global {
    interface Window {
        gapi?: any;
        google?: any;
    }
}

export function useGooglePicker() {
    const accessToken = useAuthStore((s) => s.accessToken);
    const [pickerReady, setPickerReady] = useState(false);

    useEffect(() => {
        const loadPicker = () => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.async = true;
            script.onload = () => {
                window.gapi.load('picker', { callback: () => setPickerReady(true) });
            };
            document.head.appendChild(script);
        };

        if (!window.gapi?.picker) {
            loadPicker();
        } else {
            setPickerReady(true);
        }
    }, []);

    const openPicker = () => {
        if (!pickerReady || !accessToken) return;

        const view = new window.google.picker.DocsView(window.google.picker.ViewId.PHOTOS)
            .setIncludeFolders(true)
            .setSelectFolderEnabled(false)
            .setMimeTypes('image/jpeg,image/png');

        const picker = new window.google.picker.PickerBuilder()
            .enableFeature(window.google.picker.Feature.SUPPORT_DRIVES)
            .setAppId(CLIENT_ID)
            .setOAuthToken(accessToken)
            .setDeveloperKey(API_KEY)
            .addView(view)
            .setCallback((data: any) => {
                if (data.action === window.google.picker.Action.PICKED) {
                    const selected = data.docs.map((doc: any) => ({
                        name: doc.name,
                        url: doc.url,
                        thumbnail: doc.thumbnails?.[0]?.url,
                        id: doc.id,
                    }));
                    console.log('Selected photos:', selected);
                }
            })
            .build();

        picker.setVisible(true);
    };

    return {
        pickerReady,
        openPicker,
    };
}
