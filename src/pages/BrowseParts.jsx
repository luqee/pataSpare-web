import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import { getParts } from '../api/api';
import Loader from '../components/Loader';
import {Helmet} from 'react-helmet';

function BrowseParts() {
    const [parts, setParts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        getParts((response) => {
            setLoading(false)
            if (response.status === 200){
                setParts(response.data.parts)
            }else {
                console.log('Error fetching parts');
                this.setState({loading: false})
            }
        })
    }, [])

    return (
        <Container>
            <Helmet>
            <title>Browse Parts | PataSpare</title>
            <meta name="description" content="Browse selection of quality automobile parts on offer" />
            </Helmet>
            <Row style={{
                justifyContent: 'center'
            }}>
            <h3>Auto Parts</h3>
            </Row>
            <Row style={{minHeight: '50px', justifyContent: `center`}}>
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
                ):( !loading && <p>CURRENTLY THERE ARE NO PARTS.</p>
                )
            }
            </Row>
        </Container>
    )
}

export default BrowseParts;
