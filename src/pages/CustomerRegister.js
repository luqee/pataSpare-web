import React, { Component } from 'react';
import CustomerRegisterForm from '../forms/CustomerRegisterForm';
import {Container, Row, Col} from 'react-bootstrap';

class CustomerRegister extends Component {
    render(){
        return (
            <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className='dealer-register'>
                    <p>Auto part Dealer Registration.</p>
                    <CustomerRegisterForm history={this.props.history} />
                </div>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default CustomerRegister;
