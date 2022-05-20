import { useContext, useState } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import DivWithErrorHandling from '../components/withErrorHandlingHoc';
import LoginSchema from './schemas/LoginSchema';
import GoogleButton from '../components/GoogleButton';
import { postLogin } from '../api/auth';
import { UserContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import formStyles from '../styles/Form.module.scss';

function UserLoginForm(){
	let [showError, setShowError] = useState(false)
	let [formErrors, setFormErrors] = useState({})
	let [formState, setformState] = useState({
        email: '',
        password: '',
	})

	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const location = useLocation()

	const loginUser = (values, actions) => {
		// event.preventDefault();
		setformState(values)
		let postData = {...values};
		postLogin(postData, (response) => {
			actions.setSubmitting(false);
			if (response.status === 200) {
				let responseData = response.data.data;
				let user = responseData.user
				user['token'] = responseData.token
				userContext.updateUser(user)
				if(!location.state){
					navigate(`/customer`)
				}else{
					navigate(location.state.from)
				}
			}
			let errors = []
			if(response.status === 422 || response.status === 403){
				errors[0] = response.data.message
			}else{
				errors[0] = response.message
			}
			if(errors){
				setFormErrors(errors)
				setShowError(true)
			}
		})
	}
	return (
		<Container>
			<GoogleButton />
			<div className={`user-login ${formStyles.Form}`}>
				<DivWithErrorHandling showError={showError} errors={formErrors}>
					<Formik
						validationSchema={LoginSchema}
						initialValues={formState}
						onSubmit={loginUser}
						render={({
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
									<Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
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
									<Form.Control type="password" placeholder="Password" value={values.password} onChange={handleChange}  />
									<ErrorMessage name="password" render={(msg) => {
									return  <Form.Control.Feedback type="invalid" style={{
									display: `block`
									}}>
									{msg}
									</Form.Control.Feedback>
									}}/>
								</Form.Group>
								<Button variant="primary"  type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
								Login
								</Button>
							</Form>
						)}
					/>
				</DivWithErrorHandling>
			</div>
			<p>Forgot password? <a href='/auth/recovery'>Reset here</a></p>
			<p>Don't have an account? <a href='/auth/register'>Sign up</a></p>
		</Container>
	)
}

export default UserLoginForm;
