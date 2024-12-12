import React, {Component, useState} from "react";
import {Container, Button, Form, Row, Col, Image, Card, InputGroup} from "react-bootstrap";
import jp from "../../assets/images/jp.jpeg";
import AddressForm from "../modal/form/AddressForm.jsx";

const AddressItem = ({ item, onReload }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    // const { item } = props;

    const handleCardClick = (address) => {
        setSelectedAddress(address);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedAddress(null);
    };

    return (
        <>
            <div className="container p-0">
                <div className="d-flex text-center align-items-center justify-content-center px-2 mx-2 my-3">
                    <h5 className="m-0 ps-2 me-auto">Address</h5>
                    <Button variant="warning" onClick={() => handleCardClick(item)}>
                        <i className='bx bxs-edit me-2'></i>
                        <span>Edit Address</span>
                    </Button>
                </div>
                <hr/>
                <div className="m-3">
                    {/*<h6 style={{margin: 8}}>{item.idaddress}</h6>*/}
                    {
                        [item.tower, item.street, item.district, item.city, item.state, item.country].map((element, index) => (
                            <h6 key={index} className="m-2">
                                {element ? element : 'N/A'}
                            </h6>
                        ))
                    }
                </div>
            </div>
            <AddressForm
                show={modalShow}
                // onHide={() => setModalShow(false)}
                onHide={handleModalClose}
                onReload={onReload}
                address={selectedAddress}
            />
        </>
    );
}

// class AddressItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     render() {
//
//     }
// }

export default AddressItem;
