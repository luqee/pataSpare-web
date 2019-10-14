import React from 'react';
import {Image, Button} from 'react-bootstrap';
import urls from '../config/config';

function CartItem(props){
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${props.item.part.part_image}`} /> </td>
            <td>{props.item.part.title}</td>
            <td>{props.item.part.price}</td>
            <td>{props.item.quantity}</td>
            <td>{props.item.quantity * props.item.part.price}</td>
            <td><Button onClick={() => {props.removeFromCart(props.item.part.id)}}>Remove</Button></td>
        </tr>
    )
}

export default CartItem;