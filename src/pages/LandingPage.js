import React, { Component } from 'react';
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
import Categories from '../components/Categories';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <MainHeader />
                <Categories />
                <Products />
                <Promotion />
                <Stores />
                <Brands />
                <Contact />
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
                <Footer />
            </div>
        );
    }
}

export default LandingPage;