import React from 'react';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import spanner from '../images/spanner.jpg';
import carEngine from '../images/car-engine.jpg';
import car from '../images/car.jpg';

function ImageSlider(props){
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };
    // const sliderItemStyle = {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center'
    // }
    const sliderPStyle = {
        color: '#ffffff',
        fontSize: '2.5em'
    }
    return (
        <Container fluid style={{
            padding: 0,
        }}>
            <Row>
                <Col>
                <Carousel>
                <Carousel.Item style={{
                    maxHeight: '400px'
                }}>
                    <img
                    className="d-block w-100"
                    src={spanner}
                    height='inherit'
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <p style={sliderPStyle}>Welcome to Pata Spare Market Place</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{
                    maxHeight: '400px'
                }}>
                    <img
                    className="d-block w-100"
                    src={carEngine}
                    height='inherit'
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <p style={sliderPStyle}>Your Brilliant One Stop Spare Community</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{
                    maxHeight: '400px'
                }}>
                    <img
                    className="d-block w-100"
                    src={car}
                    height='inherit'
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <p style={sliderPStyle}>For Your Ultimate Vehicle Maintenance.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                </Col>
            </Row>
        </Container>
    )
}
export default ImageSlider;