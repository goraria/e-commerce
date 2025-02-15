import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from './context/Context.jsx'; // Import Provider từ Context

// const CLIENT_ID = import.meta.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID; // Có thể thay bằng process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID nếu dùng dotenv
const CLIENT_ID = "579906761509-v41sv4gqqdv12nbju6k95cpr8e7sm3b2.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    // {/*</StrictMode>*/}
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
//
// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <App />
//     </StrictMode>,
// )
