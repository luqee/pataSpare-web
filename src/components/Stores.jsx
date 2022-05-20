import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from './Store';
import { getShopsPreview } from '../api/api';
import Loader from './Loader';

function Stores() {
    const [loading, setLoading] = useState(true)
    const [shops, setShops] = useState([])

    useEffect(()=>{
        fetchShops()
    }, [])

    const fetchShops = () => {
        getShopsPreview((response) => {
            if (response.status === 200){
                setLoading(false)
                setShops(response.data.shops)
            }
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
                        <p></p>
                    )
                }
            </Row>
        </Container>
    )
}

export default Stores;
