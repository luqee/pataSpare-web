import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from '../components/Store';
import autoAPI from '../api/api';

class Stores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shops: []
        }
    }
    componentDidMount = () => {
        autoAPI.get('/shops')
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
            <Container className='stores' id='stores'>
                <Row style={{
                    justifyContent: 'center'
                }}>
                    <Col>
                        <h3>Store List</h3>
                    </Col>
                </Row>
                <Row>
                    {
                        (this.state.shops.length > 0) ? (
                            this.state.shops.map((shop, index) => {
                                return (<Col key={index} lg={4}><Store key={index} shop={shop} /></Col> )
                            })
                        ):(
                            <Col lg={12}>
                                NO SHOPS
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default Stores;
