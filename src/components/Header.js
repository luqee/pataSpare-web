import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavItem}from 'react-bootstrap';

const AuthButton = withRouter(
    ({ history }) =>
    AuthService.isAuthenticated() ? (
        <p>
            Welcome!{" "}
            <button
            onClick={() => {
                AuthService.signout(() => history.push("/"));
            }}
            >
            Sign out
            </button>
        </p>
        ) : (
        <p>You are not logged in.</p>
        )
);

class Header extends Component {
  render() {
    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">PataSpare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavItem componentClass={Link}>Home</NavItem>
            <NavItem componentClass={Link}><a href='#categories'>Categories</a></NavItem>
            <NavItem componentClass={Link}><a href='/#features'>Features</a></NavItem>
            <NavItem componentClass={Link}><a href='/#shops'>Shops</a></NavItem>
            <NavItem componentClass={Link}><a href='/#contact'>Contact</a></NavItem>
            </Nav>
            <Navbar.Text>
            <div className='Auth-buttons'>
                <AuthButton />
            </div>
            </Navbar.Text>
        </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;
