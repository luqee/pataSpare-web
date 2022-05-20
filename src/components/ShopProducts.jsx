import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import { getPartsShop } from '../api/api';

function ShopProducts({shop}) {
    const [parts, setParts] = useState(null)
    useEffect(()=>{
        getPartsShop(shop.id, (response) => {
            if (response.status === 200){
                setParts(response.data.parts)
            }
        })
    }, [])
    return (
        <Container>
            <Row>
            {
                (parts !== null && parts.length > 0) ? (
                    parts.map((part) => {
                        return (
                        <Col key={part.id} lg={4}>
                            <PartItem part={part} key={part.id}/>
                        </Col>
                        )
                    })
                ):(
                    !this.state.parts && <p>CURRENTLY THERE ARE NO PARTS</p>
                )
            }
            </Row>
        </Container>
    )
}

export default ShopProducts;
