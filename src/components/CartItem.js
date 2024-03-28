import {useState} from 'react';
import { Button, Form} from 'react-bootstrap';
import {urls} from '@/config/urls';
import Image from 'next/image';

export const CartItem = ({item, updateCart, removeFromCart})=>{
    let [qty, setQty] = useState(parseInt(item.quantity))
    let [qtyChanged, setQtyChanged] = useState(false)
    let [updating, setUpdating] = useState(false)
    let [removing, setRemoving] = useState(false)

    const handleQty = (event) => {
        let newValue = parseInt(event.target.value)
        if(newValue !== item.quantity){
            setQtyChanged(true)
        }else{
            setQtyChanged(false)
        }
        setQty(newValue)
    }

    return (
        <tr>
            <td><Image width={60} height={60} src={`${urls.apiHost}/${item.part.part_image}`} alt='Part image' /> </td>
            <td>{item.part.title}</td>
            <td>{item.part.price}</td>
            <td><Form.Control style={{
                    width: 'auto',
                }} type="number" min="1" max={`${item.part.stock}`} value={qty} onChange={handleQty}/></td>
            <td>{item.quantity * item.part.price}</td>
            <td>
                <div style={{
                    display: 'flex'
                }}>
                <Button disabled={!removing?false:true} size={'sm'} onClick={() => {
                    setRemoving(true)
                    removeFromCart(item.part.id)
                    setRemoving(false)
                }}>{removing?'Removing...': 'Remove'}</Button>
                <span>&nbsp;</span>
                <Button disabled={qtyChanged?false:true} size={'sm'} onClick={() => {
                    setUpdating(true)
                    updateCart(item.part.id, qty)
                    setUpdating(false)
                    setQtyChanged(false)
                }}>{updating?'Updating': 'Update'}</Button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem;