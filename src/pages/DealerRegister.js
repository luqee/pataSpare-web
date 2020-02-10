import React, { Component } from 'react';
import DealerRegisterForm from '../forms/DealerRegisterForm';
import {Container, Row, Col} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

class DealerRegister extends Component {
    render(){
        return (
            <Container>
                <Helmet>
                <title>Dealer Registration | PataSpare</title>
                <meta name="description" content="Join Pataspare as on of our partner stores" />
                </Helmet>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className='dealer-register'>
                    <DealerRegisterForm history={this.props.history} />
                </div>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default DealerRegister;
