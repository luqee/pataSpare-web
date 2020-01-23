import React, { Component } from 'react';
import autoAPI from '../../api/api';
import {Container,Row, Col, Button} from 'react-bootstrap';

class ManageUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: props.location.state.user,
            roles: props.location.state.user.roles.map((role) => {
                return role.name;
            })
        }
    }
    toggleAdmin = () =>{
        let data = {
            update_type: ''
        }
        if(this.state.roles.length > 0 && this.state.roles.indexOf('admin') === -1){
            data['update_type'] = 'makeAdmin'
        }else{
            data['update_type'] = 'removeAdmin'
        }
        autoAPI.put(`admin/users/${this.state.user.id}`, JSON.stringify(data), {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 201){
                this.setState({user: response.data.data.user});
                this.setState({roles: response.data.data.user.roles.map((role) => {
                    return role.name;
                })})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    suspendUser = () =>{
        let data = {
            update_type: 'suspend'
        }
        autoAPI.put(`admin/users/${this.state.user.id}`, JSON.stringify(data), {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 201){
                this.setState({user: response.data.data.user});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    deleteUser = () =>{
        autoAPI.delete(`admin/users/${this.state.user.id}`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.props.history.push(``);
                this.props.history.push(`admin/users`);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = () => {
        let user = this.state.user
        
        return (
            <Container>
                <Row>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Col>
                        <p>{this.state.user.name}</p>
                        <p>{this.state.user.email}</p>
                        <p>{this.state.user.number}</p>
                        </Col>
                        <Col>
                        <Button size={'sm'} onClick={this.toggleAdmin}>{this.state.roles.indexOf('admin') === -1? 'Make Admin': 'Remove Admin'}</Button>
                        <Button size={'sm'} onClick={this.suspendUser}>Suspend</Button>
                        <Button size={'sm'} onClick={this.deleteUser}>Delete</Button>
                        </Col>
                    </div>
                    
                </Row>
            </Container>
        )
    }
}

export default ManageUser;