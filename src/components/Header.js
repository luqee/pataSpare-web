import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import AuthService from '../auth/auth';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Container, Row, Col}from 'react-bootstrap';
import autoAPI from '../api/api';
import CartService from '../api/cart';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

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
        let cart = cartService.getCart();
        if(cart !== {} && cart.items){
            if(cart.items.length > 0){
                this.setState({cart: cart});
                let totalItems = cart.items.map((item) => {return item.quantity})
                let sumOfItems =  totalItems.reduce((prev, next) => {
                    return prev + next
                })
                this.setState({total: sumOfItems})
            }
        }
        let unlisten = this.props.history.listen((location, action) =>{

            let cart = cartService.getCart();
            if(cart !== {} && cart.items){
                if(cart.items.length > 0){
                    this.setState({cart: cart});
                    let totalItems = cart.items.map((item) => {return item.quantity})
                    let sumOfItems =  totalItems.reduce((prev, next) => {
                        return prev.quantity + next.quantity
                    })
                    this.setState({total: sumOfItems})
                }
            }
        });
        this.setState({unlisten: unlisten})

    }
    componentWillUnmount = () => {
        this.state.unlisten();
    }
    render = () => {
        const total = this.state.total
        return (
            <Nav>
                <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingCart} /><span>{` (${total})`}</span></Nav.Link>
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
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                {
                    (roles.indexOf('customer') !== -1) && <NavDropdown.Item href={`/customer`}>My Account</NavDropdown.Item>
                }
                {
                    (roles.indexOf('dealer') !== -1) && <NavDropdown.Item href={`/dealer`}>Dashboard</NavDropdown.Item>
                }
                <NavDropdown.Item href="/#" style={{
                    display: `block`,
                    color: '#000000',
                }}>
                    <a href="/#" onClick={(e) => {
                        e.preventDefault();
                        console.log('Logging out');
                        autService.signout(() => props.history.push("/"));
                    }} style={{
                        color: '#212529',
                        display: `block`,
                        textDecoration: 'none'
                    }}>Log out</a>
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
    render() {
        return (
            <Container id={`Header`} fluid  style={{
                padding: '0',
                position: 'fixed',
                top: '0',
                zIndex: '12'
            }}>
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
                    <Nav>
                    <Nav.Link href='/dealer/register'>Sell on PataSpare</Nav.Link>
                    </Nav>
                    <CartLink history={this.props.history}/>
                    <AuthButton history={this.props.history} />
                </Navbar.Collapse>
                </Navbar>
                <SearchBar history={this.props.history} />
            </Container>

        );
    }
}

export default withRouter(Header);
