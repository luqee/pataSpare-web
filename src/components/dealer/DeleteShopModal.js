import React from 'react';
import {Modal, Button} from 'react-bootstrap'

function DeleteShopModal(props){
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Confirm deletion
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
                Are you sure you want to delete this shop?
                It will be deleted along with ({props.shop.parts.length}) parts.
            </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button onClick={props.onConfirm}>Proceed</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteShopModal;