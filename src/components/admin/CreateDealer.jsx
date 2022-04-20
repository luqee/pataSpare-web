import React, { Component } from 'react';
import CreateVendorForm from '../../forms/CreateVendorForm';
import {Container, Row, Col} from 'react-bootstrap';
import formStyles from '../../styles/Form.module.scss';

class CreateDealer extends Component {
    render(){
        return (
            <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className={`dealer-register ${formStyles.Form}`}>
                    <CreateVendorForm history={this.props.history} userToken={this.props.userToken}/>
                </div>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default CreateDealer;
