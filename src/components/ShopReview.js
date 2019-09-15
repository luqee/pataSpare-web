import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';

function ShopReview(props){
    const review = props.review;
    return (
        <div>
            {review.review}
        </div>
    )
}

export default ShopReview;