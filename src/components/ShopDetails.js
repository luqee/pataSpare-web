import React, {Component} from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import urls from '../config/config';

class ShopDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: {},
            deviceLocation: {},
            directionsService: {},
            directionsDisplay: {}
        }
        // this.showDirection = this.showDirection.bind(this);
    }
    initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
            zoom: 10
        });
        let defaultMarker = new window.google.maps.Marker({
            position: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
            map: map,
        })
        this.setState({map: map});
    }
    handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.state.map);
    }
    showDirection = () => {
        let infoWindow = new window.google.maps.InfoWindow();
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log('my posiyion:');
            console.log(pos);
            this.setState({deviceLocation: pos});
            var directionsService = new window.google.maps.DirectionsService();
            var directionsDisplay = new window.google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.state.map);
            let directionRequest = {
                origin: this.state.deviceLocation,
                destination: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
                travelMode: 'DRIVING'
            }
            directionsService.route(directionRequest, (response, status) =>{
                if (status === 'OK') {
                    console.log('showing directions');
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
            });
            infoWindow.setPosition(pos);
            infoWindow.setContent('My Location');
            infoWindow.open(this.state.map);
            this.state.map.setCenter(pos);
          }, () => {
            this.handleLocationError(true, infoWindow, this.state.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, this.state.map.getCenter());
        }
    }
    handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.state.map);
    }
    componentDidMount = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC29r00wR6YbOeK8BL4QacVO1j2gMdzp5g';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.initMap();
            })
        } else {
            this.initMap();
        }
    }
    
    render = () => {
        const shop = this.props.shop;
        
        return (
            <Container>
                <Row>
                    <Col>
                    <Image src={`${urls.hostRoot}/${shop.shop_image}`} height='200px'/>
                    <p>{shop.name}</p>
                    <p><FontAwesomeIcon icon={faMapMarker} /> {shop.location}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> {shop.location}</p>
                    <p><FontAwesomeIcon icon={faPhone} /></p>
                    <div className='map' id='map' style={{ width: 300, height: 300 }}>
                    </div>
                    <Button onClick={this.showDirection} >Show Directions</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopDetails;