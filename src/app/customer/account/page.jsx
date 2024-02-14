'use client'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Formik, ErrorMessage } from 'formik';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import UserUpgradeSchema from '@/forms/schemas/UserUpgradeSchema'
import { useAuthContext} from '@/context/AuthContext'

const Account = ()=>{
    const {user} = useAuthContext()
    
    const becomeVendor = (values, actions) =>{
        let postData = {number: values.number};

        // autoAPI.post(`/api/auth/upgrade`, JSON.stringify(postData), {
        //     headers: {
        //         'Authorization': 'Bearer '+ userContext.token
        //     }
        // })
        // .then(response => {
        // if (response.data.status === 201) {
        //     actions.setSubmitting(false);
        //     userContext.updateUser(response.data.data.user)
        //     props.history.push(`/dealer`);
        // }
        // })
        // .catch((error) => {
        //     actions.setSubmitting(false);
        //     let errors = error.response.data.errors
        //     if(errors){
        //         // setFormErrors(errors)
        //         // setShowError(true)
        //     }
        // });
    }

    const showUpgrader = () =>{
        let upgradeButton = document.getElementById('btnUpgrader')
        upgradeButton.style.display = 'none'
        let upgrader = document.getElementById('upgrader')
        upgrader.style.display = 'block'
    }

    return (
        <Container>
            <Row>
                <Col>
                <p>Account Information</p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className='dealer-register'>
                    <Formik
                        initialValues={{
                            username: user.name,
                            email: user.email,
                            number: user.number ? user.number: '',
                        }}
                        validationSchema={UserUpgradeSchema}
                        onSubmit={becomeVendor}>
                            {
                                ({
                                    values,
                                    setFieldValue,
                                    errors, 
                                    dirty,
                                    isSubmitting,
                                    handleSubmit,
                                })=>(
                                    <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="username">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control disabled={true} name="username" type="text" value={values.username} />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control disabled={true} type="email" value={values.email} />
                                    </Form.Group>
                                    <div id="upgrader" style={{
                                        display: 'none'
                                    }}>
                                    <Form.Group controlId="number">
                                        <Form.Label>Phone Number</Form.Label>
                                        <PhoneInput style={{
                                            width: '100%'
                                        }} defaultCountry={'ke'} value={values.number} onChange={(value) => {
                                            setFieldValue('number', value)
                                        }} />
                                        <ErrorMessage name="number" render={(msg) => {
                                        return  <Form.Control.Feedback type="invalid" style={{
                                        display: `block`
                                        }}>
                                        {msg}
                                        </Form.Control.Feedback>
                                        }} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                                    Upgrade
                                    </Button>
                                    </div>
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

export default Account;