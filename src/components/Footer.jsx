import { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    return (
        <Row>

            <Col xs={12} md={4}>
                <Fragment>
                    <div>SOCIAL</div>
                    <div className="fb-like" data-href="https://web.facebook.com/PataSpare-106357314168691" data-colorscheme="dark" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                    {/* <FontAwesomeIcon icon={faFacebook} /><br/> */}
                    <FontAwesomeIcon icon={faTwitter} /><br/>
                    <FontAwesomeIcon icon={faYoutube} /><br/>
                    <FontAwesomeIcon icon={faInstagram} /><br/>
                </Fragment>
            </Col>

            <Col xs={12} md={4}>
                <div>LEGAL</div>
                <Link style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} to={`/privacy`}>
                    Privacy Policy
                </Link><br/>
                <Link style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} to={`/terms`}>
                    Terms &amp; Conditions
                </Link>
            </Col>
            
            <Col xs={12} md={4}>
                <div>SUPPORT</div>
                <a style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} href={'/contact'}>Contact Us</a>
            </Col>
        </Row>
    )
}
export default Footer;