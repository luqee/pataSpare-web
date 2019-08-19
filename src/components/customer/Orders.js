import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Orders(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>My Orders</p>
                </Col>
            </Row>
            <Row>
                orders here
            </Row>
        </Container>
    )
}

export default Orders;