'use client'
import {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Loader from '@/components/Loader';
import {getInquiries} from '@/utils/api'
import { InquiriesTable } from '@/components/customer/InquiriesTable';


const Inquiries = ()=>{
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchInquiries = () => {
        getInquiries()
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setInquiries(response.data.data.inquiries)
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }

    useEffect(()=>{
        fetchInquiries()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>My Inquiries</p>
                </Col>
            </Row>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Col lg={12}>
                <Loader loading={loading} />
                <InquiriesTable inquiries={inquiries} />
                </Col>
            </Row>
        </Container>
    )
}

export default Inquiries;
