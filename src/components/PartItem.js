import React from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Button, Card } from 'react-bootstrap';
import urls from '../config/config';

function PartItem(props){
    const part = props.part;
    return (
        <Container>
            <Row>
                <Col>
                <Card style={{ width: '100%' }}>
                <Link to={`/parts/${part.id}`}>
                <Card.Img variant="top" src={`${urls.hostRoot}/${part.part_image}`}/>
                </Link>
                <Card.Body>
                    <Card.Title>{part.title}</Card.Title>
                    <Card.Text>
                    {part.description}
                    </Card.Text>
                    <Card.Text>
                    Price: {part.price}
                    </Card.Text>
                    <Button>Add to cart</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PartItem;