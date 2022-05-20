import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Rating from "react-rating"
import { Link } from "react-router-dom"
import { postReview } from "../api/api"
import { UserContext } from "../App"
import ShopReview from "./ShopReview"

function ShopReviews({shop}){
    const user = useContext(UserContext).user
    const [userRating, setUserRating] = useState(0)
    const [userReview, setUserReview] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const shopReviews = shop.reviews
    const sendReview = () => {
        setLoading(true)
        let newReview = {
            rating: parseInt(userRating),
            review: userReview,
            shop_id: shop.id,
        }
        postReview(newReview, (response) => {
            if (response.status === 201) {
                setLoading(false)
                // this.setState({review: ''})
                // this.setState({rating: 0})
                // this.fetchShopDetails()
            }
        })
    }
    
    return (
        <div>
        {
            Object.keys(user).length > 0 ? <div className="userReview">
                <Rating
                    initialRating={userRating}
                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                    fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                    onClick={(value)=> setUserRating(value)}
                />
                <Form.Control disabled={userRating === 0 ? true:false} as="textarea" rows="5" placeholder="Your review.." value={userReview} onChange={(event)=>setUserReview(event.target.value)} />
                <Button size={'sm'} variant="secondary" onClick={sendReview} disabled={loading?true:false}>
                {loading?'Sending...': 'Send'}
                </Button>
            </div>
            :
            <Link to={{
                pathname: `/auth/login`,
                state: {from: location.pathname}
            }}>
                Login to review store
            </Link>
        }
            <div className={`reviews`}>
                <p>Reviews</p>
                {
                    (shopReviews !== undefined && shopReviews.length > 0) ? (
                        shopReviews.map((review) => {
                            return <ShopReview key={review.id} review={review} />
                        })
                    ):(
                        <p></p>
                    )
                }
            </div>
        </div>
    )
}

export default ShopReviews