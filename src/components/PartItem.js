import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Button, Card } from 'react-bootstrap';
import urls from '../config/config';
import CartService from '../api/cart';

const cartService = new CartService();

class PartItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
        }
    }
    
    addToCart = () => {
        console.log('addint to cart');
        let item_to_add  = {
            part_id: this.props.part.id,
            quantity: parseInt(this.state.quantity)
        }
        cartService.addToCart(item_to_add, (added)=> {
            console.log('added');
        });
        
    }

    render = () =>{
        const part = this.props.part;
        return (
            <Container>
                <Row>
                    <Col>
                    <Card style={{ width: '100%' }}>
                    <Link to={{
                        pathname: `/parts/${part.id}`,
                        state: {part: part}
                    }}>
                    <Card.Img variant="top" src={`${urls.hostRoot}/${part.part_image}`}/>
                    </Link>
                    <Card.Body>
                        <Card.Title>{part.title}</Card.Title>
                        <Card.Text>
                        {part.description}
                        </Card.Text>
                        <Card.Text>
                        Price: {part.price}
                        </Card.Text>
                        <Button onClick={this.addToCart}>Add to cart</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PartItem;