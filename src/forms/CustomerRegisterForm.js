import { useState } from "react"
import DivWithErrorHandling from '@/components/withErrorHandlingHoc';
import { Formik, ErrorMessage } from 'formik';
import {postRegister} from '@/utils/api';
import SignupSchema from '@/forms/schemas/SignupSchema'
import { useRouter } from "next/navigation";
import {Form, Button} from 'react-bootstrap';

export const CustomerRegisterForm = ()=>{
    let [showError, setShowError] = useState(false)
	let [errors, setErrors] = useState({})
	let [formState, setformState] = useState({
		username: '',
        email: '',
        password: '',
        passwordConfirm: '',
	})
    const router = useRouter()

    const handleShowError = (showError, errors='') => {
        setShowError(showError)
        if(showError){
            setErrors(errors)
        }
    }

    const register = (values, actions)=>{
        setformState(values)
        let postData = {name: values.username, ...values ,role: `customer`}
        postRegister(postData)
        .then(response => {
            actions.setSubmitting(false);
            if (response.data.status === 201) {
                router.push(`/auth/email?email=${response.data.data.mail}`);
            }
            // if(response.data.status === 422){
            //     console.log('a 422 error');
            //     actions.setSubmitting(false);
            //     // this.setShowError(true, error.error)
            // }
        })
        .catch((error) => {
            console.log(error);
            
            // actions.setSubmitting(false);
            // let errors = error.response.data.errors
            // if(errors){
            //     this.setShowError(true, errors)
            // }

        });
    }

    return <DivWithErrorHandling showError={showError} errors={errors}>
    <Formik
    validationSchema={SignupSchema}
    initialValues={formState}
    onSubmit={register}>
        {
            ({
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
                    We'll always maintain your privacy
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
            )
        }
    </Formik>
    </DivWithErrorHandling>
}