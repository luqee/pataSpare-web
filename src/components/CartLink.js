import {useCartContext} from '@/context/CartContext'
import {Nav}from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const CartLink = () =>{
    const {cart} = useCartContext()

    const [totalItems, setTotalItems] = useState(0)

    useEffect(()=>{
        countItems()
    }, [cart])
    // static getDerivedStateFromProps = (props, state) => {
    //     if(props.cart !== state.cart){
    //         return {cart: props.cart}
    //     }
    //     return null
    // }
    // let cartContext = useContext(CartContext)
    // let [cart, setCart] = useState(cartContext.cart)
    const countItems = () =>{
        let totalItems = 0
        if(cart){
            if(cart.items.length > 0){
                let quantities = cart.items.map((item) => {return parseInt(item.quantity)})
                totalItems =  quantities.reduce((prev, next) => {
                    return prev + next
                })
            }
        }
        setTotalItems(totalItems)
    }

    return (
        <Nav>
            <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingCart} /><span>{` (${totalItems})`}</span></Nav.Link>
        </Nav>
    )
}