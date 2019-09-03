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
            cart_items: [],
            cart: {},
            order: {},
            order_placed: false
        }
    }
    componentDidMount = () => {
        this.getItems()
    }
    getItems = () => {
        cartService.getCartItems((cart_items, cart) => {
            if(cart_items){
                this.setState({cart_items: cart_items});
                this.setState({cart: cart});
            } 
        });
    }
    removeFromCart = (part_id) => {
        cartService.removeFromCart(this.state.cart.id, part_id, (removed) =>{
            if(removed){
                this.getItems();
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
                this.getItems();
            }
        });
    }
    placeOrder = () => {
        cartService.placeOrder((placed, order) => {
            if(placed){
                this.setState({order: order})
                this.setState({order_placed: true})
            }
        });
    }
    render = () => {
        let cart_items = this.state.cart_items
        
        return (this.state.order_placed) ?
        <Redirect to={{
            pathname: `/customer/orders/${this.state.order.id}`,
            state: {order: this.state.order}
        }} />
        :
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
                (cart_items.length > 0) ? (
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
                            cart_items.map((item, index) => {
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
        
    }
}

export default UserCart;
