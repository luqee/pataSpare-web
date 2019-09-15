import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import urls from '../config/config';
import {Link} from 'react-router-dom';

function Store(props){
    const shop = props.shop;
    return (
        <Container>
            <Row>
                <Col>
                <Link to={{
                    pathname: `/stores/${shop.id}`,
                    state: {shop: shop}
                }}>
                    <Card style={{
                        width: '100%',
                        backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                        backgroundSize: 'cover',
                        }}>
                    <Card.Title>{shop.name}</Card.Title>
                    <Card.Text>{shop.description}</Card.Text>
                    <Card.Text>{shop.location}</Card.Text>
                    </Card>
                </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Store;