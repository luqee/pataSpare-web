import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Account(props){
    return (
        <Container>
            <Row>
                <Col>
                <p>Account Information</p>
                </Col>
            </Row>
            <Row>
                <Col>
                Account details here, editing and all..
                </Col>
            </Row>
        </Container>
    )
}

export default Account;