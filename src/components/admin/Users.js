import React from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import Loader from '../Loader';
import autoAPI from '../../api/api'
import {Link} from 'react-router-dom';

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`admin/users`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
                this.setState({users: response.data.data.users});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = () => {
        const users = this.state.users

        return (
            <Container>
                <Row>
                    <Col>
                    <p>Users Management</p>
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
                                <th>Username</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            <Loader loading={this.state.loading} />
                            {
                                users.length > 0 ?
                                users.map((user, indx) => {
                                    return <tr key={indx}>
                                        <td>{user.name}</td>
                                        <td>
                                        <Link to={{
                                            pathname: `${this.props.match.url}/${user.id}`,
                                            state: {user: user }
                                        }}>
                                        <Button>Manage</Button>
                                        </Link>
                                        </td>
                                    </tr>
                                    })
                                :
                                !this.state.loading && <p>NO USERS CURRENTLY</p>
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Users;