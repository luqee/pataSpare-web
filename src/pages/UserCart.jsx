import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import CartItem from '../components/CartItem';
import { CartContext, UserContext } from '../App';
import { useContext, useState } from 'react';
import { removeFromCart, updateCart } from '../api/cart';

function UserCart() {
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)
    const location = useLocation()
    const [cart, setCart] = useState(cartContext.cart)
    const deleteFromCart = (part_id) => {
        removeFromCart(part_id, cart, (cart) =>{
            if(cart){
                setCart(cart)
                cartContext.updateCart(cart)
            }
        });
    }
    const updateCartItem = (part_id, quantity) => {
        let item = {
            part_id: part_id,
            quantity: quantity
        }
        updateCart(item, cart, (cart) =>{
            if(cart){
                setCart(cart)
                cartContext.updateCart(cart)
            }
        });
    }
    const navigate = useNavigate()
    const placeOrder = () => {
        navigate(`/customer/orders/create`, {state: {cart: cart}})
    }
    const getTotal = () => {
        let total = 0
        if(Object.keys(cart).length > 0 && cart.items){
            if(cart.items.length > 0){
                let totalItems = cart.items.map((item) => {
                    return parseInt(item.quantity) * parseInt(item.part.price)
                })
                total =  totalItems.reduce((prev, next) => {
                    return prev + next
                })
            }
        }
        return total
    }
    return (
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
            (cart.items !== undefined && cart.items.length > 0) ? (
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
                        cart.items.map((item) => {
                            return (
                                <CartItem key={item.id} item={item} updateCart={updateCartItem} removeFromCart={deleteFromCart} />
                            )
                        })
                    }
                    <tr>
                        <td colSpan={4}>Grand Total</td>
                        <td>{getTotal()}</td>
                    </tr>
                    </tbody>
                </Table>
                <Row>
                    {
                        Object.keys(userContext.user).length > 0 ? <Button onClick={()=> placeOrder()}>Place Order</Button>
                        :<Link to={{
                            pathname: `/auth/login`,
                            state: {from: location.pathname}
                        }}>
                            Login to place an order
                        </Link>
                    }
                    
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

export default UserCart;
