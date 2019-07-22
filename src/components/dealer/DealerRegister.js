import React, { Component } from 'react';
import DealerRegisterForm from '../../forms/DealerRegisterForm';
import {Container, Row, Col} from 'react-bootstrap';

class DealerRegister extends Component {
    render(){
        return (
            <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className='dealer-register'>
                    <p>Auto part Dealer Registration.</p>
                    <DealerRegisterForm history={this.props.history} />
                </div>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default DealerRegister;
