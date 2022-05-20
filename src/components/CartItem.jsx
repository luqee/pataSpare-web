import React, {useState} from 'react';
import {Image, Button, Form} from 'react-bootstrap';
import urls from '../config/config';

function CartItem({item, updateCart, removeFromCart}){
    let [qty, setQty] = useState(parseInt(item.quantity))
    let [updating, setUpdating] = useState(false)
    let [removing, setRemoving] = useState(false)

    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${item.part.part_image}`} /> </td>
            <td>{item.part.title}</td>
            <td>{item.part.price}</td>
            <td><Form.Control style={{
                    width: 'auto',
                }} type="number" min="1" max={`${item.part.stock}`} value={qty} onChange={(event) => setQty(parseInt(event.target.value))}/></td>
            <td>{item.quantity * item.part.price}</td>
            <td>
                <div style={{
                    display: 'flex'
                }}>
                <Button disabled={!updating?false:true} size={'sm'} onClick={() => {
                    setRemoving(true)
                    setUpdating(true)
                    removeFromCart(item.part.id)
                    setRemoving(false)
                    setUpdating(false)
                }}>{removing?'Removing...': 'Remove'}</Button>
                <span>&nbsp;</span>
                <Button disabled={updating?false:true} size={'sm'} onClick={() => {
                    setUpdating(true)
                    updateCart(item.part.id, qty)
                    setUpdating(false)
                }}>{updating?'Updating': 'Update'}</Button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem;