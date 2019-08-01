import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Container, Row, Col, Button, Nav, NavDropdown,Form, FormControl}from 'react-bootstrap';
import autoAPI from '../api/api';

const autService = new AuthService();

const AuthButton = withRouter(
    ({ history }) =>

    autService.isAuthenticated() ? (
            <Nav>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href={`/dealer`}>DashBoard</NavDropdown.Item>
                <Navbar.Text>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        console.log('Logging out');
                        autService.signout(() => history.push("/"));
                    }}>Log out</a>
                </Navbar.Text>
                </NavDropdown>
            </Nav>
        ) : (
            <Container>
                <Row>
                    <Col>
                    <Link to={`/dealer/register`}>Become Partner</Link>
                    Or <Link to={`/dealer/login`}>Login</Link>
                    </Col>
                </Row>
            </Container>
        )
);

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
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
            <Form inline className='mr-auto ml-auto'>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Search</Button>
            </Form>
            <Navbar.Text>
                <AuthButton />
            </Navbar.Text>
        </Navbar.Collapse>
        </Navbar>
    );
    }
}

export default Header;
