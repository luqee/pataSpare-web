import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import OrderItem from './OrderItem';
import autoAPI from '../../api/api';

class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            order_items: []
        }
    }
    componentDidMount = () => {
        autoAPI.get(`dealer/orders`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if(response.data.status === 200){
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
                    <p>Orders in all shops</p>
                    </Col>
                </Row>
                <Row>
                <Col lg={12}>
                {
                    order_items.length > 0 ?
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
                                return <OrderItem history={this.props.history} key={indx} item={order_item} />
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
}

export default Orders;