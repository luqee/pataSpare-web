import React, {Component} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import ShopSchema from './schemas/ShopSchema';

class EditShopForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            number: '',
            description: '',
            shopImage: null,
            location: '',
            map: '',
            marker: '',
            autoComplete: ''
        }
    }
    editShop = (values, actions) => {
        let shopData = {
            name: values.name,
            number: values.number,
            description: values.description,
            location: this.state.location,
            latitude: this.state.marker.getPosition().lat(),
            longitude: this.state.marker.getPosition().lng()
        }
        let formData = new FormData();
        for (let name in shopData){
            formData.set(name, shopData[name])
        }
        formData.set('shop_image', values.shopImage)
        
        autoAPI.post(`${urls.dealerHome}/shops`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ this.props.user.token
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                this.props.history.push(`${urls.dealerHome}/shops`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    render = () => {
        let initialValues = {
            name: this.state.shop,
            number: '',
            description: '',
            shopImage: null,
            location: this.state.location,
        }
        return (
            <Formik
                validationSchema={ShopSchema}
                initialValues={{
                    name: '',
                    number: '',
                    description: '',
                    shopImage: null,
                    location: this.state.location,
                }}
                onSubmit={this.createShop}
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
                        <Form.Label>Business Name:</Form.Label>
                        <Form.Control placeholder="The name of your business" onChange={handleChange}/>
                        <ErrorMessage name="name" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="number">
                        <Form.Label>Business Number:</Form.Label>
                        <PhoneInput style={{
                            width: '100%'
                        }} defaultCountry={'ke'} value={values.number} onChange={(value) => {
                            setFieldValue('number', value)
                        }} />
                        <ErrorMessage name="number" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Some description of your business" onChange={handleChange}/>
                        <ErrorMessage name="description" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="shopImage">
                        <Form.Label>Shop Image:</Form.Label>
                        <Form.Control type="file" placeholder="Upload shop image" onChange={(event) => {
                            let thumbImg = document.getElementById(`thumb`);
                            let reader = new FileReader();
                            reader.onloadend = () => {
                                thumbImg.src = reader.result;
                                thumbImg.height = 200
                                thumbImg.width = 200
                            };
                            reader.readAsDataURL(event.currentTarget.files[0]);
                            setFieldValue("shopImage", event.currentTarget.files[0]);
                            
                        }}/>
                        <Image
                            id={`thumb`}/>
                        
                        <ErrorMessage name="shopImage" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="location">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control type={`text`} placeholder="Where is your business?" onChange={handleChange} />
                        <ErrorMessage name="location" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="map">
                        <Form.Label>Selet On Map:</Form.Label>
                        <div style={{ width: 400, height: 400 }} className="map" id="map"></div>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        UPDATE SHOP
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default EditShopForm;