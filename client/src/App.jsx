import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from "./layouts/Layout";
import Frame from "./layouts/Frame";
import Panel from "./layouts/Panel.jsx";
import { AdministratorRoutes } from "./router/AdministratorRoutes.jsx";
import { UserRoutes } from "./router/UserRoutes.jsx";
import { CustomerRoutes } from "./router/CustomerRoutes.jsx";
import { ShareRoutes } from "./router/ShareRoutes.jsx";
import { Loading } from "./pages/overview/Loading.jsx";
import Protected from "./utils/Protected.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import { AuthenticationRoutes } from "./router/AuthenticationRoutes.jsx";
import { ErrorPage } from "./pages/misc/ErrorPage.jsx";

const App = () => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const authentication = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);

        if (!token) {
            setAuth({ isAuthenticated: false, role: null });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:5172/authentication/check', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAuth({
                isAuthenticated: true,
                role: response.data.role,
            });
        } catch (error) {
            setAuth({ isAuthenticated: false, role: null });
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        authentication(); // Gọi hàm authentication một lần khi App mount
    }, []);

    if (loading) return <Loading />; // Hiển thị loading nếu đang tải

    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <Frame role={auth.role}>
                        <ShareRoutes />
                    </Frame>
                }
            />

            <Route path="/auth/*" element={<AuthenticationRoutes />} />

            <Route
                path="/user/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 0} redirectTo="/auth/error">
                        <Panel>
                            <UserRoutes />
                        </Panel>
                    </Protected>
                }
            />

            <Route
                path="/pay/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 0} redirectTo="/auth/error">
                        <Frame role={auth.role}>
                            <CustomerRoutes />
                        </Frame>
                    </Protected>
                }
            />

            <Route
                path="/admin/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 1} redirectTo="/auth/error">
                        <Layout>
                            <AdministratorRoutes />
                        </Layout>
                    </Protected>
                }
            />

            <Route
                path="/auth/login"
                element={<Login checker={authentication} />} // Truyền hàm authentication dưới dạng callback
            />
            <Route
                path="/auth/register"
                element={<Register checker={authentication} />} // Truyền hàm authentication dưới dạng callback
            />

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default App;
