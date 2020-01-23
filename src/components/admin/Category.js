import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap';
import urls from '../../config/config';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import autoAPI from '../../api/api'
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
function Category(props){
    let [category, setCategory] = useState(props.location.state.category)
    const editCategory = (values, actions) => {
        let categoryData = {
            name: values.name,
        }
        let formData = new FormData();
        for (let name in categoryData){
            formData.set(name, categoryData[name])
        }
        if(values.categoryImage !== null){
            formData.set('category_image', values.categoryImage)
        }
        autoAPI.post(`admin/categories/${category.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                actions.setSubmitting(false);
                setCategory(response.data.data.category)
                // this.props.history.push(``);
                // this.props.history.push(`admin/categories`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    return (
        <Container>
            <Row>
            <Formik
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .min(3, 'Too Short!')
                        .required('Required field'),
                    // categoryImage: Yup.mixed()
                    //     .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
                })}
                initialValues={{
                    name: category.name,
                    categoryImage: null,
                }}
                onSubmit={editCategory}
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
                        <Form.Control onChange={handleChange} value={values.name}/>
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
                        <a target="_blank" href={`${urls.hostRoot}/${category.category_image}`} rel="noopener noreferrer">
                        <Image
                            id={`thumb`} width="200px" height="200px" src={`${urls.hostRoot}/${category.category_image}`}/>
                        </a>
                        <ErrorMessage name="categoryImage" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        Edit
                        </Button>
                    </Form>
                )}
            />
            </Row>
        </Container>
    )
}

export default Category;
