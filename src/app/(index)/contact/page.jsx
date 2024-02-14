'use client'
import {ContactForm} from '@/forms/ContactForm';
import { Container, Row, Col } from 'react-bootstrap';

const ContactPage = ()=>{
    return (
        <Container className="contact" >
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

export default ContactPage