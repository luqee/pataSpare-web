import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from '../components/Store';
import autoAPI from '../api/api';
import Loader from '../components/Loader';
import {Helmet} from 'react-helmet';

class Stores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
            loading: true,
            allMarkers: []
        }
    }
    initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(-1.287825), lng: parseFloat(36.816711)},
            zoom: 10
        });
        if(this.state.shops.length > 0){
            let allMarkers = this.state.shops.map((shop) => {
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
    componentDidMount = () => {
        autoAPI.get('/shops')
        .then((response) => {
            let shops = response.data.data.shops
            this.setState({loading: false})
            this.setState({shops: shops})
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            this.setState({loading: false})
        })
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
            <Container className='stores' id='stores'>
                <Helmet>
                <title>Vendor partners | PataSpare</title>
                <meta name="description" content="Our partner stores stock parts of highest quality" />
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
                    <Loader loading={this.state.loading} />
                    {
                        (!this.state.loading && this.state.shops.length > 0) ? (
                            this.state.shops.map((shop, index) => {
                                return (<Col key={index} lg={4}><Store key={index} shop={shop} location={this.props.location} /></Col> )
                            })
                        ):( !this.state.loading && <p>NO SHOPS</p>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default Stores;
