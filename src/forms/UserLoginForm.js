import {Form, Button} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik'
import DivWithErrorHandling from '@/components/withErrorHandlingHoc';
import LoginSchema from './schemas/LoginSchema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import {GoogleButton} from '@/components/GoogleButton';
import Link from 'next/link'

export const UserLoginForm =()=> {

	const {login, updateUser} = useAuthContext()
	let [showError, setShowError] = useState(false)
	let [errors, setErrors] = useState({})
	let [formState, setformState] = useState({
		email: '',
		password: '',
	})

	const router = useRouter()
	const loginUser = (values, actions) => {
		setformState(values)
		let postData = {...values};
		login(postData, (response)=>{
			actions.setSubmitting(false)
			if (response.status === 200) {
				updateUser()
				router.refresh()
			}else{
				let errors = []
				if(response.status === 422 || response.status === 403){
					errors[0] = response.data.message
				}else{
					errors[0] = response.message
				}
				if(errors){
					setErrors(errors)
					setShowError(true)
				}
			}
		})
	}

    return (
		<>
		<GoogleButton dcx={'signin'} />
		<DivWithErrorHandling showError={showError} errors={errors}>
			<Formik
				validationSchema={LoginSchema}
				initialValues={formState}
				onSubmit={loginUser}>
					{
						({
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
						)
					}
				</Formik>
		</DivWithErrorHandling>
		<p>Forgot password? <Link href='/auth/recovery'>Reset here</Link></p>
		<p>Don&apos;t have an account? <Link href='/auth/register'>Sign up</Link></p>
		</>
    )
}
