import React, {Component} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import 'react-phone-input-2/dist/style.css'
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
class CreateCategoryForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            categoryImage: null,
        }
    }
    createCategory = (values, actions) => {
        let categoryData = {
            name: values.name,
        }
        let formData = new FormData();
        for (let name in categoryData){
            formData.set(name, categoryData[name])
        }
        formData.set('category_image', values.categoryImage)
        
        autoAPI.post(`admin/categories`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                this.props.history.push(``);
                this.props.history.push(`admin/categories`);
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
                    categoryImage: Yup.mixed()
                        .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
                        .required('Required field'),
                })}
                initialValues={{
                    name: '',
                    categoryImage: null,
                }}
                onSubmit={this.createCategory}
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
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Control onChange={handleChange}/>
                        <ErrorMessage name="name" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="categoryImage">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="file" placeholder="Category image" onChange={(event) => {
                            let thumbImg = document.getElementById(`thumb`);
                            let reader = new FileReader();
                            reader.onloadend = () => {
                                thumbImg.src = reader.result;
                                thumbImg.height = 200
                                thumbImg.width = 200
                            };
                            reader.readAsDataURL(event.currentTarget.files[0]);
                            setFieldValue("categoryImage", event.currentTarget.files[0]);
                            
                        }}/>
                        <Image
                            id={`thumb`}/>
                        <ErrorMessage name="categoryImage" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        CREATE
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default CreateCategoryForm;