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
        autoAPI.get(`/shops?preview=true`)
        .then((response) => {
            let shops = response.data.data.shops
            this.setState({shops: shops})
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            
        })
    }
    render = () => {
        
        return (
            <Container className='partnerstore' id='shops'>
                <Row style={{
                    justifyContent: 'center',
                    padding: '10px 0px'
                }}>
                    <Col lg={8} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <h3>Stores Selling Auto parts</h3>
                        <p>Auto Parts Sellers Thriving on PataSpare</p>
                    </Col>
                </Row>
                <Row style={{
                    justifyContent: 'center'
                }}>
                    <Col lg={8}>
                        <Container>
                            <Row style={{
                                paddingBottom: '10px',
                                borderBottom: '10px solid #ff6200'
                            }}>
                                {
                                    (this.state.shops.length > 0) ? (
                                        this.state.shops.map((shop, index) => {
                                            return (<Col key={index} lg={4}><Store key={shop.id} shop={shop} /></Col> )
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
