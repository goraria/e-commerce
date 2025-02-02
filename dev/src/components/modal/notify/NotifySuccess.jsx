import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotifySuccess = ({ title, message, show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide} // đóng Modal khi người dùng nhấn Close
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NotifySuccess;
