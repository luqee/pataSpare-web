'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'
import { useCartContext } from '@/context/CartContext';
import { useState } from 'react';
import { postCart } from '@/utils/api';

const PartButton = ({partId, qty})=>{
    const [quantity, setQty] = useState(qty)
    let {cart, updateCart, countInCart} = useCartContext()
    let [adding, setAdding] = useState(false)
    const inCart = countInCart(partId)

    const addToCart = (event) => {
        event.preventDefault()
        setAdding(true)
        let itemData = {
            part_id: partId,
            quantity: quantity
        }
        if (cart) {
            itemData['cart_id'] = cart.id
        }
        postCart(itemData)
        .then((response)=>{
            setAdding(false)
            if (response.status === 201) {
                updateCart()
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    return <Button style={{
        position: 'relative',
        zIndex: 10
    }} size={'sm'} onClick={addToCart}>
        <FontAwesomeIcon icon={faShoppingCart} /> {adding?'Adding...':'Add'}
        {
            (inCart === 0) ? null:
            <span>{`(${inCart})`}</span>
        }
    </Button>
}

export default PartButton