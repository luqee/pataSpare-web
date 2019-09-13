import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import {Container, Row, Col, Table} from 'react-bootstrap';
import Inquiry from './Inquiry';

class Inquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/inquiries`, {
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
        const inquiries = this.state.inquiries;
        return (
            <Container className="inquiries">
                <Row>
                <Col>
                {
                    inquiries.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                            <th>Query</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Replies</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            inquiries.map((inquiry, indx) => {
                                return <Inquiry key={indx} match={this.props.match} inquiry={inquiry}/>
                                })
                        }
                        </tbody>
                    </Table>
                    :
                    <p>No Inquiries</p>
                }
                </Col>
                </Row>
            </Container>
        );
    };
}

export default Inquiries;
