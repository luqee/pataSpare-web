import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from './PartItem';
import  axios from '../api/api';

class Parts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            latestParts: [],
            recommendParts: []
        }
    }
    componentDidMount = () => {
        axios.get(`/parts?criteria=latest`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({latestParts: response.data.data.parts})
            }
        })
        .catch((error) => {
            console.log(error);
            
        })

        axios.get(`/parts?criteria=recommended`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({recommendParts: response.data.data.parts})
            }
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    render = () => {
        return (
            <Container className='products' id='products'>
                <Row style={{
                    justifyContent: 'center',
                    fontSize: '2em'
                }}>
                    <p>New In</p>
                </Row>
                <Row>
                    {
                        (this.state.latestParts.length > 0) ? (
                            this.state.latestParts.map((part, indx) => {
                                return (
                                    <Col lg={3} key={indx}>
                                        <PartItem part={part} key={part.id}/>
                                    </Col>
                                )
                            })
                        ):(
                            <div></div>
                        )
                    }
                </Row>
                <Row style={{
                    justifyContent: 'center',
                    fontSize: '2em'
                }}>
                    <p>We Recommend</p>
                </Row>
                <Row>
                    {
                        (this.state.recommendParts.length > 0) ? (
                            this.state.recommendParts.map((part, indx) => {
                                return (
                                    <Col lg={3} key={indx}>
                                        <PartItem part={part} key={part.id}/>
                                    </Col>
                                )
                            })
                        ):(
                            <div></div>
                        )
                    }
                </Row>
            </Container>
        )
    }
}
export default Parts;