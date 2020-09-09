import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import autoAPI from '../api/api';
import urls from '../config/config';
import DivWithErrorHandling from '../components/withErrorHandlingHoc';
import LoginSchema from './schemas/LoginSchema';

class UserLoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			showError: false,
			errors: '',
			formState: {
				email: '',
				password: ''
			}
		}
	}
	setShowError = (showError, errors='') => {
		if(showError){
			this.setState({errors: errors})
		}
		this.setState({showError: showError})
	}
	loginUser = (values, actions) => {
		// event.preventDefault();
		this.setState({formState: values})
		let postData = {...values};

		autoAPI.post(urls.userLogin, JSON.stringify(postData))
		.then((response) => {
			actions.setSubmitting(false);
			if (response.data.status === 200) {
				let responseData = response.data.data;
				this.props.userContext.updateUser(responseData.user)
				this.props.userContext.updateToken(responseData.token)
				if(this.props.history.location.state !== undefined){
					this.props.history.push(this.props.history.location.state.from)
				}else{
					this.props.history.push(`/customer`);
				}
			}
			
		})
		.catch((error) => {
			actions.setSubmitting(false);
			let responseData = error.response.data
			let errors = []
			if(responseData.status === 422){
				errors[0] = responseData.data.message
			}else{
				errors = responseData.errors
			}
			if(errors){
				this.setShowError(true, errors)
			}
		});
	}
  render() {
	  let initialValues = {...this.state.formState}
    return (
		<DivWithErrorHandling showError={this.state.showError} errors={this.state.errors}>
			<Formik
				validationSchema={LoginSchema}
				initialValues={initialValues}
				onSubmit={this.loginUser}
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
    );
  }
}

export default UserLoginForm;
