import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class Order extends Component{
    // constructor(props){
    //     super(props)
    // }
    render = () =>{
        return (
            <tr>
                <td>{this.props.order.order_identity}</td>
                <td>{this.props.order.status}</td>
                <td>{this.props.order_tems.length}</td>
                <td>{this.props.order.gross_price}</td>
                <td>{this.props.order.created_at}</td>
                <td><Link to={`${this.props.match.url}/${this.props.order.id}`}>
                    <Button>View</Button>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default Order;
