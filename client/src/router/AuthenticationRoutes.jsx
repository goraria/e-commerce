import { Route, Routes } from "react-router-dom";
import Login from "../pages/authentication/Login.jsx";
import Register from "../pages/authentication/Register.jsx";
import ForgotPassword from "../pages/authentication/ForgotPassword.jsx";
import ResetPassword from "../pages/authentication/ResetPassword.jsx";
import NotFound from "../pages/overview/NotFound.jsx";
import { ErrorPage } from "../pages/misc/ErrorPage.jsx";
import { MaintenancePage } from "../pages/misc/MaintenancePage.jsx";
import ChangePassword from '../pages/authentication/ChangePassword.jsx';
export const AuthenticationRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            {/*<Route path="/500" element={<ServerError />} />*/}
            <Route path="/maintenance" element={<MaintenancePage />} />
            {/*<Route path="/coming-soon" element={<ComingSoon />} />*/}
        </Routes>
    );
}