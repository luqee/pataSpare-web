import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/auth";
import DivWithErrorHandling from "../components/withErrorHandlingHoc";
import ResetSchema from "./schemas/ResetSchema";
import Loader from '../components/Loader';

function PasswordResetForm(){
	const [isLoading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
	const [showError, setShowError] = useState(false)
	const [formErrors, setFormErrors] = useState({})
    const params = useParams()
    const [formState, setFormState] = useState({
        email: params.email,
        token: params.token,
        password: '',
        passwordConfirm: ''
    })
    const navigate = useNavigate()
	const onResetPassword = (values, actions) => {
        setLoading(true)
        let postData = {
            email: formState.email,
            token: formState.token,
            password: values.password,
            password_confirmation: values.passwordConfirm,
        };
        resetPassword(postData, (data)=>{
            if (data.status === 200) {
				actions.setSubmitting(false);
				setLoading(false)
                navigate("/auth/login")
			}
        })
    }

	return (
        <Container>
            <div className={`reset-form`} >
				<Loader loading={isLoading} />
				{info !== '' && <Alert variant='info'>
					{info}
				</Alert>}
                <DivWithErrorHandling showError={showError} errors={formErrors}>
                <Formik
                validationSchema={ResetSchema}
                initialValues={{
                    email: formState.email,
                    password: '',
                    passwordConfirm: ''
                }}
                onSubmit={onResetPassword}
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
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={values.email} readOnly />
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
                )}
                />
                </DivWithErrorHandling>
            </div>
        </Container>
    )
}

export default PasswordResetForm