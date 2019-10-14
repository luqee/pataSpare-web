import React from 'react';
import {Redirect} from 'react-router-dom';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import CartService from '../api/cart';
import CartItem from '../components/CartItem';

const cartService = new CartService();

class UserCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cart: {},
            order: {},
            order_placed: false
        }
    }
    componentDidMount = () => {
        let cart = cartService.getCart();
        this.setState({cart: cart});
    }
    removeFromCart = (part_id) => {
        cartService.removeFromCart(part_id, (cart) =>{
            if(cart){
                this.setState({cart: cart})
            }
        });
    }
    updateCart = (part_id, quantity) => {
        let item = {
            part_id: part_id,
            quantity: quantity
        }
        cartService.addToCart(item, (cart) =>{
            if(cart){
                this.setState({cart: cart})
            }
        });
    }
    placeOrder = () => {
        cartService.placeOrder((order) => {
            if(order){
                this.setState({order: order})
                this.setState({order_placed: true})
            }
        });
    }
    render = () => {
        let cart = this.state.cart
        if (this.state.order_placed){
            return <Redirect to={{
                pathname: `/customer/orders/${this.state.order.id}`,
                state: {order: this.state.order}
            }} />
        }else{
            return  (cart.items === undefined) ? <p>NO ITEMS IN CART</p> :(
                <Container className='items' id='items'>
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
                    (cart.items.length > 0) ? (
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
                                cart.items.map((item, index) => {
                                    return (
                                        <CartItem key={index} item={item} removeFromCart={this.removeFromCart} />
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                        <Row>
                            <Button onClick={this.placeOrder}>Place Order</Button>
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
}

export default UserCart;
