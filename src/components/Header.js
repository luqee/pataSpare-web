import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown}from 'react-bootstrap';
import autoAPI from '../api/api';

const autService = new AuthService();

function AuthButton(props) {
    const currentUser = autService.getCurrentUser();
    let roles = [];
    if(currentUser === null){
        roles = []
    }else{
        roles = currentUser.roles.map((role) => {
            return role.name;
        });
    }
    return autService.isAuthenticated() ? (
        <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                {
                    (roles.indexOf('customer') !== -1) && <NavDropdown.Item href={`/customer`}>My Account</NavDropdown.Item>
                }
                {
                    (roles.indexOf('dealer') !== -1) && <NavDropdown.Item href={`/dealer`}>Dealer</NavDropdown.Item>
                }
            <NavDropdown.Item>
            <Navbar.Text>
                <a href="/#" onClick={(e) => {
                    e.preventDefault();
                    console.log('Logging out');
                    autService.signout(() => props.history.push("/"));
                }} style={{
                    color: '#000000'
                }}>Log out</a>
            </Navbar.Text>
            </NavDropdown.Item>
            </NavDropdown>
        </Nav>
        
    ) : (
        <Nav>
            <Nav.Link href="/customer/register">Register</Nav.Link>
            <Nav.Link href="/user/login">Login</Nav.Link>
        </Nav>
    )
}

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            searchTerm: ''
        }
    }
    componentDidMount = () => {
        autoAPI.get('/categories')
        .then((response) => {
            let categories = response.data.data.categories
            this.setState({categories: categories})
        })
        .catch((error) => {
            console.log('Woops an error '+error);
            
        })
    }
    search = () => {
        console.log('Serching .....');
        this.props.history.push(`/search/${this.state.searchTerm}`)
    }
    handleSearchInput = (e) => {
        this.setState({searchTerm: e.target.value})
    }
    render() {
        return (
            <Navbar bg="dark" variant='dark' expand="lg" fixed='top'>
            <Navbar.Brand href="/">PataSpare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {
                        this.state.categories.map((category, index) => {
                            return (<NavDropdown.Item key={index} href={`/part-category/${category.id}`}>{category.name}</NavDropdown.Item>)
                        })
                    }
                </NavDropdown>
                <Nav.Link href='/shop'>Shop</Nav.Link>
                <Nav.Link href='/stores'>Store List</Nav.Link>
                </Nav>
                <AuthButton history={this.props.history} />
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);
