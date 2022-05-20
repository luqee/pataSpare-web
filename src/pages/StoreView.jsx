import {Link, useLocation, useParams} from 'react-router-dom';
import {Container, Row, Col, Tab, Nav, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopProducts from '../components/ShopProducts';
import urls from '../config/config';
import Rating from 'react-rating';
import InquiryModal from '../components/InquiryModal';
import { getShop } from '../api/api';
import { useContext, useEffect, useState } from 'react';
import ShopReviews from '../components/ShopReviews';
import { UserContext } from '../App';

function StoreView() {
    const user = useContext(UserContext).user
    const [shop, setShop] = useState({})
    const [modalShow, setModalShow] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        if(!location.state){
            fetchShopDetails()
        }else{
            setShop(location.state.shop)
        }
    }, [])
    const params = useParams()
    const fetchShopDetails = () => {
        getShop(params.shopId, (response) => {
            if (response.status === 200) {
                setShop(response.data.shop)
            }
        })
    }

    let shopRating = 0
    if(shop.reviews && shop.reviews.length > 0 ){
        let shopRatings = shop.reviews.map((review) => {
            if(review.rating === undefined){
                return 0
            }else{
                return review.rating
            }
        })
        shopRating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
    }
    return (Object.keys(shop).length === 0) ? <p>No details</p>:(
        <Container>
            <Row style={{
                flexDirection: 'column'
            }}>
                <InquiryModal shop={shop} part={null} show={modalShow} onHide={()=> setModalShow(false)} />
                <Col>
                <div style={{
                    position: 'inherit',
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                }}>
                    {
                        Object.keys(user).length > 0? <Button style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px'
                        }} onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faQuestionCircle} />  Inquiry</Button>
                        :<Link style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px'
                        }} to={{
                            pathname:`/auth/login`,
                            state: {from: location.pathname}
                        }}>
                            Login to Inquire
                        </Link>
                    }

                </div>
                </Col>
                <Col style={{
                    padding: '15px',
                    color: '#ffffff',
                    backgroundColor: '#343a40'
                }}>
                <p>{shop.name}</p>
                <Rating
                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                    fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                    initialRating={shopRating}
                    readonly
                />
                <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                <p><FontAwesomeIcon icon={faPhone} />  {shop.number}</p>
                </Col>
            </Row>
            <Row style={{
                paddingTop: '15px'
            }}>
            <Tab.Container id="details-left-tabs" defaultActiveKey="products">
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
                        <ShopLocation shop={shop} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                        <ShopReviews shop={shop} />
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
