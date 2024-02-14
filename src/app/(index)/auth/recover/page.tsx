'use client'
import {useState} from 'react'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import Loader from '@/components/Loader';
import RecoverySchema from '@/forms/schemas/RecoverySchema';
import { Formik, ErrorMessage } from 'formik';
import formStyles from '@/styles/Form.module.scss';
import { postRequestReset } from '@/utils/api';

const PasswordRecover = ()=> {
    const [isLoading, setLoading] = useState(false);
    const [info, setInfo] = useState('');

    const requestReset = (values:any, actions:any) => {
        setLoading(true)
        let postData = {
            email: values.email,
        }
        postRequestReset(postData)
        .then((response) => {
            actions.setSubmitting(false);
            setLoading(false)
            if (response.status === 200) {
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
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={RecoverySchema}
                    onSubmit={requestReset}>
                        {
                            ({
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
                                <Button variant="primary" type="submit" disabled={isSubmitting || !dirty}>
                                SEND
                                </Button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default PasswordRecover;
