import React from 'react';
import {Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import carouselBack from '../images/corouselBack.png';

function Promotion(props){
    return (
        <Container className='promo' style={{backgroundImage: `url(${carouselBack})`}} id='features'>
            <Row style={{justifyContent: 'center'}}>
                <Col lg={4}>
                <Carousel>
                <Carousel.Item>
                <Card>
                <Card.Body>
                    <Card.Title>OUTSTANDING SERVICE</Card.Title>
                    <Card.Text>
                    Many payment methods and
                    convenient search for accessories for
                    your car.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card>
                <Card.Body>
                    <Card.Title>GREATLY REDUCED PRICES</Card.Title>
                    <Card.Text>
                    With us you get the best prices on the 
                    whole range.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card>
                <Card.Body>
                    <Card.Title>HUGE ASSORTMENT</Card.Title>
                    <Card.Text>
                    Free selection from over 50,000 
                    accessory products.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Carousel.Item>
                </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Promotion;