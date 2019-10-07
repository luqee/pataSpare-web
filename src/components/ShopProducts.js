import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import autoAPI from '../api/api';

class ShopProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: null,
            
        }
    }
    componentDidMount = () => {
        console.log(`ShopProducts history`);
        console.log(this.props);
        
        autoAPI.get(`/parts?shop_id=${this.props.shop.id}`)
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
                {
                    (this.state.parts !== null && this.state.parts.length > 0) ? (
                        this.state.parts.map((part, index) => {
                            return (
                            <Col key={index} lg={4}>
                                <PartItem history={this.props.history} part={part} key={part.id}/>
                            </Col>
                            )
                        })
                    ):(
                        <Col lg={12}>
                            <p>CURRENTLY THERE ARE NO PARTS</p>
                        </Col>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default ShopProducts;
  