import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from './PartItem';
import { getLatest, getRecommended } from '../api/api';
import Loader from './Loader';

function Parts(){
    const [latestParts, setLatestParts] = useState([])
    const [recommendParts, setRecommendParts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        fetchLatest()
        fetchRecommended()
    }, [])
    const fetchLatest = () => {
        getLatest((response) => {
            if (response.status === 200){
                setLatestParts(response.data.parts)
                setLoading(false)
            }
        })
    }
    const fetchRecommended = () => {
        getRecommended((response) => {
            if (response.status === 200){
                setLoading(false)
                setRecommendParts(response.data.parts)
            }
        })
    }
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
                <Loader loading={loading} />
            
                {
                    (!loading && latestParts.length > 0) ? (
                        latestParts.map((part) => {
                            return (
                                <Col lg={3} key={part.id}>
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
                <Loader loading={loading} />
                {
                    (!loading && recommendParts.length > 0) ? (
                        recommendParts.map((part) => {
                            return (
                                <Col lg={3} key={part.id}>
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
export default Parts;