import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import PartsTable from './PartsTable';
import autoAPI from '../../api/api';
import urls from '../../config/config';

class ShopInventory extends Component{
    constructor(props){
        super(props)
        this.state = {
            parts: []
        }
    }
    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/parts/shop/${this.props.match.params.id}`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                
                this.setState({parts: response.data.data.parts});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        let parts = this.state.parts
        let shop = this.props.location.state.shop
        console.log(this.props);
        
        let shopName = shop.name[0].toUpperCase() + shop.name.slice(1)
        return (
            <Container>
                <Row>
                    <Col>
                    <p>{`${shopName}'s Inventory`}</p>
                    <Link style={{
                        float:"right"
                    }} to={{
                        pathname: `${this.props.match.url}/create`,
                        state: {shop: shop}
                    }}>
                        <Button>ADD PART</Button>
                    </Link>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <PartsTable match={this.props.match} parts={parts} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopInventory;
