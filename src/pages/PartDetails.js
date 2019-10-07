import React, { Component } from 'react';
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar ,faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopReview from '../components/ShopReview';
import urls from '../config/config';
import CartService from '../api/cart';
import InquiryModal from '../components/InquiryModal';
import Rating from 'react-rating';
import autoAPI from '../api/api';

const cartService = new CartService();

class PartDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            part: {
                shop: {
                    reviews: []
                }
            },
            quantity: 1,
            modalShow: false,
        }
        
    }
    componentDidMount = () => {
        console.log(`Checking props`)
        console.log(this.props);
        
        if(this.props.location !== undefined){
            console.log(`setting part fron locatio state`)
            this.setState({part: this.props.location.state.part})
            
        }else{
            console.log(`fetching part`)
            this.fetchPartDetails()
        }
    }
    fetchPartDetails = () => {
        autoAPI.get(`/parts/${this.props.match.params.id}`)
        .then((response) => {
            if (response.data.status === 200) {
                console.log(response.data.data.part);
                this.setState({part: response.data.data.part})
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    handleModal = (show) => {this.setState({modalShow: show})}
    
    handleQty = (event) => {
        this.setState({quantity: parseInt(event.target.value)})
    }
    
    addToCart = () => {
        console.log('addint to cart');
        let item_to_add  = {
            part_id: this.state.part.id,
            quantity: parseInt(this.state.quantity)
        }
        cartService.addToCart(item_to_add, (added)=> {
            if(added){
                let path = {
                    pathname: this.props.location.pathname,
                    state: {
                        part: this.state.part
                    }
                }
                this.props.history.push('')
                this.props.history.push(path)
            }
        });
        
    }
    render() {
        let part = this.state.part
        let shop = part.shop
        let qty = this.state.quantity
        let shopRating = 0
        if(part.shop.reviews.length > 0 ){
            let shopRatings = part.shop.reviews.map((review) => {
                if(review.rating === undefined){
                    return 0
                }else{
                    return review.rating
                }
            })
            shopRating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
        }
        
        return (part === {}) ? (
            <div>No item to view</div>
        ):(
            <Container>
                <InquiryModal shop={shop} part={part} show={this.state.modalShow} onHide={()=>{this.handleModal(false)}}/>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col>
                            <Image src={`${urls.hostRoot}/${part.part_image}`} width={200} height={200} />
                            </Col>
                            <Col md={8}>
                            <p>{part.title}</p>
                            <p>{part.description}</p>
                            <p>{`In stock: ${part.stock}`}</p>
                            <p>{part.price}</p>
                            <div style={{
                                display: 'flex',
                                marginBottom: `20px`
                            }}>
                            <Form.Control style={{
                                width: 'auto',
                                marginRight: `20px`
                            }} type="number" min="1" max={`${part.stock}`} value={qty} onChange={this.handleQty}/>
                            <Button onClick={this.addToCart}><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</Button>
                            </div>
                            <div>
                            <Button onClick={() => {this.handleModal(true)}}><FontAwesomeIcon icon={faQuestionCircle} /> Ask Question</Button>
                            </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row  style={{
                            flexDirection: `column`,
                            alignItems: `center`,
                        }}>
                            <Col style={{
                                paddingBottom: `15px`
                            }}>
                            <Image src={`${urls.hostRoot}/${shop.shop_image}`} height='100px'/>
                            <p>{shop.name}</p>
                            <Rating
                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                                initialRating={shopRating} // to-do calculate average rating
                                readonly
                            />
                            <p><FontAwesomeIcon icon={faMapMarker} />{`  ${shop.location}`}</p>
                            <p><FontAwesomeIcon icon={faPhone} />{`  ${shop.number}`}</p>
                            </Col>
                            <Col style={{
                                paddingBottom: `15px`
                            }} className={`location`}>
                                <ShopLocation shop={shop}/>
                            </Col>
                            <Col style={{
                                paddingBottom: `15px`
                            }} className={`reviews`}>
                            <p>Reviews</p>
                                {
                                    (shop.reviews !== null && shop.reviews.length > 0) ? (
                                        shop.reviews.map((review, indx) => {
                                            return <ShopReview key={indx} review={review} />
                                        })
                                    ):(
                                        <p>No Reviews</p>
                                    )
                                }
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PartDetails;
  