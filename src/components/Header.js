import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Container, Row, Col, Button, Nav, NavItem}from 'react-bootstrap';

const AuthButton = withRouter(
    ({ history }) =>
    AuthService.isAuthenticated() ? (
            <Button
            onClick={() => {
                AuthService.signout(() => history.push("/"));
            }}
            >
            Sign out
            </Button>
        ) : (
            <Container>
                <Row>
                    <Col>
                    <Link to={`/dealer/register`}><Button>Become Partner</Button></Link>
                    Or <Link to={`/dealer/login`}><Button>Login</Button></Link>
                    </Col>
                </Row>
            </Container>
        )
);

class Header extends Component {
  render() {
    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/">PataSpare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavItem componentClass={Link}>Home</NavItem>
            <NavItem componentClass={Link}><a href='/#categories'>Categories</a></NavItem>
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
