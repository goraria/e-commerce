import React, {useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyright from './Copyright.jsx';
import Transitionbar from "./Transitionbar.jsx";
import Outbar from "./Outbar.jsx";
import Overside from "./Overside.jsx";
import Navbar from "./Navbar.jsx";
import Activitybar from "./Activitybar.jsx";
import getGreetingMessage from "../utils/greetingHandler.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Frame = ({ children, role }) => {
    useEffect(() => {
        Main();

        authentication();
    }, [])


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
            const decoded = jwtDecode(token);

            const currentTime = Date.now() / 1000; // thời gian hiện tại (tính bằng giây)
            if (decoded.exp < currentTime) {
                throw new Error('Token expired');
            }

            setAuth({
                isAuthenticated: true,
                role: decoded.role,
            });
        } catch (error) {
            setAuth({ isAuthenticated: false, role: null });
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const renderComponentByRole = (r) => {
        if (r === 1) {
            return (
                <Navbar>
                    <Overside/>
                </Navbar>
            );
        } else if (r === 0) {
            return (
                <Activitybar>
                    <Overside/>
                </Activitybar>
            );
        } else {
            return (
                <Outbar>
                    <Overside/>
                </Outbar>
            );
        }
    }

    return (
        <>
            <div className="mb-4">
                {renderComponentByRole(auth.role)}
            </div>
            <div>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default Frame