import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import autoAPI from '../../api/api';

function ModelsRow(props){
    let [model, setModel] = useState(props.model)
    let [edit, setEdit] = useState(false)
    const toggleEdit = () => {
        edit? setEdit(false): setEdit(true)
    }
    const updateModel = (values, actions) => {
        let data = {
            name: values.name,
        }
        autoAPI.put(`admin/models/${model.id}`, JSON.stringify(data), {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                actions.setSubmitting(false);
                setModel(response.data.data.model)
                setEdit(false)
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    const deleteModel = () => {
        autoAPI.delete(`admin/models/${model.id}`, {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                setEdit(false)
                let brand = props.brand
                let indx = brand.models.indexOf(brand)
                console.log('index found');
                console.log(indx);
                
                brand.models.splice(indx, 1)
                let pathname = props.history.location.pathname
                let location = {
                    pathname: pathname,
                    state: {brand: brand}
                }
                props.history.push(``);
                props.history.push(location);
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    return (
        <tr>
            <td>{edit?<div>
                <Formik
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Required field'),
                })}
                initialValues={{
                    name: model.name,
                }}
                onSubmit={updateModel}
                render={({
                    values,
                    setFieldValue,
                    errors, 
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) =>(
                    <Form onSubmit={handleSubmit} inline>
                        <Form.Group controlId="name">
                        <Form.Control size={'sm'} onChange={handleChange} value={values.name}/>
                        <ErrorMessage name="name" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button size={'sm'} variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        Update
                        </Button>
                    </Form>
                )}
            />
                </div>: model.name }
                </td>
            <td>
                <Button size={'sm'} onClick={toggleEdit}>{edit? 'Cancel': 'Edit'}</Button>
                &nbsp;
                <Button size={'sm'} onClick={deleteModel}>Remove</Button>
            </td>
        </tr>
    )
}

export default ModelsRow;