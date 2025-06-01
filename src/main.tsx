import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AppRouter} from './AppRouter'
import {GoogleOAuthProvider} from '@react-oauth/google'
import ReactBootstrapModalRenderer from "@/modules/react-bootstrap-modal/ReactBootstrapModalRenderer";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <AppRouter/>
            <ReactBootstrapModalRenderer/>
        </GoogleOAuthProvider>
    </StrictMode>
);
