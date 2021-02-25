import React, { Component } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import autoAPI from '../../api/api';
import urls from '../../config/config';
import { Formik, ErrorMessage } from 'formik';
import EditShopSchema from '../../forms/schemas/EditShopSchema'
import {Container,Row, Col, Form, Button, Image} from 'react-bootstrap';
import DeleteShopModal from './DeleteShopModal'

class ViewShop extends Component {
    constructor(props){
        super(props)
        this.state = {
            shop: this.props.location.state.shop,
            newLocation: this.props.location.state.shop.location,
            map: '',
            marker: '',
            autoComplete: '',
            showDialog: false
        }
    }
    componentDidMount = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.initMap();
            })
        } else {
            this.initMap();
        }
    }
    placeChanged = () => {
        let place = this.state.autoComplete.getPlace();
        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        this.setState({newLocation: place.name})
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
        let mapInput = new window.google.maps.Map(document.getElementById('map'));
        let shopLocation = {lat: parseFloat(this.state.shop.latitude), lng: parseFloat(this.state.shop.longitude)}
        this.setState({map: mapInput});
        this.showShopLocation(shopLocation, mapInput)
    }
    showShopLocation = (pos, map) => {
        map.setCenter(pos)
        map.setZoom(15)
        if(this.state.marker === ''){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: map,
                draggable: true
            })
            this.setState({marker: defaultMarker})
        }else{
            this.state.marker.setPosition(pos)
        }
    }
    showThumb = (event) =>{
        let thumbImg = document.getElementById(`thumb`);
        let reader = new FileReader();
        reader.onloadend = () => {
            thumbImg.src = reader.result;
            thumbImg.height = 200
            thumbImg.width = 200
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
    }
    editShop = (values, actions) => {
        let data = {}
        if(values.name !== this.state.shop.name){
            data['name'] = values.name
        }
        if(values.number !== this.state.shop.number){
            data['number'] = values.number
        }
        if(values.description !== this.state.shop.description){
            data['description'] = values.description
        }
        if(values.location !== this.state.shop.location){
            data['location'] = values.location
            data['latitude'] = this.state.marker.getPosition().lat()
            data['longitude'] = this.state.marker.getPosition().lng()
        }
        
        let formData = new FormData();
        for (let name in data){
            formData.set(name, data[name])
        }
        if(values.shopImage !== null){
            formData.set('shop_image', values.shopImage)
        }
        autoAPI.post(`${urls.dealerHome}/shops/${this.state.shop.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                actions.setSubmitting(false);
                this.props.history.push(`${urls.dealerHome}/shops`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
        })
    }
    handleShow = () => {
        this.setState({showDialog: true})
    }
    handleHide = () => {
        this.setState({showDialog: false})
    }
    handleConfirmDelete = () => {
        console.log('deleteng shop');
        autoAPI.delete(`${urls.dealerHome}/shops/${this.state.shop.id}`, {
            headers: {
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                this.props.history.push(`${urls.dealerHome}/shops`);
            }
            
        })
        this.setState({showDialog: false})
    }
    render = () => {
        let shop = this.state.shop
        let initialValues = {
            name: shop.name,
            number: shop.number,
            description: shop.description,
            shopImage: null,
            location: this.state.newLocation,
        }
        return (
            <Container>
                <Button variant="primary" onClick={this.handleShow}>
                    Delete
                </Button>
                <Row className="justify-content-md-center">
                
                <DeleteShopModal 
                    show={this.state.showDialog} 
                    onConfirm={this.handleConfirmDelete} 
                    onHide={this.handleHide}
                    shop={this.state.shop}
                />
                    <Col lg={7}>
                    <Formik
                validationSchema={EditShopSchema}
                initialValues={initialValues}
                onSubmit={this.editShop}
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
                        <Form.Control value={values.name} onChange={handleChange}/>
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
                        <div style={{
                            width: '100%'
                        }}>
                            <PhoneInput defaultCountry={'ke'} value={values.number} onChange={(value) => {
                                setFieldValue('number', value)
                            }} />
                        </div>
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
                        <Form.Control as="textarea" rows="3" value={values.description} onChange={handleChange}/>
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
                            this.showThumb(event)
                            setFieldValue("shopImage", event.currentTarget.files[0]);
                            
                        }}/>
                        <a target="_blank" href={`${urls.hostRoot}/${shop.shop_image}`} rel="noopener noreferrer">
                        <Image
                            id={`thumb`} width="200px" height="200px" src={`${urls.hostRoot}/${shop.shop_image}`}/>
                        </a>
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
                        <Form.Control type={`text`} value={values.location} onChange={(event)=>{
                            // setFieldValue('location',event.value)
                            handleChange(event)
                        }} />
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
                        UPDATE
                        </Button>
                    </Form>
                )}
            />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ViewShop;