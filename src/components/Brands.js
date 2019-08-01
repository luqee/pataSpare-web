import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import Toyota from '../images/7.png';
import Merc from '../images/8.png';
import Bmw from '../images/9.png';
import Vw from '../images/10.png';
import Sub from '../images/11.png';
import Nissan from '../images/12.png';
import Mitsu from '../images/13.png';

function Brands(props){
    return (
        <Container className='partnerBrands'>
            <Row style={{
                justifyContent: 'center',
                padding: '10px 0px'
            }}>
                <Col lg={6}>
                <h4>QUALITY CAR SPARE PARTS FROM TOP BRANDS</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                <Image src={Toyota} />
                </Col>
                <Col>
                <Image src={Merc} />
                </Col>
                <Col>
                <Image src={Bmw} />
                </Col>
                <Col>
                <Image src={Vw} />
                </Col>
                <Col>
                <Image src={Sub} />
                </Col>
                <Col>
                <Image src={Nissan} />
                </Col>
                <Col>
                <Image src={Mitsu} />
                </Col>
            </Row>
        </Container>
    )
}

export default Brands;