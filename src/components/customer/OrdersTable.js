import {Table} from 'react-bootstrap'
import { OrderRow } from '@/components/customer/OrderRow'

export const OrdersTable = ({orders})=>{

    return (
        orders.length > 0 ?
        <Table>
            <thead>
                <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Purchased</th>
                <th>Gross Sales</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                orders.length > 0 ?
                orders.map((order, indx) => {
                    return <OrderRow key={indx} order={order} />
                    })
                :
                null
            }
            </tbody>
        </Table>
        :
        <p>No Orders</p>
    )
}