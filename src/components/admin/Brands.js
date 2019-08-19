import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class Brands extends Component{
    constructor(props){
        super(props);
        this.state = {
            brands: [],
        }
    }
    render = () => {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Manage Brands here</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Brands;