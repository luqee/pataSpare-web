import React, { Component } from 'react';
import DealerLoginForm from '../../forms/DealerLoginForm';
import {Container, Row, Col} from 'react-bootstrap';

class DealerLogin extends Component {
    render(){
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className='dealer-login'>
                        <p>Dealer Login Page</p>
                        <DealerLoginForm history={this.props.history} />
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DealerLogin;
