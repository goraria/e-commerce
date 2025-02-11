import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/authentication/LoginPage.jsx";
import RegisterPage from "../pages/authentication/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/authentication/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/authentication/ResetPasswordPage.jsx";
import ChangePasswordPage from '../pages/authentication/ChangePasswordPage.jsx';
import NotfoundPage from "../pages/misc/NotfoundPage.jsx";
import ErrorPage from "../pages/misc/ErrorPage.jsx";
import MaintenancePage from "../pages/misc/MaintenancePage.jsx";

export const AuthenticationRoutes = () => {
    return (
        <Routes>
            {/*<Route path="/login" element={<LoginPage />} />*/}
            {/*<Route path="/register" element={<RegisterPage />} />*/}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            {/*<Route path="/500" element={<ServerError />} />*/}
            <Route path="/maintenance" element={<MaintenancePage />} />
            {/*<Route path="/coming-soon" element={<ComingSoon />} />*/}

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}