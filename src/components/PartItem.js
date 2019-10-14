import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Button, Card } from 'react-bootstrap';
import urls from '../config/config';
import CartService from '../api/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const cartService = new CartService();

function PartItem(props){
    let [part, setPart] = useState(props.part)

    const addToCart = () => {
        let item_to_add  = {
            part_id: part.id,
            quantity: parseInt(1)
        }
        cartService.addToCart(item_to_add, (added)=> {
            if(added){
                console.log('enable button');

            }
        });
    }
    return (
        <Container style={{
            width: '80%',
            borderBottom: '3px solid #007bff',
        }}>
            <Row>
                <Col>
                <Card style={{ width: '100%' }}>
                <Link to={{
                    pathname: `/parts/${part.id}`,
                    state: {part: part, shop: part.shop}
                }}>
                <Card.Img variant="top" src={`${urls.hostRoot}/${part.part_image}`}/>
                </Link>
                <Card.Body>
                    <Card.Title>{part.title}</Card.Title>
                    <Card.Text>
                    Price: {part.price}
                    </Card.Text>
                    <Button onClick={addToCart}><FontAwesomeIcon icon={faShoppingCart} />  Add to cart</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default PartItem;
