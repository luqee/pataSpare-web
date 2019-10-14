import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import autoAPI from '../api/api';
import Loader from '../components/Loader';

class PartsShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/parts`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({loading: false})
                this.setState({parts: response.data.data.parts})
            }else {
                console.log('Erroer fethis parts');
                this.setState({loading: false})
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false})
        });
    }
    render() {
        return (
            <Container>
                <Row style={{
                    justifyContent: 'center'
                }}>
                <h3>Shop</h3>
                </Row>
                <Row style={{minHeight: '50px', justifyContent: `center`}}>
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
                    ):( <p>CURRENTLY THERE ARE NO PARTS.</p>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default PartsShop;
