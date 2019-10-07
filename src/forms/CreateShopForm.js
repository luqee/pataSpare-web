import React, {Component, useState} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;
// const FILE_SIZE = 16 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const ShopSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    number: Yup.string()
      .matches(rePhoneNumber, 'Phone number is not valid')
      .required('Required field'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    location: Yup.string()
      .required('Required field'),
    shopImage: Yup.mixed()
      .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
      .required('Required field'),
  });

class CreateShopForm extends Component {
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
    placeChanged = () => {
        let place = this.state.autoComplete.getPlace();
        console.log(place);
        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        this.setState({location: place.name})
        this.state.map.setCenter(pos)
        this.state.map.setZoom(15)
        if(this.state.marker === ''){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: this.state.map,
                draggable: true
            })
            this.setState({marker: defaultMarker})
        }else{
            this.state.marker.setPosition(pos)
        }
        
    }
    initMap = () => {
        let locationInput = document.getElementById('location');
        let options = {
            types: ['(cities)'],
            componentRestrictions: {country: 'ke'}
          };
        let autocomplete = new window.google.maps.places.Autocomplete(locationInput, options);
        autocomplete.setFields(['name', 'geometry.location']);
        autocomplete.addListener('place_changed', this.placeChanged);
        this.setState({autoComplete: autocomplete});
        let mapInput = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -1.308, lng: 36.825},
            zoom:10
        });
        
        this.setState({map: mapInput});
    }
    
    componentDidMount = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC29r00wR6YbOeK8BL4QacVO1j2gMdzp5g&libraries=places&callback=initMap';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.initMap();
            })
        } else {
            this.initMap();
        }
    }
    createShop = (values, actions) => {
        let shopData = {
            name: values.name,
            number: values.number,
            description: values.description,
            location: values.location,
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
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
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
        return (
            <Formik
                validationSchema={ShopSchema}
                initialValues={{
                    name: '',
                    number: '',
                    description: '',
                    shopImage: null,
                    location: '',
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
                        <Form.Control placeholder="Business Phone Number" onChange={handleChange}/>
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
                            console.log(`setting image`);
                            console.log(event.currentTarget.files[0]);
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
                        CREATE SHOP
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default CreateShopForm;