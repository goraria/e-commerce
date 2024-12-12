import React, { Component, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Image, InputGroup, Nav, Row } from "react-bootstrap";
import jp from "../../assets/images/jp.jpeg";
import AccountInfo from "../user-infomation/AccountInfo";

export const UserProfileid = () => {
    const [reloadAccountInfo, setReloadAccountInfo] = useState(0);

    // Hàm reload được truyền vào AccountInfo dưới dạng callback
    const handleReloadAccountInfo = () => {
        setReloadAccountInfo(reloadAccountInfo + 1);  // Tăng giá trị để force re-render
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-10 mb-2 order-0">
                    <div className="card">
                        <Card
                            className="sticky-summary"
                            style={{
                                position: "sticky",
                                padding: '15px 12px 15px 12px',
                                borderRadius: 10,
                                top: 80,
                                border: "none",
                                backgroundColor: '#f8f9fa', // backgroundColor: '#eaedf0' '0, 12px'
                            }}>
                            <AccountInfo key={reloadAccountInfo} onReload={handleReloadAccountInfo} />
                        </Card>
                    </div>
                </div>
            </div>

        </>
    )
}

// class UserProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//
//     render() {
//
//         return (
//
//         )
//     }
// }

// export default UserProfileid
