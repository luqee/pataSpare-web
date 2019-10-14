import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ShopsTable from './ShopsTable';

class Shops extends Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/shops`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                
                this.setState({shops: response.data.data.shops});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        const shops = this.state.shops;
        return (
            <Container className="shops-content">
                <Row>
                <Link style={{
                    float: "right"
                }} to={`${this.props.match.url}/create`}>
                <Button>ADD SHOP</Button>
                </Link>
                </Row>
                <Row>
                    <Col>
                    <ShopsTable match={this.props.match} shops={shops}/>
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default Shops;
