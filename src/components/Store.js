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
import { ShopRating } from "@/components/ShopRating";
import { Shop, ShopOptions, ShopDetails, StoreLink } from "@/styles/shopItem.module.css"
import { LoginModal } from './LoginModal';

export const Store = ({shop})=>{
    const {user} = useAuthContext()
    let [modalShow, setModalShow] = useState(false)
    let [modalLoginShow, setModalLoginShow] = useState(false)

    const showNumber = (e) =>{
        e.preventDefault()
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

    return (
        <div>
            <InquiryModal shop={shop} part={null} modalShow={modalShow} onHide={()=>{setModalShow(false)}}/>
            <LoginModal modalShow={modalLoginShow} onHide={()=>{setModalLoginShow(false)}}/>
            <Link href={`/stores/${shop.id}`} className={StoreLink}>
            <div className={Shop} style={{
                backgroundImage: `url(${urls.apiHost}/${shop.shop_image})`
            }}>
                <div className={ShopOptions}>
                    {/* <Link href={`/stores/${shop.id}`}>
                    <Button size={'sm'}><FontAwesomeIcon icon={faShoppingBag}/>{`  Shop`}</Button>
                    </Link> */}
                    <Button style={{
                        position: 'relative',
                        zIndex: 10
                    }} size={'sm'} onClick={(e)=> {
                        e.preventDefault()
                        if (user) {
                            setModalShow(true)
                        }else{
                            setModalLoginShow(true)
                        }
                    }}><FontAwesomeIcon icon={faQuestionCircle}/>{`  Inquire`}</Button>
                </div>
                <div className={ShopDetails}>
                    <p>{shop.name}</p>
                    <ShopRating shop={shop} />
                    <p><FontAwesomeIcon icon={faMapMarker} />  {shop.location}</p>
                    <Button style={{
                        position: 'relative',
                        zIndex: 10
                    }} size={'sm'} id={`numberBtn${shop.id}`} onClick={showNumber}> View Number</Button>
                    <span id={`numberTxt${shop.id}`} style={{
                        display: `none`
                    }}><FontAwesomeIcon icon={faPhone} />{`  ${shop.number}`}</span>
                </div>
            </div>
            </Link>
        </div>
    )
}