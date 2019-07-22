import React, { Component } from 'react';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import Shops from './Shops';

class DealerDash extends Component {
    render(){
        return (
            <Container>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DealerDash;
