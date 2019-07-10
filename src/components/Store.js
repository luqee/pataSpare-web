import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';

function Store(props){
    return (
        <Container>
            <Row>
                <Col>
                <Image src={props.shop.image_url} />
                </Col>
            </Row>
        </Container>
    )
}

export default Store;