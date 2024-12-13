import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {configDotenv} from "dotenv";
import {GoogleOAuthProvider} from "@react-oauth/google";

const CLIENT_ID = "293479668173-jnahitc17msp2gal1f7abdoia4agkogo.apps.googleusercontent.com" // process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>,
)
