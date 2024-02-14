import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Button} from 'react-bootstrap';

export const OrderRow  = ({order})=>{
    let path = usePathname()
    return (
        <tr>
            <td>{order.order_identity}</td>
            <td>{order.status}</td>
            <td>{order.order_items.length}</td>
            <td>{order.gross_price}</td>
            <td>{new Date(order.created_at).toDateString()}</td>
            <td><Link href={`${path}/${order.id}`}>
                <Button>View</Button>
                </Link>
            </td>
        </tr>
    )
}
