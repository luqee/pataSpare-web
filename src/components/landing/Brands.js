import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Toyota from '@/images/7.png';
import Merc from '@/images/8.png';
import Bmw from '@/images/9.png';
import Vw from '@/images/10.png';
import Sub from '@/images/11.png';
import Nissan from '@/images/12.png';
import Mitsu from '@/images/13.png';
import Image from 'next/image';

export const BrandsSection = ()=>{
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
                <Image src={Toyota} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Merc} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Bmw} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Vw} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Sub} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Nissan} alt='Promo Image' />
                </Col>
                <Col>
                <Image src={Mitsu} alt='Promo Image' />
                </Col>
            </Row>
        </Container>
    )
}