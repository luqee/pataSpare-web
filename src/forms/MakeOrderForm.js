import React, {Component} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import ShopSchema from './schemas/ShopSchema';
import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;
class MakeOrderForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: '',
            map: '',
            marker: '',
            autoComplete: '',
            user: props.user,
            cart: props.cart
        }
    }

    placeChanged = () => {
        let place = this.state.autoComplete.getPlace();
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
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places&callback=initMap`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.initMap();
            })
        } else {
            this.initMap();
        }
    }
    makeOrder = (values, actions) => {
        let details = {
            number: values.number,
            location: this.state.location,
            latitude: this.state.marker.getPosition().lat(),
            longitude: this.state.marker.getPosition().lng()
        }
        this.props.onSubmit(details)
    }
    render = () => {
        return (
            <Formik
                validationSchema={Yup.object().shape({
                    number: Yup.string()
                      .matches(rePhoneNumber, 'Phone number is not valid')
                      .required('Required field'),
                    location: Yup.string()
                      .required('Required field'),
                  })}
                initialValues={{
                    number: '',
                    location: this.state.location,
                }}
                onSubmit={this.makeOrder}
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
                        <Form.Group controlId="number">
                        <Form.Label>Phone Number:</Form.Label>
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
                        <Form.Label>Select precise location On Map:</Form.Label>
                        <div style={{ width: 400, height: 400 }} className="map" id="map"></div>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        SUBMIT
                        </Button>
                    </Form>
                )}
            />
        );
    }
}

export default MakeOrderForm;