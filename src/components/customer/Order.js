import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class Order extends Component{
    constructor(props){
        super(props)
        this.state = {
            order: props.order
        }
    }
    render = () =>{
        return (
            <tr>
                <td>{this.state.order.order_identity}</td>
                <td>{this.state.order.status}</td>
                <td>{this.state.order.order_items.length}</td>
                <td>{this.state.order.gross_price}</td>
                <td>{new Date(this.state.order.created_at).toDateString()}</td>
                <td><Link to={{
                    pathname: `${this.props.match.url}/${this.state.order.id}`,
                    state: {order: this.state.order}
                }}>
                    <Button>View</Button>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default Order;
