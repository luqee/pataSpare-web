'use client'
import {Button, Col, Container, Row} from 'react-bootstrap';
import {urls} from '@/config/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone} from '@fortawesome/free-solid-svg-icons';
import {ShopLocation} from '@/components/ShopLocation';
import {ShopReviews} from '@/components/ShopReviews';
import GA from '@/utils/SiteAnalytics'
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { ShopRating } from "@/components/ShopRating";

export const ShopSection = ({shop})=>{
    const {user} = useAuthContext()

    const showNumber = () =>{
        if(GA.init()){
            GA.recordNumberView()
        }
        let numberButton = document.getElementById('numberBtn')
        let numberTxt = document.getElementById('numberTxt')
        numberButton.style.display = 'none'
        numberTxt.style.display = 'block'
    }

    const calculateRating = (shop)=>{
        let shopRatings = shop.reviews.map((review) => {
            if(review.rating === undefined){
                return 0
            }else{
                return review.rating
            }
        })
        if(shopRatings.length > 0){
            let shopRating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
            return shopRating
        }
        return 0
    }

    return (
        <Container>
            <Row  style={{
                flexDirection: `column`,
                alignItems: `center`,
            }}>
                <Col style={{
                    paddingBottom: `15px`
                }}>
                <Image src={`${urls.apiHost}/${shop.shop_image}`} height={100} width={100}/>
                <p>{shop?.name}</p>
                <ShopRating shop={shop} />
                <p><FontAwesomeIcon icon={faMapMarker} />{`  ${shop?.location}`}</p>
                <Button id={`numberBtn`} onClick={showNumber}> View Number</Button>
                <p id={`numberTxt`} style={{
                    display: `none`
                }}><FontAwesomeIcon icon={faPhone} />{`  ${shop?.number}`}</p>
                </Col>
                <Col style={{
                    paddingBottom: `15px`
                }} className={`location`}>
                    <ShopLocation shop={shop}/>
                </Col>
                <Col style={{
                    paddingBottom: `15px`
                }} className={`reviews`}>
                <p>Reviews</p>
                    <ShopReviews shop={shop} />
                </Col>
            </Row>
        </Container>
    )
}