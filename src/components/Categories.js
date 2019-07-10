import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import exterior from '../images/exterior.png';
import interior from '../images/interior.png';
import performance from '../images/performance.png';
import accessories from '../images/accessories.png';

function Categories(props){
    return (
        <Container className='categories' id='categories'>
            <Row style={{height: '250px'}}>
                <Col style={{
                    backgroundImage: `url(${exterior})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '2px solid #ff6200',
                    borderBottom: '10px solid #ff6200'
                    }}>
                <div style={{color: '#ff6200'}}>EXTERIOR</div>
                </Col>
                <Col style={{
                    backgroundImage: `url(${interior})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '2px solid #ff6200',
                    borderBottom: '10px solid #ff6200'
                    }}>
                <div style={{color: '#ff6200'}}>INTERIOR</div>
                </Col>
                <Col style={{
                    backgroundImage: `url(${performance})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '2px solid #ff6200',
                    borderBottom: '10px solid #ff6200'
                    }}>
                <div style={{color: '#ff6200'}}>PERFORMANCE</div>
                </Col>
                <Col style={{
                    backgroundImage: `url(${accessories})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '2px solid #ff6200',
                    borderBottom: '10px solid #ff6200'
                    }}>
                <div style={{color: '#ff6200'}}>ACCESSORIES</div>
                </Col>
            </Row>
        </Container>
    )
}

export default Categories;