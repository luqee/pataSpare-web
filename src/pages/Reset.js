import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import ResetSchema from '../forms/schemas/ResetSchema';
import { Formik, ErrorMessage } from 'formik';
import autoAPI from '../api/api';
import formStyles from '../styles/Form.module.scss';

class Reset extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            email: props.match.params.email,
            token: props.match.params.token,
            password: '',
            password_confirmation: ''
        }
    }
    resetPassword = (values, actions) => {
        console.log('reseting password');
        
        this.setState({loading: true})
        let postData = {
            email: this.state.email,
            token: this.state.token,
            password: values.password,
            password_confirmation: values.passwordConfirm,
        };
        autoAPI.post('/auth/password/reset', JSON.stringify(postData))
        .then((response) => {
          if (response.data.status === 201) {
            let responseData = response.data.data;
            this.props.userContext.updateUser(responseData.user)
            this.props.userContext.updateToken(responseData.token)
            actions.setSubmitting(false);
            this.setState({loading: false})
            this.props.history.push(`/customer`);
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          this.setState({loading: false})
          console.log(error);
        });
    }
    render = () =>{
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                    <div className={`reset ${formStyles.Form}`}>
                    <Loader loading={this.state.loading} />
                    <Formik
                        validationSchema={ResetSchema}
                        initialValues={{
                            email: this.state.email,
                            password: '',
                            passwordConfirm: ''
                        }}
                        onSubmit={this.resetPassword}
                        render={({
                            values,
                            errors, 
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleSubmit,
                        })=>(
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={this.state.email} readOnly />
                                <ErrorMessage name="email" render={(msg) => {
                                    return  <Form.Control.Feedback type="invalid" style={{
                                    display: `block`
                                    }}>
                                    {msg}
                                    </Form.Control.Feedback>
                                }} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>New Password</Form.Label>
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
                            <Button block variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                            RESET
                            </Button>
                            </Form>
                        )}
                    />
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Reset;
