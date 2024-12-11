import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from "./layouts/Layout";
import Frame from "./layouts/Frame";
import { AdministratorRoutes } from "./router/AdministratorRoutes.jsx";
import { UserRoutes } from "./router/UserRoutes.jsx";
import { CustomerRoutes } from "./router/CustomerRoutes.jsx";
import { ShareRoutes } from "./router/ShareRoutes.jsx";
import Protected from "./utils/Protected.jsx";
import NotFound from "./pages/overview/NotFound.jsx";
import Loading from "./pages/overview/Loading.jsx";
import Login from "./pages/authentication/Login.jsx";
import Panel from "./layouts/Panel.jsx";

const App = () => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const authenticationCheck = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);

        if (!token) {
            setAuth({
                isAuthenticated: false,
                role: null
            });
            setLoading(false);
            // navigate('/login');
            return;
            // return auth;
        }

        try {
            const response = await axios.get('http://localhost:5172/authentication/check', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAuth({
                isAuthenticated: true,
                role: response.data.role
            });

            // if (rolex === 1) {
            //     navigate("/admin");
            // } else if (rolex === 0) {
            //     navigate("/user/profile");
            // }
            return auth
        } catch (error) {
            setAuth({
                isAuthenticated: false,
                role: null
            });
            // localStorage.removeItem('token');
            // navigate('/404');
            return auth;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        authenticationCheck();
    }, []); // navigate

    if (loading) return <Frame><Loading/></Frame>;

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

            <Route
                path="/user/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 0} redirectTo="/404">
                        <Panel role={auth.role}>
                            <UserRoutes />
                        </Panel>
                    </Protected>
                }
            />

            <Route
                path="/pay/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 0} redirectTo="/404">
                        <Frame role={auth.role}>
                            <CustomerRoutes />
                        </Frame>
                    </Protected>
                }
            />

            <Route
                path="/admin/*"
                element={
                    <Protected isAllowed={auth.isAuthenticated && auth.role === 1} redirectTo="/404">
                        <Layout role={auth.role}>
                            <AdministratorRoutes />
                        </Layout>
                    </Protected>
                }
            />

            {/*<Route path="/login" element={<Frame role={auth.role}><Login authenticationCheck={authenticationCheck} /></Frame>} />*/}

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
