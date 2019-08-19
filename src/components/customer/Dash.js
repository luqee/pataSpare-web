import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Dash(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to your dashboard. Here you can view your orders, inquiries and account information</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;