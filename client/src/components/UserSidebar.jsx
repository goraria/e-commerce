import React, { Component } from "react";
import { Alert, Button, Col, Container, Form, Image, InputGroup, Nav, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAt, faBullseye, faCity, faGift, faHistory, faLocationDot, faMapMarkerAlt, faMapPin,
    faPhone, faQuestionCircle, faSignOutAlt, faStar, faUser
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const sidebarLinks = [
    { id: 1, title: "Account Information", href: '/profile', icon: faUser },
    { id: 2, title: "Order History", href: '/bill', icon: faHistory },
    { id: 3, title: "Voucher Wallet", href: '/voucher', icon: faGift },
    { id: 4, title: "Address", href: '/address', icon: faMapPin },
    { id: 5, title: "Rating", href: '/rating', icon: faStar },
    // { id: 6, title: "Faq", href: 'faq', icon: faQuestionCircle },
    // { id: 7, title: "Log out", href: '', icon: faSignOutAlt },
]

class AccountSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { directory } = this.props
        return (
            <Button href={directory.href} className="d-flex align-items-center btn btn-light" style={{ color: '#dc3545' }}>
                <FontAwesomeIcon icon={directory.icon} className="me-2" style={{ width: 28 }} />{directory.title}
            </Button>
        )
    }
}

const UserSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');  // Assuming you store JWT in localStorage
            if (!token) throw new Error('No token found');

            const response = await axios.post('http://localhost:5172/authentication/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Handle successful logout (e.g., clear token, redirect to login, etc.)
                localStorage.removeItem('token');
                console.log('Logout successful');
            }

            navigate('/login')
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <div>
            <Nav defaultActiveKey="/account" className="flex-column">
                {
                    sidebarLinks.map((sidebarLink, index) => (
                        <AccountSidebar key={index} directory={sidebarLink} />
                    ))
                }

                <Button className="d-flex align-items-center btn btn-light" style={{ color: '#dc3545' }} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" style={{ width: 28 }} />Log out
                </Button>
            </Nav>
        </div>
    )
}

// class UserSidebar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//
//     render() {
            {/*<Nav.Link href="/account" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faUser} className="me-2" />*/}
            {/*    Thông tin tài khoản*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/orders" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faHistory} className="me-2" />*/}
            {/*    Lịch sử đơn hàng*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/voucher" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faGift} className="me-2" />*/}
            {/*    Ví voucher*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/address" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />*/}
            {/*    Số địa chỉ*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/reviews" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faStar} className="me-2" />*/}
            {/*    Đánh giá & nhận xét*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/faq" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />*/}
            {/*    Câu hỏi thường gặp*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link href="/logout" className="d-flex align-items-center">*/}
            {/*    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />*/}
            {/*    Đăng xuất*/}
            {/*</Nav.Link>*/}
            {/*<SidebarAccount directory={sidebarLink} />*/}
//     }
// }

export default UserSidebar;