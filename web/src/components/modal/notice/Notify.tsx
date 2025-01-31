import { Modal, Button } from 'react-bootstrap';
import { getNoticeIcon } from "../../../utils/iconHandler.tsx";

type Notice = {
    title: string;
    message: string;
    type: string;
    show: boolean;
    onHide: () => void;
}

export default function Notify({ title, message, type, show, onHide }: Notice) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            // centered
        >
            <Modal.Header closeButton>
                <div className="card-icon me-2">
                    <div className="avatar">
                        <div className={`avatar-initial rounded bg-label-${type}`}>
                            <i className={`bx ${getNoticeIcon(type)} bx-sm`}></i>
                        </div>
                    </div>
                </div>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={type} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
