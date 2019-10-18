import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import InquiriesTable from '../InquiriesTable';
import { UserContext } from '../../App';

class ShopInquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/inquiries/shop/${this.props.match.params.id}`, {
            headers: {'Authorization': 'Bearer '+ this.props.user.token}
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
        const inquiries = this.state.inquiries;
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Inquiries</p>
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

export default ShopInquiries;
