'use client'
import { useState } from 'react';
import {Button} from 'react-bootstrap';
import {urls} from '@/config/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarker, faQuestionCircle, faShoppingBag, faPhone } from '@fortawesome/free-solid-svg-icons';
import {InquiryModal} from '@/components/InquiryModal'
import GA from '@/utils/SiteAnalytics'
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Shop, ShopOptions, ShopDetails } from "@/styles/shopItem.module.css"

export const Store = ({shop})=>{
    const {user} = useAuthContext 
    let [modalShow, setModalShow] = useState(false)

    const showNumber = () =>{
        if(GA.init()){
            GA.recordNumberView()
        }
        let numberBtn = `numberBtn${shop.id}`
        let numberTxt = `numberTxt${shop.id}`
        let numberButton = document.getElementById(numberBtn)
        let numberText = document.getElementById(numberTxt)
        numberButton.style.display = 'none'
        numberText.style.display = 'block'
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

    const ratingStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    }

    return (
        <div>
            <InquiryModal shop={shop} part={null} show={modalShow} onHide={()=>{setModalShow(false)}}/>
            <div className={Shop} style={{
                backgroundImage: `url(${urls.apiHost}/${shop.shop_image})`
            }}>
                <div className={ShopOptions}>
                    <Link href={`/stores/${shop.id}`}>
                    <Button size={'sm'}><FontAwesomeIcon icon={faShoppingBag}/>{`  Shop`}</Button>
                    </Link>
                    {
                        user ? <Button size={'sm'} onClick={()=> setModalShow(true)}><FontAwesomeIcon icon={faQuestionCircle}/>{`  Inquire`}</Button>
                        :<Link href={`/auth/login`}>
                            Login to Inquire
                        </Link>
                    }
                    
                </div>
                <div className={ShopDetails}>
                    <p>{shop.name}</p>
                    <Rating
                        style={{ maxWidth: 100 }}
                        itemStyles={ratingStyles}
                        value={calculateRating()} // to-do calculate average rating
                        readonly
                        isDisabled
                    />
                    <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                    <Button size={'sm'} id={`numberBtn${shop.id}`} onClick={showNumber}> View Number</Button>
                    <span id={`numberTxt${shop.id}`} style={{
                        display: `none`
                    }}><FontAwesomeIcon icon={faPhone} />{`  ${shop.number}`}</span>
                </div>
                </div>
        </div>
    )
}