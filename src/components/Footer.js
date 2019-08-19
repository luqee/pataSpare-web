import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Footer(props){
    return (
        <Container className='footer' fluid style={{
            paddingTop: '20px',
            backgroundColor: '#212529',
            color: '#ffffff',
            flexShrink: 0
        }}>
            <Row style={{
                justifyContent: 'space-evenly'
            }}>
            <Col lg={4} style={{
                flexBasis: '30%'
            }}>
                <div>SUPPORT</div>
                <a href={'/#contact'}>Contact Us</a>
            </Col>
            <Col lg={4} style={{
                flexBasis: '30%'
            }}>
                <div>LEGAL</div>
                Privacy Policy
            </Col>
            <Col lg={4} style={{
                flexBasis: '30%'
            }}>
                <div>FOLLOW US ON</div>
                <FontAwesomeIcon icon={faFacebook} /><br/>
                <FontAwesomeIcon icon={faTwitter} /><br/>
                <FontAwesomeIcon icon={faYoutube} /><br/>
                <FontAwesomeIcon icon={faInstagram} /><br/>
            </Col>
            </Row>
        </Container>
    )
}
export default Footer;