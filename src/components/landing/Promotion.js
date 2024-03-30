'use client'
import {Container, Row, Col, Card } from 'react-bootstrap';
import banner1 from '@/images/banner1.jpg';

export const PromotionSection = ()=>{
    const cardStyle = {
        height: '130px'
    }
    return (
        <Container fluid className='promo' style={{
            backgroundImage: `url(${banner1})`,
            height: '400px',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
            }}>
            <Row style={{alignItems: 'center', height: 'inherit'}}>
                <Col lg={4}>
                <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>OUTSTANDING SERVICE</Card.Title>
                    <Card.Text>
                    Many payment methods and
                    convenient search for accessories for
                    your car.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>
                <Col lg={4}>
                <Card  style={cardStyle}>
                <Card.Body>
                    <Card.Title>COMPETITIVE PRICES</Card.Title>
                    <Card.Text>
                    With us you get the best prices on the 
                    whole range.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>
                <Col lg={4}>
                <Card  style={cardStyle}>
                <Card.Body>
                    <Card.Title>HUGE ASSORTMENT</Card.Title>
                    <Card.Text>
                    Free selection from over 50,000 
                    accessory products.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}