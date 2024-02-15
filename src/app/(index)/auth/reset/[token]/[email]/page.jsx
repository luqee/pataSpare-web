'use client'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Loader from '@/components/Loader';
import ResetSchema from '@/forms/schemas/ResetSchema';
import { Formik, ErrorMessage } from 'formik';
import formStyles from '@/styles/Form.module.css';
import { useState } from 'react';
import { postPasswordReset } from '@/utils/api';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Reset = ({params})=>{
    const email = params.email
    const token = params.token
    const [loading, setLoading] = useState(false)
    const {setUser} = useAuthContext()
    const router = useRouter()

    const resetPassword = (values, actions) => {
        setLoading(true)
        let postData = {
            email,
            token,
            password: values.password,
            password_confirmation: values.passwordConfirm,
        }
        postPasswordReset(postData)
        .then((response) => {
            actions.setSubmitting(false);
            setLoading(false)
            if (response.status === 201) {
                let responseData = response.data.data;
                setUser(responseData.user)
                router.push(`/customer`);
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
                <div className={`reset ${formStyles.Form}`}>
                <Loader loading={loading} />
                <Formik
                    validationSchema={ResetSchema}
                    initialValues={{
                        email,
                        password: '',
                        passwordConfirm: ''
                    }}
                    onSubmit={resetPassword}>
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
                                    <Form.Control type="email" value={email} readOnly />
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
                            )
                        }
                    </Formik>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Reset;
