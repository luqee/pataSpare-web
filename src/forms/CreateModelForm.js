import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
class CreateModelForm extends Component {
    constructor(props){
        super(props);
    }
    createModel = (values, actions) => {
        let modelData = {
            name: values.name,
            brand: this.props.brandId
        }
        autoAPI.post(`admin/models`, JSON.stringify(modelData), {
            headers: {
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                let pathname = this.props.history.location.pathname
                let location = {
                    pathname: pathname,
                    state: {brand: this.props.brand, model: response.data.data.model}
                }
                this.props.history.push(``);
                this.props.history.push(location);
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
                        .min(1, 'Too Short!')
                        .required('Required field'),
                })}
                initialValues={{
                    name: '',
                }}
                onSubmit={this.createModel}
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
                        <Form.Label>Model Name:</Form.Label>
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
                        Add Model
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default CreateModelForm;
