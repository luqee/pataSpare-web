'use client'
import { useState } from 'react';
import { Button, Col, Nav, Tab} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {urls} from '@/config/urls';
import {InquiryModal} from '@/components/InquiryModal'
import { LoginModal } from "@/components/LoginModal";
import { useAuthContext } from '@/context/AuthContext';
import { ShopReviews } from '../ShopReviews';
import { ShopRater } from '../ShopRater';

export const StoreContent = ({shop})=>{
    const {user} = useAuthContext()
    let [modalShow, setModalShow] = useState(false)
    let [modalLoginShow, setModalLoginShow] = useState(false)
    
    const handleModal = ()=>{
        if (user) {
            setModalShow(true)
        }else{
            setModalLoginShow(true)
        }
    }

    return <div>
        <Tab.Container id="details-left-tabs" defaultActiveKey="products">
            <Col lg={4}>
            <Nav variant="pills" className="flex-column" style={{
                width: '100'
            }}>
                <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="location">Location</Nav.Link>
                </Nav.Item>

            </Nav>
            </Col>
            <Col lg={8}>
            <Tab.Content>
                <Tab.Pane eventKey="products">
                <ShopProducts shop={shop} />
                </Tab.Pane>
                <Tab.Pane eventKey="location">
                <ShopLocation shop={shop} />
                </Tab.Pane>
                <Tab.Pane eventKey="reviews">
                    <div>
                        <LoginModal modalShow={modalLoginShow} onHide={()=>{setModalLoginShow(false)}}/>
                        <div className="userReview">
                            <ShopRater shop={shop} />
                            <Rating
                                initialRating={rating}
                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} color={`gold`}/>}
                                onClick={(value)=>{handleRating(value)}}
                            />
                            <Form.Control disabled={rating === 0 ? true:false} as="textarea" rows="5" placeholder="Your review.." value={review} onChange={handleChange}/>
                            <Button size={'sm'} variant="secondary" onClick={sendReview} disabled={sending?true:false}>
                            {sending?'Sending...': 'Send'}
                            </Button>
                        </div>
                        <div className={`reviews`}>
                            <p>User Reviews</p>
                            <ShopReviews shop={shop} />
                        </div>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="about">
                <p>{shop.description}</p>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>
    </div>
}