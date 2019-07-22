import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';

function Store(props){
    return (
        <Container>
            <Row>
                <Col lg={4}>
                <Image height={'inherit'} width={'inherit'}  src={props.shop.image_url} />
                </Col>
            </Row>
        </Container>
    )
}

export default Store;