import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from './PartItem';
import  axios from '../api/api';
import Loader from './Loader';

class Parts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            latestParts: [],
            recommendParts: [],
            loading: true
        }
    }
    componentDidMount = () => {
        axios.get(`/parts?criteria=latest`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({loading: false})
                this.setState({latestParts: response.data.data.parts})
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false})
            
        })

        axios.get(`/parts?criteria=recommended`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({loading: false})
                this.setState({recommendParts: response.data.data.parts})
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false})  
        })
    }
    render = () => {
        return (
            <Container className='products' id='products'>
                <Row style={{
                    justifyContent: 'center',
                    fontSize: '2em',
                    padding: '10px 0px'
                }}>
                    <p>New In</p>
                </Row>
                <Row style={{
                    minHeight:'100px',
                    justifyContent: `center`,
                    paddingBottom: '5px'
                }}>
                    <Loader loading={this.state.loading} />
                
                    {
                        (!this.state.loading && this.state.latestParts.length > 0) ? (
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
                <Row style={{
                    minHeight:'100px',
                    justifyContent: `center`,
                    paddingBottom: '5px'
                }}>
                    <Loader loading={this.state.loading} />
                    {
                        (!this.state.loading && this.state.recommendParts.length > 0) ? (
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