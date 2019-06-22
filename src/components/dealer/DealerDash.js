import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Shops from './Shops';
class DealerDash extends Component {
    render(){
        return (
            <dealer-dash>
                <p>Dealer Home Page</p>
                <Tabs defaultActiveKey="shops" id="dash-tabs">
                <Tab eventKey="shops" title="Shops">
                    <Shops />
                </Tab>
                <Tab eventKey="inventory" title="Inventory">
                    Inventory section
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    Orders area!!
                </Tab>
                </Tabs>
            </dealer-dash>
        );
    }
}

export default DealerDash;