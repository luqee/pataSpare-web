import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Store from './Store';
import autoAPI from '../api/api';
import Loader from './Loader';

class Stores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/shops?preview=true`)
        .then((response) => {
            if (response.data.status === 200){
                let shops = response.data.data.shops
                this.setState({loading: false})
                this.setState({shops: shops})
            }
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            this.setState({loading: false})
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
                    paddingBottom: '10px',
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                    <Loader loading={this.state.loading} />
                    {
                        (!this.state.loading && this.state.shops.length > 0) ? (
                            this.state.shops.map((shop, index) => {
                                while (index < 3) {
                                    return (<Col key={index} lg={4}><Store key={shop.id} shop={shop} location={this.props.location} /></Col> )
                                }
                            })
                        ):(
                            <p>No Shops</p>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default Stores;
