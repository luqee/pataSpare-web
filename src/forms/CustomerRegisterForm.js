'use client'
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SignupSchema from '@/forms/schemas/SignupSchema'
import { GoogleButton } from "@/components/GoogleButton";
import { registerAction } from "@/actions/auth";
import DivWithErrorHandling from "@/components/withErrorHandlingHoc";
import formStyles from "@/styles/Form.module.css";

export const CustomerRegisterForm = ()=>{
    let [showError, setShowError] = useState(false)
	let [errors, setErrors] = useState({})
	let [formState, setformState] = useState({
		username: '',
        email: '',
        password: '',
        passwordConfirm: '',
	})

    const register = (values, actions)=>{
        setformState(values)
        let postData = {name: values.username, ...values ,role: `customer`}
        registerAction(postData)
        .then((ret)=>{
            actions.setSubmitting(false)
            setErrors(ret)
            setShowError(true)
            // actions.resetForm()
        }).catch((err)=>{
            console.log(err);
        })
    }

    return <div>
    <GoogleButton dcx='signup' /><br />
    <DivWithErrorHandling showError={showError} errors={errors}>
    <Formik
    validationSchema={SignupSchema}
    initialValues={formState}
    onSubmit={register}>
        {
            ({
                isSubmitting
            }) =>(
                <Form>
                    <Field className={formStyles.FormInput} type="text" name="username" />
                    <ErrorMessage name="username" component="div" />
                    <Field type="email" name="email" /><br />
                    <span>We&apos;ll always maintain your privacy</span>
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <Field type="password" name="passwordConfirm" />
                    <ErrorMessage name="passwordConfirm" component="div" /><br />
                    <button variant="primary" type="submit" disabled={isSubmitting}>
                    Register
                    </button>
                </Form>
            )
        }
    </Formik>
    </DivWithErrorHandling>
    </div>
}