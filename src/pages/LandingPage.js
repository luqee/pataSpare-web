import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFacebook, faTwitter, faYoutube, faGooglePlus, faInstagram } from '@fortawesome/free-solid-svg-icons';
import exterior from '../images/exterior.png';
import interior from '../images/interior.png';
import performance from '../images/performance.png';
import accessories from '../images/accessories.png';
import carouselBack from '../images/corouselBack.png';
import Toyota from '../images/7.png';
import Merc from '../images/8.png';
import Bmw from '../images/9.png';
import Vw from '../images/10.png';
import Sub from '../images/11.png';
import Nissan from '../images/12.png';
import Mpesa from '../images/14.png';
import Bank from '../images/15.png';
import Visa from '../images/16.png';
import Master from '../images/17.png';
import Paypal from '../images/18.png';
import Mitsu from '../images/13.png';
import {Container, Col, Row, Tabs, Tab, Carousel, Card, Image} from 'react-bootstrap';

class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <div className='banner'>
                    <p>The Textbook Platform for Auto Parts Business</p>
                    <p>The best eCommerce solution for auto parts</p>
                </div>
                <div className='search-bar'>
                    <form className="example" action="action_page.php">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>
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
                <Container className='products'>
                    <Row>
                        <Col>
                        <Tabs defaultActiveKey='featured' id='categoryTabs'>
                        <Tab eventKey='featured' title='FEATURED PRODUCTS'>
                            featured products
                        </Tab>
                        <Tab eventKey='exterior' title='EXTERIOR'>
                            filtered by exterior
                        </Tab>
                        <Tab eventKey='interior' title='INTERIOR'>
                            filtered by interior
                        </Tab>
                        <Tab eventKey='performance' title='PERFORMANCE'>
                            filtered by performance
                        </Tab>
                        <Tab eventKey='accessories' title='ACCESSORIES'>
                            filtered by accessories
                        </Tab>
                        </Tabs>
                        </Col>
                    </Row>
                </Container>
                <Container className='promo' style={{backgroundImage: `url(${carouselBack})`}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Col lg={4}>
                        <Carousel>
                        <Carousel.Item>
                        <Card>
                        <Card.Body>
                            <Card.Title>OUTSTANDING SERVICE</Card.Title>
                            <Card.Text>
                            Many payment methods and
                            convenient search for accessories for
                            your car.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                        <Card>
                        <Card.Body>
                            <Card.Title>GREATLY REDUCED PRICES</Card.Title>
                            <Card.Text>
                            With us you get the best prices on the 
                            whole range.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                        <Card>
                        <Card.Body>
                            <Card.Title>HUGE ASSORTMENT</Card.Title>
                            <Card.Text>
                            Free selection from over 50,000 
                            accessory products.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </Carousel.Item>
                        </Carousel>
                        </Col>
                    </Row>
                </Container>
                <Container className='partnerstore'>
                    <Row>
                        <Col>
                        <h3>Stores Selling Auto parts</h3>
                        <p>Auto Parts Sellers Thriving on pitstop autoclinic</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <p>Some partner stores..</p>
                        </Col>
                    </Row>
                </Container>
                <Container className='partnerBrands'>
                    <Row>
                        <Col>
                        <h3>QUALITY CAR SPARE PARTS FROM TOP BRANDS</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Image src={Toyota} />
                        </Col>
                        <Col>
                        <Image src={Merc} />
                        </Col>
                        <Col>
                        <Image src={Bmw} />
                        </Col>
                        <Col>
                        <Image src={Vw} />
                        </Col>
                        <Col>
                        <Image src={Sub} />
                        </Col>
                        <Col>
                        <Image src={Nissan} />
                        </Col>
                        <Col>
                        <Image src={Mitsu} />
                        </Col>
                    </Row>
                </Container>
                <Container className='paymentOptions'>
                    <Row>
                        <Col lg={1}>
                        Accept online
                        payments with:
                        </Col>
                        <Col lg={11}>
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
                    <span>SUPPORT</span>
                    Contact Us
                    
                    </Col>
                    <Col>
                    <span>LEGAL</span>
                    Privacy Policy
                    Returns Policy
                    </Col>
                    <Col>
                    <span>SOCIAL</span>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faYoutube} />
                    <FontAwesomeIcon icon={faGooglePlus} />
                    <FontAwesomeIcon icon={faInstagram} />
                    </Col>
                </Container>
            </div>
        );
    }
}

export default LandingPage;