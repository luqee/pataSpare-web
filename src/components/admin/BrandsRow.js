import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import autoAPI from '../../api/api';
function BrandsRow(props){
    let [brand, setBrand] = useState(props.brand)
    let [edit, setEdit] = useState(false)
    const toggleEdit = () => {
        edit? setEdit(false): setEdit(true)
    }
    const updateBrand = (values, actions) => {
        let brandData = {
            name: values.name,
        }
        autoAPI.put(`admin/brands/${brand.id}`, JSON.stringify(brandData), {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                actions.setSubmitting(false);
                setBrand(response.data.data.brand)
                setEdit(false)
                // props.history.push(``);
                // props.history.push(`admin/brands`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    const deleteBrand = () => {
        autoAPI.delete(`admin/brands/${brand.id}`, {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                props.history.push(``);
                props.history.push(`admin/brands`);
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
                        .min(3, 'Too Short!')
                        .required('Required field'),
                })}
                initialValues={{
                    name: brand.name,
                }}
                onSubmit={updateBrand}
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
                </div>:<Link to={{
                    pathname: `${props.match.url}/${brand.id}`,
                    state: {brand: brand}
                }}>
                    {brand.name}  
                </Link>}
                </td>
            <td><Link to={{
                pathname: `${props.match.url}/${brand.id}`,
                state: {brand: brand}
            }}>
                    <Button size={'sm'}>Manage</Button>
                </Link>&nbsp;
                <Button size={'sm'} onClick={toggleEdit}>{edit? 'Cancel': 'Edit'}</Button>
                &nbsp;
                <Button size={'sm'} onClick={deleteBrand}>Remove</Button>
            </td>
        </tr>
    )
}

export default BrandsRow;