import React from 'react';
import {Container, Col, Row, Form, FormControl, Button} from 'react-bootstrap';
import './MainHeader.css';

function MainHeader(props) {
    return (
        <Container fluid className='Header' style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Row style={{justifyContent: 'center'}}>
                <Col lg={5} >
                <div className='banner' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <p style={{
                        color: '#ffffff',
                        fontSize: '1.5em'
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
                <div className='search-bar' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Form inline>
                    <FormControl type="text" placeholder="Search by item.." className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MainHeader