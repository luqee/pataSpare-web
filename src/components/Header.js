import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Form, FormControl, Button}from 'react-bootstrap';

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
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
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
