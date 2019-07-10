import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from './Store';
import autoAPI from '../api/api';

class Stores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shops: []
        }
    }
    componentDidMount = () => {
        autoAPI.get('/shops',{
            baseURL: 'http://127.0.0.1:8000/auto/api/v1'
        })
        .then((response) => {
            console.log('response is');
            console.log(response);
            let shops = response.data.data.shops
            this.setState({shops: shops})
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            
        })
    }
    render = () => {
        console.log(this.state.shops);
        
        return (
            <Container className='partnerstore' id='shops'>
                <Row style={{
                    justifyContent: 'center'
                }}>
                    <Col lg={8} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <h3>Stores Selling Auto parts</h3>
                        <p>Auto Parts Sellers Thriving on pitstop autoclinic</p>
                    </Col>
                </Row>
                <Row style={{
                    justifyContent: 'center'
                }}>
                    <Col lg={8} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Container>
                            <Row style={{
                                borderBottom: '10px solid #ff6200'
                            }}>
                                {
                                    (this.state.shops.length > 0) ? (
                                        this.state.shops.map((shop, index) => {
                                            return (<Col key={index} lg={4}><Store key={index} shop={shop} /></Col> )
                                        })
                                    ):(
                                        <Col lg={12}>
                                            OUR PARTNER STORES
                                        </Col>
                                    )
                                }
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Stores;
