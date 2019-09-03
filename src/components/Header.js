import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Container, Row, Col}from 'react-bootstrap';
import autoAPI from '../api/api';
import CartService from '../api/cart';
import SearchBar from './SearchBar';
const autService = new AuthService();
const cartService = new CartService();

class CartLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: {},
            total: 0,
            unlisten: ''
        }
    }

    componentDidMount = () => {
        let unlisten = this.props.history.listen((location, action) =>{
            console.log('Message from cartLink:: Location changed .... ');
            console.log(location);
            console.log(action);
            this.setState({cart: cartService.getCart()});
        });
        this.setState({unlisten: unlisten})
        this.setState({cart: cartService.getCart()});
    }
    componentWillUnmount = () => {
        this.state.unlisten();
    }

    render = () => {
        let total = 0;
        let cart = this.state.cart;
        if(!Object.keys(cart).length === 0){
            if(cart.items && cart.items.length > 0){
                total = cart.items.map((item) => item.quantity).reduce((prev, next) => prev+next);
                this.setState({total: total});
            }
        }
        return (
            <Nav>
                <Nav.Link href="/cart">Cart <span>{this.state.total}</span></Nav.Link>
            </Nav>
        )
    }
}

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
            <Container fluid  style={{
                position: 'fixed',
                top: '0',
                zIndex: '12'
            }}>
                <Row style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Col>
                    <Navbar bg="dark" variant='dark' expand="lg">
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
                        <CartLink history={this.props.history}/>
                        <AuthButton history={this.props.history} />
                    </Navbar.Collapse>
                    </Navbar>
                    </Col>
                    <Col>
                    <SearchBar />
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default withRouter(Header);
