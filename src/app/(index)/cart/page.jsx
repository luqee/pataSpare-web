'use client'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {CartItem} from '@/components/CartItem';
import { useCartContext} from '@/context/CartContext'
import {useAuthContext} from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import {deleteCartItem, getCart, putCarts} from '@/utils/api'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const UserCart = ()=>{
    const {cart, updateCart} = useCartContext()
    const {user} = useAuthContext()
    const [cartFull, setCartFull] = useState(null)
    const [order, setOrder] = useState(null)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [totalSum, setTotalSum] = useState(0)

    const fetchCart = () => {
        if (cart) {
            getCart(cart.id)
            .then((response) => {
                if (response.status === 200) {
                    setCartFull(response.data.data.cart)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const removeFromCart = (part_id) => {
        let query = new URLSearchParams()
        query.set('part', part_id)
        deleteCartItem(cart.id, query.toString())
        .then((response) => {
            updateCart()
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateItem = (part_id, quantity) => {
        let item = {
            part_id: part_id,
            quantity: quantity,
            cart_id: cart.id
        }
        putCarts(item)
        .then((response) => {
            if (response.status === 200){
                updateCart()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    let router = useRouter()
    const placeOrder = () => {
        router.push(`/customer/orders/create`)
    }

    const getTotal = () => {
        let total = 0
        if(cartFull && cartFull.items){
            if(cartFull.items.length > 0){
                let totalItems = cartFull.items.map((item) => {
                    return parseInt(item.quantity) * parseInt(item.part.price)
                })
                total =  totalItems.reduce((prev, next) => {
                    return prev + next
                })
            }
        }
        setTotalSum(total)
    }

    useEffect(()=>{
        fetchCart()
    }, [cart])

    useEffect(()=>{
        if (cartFull) {
            getTotal()
        }
    }, [cartFull])

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
            (cartFull) ? (
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
                        cartFull.items.map((item) => {
                            return (
                                <CartItem key={item.id} item={item} updateCart={updateItem} removeFromCart={removeFromCart} />
                            )
                        })
                    }
                    <tr>
                        <td colSpan={4}>Grand Total</td>
                        <td>{totalSum}</td>
                    </tr>
                    </tbody>
                    </Table>
                    <div>
                    {
                        user ? <Button onClick={()=>{placeOrder()}}>Place Order</Button>
                        :<Link href={`/auth/login`}>
                            Login to place an order
                        </Link>
                    }
                    </div>
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
