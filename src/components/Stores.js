import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Stores(props){
    return (
        <Container className='partnerstore'>
            <Row>
                <Col>
                <h3>Stores Selling Auto parts</h3>
                <p>Auto Parts Sellers Thriving on pitstop autoclinic</p>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <p>Some partner stores..</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Stores;
