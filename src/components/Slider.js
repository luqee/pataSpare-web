import React from 'react';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import slider1 from '../images/slider1.jpg';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';

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
        fontSize: '2.5em',
        width: 'fit-content',
        margin: '0 auto'
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
                    src={slider1}
                    height='inherit'
                    alt="First slide"
                    />
                    {/* <Carousel.Caption>
                    <p style={sliderPStyle}>Welcome to Pata Spare Market Place</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={{
                    maxHeight: '400px'
                }}>
                    <img
                    className="d-block w-100"
                    src={slider2}
                    height='inherit'
                    alt="Third slide"
                    />

                    {/* <Carousel.Caption>
                    <p style={sliderPStyle}>Your Brilliant One Stop Spare Community</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={{
                    maxHeight: '400px'
                }}>
                    <img
                    className="d-block w-100"
                    src={slider3}
                    height='inherit'
                    alt="Third slide"
                    />

                    {/* <Carousel.Caption>
                    <p style={sliderPStyle}>For Your Ultimate Vehicle Maintenance.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                </Carousel>
                </Col>
            </Row>
        </Container>
    )
}
export default ImageSlider;
