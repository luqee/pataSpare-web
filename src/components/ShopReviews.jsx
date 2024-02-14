import {ShopReview} from '@/components/ShopReview';

export const ShopReviews = ({shop})=>{
    
    return shop.reviews && shop.reviews.map((review, indx) => {
        return <ShopReview key={indx} review={review} />
    })
}