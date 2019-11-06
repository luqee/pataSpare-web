import React, { useState, useContext } from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import urls from '../config/config';
import {Link} from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarker, faQuestionCircle, faShoppingBag, faPhone } from '@fortawesome/free-solid-svg-icons';
import InquiryModal from './InquiryModal';
import { UserContext } from '../App';

function Store(props){
    let [modalShow, setModalShow] = useState(false)
    let userContext = useContext(UserContext)
    const shop = props.shop;
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
    return (
        <Container style={{
            paddingBottom: '10px',
            minHeight: '50px',
        }}>
            <InquiryModal shop={shop} part={null} show={modalShow} onHide={()=>{setModalShow(false)}}/>
            <Row>
                <Col>
                <Card style={{
                    width: '100%',
                    backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                    borderBottom: '3px solid #007bff',
                    }}>
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}>
                    {
                        Object.keys(userContext.user).length > 0 ? <Button size={'sm'} onClick={()=> setModalShow(true)}><FontAwesomeIcon icon={faQuestionCircle}/>{`  Inquire`}</Button>
                        :<Link to={{
                            pathname:`/user/login`,
                            state: {from: props.location.pathname}
                        }}>
                            Login to Inquire
                        </Link>
                    }
                    &nbsp;
                    <Link to={{
                        pathname: `/stores/${shop.id}`,
                        state: {shop: shop}
                    }}>
                    <Button size={'sm'}><FontAwesomeIcon icon={faShoppingBag}/>{`  Shop`}</Button>
                    </Link>
                    
                </div>
                <div style={{
                    color: '#212529',
                }}>
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text><Rating
                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                    fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                    initialRating={shopRating} // to-do calculate average rating
                    readonly
                /></Card.Text>
                <Card.Text><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</Card.Text>
                <Card.Text><FontAwesomeIcon icon={faPhone} />  {shop.number}</Card.Text>
                </div>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Store;