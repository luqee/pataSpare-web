import React from 'react';
import {Image, Button} from 'react-bootstrap';
import urls from '../config/config';

function CartItem(props){
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${this.props.item.part.part_image}`} /> </td>
            <td>{this.props.item.part.title}</td>
            <td>{this.props.item.part.price}</td>
            <td>{this.props.item.quantity}</td>
            <td>{this.props.item.quantity * this.props.item.part.price}</td>
            <td><Button onClick={() => {this.props.removeFromCart(this.props.item.part.id)}}>Remove</Button></td>
        </tr>
    )
}

export default CartItem;