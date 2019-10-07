import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

function ShopDash(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's <Link to={`${props.match.url}/parts`}>inventory</Link> ,<Link to={`${props.match.url}/orders`}>orders</Link> and <Link to={`${props.match.url}/inquiries`}>inquiries</Link> .</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopDash;
