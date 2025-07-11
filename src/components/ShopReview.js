import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

export const ShopReview = ({review})=>{
    return (
        <Card>
            <Card.Header><span>{`${review.user.name} `}<Rating 
                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                initialRating={review.rating}
                readonly
            /></span>
            </Card.Header>
            <Card.Body>
            <p>{review.review}</p>
            </Card.Body>
            
        </Card>
    )
}