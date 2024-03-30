import {Container, Row, Col} from 'react-bootstrap';
import {PartItem} from '@/components/PartItem';
import { autoAPI } from '@/config/axios';

const fetchLatestParts = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('criteria', 'latest')
    let reqPath = '/parts'
    reqPath+=`?${searchParams.toString()}`
    const response = await autoAPI.get(reqPath,{
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
    console.log('Response is 200');
    return response.data.data.parts
}

const fetchRecParts = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('criteria', 'recommended')
    let reqPath = '/parts'
    reqPath+=`?${searchParams.toString()}`
    const response = await autoAPI.get(reqPath,{
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
    console.log('Response is 200');
    return response.data.data.parts
}

export const PartsSection = async ()=>{
    const latestParts = await fetchLatestParts()
    const recommendParts = await fetchRecParts()
    
    return (
        <Container className='products' id='products'>
            <Row style={{
                justifyContent: 'center',
                fontSize: '2em',
                padding: '10px 0px'
            }}>
                <p>New In</p>
            </Row>
            <Row style={{
                minHeight:'100px',
                justifyContent: `center`,
                paddingBottom: '5px'
            }}>
                {
                    (latestParts.length > 0) ? (
                        latestParts.map((part, indx) => {
                            return (
                                <Col lg={3} key={indx}>
                                    <PartItem part={part} key={part.id}/>
                                </Col>
                            )
                        })
                    ):(
                        <div></div>
                    )
                }
            </Row>
            <Row style={{
                justifyContent: 'center',
                fontSize: '2em'
            }}>
                <p>We Recommend</p>
            </Row>
            <Row style={{
                minHeight:'100px',
                justifyContent: `center`,
                paddingBottom: '5px'
            }}>
                {
                    (recommendParts.length > 0) ? (
                        recommendParts.map((part, indx) => {
                            return (
                                <Col lg={3} key={indx}>
                                    <PartItem part={part} key={part.id}/>
                                </Col>
                            )
                        })
                    ):(
                        <div></div>
                    )
                }
            </Row>
        </Container>
    )
}