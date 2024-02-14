'use client'
import {Container, Row, Col, Table} from 'react-bootstrap';
import {OrderItemRow} from '@/components/customer/OrderItemRow';
import { useEffect, useState } from 'react';
import { getOrder } from '@/utils/api';

const ViewOrder = ({params})=>{
    const [order, setOrder] = useState(null)
    
    const fetchOrder = () =>{
        getOrder(params.id)
        .then((response) => {
            if(response.status === 200){
                setOrder(response.data.data.order)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchOrder()
    }, [])

    return (order === null) ? 'loading...' :(
        <Container>
            <Row>
                <Col>
                <p>Order Id: {order.order_identity}</p>
                </Col>
            </Row>
            <Row>
            <Col lg={12}>
            {
                order.order_items.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Shop</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        order.order_items.map((order_item, indx) => {
                            return <OrderItemRow key={indx} item={order_item} />
                            })
                    }
                    </tbody>
                </Table>
                :
                <p>NO ITEMS</p>
            }
            </Col>
            </Row>
        </Container>
    )
}

export default ViewOrder;