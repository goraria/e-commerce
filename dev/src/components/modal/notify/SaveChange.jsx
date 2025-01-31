import {useState} from "react";
import {Button, Modal} from "react-bootstrap";

const SaveChange = (
    { show, onHide, onSave, title="Save Changes", text="Are you sure you want to save changes?", button="Save Changes" }
) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>{button}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SaveChange