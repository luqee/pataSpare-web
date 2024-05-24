import {Container, Row, Col, Tab, Nav, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {ShopLocation} from '@/components/ShopLocation';
import {ShopProducts} from '@/components/ShopProducts';
import {ShopReview} from '@/components/ShopReview';
import { useEffect, useState } from 'react';
import { postReview } from '@/utils/api';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';

const fetchShop = async (id) => {
    const response = await autoAPI.get(`/shops/${id}`,{
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (!response){
        console.log('No response received');
        throw new Error('Failed to get shop')
    }
    if (!response.status === 200){
        console.log('Error response received');
        throw new Error('Error while to get shp')
    }
    return response.data.data.shop
}

const StoreView = async ({params})=>{
    const shop = await fetchShop(params.id)
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [currentRating, setCurrentRating] = useState(0)
    const [sending, setSending] = useState(false)

    const handleModal = (show) => setShop(show)
    const handleChange = (event) => setReview(event.target.value)
    const handleRating = (rating) => setRating(rating)

    const sendReview = () => {
        setSending(true)
        let newReview = {
            rating: parseInt(rating),
            review: review,
            shop_id: shop.id,
        }
        postReview(newReview)
        .then((response) => {
            setSending(false)
            if (response.data.status === 201) {
                setReview('')
                setRating(0)
                // this.fetchShopDetails()
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (Object.keys(shop).length === 0) ? <p>No details</p>:(
        <Container>
            <Row style={{
                flexDirection: 'column'
            }}>
                <StoreHead shop={shop} />
            </Row>
            <Row style={{
                paddingTop: '15px'
            }}>
            
            </Row>
        </Container>
    )
}
export default StoreView;
