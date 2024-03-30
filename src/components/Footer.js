import React from 'react';
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

export const Footer = ()=>{
    return (
        <Row style={{
            justifyContent: 'space-evenly'
        }}>
        <Col lg={4} style={{
            flexBasis: '30%'
        }}>
            <div>SUPPORT</div>
            <Link style={{
                color: '#ffffff',
                textDecoration: 'none'
            }} href={'/contact'}>Contact Us</Link>
        </Col>
        <Col lg={4} style={{
            flexBasis: '30%'
        }}>
            <div>LEGAL</div>
            <Link style={{
                color: '#ffffff',
                textDecoration: 'none'
            }} href={`/privacy`}>
                Privacy Policy
            </Link><br/>
            <Link style={{
                color: '#ffffff',
                textDecoration: 'none'
            }} href={`/terms`}>
                Terms &amp; Conditions
            </Link>
        </Col>
        <Col lg={4} style={{
            flexBasis: '30%'
        }}>
            <div>SOCIAL</div>
            <div className="fb-like" data-href="https://web.facebook.com/PataSpare-106357314168691" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
            {/* <FontAwesomeIcon icon={faFacebook} /><br/> */}
            <FontAwesomeIcon icon={faTwitter} /><br/>
            <FontAwesomeIcon icon={faYoutube} /><br/>
            <FontAwesomeIcon icon={faInstagram} /><br/>
        </Col>
        </Row>
    )
}