import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Container, Row, Col, Button, Nav, NavDropdown,Form, FormControl}from 'react-bootstrap';
import autoAPI from '../api/api';

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
        <Navbar bg="dark" expand="lg" fixed='top'>
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
            <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
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
