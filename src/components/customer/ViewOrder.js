import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import OrderItem from './OrderItem';
import autoAPI from '../../api/api';

class ViewOrder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            order: {}
        }
    }
    componentDidMount = () =>{
        console.log('viewOrder component location state:::')
        console.log(this.props.location.state);
        if(this.props.location.state !== undefined){
            this.setState({order: this.props.location.state.order})
        }else{
            autoAPI.get(`/orders/${this.props.match.params.id}`)
            .then((response) => {
                if(response.data.status === 200){
                    this.setState({order: response.data.data.order});
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    render = () => {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Order Id: {this.state.order.order_identity}</p>
                    </Col>
                </Row>
                <Row>
                <Col lg={12}>
                {
                    this.state.order.order_items.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.order.order_items.map((order_item, indx) => {
                                return <OrderItem match={this.props.match} key={indx} item={order_item} />
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

export default ViewOrder;