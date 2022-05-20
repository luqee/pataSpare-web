import { useContext, useEffect, useState } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import OrderItemRow from '../../components/customer/OrderItemRow'
import { getOrder } from '../../api/api';
import { UserContext } from '../../App';
import { useLocation, useParams } from 'react-router-dom';

function ViewOrder() {
    const [order, setOrder] = useState(null)
    const params = useParams()
    const userContext = useContext(UserContext)
    const location = useLocation()

    useEffect(()=>{
        if(location.state !== undefined){
            setOrder(location.state.order)
        }else{
            fetchOrder()
        }
    }, [])

    const fetchOrder = () => {
        getOrder(params.orderId, userContext.user, (response) => {
            if(response.status === 200){
                setOrder(response.data.order)
            }
        })
    }

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
                        order.order_items.map((order_item) => {
                            return <OrderItemRow key={order_item.id} item={order_item} />
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