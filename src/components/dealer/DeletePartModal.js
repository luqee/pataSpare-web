import React from 'react';
import {Modal, Button} from 'react-bootstrap'

function DeletePartModal(props){
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
            <h4>Deleting Part</h4>
            <p>
                Are you sure you want to delete this item? <br /> 
                Part Name: ({props.part.title})
            </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button onClick={props.onConfirm}>Proceed</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeletePartModal;