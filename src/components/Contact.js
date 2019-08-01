import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ContactForm from '../forms/ContactForm';

function Contact(props){
    return (
        <Container className="contact" id='contact' style={{
            padding: '10px 0px'
        }}>
            <Row style={{
                    justifyContent: 'center'
                }}>
                <Col lg={6}>
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}

export default Contact;