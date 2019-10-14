import React, {Component} from 'react';
import autoAPI from '../../api/api';
import {Container, Row, Col} from 'react-bootstrap';
import InquiriesTable from '../InquiriesTable';

class Inquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`/inquiries`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if (response.data.status === 200){
                this.setState({inquiries: response.data.data.inquiries});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }

    render = () => {
        let inquiries = this.state.inquiries;
        return (
            <Container>
                <Row>
                    <Col>
                    <p>My Inquiries</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <InquiriesTable match={this.props.match} inquiries={inquiries} />
                    </Col>
                </Row>
            </Container>
        )
        
    };
}

export default Inquiries;
