import React, { Component } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DivWithErrorHandling from '../components/withErrorHandlingHoc';

import { Formik, ErrorMessage } from 'formik';
import autoAPI from '../api/api';
import urls from '../config/config';
import SignupSchema from '../forms/schemas/SignupSchema'
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

class CustomerRegister extends Component {
    constructor(props){
        super(props)
        console.log('constructor');
        console.log(props);
        
        this.state = {
            showError: false,
            errors: '',
            formState: {
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
            },
        }
    }
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
    // init = () => {
    //     window.gapi.load('auth2', ()=>{
    //         this.setState({googleApi: window.gapi})
            
    //     })
    // }
    renderGoogleButton = () => {
        window.gapi.signin2.render('g-signin2', {
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn,
        })
    }
    setShowError = (showError, errors='') => {
        this.setState({showError: showError})
        if(showError){
            this.setState({errors: errors})
        }
    }
    onSignIn = (googleUser) => {
        let profile = googleUser.getBasicProfile()
        let info = {
            'username': profile.getName(),
            'email': profile.getEmail(),
            'id_token': googleUser.getAuthResponse().id_token
        }
        autoAPI.post(`${urls.baseURL}/auth/social/google`, JSON.stringify(info))
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
                <title>User Registration | PataSpare</title>
                <meta name="description" content="Register on Pataspare and access the best service there is." />
                <meta name="google-signin-client_id" content={process.env.REACT_APP_CLIENT_ID} />
                </Helmet>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                <div className="g-signin2" data-onsuccess='onSignIn' data-width='inherit' data-longtitle='true'></div>
                <div className='dealer-register'>
                    <DivWithErrorHandling showError={this.state.showError} errors={this.state.errors}>
                    <Formik
                    validationSchema={SignupSchema}
                    initialValues={this.state.formState}
                    onSubmit={(values, actions) => {
                        this.setState({formState: values})
                        let postData = {name: values.username, ...values ,role: `customer`};
                        autoAPI.post(urls.userRegister, JSON.stringify(postData))
                        .then(response => {
                            console.log('logging resp');
                            console.log(response);
                            
                            if (response.data.status === 201) {
                                actions.setSubmitting(false);
                                this.props.history.push(`/user/login`);
                            }
                            // if(response.data.status === 422){
                            //     console.log('a 422 error');
                            //     actions.setSubmitting(false);
                            //     // this.setShowError(true, error.error)
                            // }
                        })
                        .catch((error) => {
                            actions.setSubmitting(false);
                            console.log('An reeeroe frefrg');
                            let errors = error.response.data.errors
                            if(errors){
                                this.setShowError(true, errors)
                            }
                            
                        });
                    }}
                    render={({
                        values,
                        touched,
                        errors, 
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleSubmit,
                    }) =>(
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} />
                            {/* {errors.email && touched.email && <div>{errors.email}</div>} */}
                            <ErrorMessage name="username" render={(msg) => {
                            return  <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                            }}>
                            {msg}
                            </Form.Control.Feedback>
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                            <ErrorMessage name="email" render={(msg) => {
                            return  <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                            }}>
                            {msg}
                            </Form.Control.Feedback>
                            }} />
                            
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                            <ErrorMessage name="password" render={(msg) => {
                            return  <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                            }}>
                            {msg}
                            </Form.Control.Feedback>
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="passwordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password Confirmation" value={values.passwordConfirm} onChange={handleChange} />
                            <ErrorMessage name="passwordConfirm" render={(msg) => {
                            return  <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                            }}>
                            {msg}
                            </Form.Control.Feedback>
                            }} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        Register
                        </Button>
                        </Form>
                    )}
                    />
                    </DivWithErrorHandling>
                    <p>By Signing up, you agree to our <Link to={`/terms`}>terms of service</Link> and <Link to={`/privacy`}>privacy policy</Link></p>
                </div>
                <p>Already have an account? <Link to={`/user/login`}>Log in</Link></p>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default CustomerRegister;
