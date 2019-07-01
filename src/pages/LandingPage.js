import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faGooglePlus, faInstagram } from '@fortawesome/free-brands-svg-icons'
import exterior from '../images/exterior.png';
import interior from '../images/interior.png';
import performance from '../images/performance.png';
import accessories from '../images/accessories.png';
import Mpesa from '../images/14.png';
import Bank from '../images/15.png';
import Visa from '../images/16.png';
import Master from '../images/17.png';
import Paypal from '../images/18.png';
import {Container, Col, Row, Image} from 'react-bootstrap';
import MainHeader from '../components/MainHeader';
import Products from '../components/Products';
import Promotion from '../components/Promotion';
import Brands from '../components/Brands';
import Stores from '../components/Stores';

class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <MainHeader />
                <Container className='categories'>
                    <Row style={{height: '250px'}}>
                        <Col style={{backgroundImage: `url(${exterior})`}}>
                        <p>EXTERIOR</p>
                        </Col>
                        <Col style={{backgroundImage: `url(${interior})`}}>
                        <p>INTERIOR</p>
                        </Col>
                        <Col style={{backgroundImage: `url(${performance})`}}>
                        <p>PERFORMANCE</p>
                        </Col>
                        <Col style={{backgroundImage: `url(${accessories})`}}>
                        <p>ACCESSORIES</p>
                        </Col>
                    </Row>
                </Container>
                <Products />
                <Promotion />
                <Stores />
                <Brands />
                <Container className='paymentOptions'>
                    <Row>
                        <Col lg={3}>
                        Accept online
                        payments with:
                        </Col>
                        <Col lg={9}>
                            <Image src={Mpesa} />
                            <Image src={Bank} />
                            <Image src={Visa} />
                            <Image src={Master} />
                            <Image src={Paypal} />
                        </Col>
                    </Row>
                    <p>Quality pays off! In our online shop you will only find replacement
                        parts from reputable manufacturers and exclusive premium brands.
                        This means best quality, high reliability and excellent
                        durability guarantee on our entire range.</p>
                </Container>
                <Container className='footer'>
                    <Col>
                    <span>SUPPORT</span><br/>
                    Contact Us
                    
                    </Col>
                    <Col>
                    <span>LEGAL</span><br/>
                    Privacy Policy
                    Returns Policy
                    </Col>
                    <Col>
                    <span>SOCIAL</span><br/>
                    <FontAwesomeIcon icon={faFacebook} /><br/>
                    <FontAwesomeIcon icon={faTwitter} /><br/>
                    <FontAwesomeIcon icon={faYoutube} /><br/>
                    <FontAwesomeIcon icon={faGooglePlus} /><br/>
                    <FontAwesomeIcon icon={faInstagram} /><br/>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default LandingPage;