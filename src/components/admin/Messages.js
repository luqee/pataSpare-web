import React, { useContext } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import autoAPI from '../../api/api';
import Loader from '../Loader';
import {Link} from 'react-router-dom';

class Messages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            messages: []
        }
    }
    componentDidMount = ()=>{
        this.fetchMessages()
    }
    fetchMessages = ()=>{
        autoAPI.get(`admin/messages`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
                this.setState({messages: response.data.data.messages}) 
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = ()=>{
        return (
            <Container>
                <Row>
                    <Col>
                    <h2>Messages</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table>
                        <thead>
                            <tr>
                            <th>Sender</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <Loader loading={this.state.loading} />
                        {
                            this.state.messages.length > 0 ?
                            this.state.messages.map((message, indx) => {
                                return <tr key={indx}>
                                    <td>{message.contact.email}</td>
                                    <td>{message.subject}</td>
                                    <td>{message.message}</td>
                                    <td><Link to={{
                                        pathname: `${this.props.match.url}/${message.id}`,
                                        state: {message: message}
                                    }}>
                                            <Button size={'sm'}>View</Button>
                                        </Link>
                                    </td>
                                </tr>
                                })
                            :
                            !this.state.loading && <p>No Messages</p>
                        }
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Messages