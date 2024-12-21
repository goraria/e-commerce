import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Badge, Button, Form, Pagination, Table} from "react-bootstrap";
import Calendar from "react-calendar";
import StatisticView from "../../components/modal/form/StatisticView.jsx";
import {Statistics} from "../management/Statistics.jsx";
import {OrderDetails} from "./OrderDetails.jsx";
import OrderExpand from "../../components/order-elements/OrderExpand.jsx";

export const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5172/bill/get-all');
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const listOrders = async () => {
        try {
            // setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5172/bill/list-bill', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        listOrders();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <div
                        className="card px-3 py-3 light bg-body-tertiary align-items-center bg-navbar-theme">
                        {/*<AddressList key={reloadTrigger} onReload={handleReload}/>*/}
                        <div className="container d-flex ps-2 p-0 align-items-center">
                            <h5 className="m-0">Order History</h5>
                            <Button disabled variant="light" className="ms-auto">
                                <i className='bx bx-plus text-white me-2'></i>
                                <span></span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {
                orders.map((order, index) => (
                    <div key={index} className="row">
                        <div className="col-12 col-lg-12">
                            <OrderExpand order={order}/>
                        </div>
                    </div>
                ))
            }
            <OrderDetails/>
        </>
    );
}