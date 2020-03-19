import React from 'react'
import ContactForm from '../forms/ContactForm';
import { Container, Row, Col } from 'react-bootstrap';

function ContactPage (props){
    return (
        <Container className="contact" >
            <Row style={{
                    justifyContent: 'center'
                }}>
                <Col lg={6}>
                    <ContactForm history={props.history}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactPage