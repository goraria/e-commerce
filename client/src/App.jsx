import React, { useState, useEffect, Component } from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import { } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
// import logo from './logo.svg';
import './App.css';
import axios from "axios";

// import Protected from "./utils/Protected";

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProducts from "./elements/ListProducts.jsx";
import Cart from "./pages/Cart.jsx";
import Bill from "./pages/Bill.jsx";
import Product from "./pages/Product.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AddressManagement from "./components/AddressManagement.jsx";

import Administrator from "./managements/Administrator.jsx";
import Statistic from "./managements/Statistic.jsx";
import Setting from "./managements/Setting.jsx";
// import Dashboard from "./managements/Dashboard.jsx";
import Icons from "./managements/Icons.jsx";
import Map from "./managements/Map.jsx";
// import Notifications from "./managements/Notifications.jsx";
import TableList from "./managements/TableList.jsx";
import Typography from "./managements/Typography.jsx";
// import UserProfile from "./managements/UserProfile.jsx";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Register from "./components/Register.jsx";

import Manager from "./utils/Manager.jsx";

import NotFound from "./pages/NotFound.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/auth/check', { headers: { Authorization: token } })
                .then(response => {
                    setIsAuthenticated(true);
                    setUserRole(response.data.role);
                    console.log(response.data.role)
                })
                .catch(() => {
                    setIsAuthenticated(false);
                });
        }
    }, []);
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     fetch('/api/users')
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => console.error('Error:', error));
    // }, []);

    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/search" element={<ListProducts />} />

                        {/* <Route path="/map" element={<Map />} /> */}
                        {/* <Route path="/notifications" element={<Notifications />} /> */}
                        {/* <Route path="/tables" element={<TableList />} />
                            <Route path="/typography" element={<Typography />} />
                            <Route path="/icons" element={<Icons />} /> */}

                        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        <Route path="/statistic" element={<Statistic />} />
                        <Route path="/setting" element={<Setting />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/register" element={<Register />} />

                        {/*/!*<Route path="/bill" element={<Cart />} />*!/*/}
                        {/*<Route path="/bill" element={*/}
                        {/*    <Protected isAuthenticated={isAuthenticated}>*/}
                        {/*        <Bill />*/}
                        {/*    </Protected>*/}
                        {/*} />*/}

                        {/*/!*<Route path="/bill" element={<Cart />} />*!/*/}
                        {/*<Route path="/address" element={*/}
                        {/*    <Protected isAuthenticated={isAuthenticated}>*/}
                        {/*        <AddressManagement />*/}
                        {/*    </Protected>*/}
                        {/*} />*/}

                        {/*/!*<Route path="/cart" element={<Cart />} />*!/*/}
                        {/*<Route path="/cart" element={*/}
                        {/*    <Protected isAuthenticated={isAuthenticated}>*/}
                        {/*        <Cart />*/}
                        {/*    </Protected>*/}
                        {/*} />*/}

                        {/*/!*<Route path="/profile" element={<UserProfile />} />*!/*/}
                        {/*<Route path="/profile" element={*/}
                        {/*    <Protected isAuthenticated={isAuthenticated}>*/}
                        {/*        <UserProfile />*/}
                        {/*    </Protected>*/}
                        {/*} />*/}

                        <Route path="/admin" element={
                            <Manager isAuthenticated={isAuthenticated} userRole={userRole}>
                                <Administrator />
                            </Manager>
                        } />

                        <Route path="/404" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//
//     render() {
//         return (
//             <div>
//                 <Header />
//                 <div className="container">
//                     <Test/>
//                 </div>
//                 <FooterAdmin />
//             </div>
//         );
//     }
// }

export default App;
