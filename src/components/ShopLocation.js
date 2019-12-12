import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class ShopLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: null,
            shopLocationMarker: null,
            deviceLocation: null,
            directionsService: null,
            directionsDisplay: null
        }
    }
    initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
            zoom: 10
        });
        let shopLocationMarker = new window.google.maps.Marker({
            position: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
            map: map,
        })
        this.setState({map: map, shopLocationMarker: shopLocationMarker});
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
            this.setState({deviceLocation: pos});
            var directionsService = new window.google.maps.DirectionsService();
            var directionsDisplay = new window.google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.state.map);
            let directionRequest = {
                origin: pos,
                destination: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
                travelMode: 'DRIVING'
            }
            directionsService.route(directionRequest, (response, status) =>{
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
            });
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('My Location');
            // infoWindow.open(this.state.map);
            // this.state.map.setCenter(pos);
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
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;
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
        return (
            <div>
                <div className='map' id='map' style={{ maxWidth: 'auto', height: '250px' }}>
                </div>
                <Button onClick={this.showDirection} >Directions</Button>
            </div>
        )
    }
}

export default ShopLocation;