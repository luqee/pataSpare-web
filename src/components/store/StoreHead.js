'use client'
import { useState } from 'react';
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {urls} from '@/config/urls';
import {InquiryModal} from '@/components/InquiryModal'
import { LoginModal } from "@/components/LoginModal";
import { useAuthContext } from '@/context/AuthContext';
import { ShopRating } from "@/components/ShopRating";

export const StoreHead = ({shop})=>{
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
        <InquiryModal shop={shop} part={null} modalShow={modalShow} onHide={()=>{setModalShow(false)}}/>
        <LoginModal modalShow={modalLoginShow} onHide={()=>{setModalLoginShow(false)}}/>
        <div style={{
            position: 'inherit',
            width: '100%',
            height: '300px',
            backgroundImage: `url(${urls.apiHost}/${shop.shop_image})`,
            backgroundSize: 'cover',
            }}>
                <Button style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px'
                }} onClick={() => {handleModal()}}><FontAwesomeIcon icon={faQuestionCircle} />  Inquire
                </Button>
                <div style={{
                    padding: '15px',
                    color: '#ffffff',
                    backgroundColor: '#343a40'
                }}>
                    <p>{shop.name}</p>
                    <ShopRating shop={shop} />
                    <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                    <p><FontAwesomeIcon icon={faPhone} />  {shop.number}</p>
                </div>
        </div>
    </div>
}