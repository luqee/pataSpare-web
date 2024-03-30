import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Store} from '@/components/Store';
import Loader from '@/components/Loader';
import { getShops } from '@/utils/api';

export const StoresSection = ()=> {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        fetchShops()
    },[])

    const fetchShops = () => {
        const searchParams = new URLSearchParams()
        searchParams.set('preview', 'true')
        getShops(searchParams.toString())
        .then((response) => {
            setLoading(false)
            if (response.data.status === 200){
                setShops(response.data.data.shops)
            }
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            setLoading(false)
        })
    }

    return (
        <Container className='partnerstore' id='shops'>
            <Row style={{
                justifyContent: 'center',
                padding: '10px 0px'
            }}>
                <Col lg={8} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h3>Vendors Thriving on PataSpare</h3>
                </Col>
            </Row>
            <Row style={{
                paddingBottom: '10px',
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Loader loading={loading} />
                {
                    (!loading && shops.length > 0) ? (
                        shops.map((shop, index) => {
                            while (index < 3) {
                                return (<Col key={shop.id} lg={4}><Store key={shop.id} shop={shop} /></Col> )
                            }
                        })
                    ):(
                        <Col></Col>
                    )
                }
            </Row>
        </Container>
    )
}
