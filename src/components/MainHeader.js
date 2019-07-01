import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './MainHeader.css';

function MainHeader(props) {
    return (
        <Container fluid className='Header'>
            <Row style={{justifyContent: 'center'}}>
                <Col lg={5}>
                <div className='banner'>
                    <p style={{
                        color: '#ffffff',
                        fontSize: '2em'
                    }}>The Textbook Platform for Auto Parts Business</p>
                    <p style={{
                        color: '#ff6200',
                        fontSize: '1em'
                    }}>The best eCommerce solution for auto parts</p>
                </div>
                </Col>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <Col lg={5}>
                <div className='search-bar'>
                    <form className="search">
                        <input type="text" placeholder="Search by item.." name="search" style={{
                            padding: '5px 5px',
                            height: '24px',
                            color: '#ff6200'
                        }}/>
                        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MainHeader