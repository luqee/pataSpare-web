import React, { Component } from 'react';
import UserLoginForm from '../forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';
import { UserContext } from '../App';
import {Helmet} from 'react-helmet';
import autoAPI from '../api/api';

class UserLogin extends Component {
    componentDidMount = () => {
        window['onSignIn'] = this.onSignIn;
        if(!window.gapi){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://apis.google.com/js/platform.js`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.renderGoogleButton();
            })
        }else{
            this.renderGoogleButton();
        }
        
    }
    componentWillUnmount = () => {
        delete window['onSignIn'];
    }
    renderGoogleButton = () => {
        window.gapi.signin2.render('g-signin2', {
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn,
        })
    }
    onSignIn = (googleUser) => {
        let profile = googleUser.getBasicProfile()
        let info = {
            'username': profile.getName(),
            'email': profile.getEmail(),
            'id_token': googleUser.getAuthResponse().id_token
        }
        autoAPI.post(`/auth/social/google`, JSON.stringify(info))
        .then(response => {
            if (response.data.status === 200) {
                let responseData = response.data.data;
				this.props.userContext.updateUser(responseData.user)
                this.props.userContext.updateToken(responseData.token)
                this.props.history.push(`/customer`);
            }
        })
        .catch((error) => {
            console.log('An Error while authenticating');
            console.log(error);
            
        });
    }
    render(){
        return (
            <Container>
                <Helmet>
                <title>PataSpare - User Sign-in</title>
                <meta name="description" content="Login to your Pataspare account." />
                <meta name="google-signin-client_id" content={process.env.REACT_APP_CLIENT_ID} />
                </Helmet>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className="g-signin2" data-onsuccess='onSignIn'></div>
                    <div className='dealer-login'>
                        {/* <UserContext.Consumer>
                            {value => {
                                return 
                            }}
                        </UserContext.Consumer> */}
                        <UserLoginForm userContext={this.props.userContext} history={this.props.history} />
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserLogin;
