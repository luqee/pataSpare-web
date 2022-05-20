import {Container, Row, Col, Table} from 'react-bootstrap';
import { getOrders } from '../../api/api';
import Loader from '../../components/Loader';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import OrderRow from '../../components/customer/OrderRow';

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const userContext = useContext(UserContext)

    useEffect(()=>{
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        getOrders(userContext.user, (response) => {
            if(response.status === 200){
                setLoading(false)
                setOrders(response.data.orders)
            }
        })
    }
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
                        <Loader loading={loading} />
                        {
                            orders.length > 0 ?
                            orders.map((order) => {
                                return <OrderRow key={order.id} order={order} />
                                })
                            :
                            !loading && <p>NO ORDERS CURRENTLY</p>
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Orders;