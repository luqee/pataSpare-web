import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import autoAPI from '../api/api';
import urls from '../config/config';
import DealerSignupSchema from './schemas/DealerSignupSchema';

function DealerRegisterForm(props){
  return (
    <Formik
      validationSchema={DealerSignupSchema}
      initialValues={{
        username: '',
        number: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={(values, actions) => {
        let postData = {name: values.username, ...values ,role: `dealer`};
        autoAPI.post(urls.userRegister, JSON.stringify(postData))
        .then(response => {
          if (response.data.status === 201) {
            actions.setSubmitting(false);
            props.history.push(`/user/login`);
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          console.log(error);
        });
      }}
      render={({
        values,
        setFieldValue,
        touched,
        errors, 
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) =>(
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} />
            <ErrorMessage name="username" render={(msg) => {
            return  <Form.Control.Feedback type="invalid" style={{
              display: `block`
            }}>
              {msg}
            </Form.Control.Feedback>
            }}/>
          </Form.Group>
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

  );
}

export default DealerRegisterForm;