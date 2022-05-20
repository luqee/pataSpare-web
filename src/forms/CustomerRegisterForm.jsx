import { Formik, ErrorMessage } from "formik"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { postRegister } from "../api/auth"
import DivWithErrorHandling from "../components/withErrorHandlingHoc"
import SignupSchema from "./schemas/SignupSchema"
import GoogleButton from '../components/GoogleButton';
import formStyles from '../styles/Form.module.scss';

function CustomerRegisterForm(){
    let [showError, setShowError] = useState(false)
	let [formErrors, setFormErrors] = useState({})
	let [formState, setformState] = useState({
		name: '',
        email: '',
        password: '',
        passwordConfirm: '',
	})

    const navigate = useNavigate()

    const onSubmitForm = (values, actions) => {
        setformState(values)
        let postData = { ...values ,role: `customer`}
        postRegister(postData, (response)=>{
            if (response.status === 201) {
                actions.setSubmitting(false);
                navigate('/auth/email', {replace: true, state: {email: response.data.data.mail}})
            }else if(response.errors){
                actions.setSubmitting(false);
                setShowError(true)
                setFormErrors(response.errors)
            }
        })
    }
    
    return (
        <Container>
            <GoogleButton />
            <div className={`customer-register ${formStyles.Form}`} >
                <DivWithErrorHandling showError={showError} errors={formErrors}>
                <Formik
                validationSchema={SignupSchema}
                initialValues={formState}
                onSubmit={onSubmitForm}
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
                    <Form.Group controlId="name">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Username" value={values.name} onChange={handleChange} />
                        {/* {errors.email && touched.email && <div>{errors.email}</div>} */}
                        <ErrorMessage name="name" render={(msg) => {
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
                )}
                />
                </DivWithErrorHandling>
                <p className={`${formStyles.FormText}`}>By Signing up, you agree to our <Link to={`/terms`}>terms of service</Link> and <Link to={`/privacy`}>privacy policy</Link></p>
            </div>
            <p>Already have an account? <a href='/auth/login'>Log in</a></p>
        </Container>
    )
}

export default CustomerRegisterForm