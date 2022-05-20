import React, {useState, useContext} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import { postInquiry } from '../api/api';
import { UserContext } from '../App';

function InquiryModal(props){
    const [query, handleQuery] = useState('');
    const shop = props.shop;
    const userContext = useContext(UserContext)
    const sendInquiry = () => {
        let req = {
            shop_id: shop.id,
            query: query
        }
        if(props.part !== null){
            req['part_id'] = props.part.id
        }
        postInquiry(userContext.token, req, (data) => {
            if (data.status === 201) {
                props.onHide();
            }
        })
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