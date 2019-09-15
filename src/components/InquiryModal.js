import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

function InquiryModal(props){
    const [query, handleQuery] = useState('');
    const sendInquiry = () => {
        console.log('sending query');
        console.log(query);
        props.onHide();
    }
    const handleChange = (event) => {
        handleQuery(event.target.value)
    }
    return (
        <Modal 
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Inquire</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Control as="textarea" rows="5" placeholder="Your query.." onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={sendInquiry}>
                Send
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InquiryModal;