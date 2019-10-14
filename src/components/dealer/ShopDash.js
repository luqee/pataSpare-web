import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

function ShopDash(props){
    let shop = props.location.state.shop
    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's <Link to={{
                        pathname: `${props.match.url}/parts`,
                        state: {shop: shop}
                    }}>inventory</Link> ,<Link to={{
                        pathname: `${props.match.url}/orders`,
                        state: {shop: shop}
                    }}>orders</Link> and <Link to={{
                        pathname: `${props.match.url}/inquiries`,
                        state: {shop: shop}
                    }}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopDash;
