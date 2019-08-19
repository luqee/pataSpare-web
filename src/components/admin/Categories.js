import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
        }
    }
    render = () => {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Manage Categories here</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Categories;