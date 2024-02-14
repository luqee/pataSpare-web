import { useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;

export const MakeOrderForm = ({makeOrder})=>{
    const [location, setLocation] = useState('')
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState(null)
    const [autoComplete, setAutoComplete] = useState(null)

    const placeChanged = () => {
        let place = autoComplete.getPlace();
        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        setLocation(place.name)
        map.setCenter(pos)
        map.setZoom(15)
        if(marker === null){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: map,
                draggable: true
            })
            setMarker(defaultMarker)
        }else{
            marker.setPosition(pos)
        }
    }

    const initMap = () => {
        let locationInput = document.getElementById('location');
        let options = {
            componentRestrictions: {country: 'ke'}
          };
        let autocomplete = new window.google.maps.places.Autocomplete(locationInput, options);
        autocomplete.setFields(['name', 'geometry.location']);
        autocomplete.addListener('place_changed', placeChanged);
        setAutoComplete(autocomplete)
        let mapInput = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -1.308, lng: 36.825},
            zoom:10
        });
        
        setMap(mapInput)
    }
    
    const setupMap = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                initMap();
            })
        } else {
            initMap();
        }
    }

    useEffect(()=>{
        setupMap()
    }, [])

    const placeOrder = (values, actions) => {
        let details = {
            number: values.number,
            location: location,
            latitude: marker.getPosition().lat(),
            longitude: marker.getPosition().lng()
        }
        makeOrder(details)
    }

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
                location: location,
            }}
            onSubmit={placeOrder}>
                {
                    ({
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
                    )
                }
            </Formik>
    )
}