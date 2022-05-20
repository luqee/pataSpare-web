import React, { useContext, useEffect, useState } from 'react';
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar ,faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopReview from '../components/ShopReview';
import urls from '../config/config';
import { addToCart } from '../api/cart';
import InquiryModal from '../components/InquiryModal';
import Rating from 'react-rating';
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';
import  CartContext  from '../App';
import GA from '../api/GoogleAnalytics'
import { useLocation } from 'react-router-dom';

function PartDetails() {
    const location = useLocation()
    const part = location.state.part
    const [quantity, setQuantity] = useState(1)
    const [modalShow, setModalShow] = useState(false)

    useEffect(()=>{
        new Viewer(document.getElementById('partImage'))
    }, [])

    const handleModal = (show) => setModalShow(show)
    
    const handleQty = (event) => setQuantity(parseInt(event.target.value))

    const cartContext = useContext(CartContext)
    let [adding, setAdding] = useState(false)
    const addItem = () => {
        setAdding(true)
        let item_to_add  = {
            part_id: part.id,
            quantity: parseInt(quantity)
        }
        addToCart(item_to_add, cartContext.cart, (cart)=> {
            if(cart){
                setAdding(false)
                cartContext.updateCart(cart)
            }
        })
    }
    const showNumber = () =>{
        if(GA.init()){
            GA.recordNumberView()
        }
        let numberButton = document.getElementById('numberBtn')
        let numberTxt = document.getElementById('numberTxt')
        numberButton.style.display = 'none'
        numberTxt.style.display = 'block'
    }

    const getShopRating = ()=>{
        let shopRating = 0
        if(Object.keys(part.shop).length > 0){
            let shopRatings = part.shop.reviews.map((review) => {
                if(review.rating === undefined){
                    return 0
                }else{
                    return review.rating
                }
            })
            if(shopRatings.length > 0){
                shopRating = shopRatings.reduce((prev, next) => prev + next) / part.shop.reviews.length
            }
        }
        
        return shopRating
    }

    return (
        <Container>
            <InquiryModal shop={part.shop} part={part} show={modalShow} onHide={()=>{handleModal(false)}}/>
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
                        }} type="number" min="1" max={`${part.stock}`} value={quantity} onChange={handleQty} />
                        <Button onClick={addItem}><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</Button>
                        </div>
                        <div>
                        <Button onClick={() => {handleModal(true)}}><FontAwesomeIcon icon={faQuestionCircle} /> Ask Question</Button>
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
                        <Image src={`${urls.hostRoot}/${part.shop.shop_image}`} height='100px' width='100px'/>
                        <p>{part.shop.name}</p>
                        <Rating
                            emptySymbol={<FontAwesomeIcon icon={faStar} />}
                            fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                            initialRating={getShopRating()} // to-do calculate average rating
                            readonly
                        />
                        <p><FontAwesomeIcon icon={faMapMarker} />{`  ${part.shop.location}`}</p>
                        <Button id={`numberBtn`} onClick={showNumber}> View Number</Button>
                        <p id={`numberTxt`} style={{
                            display: `none`
                        }}><FontAwesomeIcon icon={faPhone} />{`  ${part.shop.number}`}</p>
                        </Col>
                        <Col style={{
                            paddingBottom: `15px`
                        }} className={`location`}>
                            <ShopLocation shop={part.shop}/>
                        </Col>
                        <Col style={{
                            paddingBottom: `15px`
                        }} className={`reviews`}>
                        <p>Reviews</p>
                            {
                                (part.shop.reviews !== null && part.shop.reviews.length > 0) ? (
                                    part.shop.reviews.map((review) => {
                                        return <ShopReview key={review.id} review={review} />
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

export default PartDetails;
  