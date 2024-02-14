import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {urls} from '@/config/urls';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarker, faQuestionCircle, faShoppingBag, faPhone } from '@fortawesome/free-solid-svg-icons';
import {InquiryModal} from '@/components/InquiryModal'
import GA from '@/utils/SiteAnalytics'
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export const Store = ({shop})=>{
    const {user} = useAuthContext 
    let [modalShow, setModalShow] = useState(false)
    let [shopRating, setShopRating] = useState(0)

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
        if(shop.reviews.length > 0 ){
            let shopRatings = shop.reviews.map((review) => {
                if(review.rating === undefined){
                    return 0
                }else{
                    return review.rating
                }
            })
            shopRating = shopRatings.reduce((prev, next) => prev + next) / shop.reviews.length
            setShopRating(shopRating)
        }
    }

    useEffect(()=>{
        calculateRating()
    }, [shop])

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
                    backgroundImage: `url(${urls.apiHost}/${shop.shop_image})`,
                    backgroundSize: 'cover',
                    borderBottom: '3px solid #007bff',
                    }}>
                <div style={{
                    backgroundColor: '#000000',
                    opacity: '0.6'
                }}>
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}>
                    {
                        user?.id > 0 ? <Button size={'sm'} onClick={()=> setModalShow(true)}><FontAwesomeIcon icon={faQuestionCircle}/>{`  Inquire`}</Button>
                        :<Link href={`/auth/login`}>
                            Login to Inquire
                        </Link>
                    }
                    &nbsp;
                    <Link href={`/stores/${shop.id}`}>
                    <Button size={'sm'}><FontAwesomeIcon icon={faShoppingBag}/>{`  Shop`}</Button>
                    </Link>
                    
                </div>
                <div style={{
                    color: '#ffffff',
                }}>
                    <Card.Title>{shop.name}</Card.Title>
                    <Card.Text><Rating
                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                        fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                        initialRating={shopRating} // to-do calculate average rating
                        readonly
                    /></Card.Text>
                    <Card.Text><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</Card.Text>
                    <Card.Text>
                    <Button size={'sm'} id={`numberBtn${shop.id}`} onClick={showNumber}> View Number</Button>
                    <p id={`numberTxt${shop.id}`} style={{
                        display: `none`
                    }}><FontAwesomeIcon icon={faPhone} />{`  ${shop.number}`}</p></Card.Text>
                </div>
                </div>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}