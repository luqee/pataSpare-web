import React, {Component} from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import urls from '../config/config';

class ShopDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: {}
        }
    }
    initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(this.props.shop.latitude), lng: parseFloat(this.props.shop.longitude)},
            zoom:6
        });
        // let defaultMarker = new window.google.maps.Marker({
        //     position: {lat: -1.308, lng: 36.825},
        //     map: map,
        //     draggable: true
        // })
        this.setState({map: map});
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopDetails;