import React, {Component} from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import Inventory from '../dealer/Inventory';
import autoAPI from '../../api/api';

class ManageShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
            
        }
    }
    componentDidMount = () => {
        console.log('component did mount');
        autoAPI.get('/auto_dealer/shops/'+ this.props.match.params.id, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            console.log(response);
            if (response.data.status === 200){
                console.log('updating manageshops state');
                this.setState({parts: response.data.data.parts})
                console.log(this.state.parts);
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        return (
            <div className="manage-shop">
            <Tabs defaultActiveKey="staff" id="manage-tabs">
            <Tab eventKey="staff" title="STAFF">
            staff
            </Tab>
            <Tab eventKey="inventory" title="INVENTORY">
                <Inventory parts={this.state.parts} shopId={this.props.match.params.id}/>
            </Tab>
            <Tab eventKey="messages" title="CHAT MESSAGES">
                Your Messages
            </Tab>
            <Tab eventKey="orders" title="ORDERS/PAYMENTS">
                Your Orders
            </Tab>
            <Tab eventKey="details" title="SHOP DETAILS">
                Shop detials
            </Tab>
            </Tabs>
            </div>
        )
    }
}

export default ManageShop;