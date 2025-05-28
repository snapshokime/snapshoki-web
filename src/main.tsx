import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';

import AppContainer from '@/components/AppContainer';
import NotFound from '@/routes/NotFound';
import HomePage from '@/routes/HomePage';
import PickerPage from '@/routes/PickerPage';
import SelectedPhotos from '@/routes/SelectedPhotos';
import AuthCallback from '@/routes/AuthCallback';
import SettingsPage from '@/routes/SettingsPage';
import AlbumDetailPage from "@/routes/AlbumDetailPage";
import MediaDetailPage from "@/routes/MediaDetailPage";
import AlbumsPage from "@/routes/AlbumsPage";
import MediaListTestPage from "@/routes/MediaListTestPage";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppContainer />}>
                    <Route index element={<HomePage />} />
                    <Route path="test-media-list" element={<MediaListTestPage />} />
                    <Route path="picker" element={<PickerPage />} />
                    <Route path="selected" element={<SelectedPhotos />} />
                    <Route path="auth/callback" element={<AuthCallback />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="albums" element={<AlbumsPage />} />
                    <Route path="albums/:id" element={<AlbumDetailPage />} />
                    <Route path="media/:id" element={<MediaDetailPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
