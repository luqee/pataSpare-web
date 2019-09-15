import React, { Component } from 'react';
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import ShopLocation from '../components/ShopLocation';
import ShopReview from '../components/ShopReview';
import urls from '../config/config';
import CartService from '../api/cart';
import InquiryModal from '../components/InquiryModal';

const cartService = new CartService();

class PartDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            part: props.location.state.part,
            shop: props.location.state.part.shop,
            quantity: 1,
            modalShow: false
        }
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
                console.log('added');
            }
        });
        
    }
    render() {
        const part = this.state.part
        const shop = this.state.shop
        const qty = this.state.quantity
        return (
            <Container>
                <InquiryModal show={this.state.modalShow} onHide={()=>{this.handleModal(false)}}/>
                <Row>
                    <Col lg={6}>
                        <Image src={`${urls.hostRoot}/${part.part_image}`} width={200} height={200} />
                        <p>{part.title}</p>
                        <p>{part.description}</p>
                        <p>{`In stock: ${part.stock}`}</p>
                        <p>{part.price}</p>
                        <div>
                        <Form.Control type="number" min="1" max={`${part.stock}`} value={qty} onChange={this.handleQty}/>
                        <Button onClick={this.addToCart}>Add to cart</Button>
                        </div>
                        <div>
                        <Button onClick={() => {this.handleModal(true)}}>Ask Question</Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Image src={`${urls.hostRoot}/${shop.shop_image}`} height='100px'/>
                        <p>{shop.name}</p>
                        <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                        <p><FontAwesomeIcon icon={faPhone} />bizness phone</p>
                        <div className={`location`}>
                            <ShopLocation shop={shop}/>
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PartDetails;
  