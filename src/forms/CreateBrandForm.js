import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
class CreateBrandForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }
    }
    createBrand = (values, actions) => {
        let brandData = {
            name: values.name,
        }
        autoAPI.post(`admin/brands`, JSON.stringify(brandData), {
            headers: {
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                this.props.history.push(``);
                this.props.history.push(`admin/brands`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    render = () => {
        return (
            <Formik
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .min(3, 'Too Short!')
                        .required('Required field'),
                })}
                initialValues={{
                    name: '',
                }}
                onSubmit={this.createBrand}
                render={({
                    values,
                    setFieldValue,
                    errors, 
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) =>(
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                        <Form.Label>Brand Name:</Form.Label>
                        <Form.Control onChange={handleChange}/>
                        <ErrorMessage name="name" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        Add Make
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default CreateBrandForm;