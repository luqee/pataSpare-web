'use client'
import {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {ShopLocation} from '@/components/ShopLocation';
import {ShopReviews} from '@/components/ShopReviews';
import {InquiryModal} from '@/components/InquiryModal';
import Rating from 'react-rating';
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';
import GA from '@/utils/SiteAnalytics'
import {getPart} from '@/utils/api'
import {urls} from '@/config/urls'
import PartButton from '@/components/PartButton';

function PartDetails({params}){

    const [part, setPart] = useState({})
    const [shop, setShop] = useState({})
    const [rating, setRating] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [modalShow, setModalShow] = useState(false)

    useEffect(()=>{
        fetchPart()
        new Viewer(document.getElementById('partImage'))
    }, [])

    const fetchPart = () => {
        getPart(params.id)
        .then((response) => {
            if (response.status === 200) {
                setPart(response.data.data.part)
                setShop(response.data.data.part.shop)
                calculateRating(response.data.data.part.shop)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // useEffect(()=>{
    //     calculateRating()
    // }, [shop])

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
            setRating(shopRating)
        }
    }

    const handleModal = (show) => {setModalShow(show)}
    
    const handleQty = (event) => {
        setQuantity(parseInt(event.target.value))
    }

    const showNumber = () =>{
        if(GA.init()){
            GA.recordNumberView()
        }
        let numberButton = document.getElementById('numberBtn')
        let numberTxt = document.getElementById('numberTxt')
        numberButton.style.display = 'none'
        numberTxt.style.display = 'block'
    }

    return (
        <Container>
            <InquiryModal shop={shop} part={part} show={modalShow} onHide={()=>{handleModal(false)}}/>
            <Row>
                <Col lg={8}>
                    <Row>
                        <Col>
                        <Image id={`partImage`} src={`${urls.apiHost}/${part.part_image}`} width={200} height={200} />
                        </Col>
                        <Col md={8}>
                        <p>{part.title}</p>
                        <p>{part.description}</p>
                        <p>{`In stock: ${part.stock}`}</p>
                        <p>{part.price}</p>
                        <div style={{
                            display: 'flex',
                            marginBottom: `20px`
                        }}>
                        <Form.Control style={{
                            width: 'auto',
                            marginRight: `20px`
                        }} type="number" min="1" max={`${part.stock}`} value={quantity} onChange={handleQty}/>
                        <PartButton partId={part.id} qty={quantity} />
                        </div>
                        <div>
                        <Button onClick={() => {handleModal(true)}}><FontAwesomeIcon icon={faQuestionCircle} /> Ask Question</Button>
                        </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Row  style={{
                        flexDirection: `column`,
                        alignItems: `center`,
                    }}>
                        <Col style={{
                            paddingBottom: `15px`
                        }}>
                        <Image src={`${urls.apiHost}/${shop.shop_image}`} height='100px' width='100px'/>
                        <p>{shop?.name}</p>
                        <Rating
                            emptySymbol={<FontAwesomeIcon icon={faStar} />}
                            fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                            initialRating={rating} // to-do calculate average rating
                            readonly
                        />
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
                    
                </Col>
            </Row>
        </Container>
    )
}

export default PartDetails