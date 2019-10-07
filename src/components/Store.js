import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import urls from '../config/config';
import {Link} from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarker } from '@fortawesome/free-solid-svg-icons';

function Store(props){
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
        <Container>
            <Row>
                <Col>
                <Link to={{
                    pathname: `/stores/${shop.id}`,
                    state: {shop: shop}
                }}>
                    <Card style={{
                        width: '100%',
                        backgroundImage: `url(${urls.hostRoot}/${shop.shop_image})`,
                        backgroundSize: 'cover',
                        }}>
                    <Card.Title>{shop.name}</Card.Title>
                    <Card.Text><Rating
                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                        fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                        initialRating={shopRating} // to-do calculate average rating
                        readonly
                    /></Card.Text>
                    <Card.Text><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</Card.Text>
                    </Card>
                </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Store;