import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import OrderItemsTable from './OrderItemsTable';
import autoAPI from '../../api/api';
import Loader from '../Loader';
import OrderItem from './OrderItem';

class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            order_items: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`dealer/orders`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
                this.setState({order_items: response.data.data.order_items});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = () => {
        const order_items = this.state.order_items

        return (
            <Container>
                <Row>
                    <Col>
                    <p>Orders in my shops</p>
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row style={{
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                    <Col lg={12}>
                        <Table>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Shop</th>
                                <th>Cost</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <Loader loading={this.state.loading} />
                            {
                                order_items.length > 0 ?
                                order_items.map((order, indx) => {
                                    return <OrderItem match={this.props.match} key={indx} item={order} />
                                    })
                                :
                                !this.state.loading && <p>NO ORDERS CURRENTLY</p>
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Orders;