import {Container, Row, Col} from 'react-bootstrap';
import { PartSection } from "@/components/PartSection";
import { ShopSection } from "@/components/ShopSection";
import { autoAPI } from '@/config/axios';

const fetchPart = async (partId) => {
    const response = await autoAPI.get(`/parts/${partId}`,{
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
    return response.data.data.part
    
}

async function PartDetails({params}){
    let part = null

    try {
        part = await fetchPart(params.id)
    } catch (error) {
        console.log('sme err');
        console.log(error);
    }

    return (
        <Container>
            <Row>
                <Col lg={8}>
                    <PartSection part={part} />
                </Col>
                <Col lg={4}>
                    <ShopSection shop={part.shop} />
                </Col>
            </Row>
        </Container>
    )
}

export default PartDetails