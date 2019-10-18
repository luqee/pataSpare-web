import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import autoAPI from '../../api/api';
import Order from './Order';
import Loader from '../Loader';
import { UserContext } from '../../App';

class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/orders`, {
            headers: {'Authorization': 'Bearer '+ this.props.user.token}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
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
                <Row style={{
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                    <Col lg={12}>
                        <Loader loading={this.state.loading} />
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