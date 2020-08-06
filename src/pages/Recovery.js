import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import RecoverySchema from '../forms/schemas/RecoverySchema';
import { Formik, ErrorMessage } from 'formik';
import autoAPI from '../api/api';
import formStyles from '../styles/Form.module.scss';

function Recovery(props) {
    var loading = false;
    const requestReset = (values, actions) => {
        loading = true
        let postData = {
            email: values.email,
        };
        autoAPI.post('/auth/password/email', JSON.stringify(postData))
        .then((response) => {
          if (response.data.status === 200) {
            actions.setSubmitting(false);
            loading = false
            alert(`Password reset email sent`)
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          loading = false
          console.log(error);
        });
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                <div className={`recovery ${formStyles.Form}`}>
                <Loader loading={loading} />
                <Formik
                    validationSchema={RecoverySchema}
                    onSubmit={requestReset}
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
                            <Form.Control type="email" placeholder="Email" value={values.email} onChange={handleChange}/>
                            <ErrorMessage name="email" render={(msg) => {
                                return  <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                                }}>
                                {msg}
                                </Form.Control.Feedback>
                            }} />
                        </Form.Group>
                        <Button block variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        SEND
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

export default Recovery;
