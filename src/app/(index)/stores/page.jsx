'use client'
import { Metadata } from 'next'
import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Store} from '@/components/Store';
import Loader from '@/components/Loader';
import {getShops} from '@/utils/api'

// export const metadata: Metadata = {
//     title: 'Vendor partners | PataSpare',
//     description: 'Our partner stores stock parts of highest quality',
// }

const Stores = ()=> {
    const [shops, setShops] = useState([])
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
    // setMarkers = (markers) => {

    // }

    useEffect(()=>{
        fetchShops()
    }, [])

    useEffect(()=>{
        setupMap()
    }, [shops])

    const fetchShops = () => {
        getShops()
        .then((response) => {
            if (response.status === 200) {
                setLoading(false)
                setShops(response.data.data.shops)
            }
        })
        .catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }

    return (
        <Container className='stores' id='stores'>
            <Row style={{
                justifyContent: 'center'
            }}>
                <h3>Store List</h3>
            </Row>
            <Row>
            <div className='map' id='map' style={{ width: '100%', height: '450px' }}></div>
            </Row>
            <Row style={{
                padding:'50px 0',
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Loader loading={loading} />
                {
                    (!loading && shops.length > 0) ? (
                        shops.map((shop, index) => {
                            return (<Col key={index} lg={4}><Store key={index} shop={shop} /></Col> )
                        })
                    ):( !loading && <p>NO SHOPS</p>
                    )
                }
            </Row>
        </Container>
    )
}

export default Stores;
