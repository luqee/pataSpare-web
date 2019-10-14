import React from 'react'
import {Container, Row, Col, Tab, Nav, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopProducts from '../components/ShopProducts';
import ShopReview from '../components/ShopReview';
import urls from '../config/config';
import Rating from 'react-rating';
import InquiryModal from '../components/InquiryModal';
import autoAPI from '../api/api';

class StoreView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shop: {
                reviews: []
            },
            review: '',
            rating: 0,
            modalShow: false
        }
    }

    componentDidMount = () => {
        if(!this.props.location.state){
            this.fetchShopDetails()
        }else{
            this.setState({shop: this.props.location.state.shop})
        }
    }
    // const [modalShow, setModalShow] = useState(false)
    // const [review, setReview] = useState('')
    // const [rating, setRating] = useState(0)
    // const [shop, setShop] = useState({})
    handleModal = (show) => {this.setState({modalShow: show})}
    handleChange = (event) => {this.setState({review: event.target.value})}
    setRating = (rating) => {this.setState({rating: rating})}
    setShop = (shop) => {this.setState({shop: shop})}
    fetchShopDetails = () => {
        autoAPI.get(`/shops/${this.props.match.params.id}/`)
        .then((response) => {
            if (response.data.status === 200) {
                console.log(response.data.data.shop);
                this.setState({shop: response.data.data.shop})
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    
    sendReview = () => {
        let newReview = {
            rating: parseInt(this.state.rating),
            review: this.state.review,
            shop_id: this.state.shop.id,
        }
        autoAPI.post('/reviews', JSON.stringify(newReview), {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((response) => {
            console.log(response);
            if (response.data.status === 201) {
                this.fetchShopDetails()
            }
        })
        .catch((error) => {
            console.log(error);
        
        });
    }
    render = () => {
        let shop = this.state.shop
        let shopRating = 0
        if(shop.reviews.length > 0 ){
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
                    <InquiryModal shop={shop} part={null} show={this.state.modalShow} onHide={()=>{this.handleModal(false)}}/>
                    <Col>
                    <div style={{
                        position: 'inherit',
                        width: '100%',
                        height: '300px',
                        backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                        backgroundSize: 'cover',
                        }}>
                        <Button style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px'
                        }} onClick={() => {this.handleModal(true)}}><FontAwesomeIcon icon={faQuestionCircle} />  Inquiry</Button>
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
                        <ShopProducts history={this.props.history} shop={shop} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="location">
                        <ShopLocation shop={shop} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews">
                            <div>
                                <div>
                                <Rating
                                    initialRating={this.state.rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                                    onClick={(value)=>{this.setRating(value)}}
                                />
                                <Form.Control as="textarea" rows="5" placeholder="Your review.." onChange={this.handleChange}/>
                                <Button variant="secondary" onClick={this.sendReview}>
                                Send
                                </Button>
                                </div>
                            
                                <div className={`reviews`}>
                                    <p>Reviews</p>
                                    {
                                        (shop.reviews !== undefined && shop.reviews.length > 0) ? (
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
}
export default StoreView;