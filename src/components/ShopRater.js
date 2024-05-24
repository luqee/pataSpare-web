import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

export const ShopRater = ({shop})=>{
    const ratingStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    }

    const calculateRating = ()=>{
        let rating = 0
        if(shop.reviews.length > 0 ){
            let shopRatings = shop.reviews.map((review) => {
                if(review.rating === undefined){
                    return 0
                }else{
                    return review.rating
                }
            })
            rating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
        }
        return rating
    }

    return <Rating
    style={{ maxWidth: 100 }}
    itemStyles={ratingStyles}
    value={calculateRating()} // to-do calculate average rating
    readonly
    isDisabled
/>
}