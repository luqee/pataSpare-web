'use client'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {CartItem} from '@/components/CartItem';
import { useCartContext} from '@/context/CartContext'
import {useAuthContext} from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import {deleteCartItem, putCarts} from '@/utils/api'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const UserCart = ()=>{
    const {cart, updateCart} = useCartContext()
    const {user} = useAuthContext()
    const [order, setOrder] = useState(null)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [totalSum, setTotalSum] = useState(0)

    const removeFromCart = (part_id) => {
        let query = new URLSearchParams()
        query.set('part', part_id)
        deleteCartItem(cart.id, query.toString())
        .then((response) => {
            if (response.status === 200){
                updateCart()
            }
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
        if(cart && cart.items){
            if(cart.items.length > 0){
                let totalItems = cart.items.map((item) => {
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
        getTotal()
    }, [cart])

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
            (cart) ? (
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
                                <CartItem key={index} item={item} updateCart={updateItem} removeFromCart={removeFromCart} />
                            )
                        })
                    }
                    <tr>
                        <td colSpan={4}>Grand Total</td>
                        <td>{totalSum}</td>
                    </tr>
                    </tbody>
                </Table>
                <Row>
                {
                    Object.keys(user).length > 0 ? <Button onClick={()=>{placeOrder()}}>Place Order</Button>
                    :<Link href={`/auth/login`}>
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
