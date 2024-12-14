import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from './utils/Context'; // Import Provider từ Context

const CLIENT_ID = "293479668173-jnahitc17msp2gal1f7abdoia4agkogo.apps.googleusercontent.com"; // Có thể thay bằng process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID nếu dùng dotenv

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider> {/* Đảm bảo Provider bọc toàn bộ ứng dụng */}
        <BrowserRouter>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </Provider>,
);
