import React from 'react';
import {Image} from 'react-bootstrap';
import urls from '../../config/config';

function OrderItem(props){
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${props.item.part.part_image}`} /> </td>
            <td>{props.item.part.title}</td>
            <td>{props.item.shop.name}</td>
            <td>{props.item.price}</td>
            <td>{props.item.quantity}</td>
            <td>{props.item.quantity * props.item.price}</td>
            <td>{props.item.status}</td>
        </tr>
    )
}

export default OrderItem;