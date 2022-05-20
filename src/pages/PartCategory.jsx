import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import { getPartsByCategory } from '../api/api';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

function PartCategory(){
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [parts, setParts] = useState([])
    const params = useParams()
    useEffect(()=> {
        let queryString = `cat=${params.categoryId}`
        getPartsByCategory(queryString, (results) => {
            setLoading(false)
            setParts(results.category.parts)
            setCategory(results.category.name)
        })
    }, [])
    return (
        <Container>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
            <p>{category}</p>
            </Row>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Loader loading={loading} />
            {
                (!loading && parts.length > 0) ? (
                    parts.map((part) => {
                        return (
                        <Col key={part.id} lg={3}>
                            <PartItem part={part} key={part.id}/>
                        </Col>
                        )
                    })
                ):(
                    !loading && <p>CURRENTLY THERE ARE NO PARTS UNDER {category}</p>
                )
            }
            </Row>
        </Container>
    )
}

export default PartCategory;
  