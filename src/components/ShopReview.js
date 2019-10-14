import React from 'react';
import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ShopReview(props){
    const review = props.review;
    return (
        <div>
            <span>{`${review.user.name} `}</span><Rating 
                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                initialRating={review.rating}
                readonly
            />
            <p>
            {review.review}
            </p>
        </div>
    )
}

export default ShopReview;