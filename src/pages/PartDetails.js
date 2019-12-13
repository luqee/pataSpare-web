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
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';
import { CartContext } from '../App';
import recordNumberView from '../api/GoogleAnalytics';

const cartService = new CartService();

class PartDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            part: {},
            quantity: 1,
            modalShow: false,
        }
        
    }
    static contextType = CartContext
    componentDidMount = () => {
        if(this.props.location.state){
            this.setState({part: this.props.location.state.part})
        }else{
            console.log(`fetching part ----no see----`)
            this.fetchPartDetails()
        }
        new Viewer(document.getElementById('partImage'))
    }
    fetchPartDetails = () => {
        autoAPI.get(`/parts/${this.props.match.params.id}`)
        .then((response) => {
            if (response.data.status === 200) {
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
        let item_to_add  = {
            part_id: this.state.part.id,
            quantity: parseInt(this.state.quantity)
        }
        cartService.addToCart(item_to_add, this.context.cart, (cart)=> {
            if(cart){
                let cartContext = this.context
                cartContext.updateCart(cart)
            }
        });
        
    }
    showNumber = () =>{
        recordNumberView()
        let numberButton = document.getElementById('numberBtn')
        let numberTxt = document.getElementById('numberTxt')
        numberButton.style.display = 'none'
        numberTxt.style.display = 'block'
    }
    render() {
        
        let part = this.state.part
        let shop = this.props.location.state.shop
        let qty = this.state.quantity
        let shopRating = 0
        if(Object.keys(shop).length > 0){
            let shopRatings = shop.reviews.map((review) => {
                if(review.rating === undefined){
                    return 0
                }else{
                    return review.rating
                }
            })
            if(shopRatings.length > 0){
                shopRating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
            }
        }
        
        return (part === {}) ? (
            <div></div>
        ):(
            <Container>
                <InquiryModal shop={shop} part={part} show={this.state.modalShow} onHide={()=>{this.handleModal(false)}}/>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col>
                            <Image id={`partImage`} src={`${urls.hostRoot}/${part.part_image}`} width={200} height={200} />
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
                            <Image src={`${urls.hostRoot}/${shop.shop_image}`} height='100px' width='100px'/>
                            <p>{shop.name}</p>
                            <Rating
                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                                initialRating={shopRating} // to-do calculate average rating
                                readonly
                            />
                            <p><FontAwesomeIcon icon={faMapMarker} />{`  ${shop.location}`}</p>
                            <Button id={`numberBtn`} onClick={this.showNumber}> View Number</Button>
                            <p id={`numberTxt`} style={{
                                display: `none`
                            }}><FontAwesomeIcon icon={faPhone} />{`  ${shop.number}`}</p>
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
                                        <p></p>
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
  