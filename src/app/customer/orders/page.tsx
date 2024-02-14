'use client'
import {Container, Row, Col} from 'react-bootstrap';
import {OrdersTable} from '@/components/customer/OrdersTable'
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import {getOrders} from '@/utils/api'

const Orders = ()=> {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = ()=>{
        getOrders()
        .then((response) => {
            setLoading(false)
            if(response.status === 200){
                setOrders(response.data.data.orders)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    useEffect(()=>{
        fetchOrders()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>My Orders</p>
                </Col>
            </Row>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Col lg={12}>
                <Loader loading={loading} />
                <OrdersTable orders={orders} />
                </Col>
            </Row>
        </Container>
    )
}
export default Orders;