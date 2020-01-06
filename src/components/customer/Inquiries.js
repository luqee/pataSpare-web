import React, {Component} from 'react';
import autoAPI from '../../api/api';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import InquiriesTable from '../InquiriesTable';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
class Inquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/inquiries`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if (response.data.status === 200){
                this.setState({loading: false})
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
                <Row style={{
                    minHeight: `50px`,
                    justifyContent: 'center'
                }}>
                    <Col lg={12}>
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
                            <Loader loading={this.state.loading} />
                            {
                                inquiries.length > 0 ?
                                inquiries.map((inquiry, indx) => {
                                    let num_of_replies = 0
                                    if(inquiry.replies && inquiry.replies.length > 0){
                                        num_of_replies = inquiry.replies.length
                                    }
                                    return <tr key={indx}>
                                        <td>{inquiry.query}</td>
                                        <td>{(inquiry.part === null) ? '-': inquiry.part.name}</td>
                                        <td>{(inquiry.shop === null) ? '-': inquiry.shop.name}</td>
                                        <td>{num_of_replies}</td>
                                        <td>
                                        <Link to={{
                                            pathname: `${this.props.match.url}/${inquiry.id}`,
                                            state: {inquiry: inquiry }
                                        }}>
                                        <Button>View</Button>
                                        </Link>
                                            
                                        </td>
                                    </tr>
                                    })
                                :
                                !this.state.loading && <p>NO INQUIRIES</p>
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
        
    };
}

export default Inquiries;
