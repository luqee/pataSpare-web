import React from 'react';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';

function PartItem(props){
    return (
        <Container>
            <Row>
                <Col>
                <Image src={props.part.image_url} width={200} height={200} />
                <div>price: {props.part.price}</div>
                <Button>VIEW SHOP</Button>
                </Col>
            </Row>
        </Container>
        
    )
}

export default PartItem;