import React, { Component } from 'react';
import UserLoginForm from '../forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';
import { UserContext } from '../App';
import {Helmet} from 'react-helmet';
import autoAPI from '../api/api';
import GoogleButton from '../components/GoogleButton';
import {Link} from 'react-router-dom';
import formStyles from '../styles/Form.module.scss';

class UserLogin extends Component {
    render(){
        return (
            <Container>
                <Helmet>
                <title>PataSpare - User Sign-in</title>
                <meta name="description" content="Login to your Pataspare account." />
                <meta name="google-signin-client_id" content={process.env.REACT_APP_CLIENT_ID} />
                </Helmet>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                    <GoogleButton history={this.props.history} userContext={this.props.userContext} match={this.props.match} />
                    <div className={`user-login ${formStyles.Form}`}>
                        <UserLoginForm userContext={this.props.userContext} history={this.props.history} />
                    </div>
                    <p>Don't have an account? <Link to={`/customer/register`}>Sign up</Link></p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserLogin;
