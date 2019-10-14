import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Dash(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to the dealers' dashboard. Here you can create and manage <Link to={`${props.match.url}/shops`}>shops</Link>, view <Link to={`${props.match.url}/inventory`}>inventory</Link>, <Link to={`${props.match.url}/orders`}>orders</Link> and <Link to={`${props.match.url}/inquiries`}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;