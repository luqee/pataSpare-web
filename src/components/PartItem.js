import React from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';
import urls from '../config/config';

function PartItem(props){
    const part = props.part;
    return (
        <Container>
            <Row>
                <Col style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Link to={`/parts/${part.id}`}>
                <Image src={`${urls.hostRoot}/${part.part_image}`} width={200} height={200} />
                </Link>
                <div>{part.title}</div>
                <div>{part.price}</div>
                <Button>Add to cart</Button>
                </Col>
            </Row>
        </Container>
        
    )
}

export default PartItem;