import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Dash(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to the dealers' dashboard. Here you can create and manage shops, view a shop's orders and inquiries.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;