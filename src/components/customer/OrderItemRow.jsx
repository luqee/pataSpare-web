import {Image} from 'react-bootstrap';
import urls from '../../config/config';

function OrderItemRow({item}){
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${item.part.part_image}`} /> </td>
            <td>{item.part.title}</td>
            <td>{item.shop.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.quantity * item.price}</td>
            <td>{item.status}</td>
        </tr>
    )
}

export default OrderItemRow;