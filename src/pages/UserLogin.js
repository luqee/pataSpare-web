import React, { Component } from 'react';
import UserLoginForm from '../forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';
import { UserContext } from '../App';
import {Helmet} from 'react-helmet';

class UserLogin extends Component {
    render(){
        return (
            <Container>
                <Helmet>
                <title>PataSpare - User Sign-in</title>
                <meta name="description" content="Login to your Pataspare account." />
                </Helmet>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className='dealer-login'>
                        <UserContext.Consumer>
                            {value => {
                                return <UserLoginForm userContext={value} history={this.props.history} />
                            }}
                        </UserContext.Consumer>
                        
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserLogin;
