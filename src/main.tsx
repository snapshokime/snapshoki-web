import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AppRouter} from './AppRouter'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter/>
    </StrictMode>
);
