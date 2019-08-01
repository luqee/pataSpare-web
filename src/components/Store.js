import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import urls from '../config/config';

function Store(props){
    const shop = props.shop;
    return (
        <Container>
            <Row>
                <Col>
                <Card style={{
                    width: '100%',
                    backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                    }} className="text-white">
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text>{shop.description}</Card.Text>
                <Card.Text>{shop.location}</Card.Text>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Store;