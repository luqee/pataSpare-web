import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import GA from '@/utils/SiteAnalytics'

export const ShopLocation = ({shop})=>{

    const [map, setMap] = useState(null)
    const [shopLocationMarker, setShopLocationMarker] = useState(null)
    const [deviceLocation, setDeviceLocation] = useState(null)
    const [directionsService, setDirectionsService] = useState(null)
    const [directionsDisplay, setDirectionsDisplay] = useState(null)

    const initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
            zoom: 10
        });
        let shopLocationMarker = new window.google.maps.Marker({
            position: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
            map: map,
        })
        setMap(map)
        setShopLocationMarker(shopLocationMarker)
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
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setDeviceLocation(pos)
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
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('My Location');
            // infoWindow.open(map);
            // map.setCenter(pos);
          }, () => {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    const setupMap = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`;
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

    return (
        <div>
            <div className='map' id='map' style={{ maxWidth: 'auto', height: '250px' }}>
            </div>
            <Button onClick={showDirection} >Directions</Button>
        </div>
    )
}