import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

function OrderRow({order}){

    return (
        <tr>
            <td>{order.order_identity}</td>
            <td>{order.status}</td>
            <td>{order.order_items.length}</td>
            <td>{order.gross_price}</td>
            <td>{new Date(order.created_at).toDateString()}</td>
            <td><Link to={{
                pathname: `${order.id}`,
                state: {order: order}
            }}>
                <Button>View</Button>
                </Link>
            </td>
        </tr>
    )
}

export default OrderRow;
