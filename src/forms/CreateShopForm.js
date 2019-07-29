import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class CreateShopForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            shopImage: '',
            location: '',
            map: '',
            marker: ''
        }
    }
    initMap = () => {
        let mapInput = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -1.308, lng: 36.825},
            zoom:10
        });
        let defaultMarker = new window.google.maps.Marker({
            position: {lat: -1.308, lng: 36.825},
            map: mapInput,
            draggable: true
        })
        this.setState({map: mapInput, marker: defaultMarker});
    }
    componentDidMount = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC29r00wR6YbOeK8BL4QacVO1j2gMdzp5g&callback=initMap';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.initMap();
            })
        } else {
            this.initMap();
        }
    }
    
    handleBusinessName = (event) => {
        this.setState({name: event.target.value});
    }
    handleDescription = (event) => {
        this.setState({description: event.target.value})
    }
    handleImageUpload = (event)=> {
        this.setState({shopImage: event.target.files[0]})
    }
    handleLocation = (event) => {
        this.setState({location: event.target.value})
    }
    createShop = (event) => {
        event.preventDefault();
        let shopData = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            latitude: this.state.marker.getPosition().lat(),
            longitude: this.state.marker.getPosition().lng()
        }
        let formData = new FormData();
        for (let name in shopData){
            formData.set(name, shopData[name])
        }
        formData.set('shop_image', this.state.shopImage)
        
        autoAPI.post(`${urls.dealerHome}/shops`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((response) => {
            if (response.status === 201){
                this.props.history.push(urls.dealerHome);
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    render = () => {
        return (
            <div className="form-holder">
                <Form>
                    <Form.Group controlId="formBasicName">
                    <Form.Label>Business Name:</Form.Label>
                    <Form.Control placeholder="The name of your business" onChange={this.handleBusinessName}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Some description of your business" onChange={this.handleDescription}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                    <Form.Label>Shop Image:</Form.Label>
                    <Form.Control type="file" accept=".png" placeholder="Upload image" onChange={this.handleImageUpload}/>
                    </Form.Group>
                    <Form.Group controlId="formBasiclocation">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control placeholder="Where is your business?" onChange={this.handleLocation}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicMap">
                    <Form.Label>Selet On Map:</Form.Label>
                    <div style={{ width: 400, height: 400 }} className="map" id="map"></div>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.createShop}>
                    CREATE SHOP
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CreateShopForm;