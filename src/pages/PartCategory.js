import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import autoAPI from '../api/api';
import Loader from '../components/Loader';

class PartCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            parts: [],
            loading: true
            
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/parts?cat=${this.props.match.params.category}`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({loading: false})
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
                <Row style={{
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                <p>{this.state.category}</p>
                </Row>
                <Row style={{
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                    <Loader loading={this.state.loading} />
                {
                    (!this.state.loading && this.state.parts.length > 0) ? (
                        this.state.parts.map((part, index) => {
                            return (
                            <Col key={index} lg={3}>
                                <PartItem part={part} key={part.id}/>
                            </Col>
                            )
                        })
                    ):(
                        !this.state.loading && <p>CURRENTLY THERE ARE NO PARTS UNDER {this.state.category}</p>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default PartCategory;
  