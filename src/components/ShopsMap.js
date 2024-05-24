'use client'
import { useEffect, useState } from 'react';

export const ShopsMap = ({shops})=>{
    const [loading, setLoading] = useState(true)
    const [allMarkers, setAllMarkers] = useState([])
    
    const setupMap = ()=>{
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

    const initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(-1.287825), lng: parseFloat(36.816711)},
            zoom: 10
        });
        if(shops.length > 0){
            let allMarkers = shops.map((shop) => {
                return new window.google.maps.Marker({
                    position: {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)},
                    map: map,
                })
            })
            // this.setState({allMarkers: allMarkers})
        }
    }

    useEffect(()=>{
        setupMap()
    }, [shops])

    return (
        <div className='map' id='map' style={{ width: '100%', height: '450px' }}></div>
    )
}