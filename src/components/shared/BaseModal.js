import React from 'react';
import { Modal } from 'react-bootstrap';

function BaseModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} >
            {props.title &&
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
            }

            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}

export default BaseModal;