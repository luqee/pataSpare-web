import React, { Component } from 'react';
import CreateShopForm from '../../forms/CreateShopForm';
import {Container,Row, Col} from 'react-bootstrap';
class CreateShop extends Component {
    render = () => {
        return (
            <Container>
                <Row>
                    <Col lg={8}>
                    <CreateShopForm history={this.props.history}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreateShop;