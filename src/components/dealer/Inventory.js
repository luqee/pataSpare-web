import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import {Container, Row, Col} from 'react-bootstrap';
import PartsTable from './PartsTable';
import { UserContext } from '../../App';

class Inventory extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
        }
    }
    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/parts`, {
            headers: {'Authorization': 'Bearer '+ this.props.user.token}
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
        const parts = this.state.parts;
        return (
            <Container>
                <Row>
                    <Col>
                    <p>My Inventory</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <PartsTable match={this.props.match} parts={parts} />
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default Inventory;
