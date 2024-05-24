import {Container, Row, Col} from 'react-bootstrap';
import {Store} from '@/components/Store';
import {ShopsMap} from '@/components/ShopsMap';
import { autoAPI } from '@/config/axios';

// export const metadata: Metadata = {
//     title: 'Vendor partners | PataSpare',
//     description: 'Our partner stores stock parts of highest quality',
// }
const fetchShops = async () => {
    const response = await autoAPI.get('/shops',{
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (!response){
        console.log('No response received');
        throw new Error('Failed to get parts')
    }
    if (!response.status === 200){
        console.log('Error response received');
        throw new Error('Error while to get parts')
    }
    return response.data.data.shops
    
}

const Stores = async ()=> {
    let shops = []

    try {
        shops = await fetchShops()
    } catch (error) {
        console.log('sme err');
        console.log(error);
    }

    return (
        <Container className='stores' id='stores'>
            <Row style={{
                justifyContent: 'center'
            }}>
                <h3>Store List</h3>
            </Row>
            <Row>
                <ShopsMap shops={shops} />
            </Row>
            <Row style={{
                padding:'50px 0',
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                {
                    (shops.length > 0) ? (
                        shops.map((shop, index) => {
                            return (<Col key={index} lg={4}><Store key={index} shop={shop} /></Col> )
                        })
                    ):(<p>NO SHOPS</p>
                    )
                }
            </Row>
        </Container>
    )
}

export default Stores;
