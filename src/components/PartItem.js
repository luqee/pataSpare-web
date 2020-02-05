import React, {useState, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container,Row, Col, Button, Card } from 'react-bootstrap';
import urls from '../config/config';
import CartService from '../api/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../App';

const cartService = new CartService();

function PartItem(props){
    let cartContext = useContext(CartContext)
    let [part] = useState(props.part)
    let [adding, setAdding] = useState(false)
    let [inCart, setInCart] = useState(0)
    
    const addToCart = () => {
        setAdding(true)
        let item_to_add  = {
            part_id: part.id,
            quantity: parseInt(1)
        }
        cartService.addToCart(item_to_add, cartContext.cart, (cart)=> {
            if(cart){
                setAdding(false)
                cartContext.updateCart(cart)
                let count = countInCart(part.id, cart)
                console.log('setting cart');
                console.log(count, cart);
                
                setInCart(count)
            }
        });
    }
    const countInCart = (prodId, cart) => {
        let count = 0
        if(Object.keys(cart).length > 0){
            cart.items.forEach((item) => {
                if(item.part_id === parseInt(prodId)){
                    count = item.quantity
                }
            })
        }
        return count
    }
    inCart = countInCart(part.id, cartContext.cart)
    return (
        <Card style={{ 
            width: '85%',
            borderBottom: '3px solid #007bff',
        }}>
            <Link to={{
                pathname: `/parts/${part.id}`,
                state: {part: part, shop: part.shop}
            }}>
            <Card.Img variant="top" src={`${urls.hostRoot}/${part.part_image}`} width={250} height={250}/>
            </Link>
            <Card.Body>
                <Card.Title>{part.title}</Card.Title>
                <Card.Text>
                Price: {part.price}
                </Card.Text>
                <Button size={'sm'} onClick={addToCart}>
                <FontAwesomeIcon icon={faShoppingCart} /> {adding?'Adding...':'Add'}
                <br />
                {
                    (inCart === 0) ? null:
                    <span>{`(${inCart})`}</span>
                }
                </Button>
            </Card.Body>
        </Card>
    );

}

export default withRouter(PartItem);
