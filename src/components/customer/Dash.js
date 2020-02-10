import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Dash(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to your dashboard. Here you can view your <Link to={`${props.match.url}/orders`}>orders</Link>, <Link to={`${props.match.url}/inquiries`}>inquiries</Link> and <Link to={`${props.match.url}/account`}>account</Link> information.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;