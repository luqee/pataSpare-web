import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from '../components/Store';
import { getShops } from '../api/api';
import Loader from '../components/Loader';
import {Helmet} from 'react-helmet';

function Stores() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
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
    const setupShopsMap = ()=>{
        getShops((response) => {
            setLoading(false)
            setShops(response.data.shops)
        })
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;
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
        setupShopsMap()
    }, [])

    return (
        <Container className='stores' id='stores'>
            <Helmet>
            <title>Vendor partners | PataSpare</title>
            <meta name="description" content="Our partner stores stock auto parts of the highest quality" />
            </Helmet>
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
                        shops.map((shop) => {
                            return (<Col key={shop.id} lg={4}><Store key={shop.id} shop={shop} /></Col> )
                        })
                    ):( !loading && <p>NO SHOPS</p>
                    )
                }
            </Row>
        </Container>
    )
}

export default Stores;
