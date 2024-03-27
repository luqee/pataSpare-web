'use client'
import {Container, Row, Col, Tab, Nav, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {ShopLocation} from '@/components/ShopLocation';
import {ShopProducts} from '@/components/ShopProducts';
import {ShopReview} from '@/components/ShopReview';
import {urls} from '@/config/urls';
import Rating from 'react-rating';
import {InquiryModal} from '@/components/InquiryModal';
import { useEffect, useState } from 'react';
import { getShop, postReview } from '@/utils/api';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';

const StoreView = ({params})=>{
    const {user} = useAuthContext()
    const [shop, setShop] = useState({})
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [currentRating, setCurrentRating] = useState(0)
    const [modalShow, setModalShow] = useState(false)
    const [sending, setSending] = useState(false)

    const fetchShop = () => {
        getShop(params.id)
        .then((response) => {
            if (response.status === 200) {
                setShop(response.data.data.shop)
                // let path = {
                //     pathname: props.location.pathname,
                //     state: {shop: response.data.data.shop}
                // }
                // this.setState({shop: response.data.data.shop})
                // this.props.history.push(path)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchShop()
    }, [])

    useEffect(()=>{
        calculateRating()
    }, [shop])

    const calculateRating = ()=>{
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
            setCurrentRating(shopRating)
        }
    }

    const handleModal = (show) => setShop(show)
    const handleChange = (event) => setReview(event.target.value)
    const handleRating = (rating) => setRating(rating)

    const sendReview = () => {
        setSending(true)
        let newReview = {
            rating: parseInt(rating),
            review: review,
            shop_id: shop.id,
        }
        postReview(newReview)
        .then((response) => {
            setSending(false)
            if (response.data.status === 201) {
                setReview('')
                setRating(0)
                // this.fetchShopDetails()
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (Object.keys(shop).length === 0) ? <p>No details</p>:(
        <Container>
            <Row style={{
                flexDirection: 'column'
            }}>
                <InquiryModal shop={shop} part={null} show={modalShow} onHide={()=>{handleModal(false)}}/>
                <Col>
                <div style={{
                    position: 'inherit',
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url(${urls.apiHost}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                    }}>
                        {
                            user? <Button style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px'
                            }} onClick={() => {handleModal(true)}}><FontAwesomeIcon icon={faQuestionCircle} />  Inquiry</Button>
                            :<Link style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px'
                            }} href={`/auth/login`}>
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
                    initialRating={currentRating}
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
                        <div>
                        {
                            user ? <div className="userReview">
                                <Rating
                                    initialRating={rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                                    onClick={(value)=>{handleRating(value)}}
                                />
                                <Form.Control disabled={rating === 0 ? true:false} as="textarea" rows="5" placeholder="Your review.." value={review} onChange={handleChange}/>
                                <Button size={'sm'} variant="secondary" onClick={sendReview} disabled={sending?true:false}>
                                {sending?'Sending...': 'Send'}
                                </Button>
                            </div>
                            :
                            <Link href={`/auth/login`}>
                                Login to review store
                            </Link>
                        }
                            <div className={`reviews`}>
                                <p>Reviews</p>
                                {
                                    (shop.reviews !== undefined && shop.reviews.length > 0) ? (
                                        shop.reviews.map((review, indx) => {
                                            return <ShopReview key={indx} review={review} />
                                        })
                                    ):(
                                        <p></p>
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
