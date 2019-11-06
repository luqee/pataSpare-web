import React, {useState} from 'react';
import {Image, Button, Form} from 'react-bootstrap';
import urls from '../config/config';

function CartItem(props){
    let cartItem = props.item
    let [qty, setQty] = useState(parseInt(cartItem.quantity))
    let [qtyChanged, setQtyChanged] = useState(false)
    let [updating, setUpdating] = useState(false)
    let [removing, setRemoving] = useState(false)

    const handleQty = (event) => {
        let newValue = parseInt(event.target.value)
        if(newValue !== qty){
            setQtyChanged(true)
        }else{
            setQtyChanged(false)
        }
        setQty(newValue)
    }
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${cartItem.part.part_image}`} /> </td>
            <td>{cartItem.part.title}</td>
            <td>{cartItem.part.price}</td>
            <td><Form.Control style={{
                    width: 'auto',
                }} type="number" min="1" max={`${cartItem.part.stock}`} value={qty} onChange={handleQty}/></td>
            <td>{cartItem.quantity * cartItem.part.price}</td>
            <td>
                <div style={{
                    display: 'flex'
                }}>
                <Button disabled={!removing?false:true} size={'sm'} onClick={() => {
                    setRemoving(true)
                    props.removeFromCart(cartItem.part.id)
                    setRemoving(false)
                }}>{removing?'Removing...': 'Remove'}</Button>
                <span>&nbsp;</span>
                <Button disabled={qtyChanged?false:true} size={'sm'} onClick={() => {
                    setUpdating(true)
                    props.updateCart(cartItem.part.id, qty)
                    setUpdating(false)
                    setQtyChanged(false)
                }}>{updating?'Updating': 'Update'}</Button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem;