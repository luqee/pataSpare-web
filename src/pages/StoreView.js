import React from 'react'
import {Container, Row, Col, Tab, Nav, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopProducts from '../components/ShopProducts';
import ShopReview from '../components/ShopReview';
import urls from '../config/config';
import Rating from 'react-rating';

function StoreView(props){
    let shop = props.location.state.shop
    return (
        <Container>
            <Row style={{
                flexDirection: 'column'
            }}>
                <Col>
                <div style={{
                    width: '100%',
                    backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                    }}>
                    <Button style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px'
                    }}>Inquiry</Button>
                </div>
                </Col>
                <Col>
                <p>{shop.name}</p>
                <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                <p><FontAwesomeIcon icon={faPhone} />bizness phone</p>
                </Col>
            </Row>
            <Row>
            <Tab.Container id="details-left-tabs" defaultActiveKey="shop">
                <Col lg={4}>
                <Nav variant="pills" className="flex-column" style={{
                    width: '100'
                }}>
                    <Nav.Item>
                    <Nav.Link eventKey="products">Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="location">Location</Nav.Link>
                    </Nav.Item>
                    
                </Nav>
                </Col>
                <Col lg={8}>
                <Tab.Content>
                    <Tab.Pane eventKey="products">
                    <ShopProducts shop={shop} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="location">
                    <div style={{ width: '100%', height: '100%' }}>
                    <ShopLocation shop={shop} />
                    </div>
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                        <div>
                            <div>
                            <Rating
                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                            />

                            </div>
                        
                            <div className={`reviews`}>
                                {
                                    (shop.reviews !== null && shop.reviews.length > 0) ? (
                                        shop.reviews.map((review, indx) => {
                                            return <ShopReview key={indx} review={review} />
                                        })
                                    ):(
                                        <p>No Reviews</p>
                                    )
                                }
                            </div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="about">
                    <p>{shop.description}</p>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Tab.Container>
            </Row>
        </Container>
    )
}
export default StoreView;