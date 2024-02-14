'use client'
import {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {PartItem} from '@/components/PartItem';
import Loader from '@/components/Loader';
import { useSearchParams } from 'next/navigation';
import {getParts} from '@/utils/api'

const Parts = ()=> {
    const [parts, setParts] = useState([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    const fetchParts = () => {
        let queryString = searchParams.toString()
        getParts(queryString.toString())
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setParts(response.data.data.parts)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchParts()
    }, [])

    return (
        <Container>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Loader loading={loading} />
            {
                (!loading && parts.length > 0) ? (
                    parts.map((part, index) => {
                        return (
                        <Col key={index} lg={3}>
                            <PartItem part={part} key={part.id}/>
                        </Col>
                        )
                    })
                ):(
                    !loading && <p>CURRENTLY THERE ARE NO PARTS</p>
                )
            }
            </Row>
        </Container>
    )
}

export default Parts