import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ContactForm from '../forms/ContactForm';

function Contact(props){
    return (
        <Container className="contact" id='contact'>
            <Row>
                <Col lg={8}>
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}

export default Contact;