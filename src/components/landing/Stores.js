import {Container, Row, Col} from 'react-bootstrap';
import {Store} from '@/components/Store';
import { autoAPI } from '@/config/axios';

const fetchShops = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('preview', 'true')
    let reqPath = '/shops'
    reqPath+=`?${searchParams.toString()}`
    const response = await autoAPI.get(reqPath,{
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (!response){
        console.log('No response received');
        throw new Error('Failed to get shops')
    }
    if (!response.status === 200){
        console.log('Error response received');
        throw new Error('Error while to get shops')
    }
    return response.data.data.shops
}


export const StoresSection = async ()=> {
    const shops = await fetchShops()
    
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
                {
                    (shops.length > 0) ? (
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
