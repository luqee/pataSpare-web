import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import GA from '../api/GoogleAnalytics';

function ShopLocation({shop}){
    const [map, setMap] = useState(null)
    useEffect(()=>{
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;
            s.async = true
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                initMap();
            })
        } else {
            initMap();
        }
    }, [])

    const initMap = () => {
        let newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
            zoom: 10
        });
        new window.google.maps.Marker({
            position: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
            map: newMap,
        })
        setMap(newMap)
    }
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    const showDirection = () => {
        if(GA.init()){
            GA.recordDirectionsView()
        }
        
        let infoWindow = new window.google.maps.InfoWindow();
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(positionFound, () => handleLocationError(true, infoWindow, map.getCenter()));
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    const positionFound = (position) =>{
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var directionsService = new window.google.maps.DirectionsService();
        var directionsDisplay = new window.google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        let directionRequest = {
            origin: pos,
            destination: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
            travelMode: 'DRIVING'
        }
        directionsService.route(directionRequest, (response, status) =>{
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    return (
        <div>
            <div className='map' id='map' style={{ maxWidth: 'auto', height: '250px' }}>
            </div>
            <Button onClick={showDirection} >Directions</Button>
        </div>
    )
}

export default ShopLocation;