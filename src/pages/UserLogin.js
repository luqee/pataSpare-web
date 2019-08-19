import React, { Component } from 'react';
import UserLoginForm from '../forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';

class UserLogin extends Component {
    render(){
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className='dealer-login'>
                        <p>Login to PataSpare</p>
                        <UserLoginForm history={this.props.history} />
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserLogin;
