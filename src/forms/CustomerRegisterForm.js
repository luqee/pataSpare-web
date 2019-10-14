import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import autoAPI from '../api/api';
import urls from '../config/config';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .required('Required field'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  password: Yup.string()
    .min(5, 'Should contain at least five characters')
    .required('Required field'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required field'),
});

function CustomerRegisterForm(props){
  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={(values, actions) => {
        console.log(`submitiing`);
        let postData = {name: values.username, ...values ,role: `customer`};
        console.log(postData);
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

  );
}

export default CustomerRegisterForm;