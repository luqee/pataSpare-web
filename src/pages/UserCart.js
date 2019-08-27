import React from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import CartService from '../api/cart';
import CartItem from '../components/CartItem';

const cartService = new CartService();

class UserCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cart_tems: [],
            cart: {}
        }
    }
    componentDidMount = () => {
        this.getCart();
    }
    getCart = () => {
        cartService.getCart((fetched) => {
            if(fetched){
                // cart = localStorage.getItem('cart');
                this.setState({cart: localStorage.getItem('cart')});
                // cart_items = localStorage.getItem('cart_items');
                this.setState({cart_items: localStorage.getItem('cart_items')});
            } 
        });
    }
    removeFromCart = (part_id) => {
        console.log(`removing part id ==> ${part_id}`);
        cartService.removeFromCart(this.state.cart.id, part_id, (removed) =>{
            if(removed){
                this.getCart();
            }
        });

    }
    updateCart = (part_id, quantity) => {
        let item = {
            part_id: part_id,
            quantity: quantity
        }
        cartService.addToCart(item, (updated) =>{
            if(updated){
                this.getCart();
            }
        });
    }
    render = () => {
        
        return (
            <Container className='stores' id='stores'>
                <Row style={{
                    justifyContent: 'center'
                }}>
                    <Col>
                        <h3>Cart</h3>
                    </Col>
                </Row>
                <Row>
                <Col lg={12}>
                {
                    (this.state.cart_tems.length > 0) ? (
                        <div>
                            <Table>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.cart_tems.map((item, index) => {
                                    return (
                                        <CartItem key={index} item={item} removeFromCart={this.removeFromCart} />
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                        <Row>
                            <Button>Update Cart</Button>
                        </Row>
                        </div>
                    ):(
                        <p>NO ITEMS IN CART</p>
                    )
                }
                </Col>
                </Row>
            </Container>
        )
    }
}

export default UserCart;
