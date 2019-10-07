import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import autoAPI from '../../api/api';
import Order from './Order';

class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            orders: []
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/orders`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({orders: response.data.data.orders});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = () => {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>My Orders</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    {
                        this.state.orders.length > 0 ?
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
                                this.state.orders.map((order, indx) => {
                                    return <Order match={this.props.match} key={indx} order={order} />
                                    })
                            }
                            </tbody>
                        </Table>
                        :
                        <p>NO ORDERS CURRENTLY</p>
                    }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Orders;