import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AppRouter} from './AppRouter'
import ReactBootstrapModalRenderer from "@/modules/react-bootstrap-modal/ReactBootstrapModalRenderer";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter/>
            <ReactBootstrapModalRenderer/>
    </StrictMode>
);
