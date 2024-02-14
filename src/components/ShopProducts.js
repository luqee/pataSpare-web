import {Container, Row, Col} from 'react-bootstrap';
import {PartItem} from '@/components/PartItem'
import { useEffect, useState } from 'react';
import { getParts } from '@/utils/api';

export const ShopProducts= ({shop})=> {
    const [parts, setParts] = useState(null)

    const fetchParts = () => {
        let searchParams = new URLSearchParams()
        searchParams.set('shop_id', shop.id)
        getParts(searchParams.toString())
        .then((response) => {
            if (response.status === 200){
                setParts(response.data.data.parts)
            }
        })
        .catch((error) => {
            console.log(error);

        });
    }
    useEffect(()=>{
        fetchParts()
    },[])

    return (
        <Container>
            <Row>
            {
                (parts !== null && parts.length > 0) ? (
                    parts.map((part, index) => {
                        return (
                        <Col key={index} lg={4}>
                            <PartItem part={part} key={part.id}/>
                        </Col>
                        )
                    })
                ):(
                    !parts && <p>CURRENTLY THERE ARE NO PARTS</p>
                )
            }
            </Row>
        </Container>
    )
}

