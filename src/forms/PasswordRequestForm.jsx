import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { sendResetLink } from "../api/auth";
import DivWithErrorHandling from "../components/withErrorHandlingHoc";
import RecoverySchema from "./schemas/RecoverySchema";
import Loader from '../components/Loader';

function PasswordRequestForm(){
	const [isLoading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
	const [showError, setShowError] = useState(false)
	const [formErrors, setFormErrors] = useState({})
	const [email, setEmail] = useState('')

	const requestReset = (values, actions) => {
        setLoading(true)
        let postData = {
            email: values.email,
        }
		sendResetLink(postData, (data)=>{
			if (data.status === 200) {
				actions.setSubmitting(false);
				setLoading(false)
				setInfo('Password reset email sent.')
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
                validationSchema={RecoverySchema}
                initialValues={{email: email}}
                onSubmit={requestReset}
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
                        <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
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
                </DivWithErrorHandling>
            </div>
        </Container>
    )
}

export default PasswordRequestForm