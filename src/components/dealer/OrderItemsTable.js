import React from 'react';
import {Table} from 'react-bootstrap';
import OrderItem from './OrderItem';

function OrderItemsTable(props){
    let order_items = props.items
    return order_items.length > 0 ?
        <Table>
            <thead>
                <tr>
                <th></th>
                <th>Item</th>
                <th>Shop</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                order_items.map((order_item, indx) => {
                    return <OrderItem match={props.match} key={indx} item={order_item} />
                    })
            }
            </tbody>
        </Table>
        :
        <p>NO ITEMS</p>
}

export default OrderItemsTable;