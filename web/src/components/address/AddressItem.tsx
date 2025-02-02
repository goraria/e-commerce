import { useState } from "react";
import { Button } from "react-bootstrap";
import { AddressDefaultType } from "../../types/AddressDefaultType.ts";
import AddressForm from "../modal/form/AddressForm.tsx";

export default function AddressItem ({ item, onReload }: { item: AddressDefaultType, onReload: void }) {
    const [selectedAddress, setSelectedAddress] = useState({});
    const [modalShow, setModalShow] = useState(false);
    // const { item } = props;

    const handleCardClick = (address: object) => {
        setSelectedAddress(address);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedAddress({});
    };

    return (
        <>
            <div className="card-header d-flex justify-content-between p-3 pb-0">
                <h5 className="card-title m-0 p-2">{item.type}</h5>
                <Button variant="warning" onClick={() => handleCardClick(item)}>
                    <i className='bx bxs-edit me-2'></i>
                    <span>Edit Address</span>
                </Button>
            </div>
            <div className="card-body p-3 pt-0">
                <p className="mb-0 p-2 pt-0">
                    {item.tower}
                    <br/>
                    {item.street}
                    <br/>
                    {item.district}
                    <br/>
                    {item.city}
                    <br/>
                    {item.state}
                    <br/>
                    {item.country}
                </p>
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
