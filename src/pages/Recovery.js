import React, {useState} from 'react'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import RecoverySchema from '../forms/schemas/RecoverySchema';
import { Formik, ErrorMessage } from 'formik';
import autoAPI from '../api/api';
import formStyles from '../styles/Form.module.scss';

function Recovery(props) {
    const [isLoading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
    const requestReset = (values, actions) => {
        setLoading(true)
        let postData = {
            email: values.email,
        };
        autoAPI.post('/auth/password/email', JSON.stringify(postData))
        .then((response) => {
          if (response.data.status === 200) {
            actions.setSubmitting(false);
            setLoading(false)
            setInfo('Password reset email sent.')
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          setLoading(false)
          console.log(error);
        });
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                <div className={`recovery ${formStyles.Form}`}>
                <Loader loading={isLoading} />
                {info !== '' && <Alert variant='info'>
                    {info}
                </Alert>}
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
