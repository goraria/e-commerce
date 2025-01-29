// import React from 'react';
// import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Provider } from './context/Context.jsx';
import './index.css'
import App from './App.tsx'

const CLIENT_ID = "293479668173-jnahitc17msp2gal1f7abdoia4agkogo.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
    // <Provider> {/* Đảm bảo Provider bọc toàn bộ ứng dụng */}
    <BrowserRouter>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <StrictMode>
                <App />
            </StrictMode>
        </GoogleOAuthProvider>
    </BrowserRouter>
    // </Provider>,
);

// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         <App />
//     </StrictMode>,
// )
