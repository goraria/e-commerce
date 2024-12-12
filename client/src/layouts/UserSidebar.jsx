import React, {Component, useState} from "react";
import { Alert, Button, Col, Container, Form, Image, InputGroup, Nav, Row } from "react-bootstrap";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import SaveChange from "../components/modal/notify/SaveChange.jsx";

const sidebarLinks = [
    { id: 1, text: "Account Information", link: "/user/profile" },
    { id: 2, text: "Order History", link: "/user/bill" },
    { id: 3, text: "Voucher Wallet", link: "/user/voucher" },
    { id: 4, text: "Address", link: "/user/address" },
    // { id: 5, text: "Rating", icon: faStar, link: "/user/rating" },
    // { id: 6, text: "FAQ", icon: faQuestionCircle, link: "/faq" },
    // { id: 7, text: "Log out", icon: faSignOutAlt, link: '' },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MenuItem = ({ directory, item, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            as={Link}
            to={directory.link}
            className="d-flex align-items-center btn" // bg-label-primary
            style={{
                color: isActive ? '#696cff' : "#384551",
                backgroundColor: isActive ? "#e7e7ff" : isHovered ? "#f8f9fa" : "transparent",
                justifyContent: "left",
                border: "none",
                boxShadow: "none"
            }}>
            {/*<FontAwesomeIcon icon={directory.icon} className="me-2" style={{ width: 28 }} />*/}
            <span>{directory.text}</span>
        </Button>
    )
}

const UserSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5172/authentication/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');  // Xóa JWT
            setShowModal(false)
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <Nav defaultActiveKey="/account" className="flex-column">
                {
                    sidebarLinks.map((sidebarLink, index) => (
                        <MenuItem
                            key={index}
                            directory={sidebarLink}
                            isActive={location.pathname === sidebarLink.link}
                        />
                    ))
                }
                <Button
                    onClick={() => setShowModal(true)}
                    className="d-flex align-items-center btn"
                    style={{ color: '#384551', backgroundColor: '#f8f9fa', justifyContent: "left", border: "none", boxShadow: "none" }}>
                    {/*<FontAwesomeIcon icon={faSignOutAlt} className="me-2" style={{ width: 28 }} />*/}
                    <span>Log out</span>
                </Button>
            </Nav>
            <SaveChange
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={handleLogout}
                title="Log out"
                text="Do you want to log out?"
                button="Log out"
            />
        </>
    )
}

export default UserSidebar;

