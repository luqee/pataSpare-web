import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import autoAPI from '../api/api';

class PartCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            parts: [],
            
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/parts?cat=${this.props.match.params.category}`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({parts: response.data.data.category.parts, category: response.data.data.category.name})
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
                    <p>{this.state.category}</p>
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
                            <p>CURRENTLY THERE ARE NO PARTS UNDER {this.state.category}</p>
                        </Col>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default PartCategory;
  