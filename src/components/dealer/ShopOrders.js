import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import OrderItemsTable from './OrderItemsTable';
import autoAPI from '../../api/api';
import { UserContext } from '../../App';

class ShopOrders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            order_items: [],
        }
    }
    componentDidMount = () => {
        autoAPI.get(`dealer/orders/shop/${this.props.match.params.id}`, {
            headers: {'Authorization': 'Bearer '+ this.props.user.token}
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
                    <p>Order Items</p>
                    </Col>
                </Row>
                <Row>
                <Col lg={12}>
                <OrderItemsTable match={this.props.match} items={order_items} />
                </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopOrders;