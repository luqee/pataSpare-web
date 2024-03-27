import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'
import { useCartContext } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { postCart } from '@/utils/api';

const PartButton = ({partId, qty})=>{
    const [quantity, setQty] = useState(qty)
    let {cart, updateCart} = useCartContext()
    let [adding, setAdding] = useState(false)
    let [inCart, setInCart] = useState(0)

    useEffect(()=>{
        setInCart(countInCart())
    }, [cart])

    const countInCart = () => {
        let count = 0
        if(cart){
            cart.items.forEach((item) => {
                if(item.part_id === partId){
                    count = item.quantity
                }
            })
        }
        return count
    }

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
            console.log(response);
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
        <br />
        {
            (inCart === 0) ? null:
            <span>{`(${inCart})`}</span>
        }
    </Button>
}

export default PartButton