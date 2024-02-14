import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {PartItem} from '@/components/PartItem';
import Loader from '@/components/Loader';
import {getParts} from '@/utils/api'

export const PartsSection = ()=>{
    const [latestParts, setLatestParts] = useState([])
    const [recommendParts, setRecommendParts] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        fetchParts()
    }, [])

    const fetchParts = () => {
        const searchParams = new URLSearchParams()
        searchParams.set('criteria', 'latest')
        getParts(searchParams.toString())
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setLatestParts(response.data.data.parts)
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false)
        })

        searchParams.set('criteria', 'recommended')
        getParts(searchParams.toString())
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setRecommendParts(response.data.data.parts)
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false})  
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
                <Loader loading={loading} />
                {
                    (!loading && recommendParts.length > 0) ? (
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