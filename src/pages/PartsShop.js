import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import autoAPI from '../api/api';

class PartsShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/parts`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({parts: response.data.data.parts})
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Shop</p>
                    </Col>
                </Row>
                <Row>
                {
                    (this.state.parts.length > 0) ? (
                        this.state.parts.map((part, index) => {
                            return (
                            <Col key={index} lg={4}>
                                <PartItem part={part} key={part.id}/>
                            </Col>
                            )
                        })
                    ):(
                        <Col lg={12}>
                            <p>CURRENTLY THERE ARE NO PARTS.</p>
                        </Col>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default PartsShop;
  