import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Button, Card } from 'react-bootstrap';
import urls from '../config/config';
import CartService from '../api/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const cartService = new CartService();

class PartItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
            part: props.part
        }
    }
    
    addToCart = () => {
        console.log('addint to cart');
        let item_to_add  = {
            part_id: this.props.part.id,
            quantity: parseInt(this.state.quantity)
        }
        cartService.addToCart(item_to_add, (added)=> {
            if(added){
                let path = {
                    pathname: this.props.history.location.pathname,
                    state: {
                        part: this.state.part
                    }
                }
                this.props.history.push('')
                this.props.history.push(path)
            }
        });
    }

    render = () =>{
        const part = this.state.part;
        return (
            <Container style={{
                width: '80%'
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
                        <Button onClick={this.addToCart}><FontAwesomeIcon icon={faShoppingCart} />  Add to cart</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PartItem;