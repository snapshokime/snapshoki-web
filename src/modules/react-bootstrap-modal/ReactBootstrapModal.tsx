import type {FC} from "react";
import type {ReactBootstrapModalProps} from "./types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ReactBootstrapModal: FC<ReactBootstrapModalProps> = ({isOpen, onHide, title, body, buttons}) => {
    return (
        <Modal show={isOpen} onHide={onHide}>
            {!!title && (
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
            )}
            {!!body && (
                <Modal.Body>
                    {body}
                </Modal.Body>
            )}

            {buttons.length > 0 && (
                <Modal.Footer>
                    {buttons.map((button, index) => (
                        <Button key={index} {...button} />
                    ))}
                </Modal.Footer>
            )}
        </Modal>
    )
};

export default ReactBootstrapModal;