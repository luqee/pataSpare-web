import React, {useContext} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import { Formik, ErrorMessage } from 'formik';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import UserUpgradeSchema from '../../forms/schemas/UserUpgradeSchema';
import { UserContext } from '../../App';
import autoAPI from '../../api/api';

function Account(props){
    
    
    let userContext = useContext(UserContext)
    let intialState = {}
    let roles = []
    if(Object.keys(userContext.user).length > 0){
        roles = userContext.user.roles.map((role) => {
            return role.name;
        });
        console.log('user is');
        console.log(userContext.user);
        intialState = {
            username: userContext.user.name,
            email: userContext.user.email,
            number: userContext.user.number ? userContext.user.number: '',
        }
    }
    
    const becomeVendor = (values, actions) =>{
        let postData = {number: values.number};
        autoAPI.post(`/auth/upgrade`, JSON.stringify(postData), {
            headers: {
                'Authorization': 'Bearer '+ userContext.token
            }
        })
        .then(response => {
        if (response.data.status === 201) {
            actions.setSubmitting(false);
            userContext.updateUser(response.data.data.user)
            props.history.push(`/dealer`);
        }
        })
        .catch((error) => {
            actions.setSubmitting(false);
            let errors = error.response.data.errors
            if(errors){
                // setFormErrors(errors)
                // setShowError(true)
            }
        });
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
                        initialValues={intialState}
                        validationSchema={UserUpgradeSchema}
                        onSubmit={becomeVendor}
                        render={({
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
                            {
                                (roles.indexOf('dealer') === -1)? <Button id="btnUpgrader" variant="primary" onClick={showUpgrader}>
                                Become Vendor
                                </Button>
                                :
                                null
                                // <Form.Group controlId="number">
                                //     <Form.Label>Phone Number</Form.Label>
                                //     <PhoneInput style={{
                                //         width: '100%'
                                //     }} defaultCountry={'ke'} value={values.number} disabled={true} onChange={(value)=> {
                                //         setFieldValue('number', value)
                                //     }} />
                                //     <ErrorMessage name="number" render={(msg) => {
                                //     return  <Form.Control.Feedback type="invalid" style={{
                                //     display: `block`
                                //     }}>
                                //     {msg}
                                //     </Form.Control.Feedback>
                                //     }} />
                                // </Form.Group>
                            }
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
                        )}
                    />
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Account;