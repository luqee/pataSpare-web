import {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {postInquiries} from '@/utils/api';

export const InquiryModal = ({shop, part, onHide, modalShow})=>{
    const [query, setQuery] = useState('')

    const sendInquiry = () => {
        let req = {
            shop_id: shop.id,
            query: query
        }
        if(part !== null){
            req['part_id'] = part.id
        }
        postInquiries(req)
        .then((response) => {
            if (response.status === 201) {
                onHide();
            }
        })
        .catch((error) => {
            console.log(error);
            onHide();
        
        });
    }
    
    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <Modal
            show={modalShow}
            onHide={onHide}
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