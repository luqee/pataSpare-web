import React, { Component, useContext, useState } from 'react';
import {withRouter} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Container}from 'react-bootstrap';
import autoAPI, { Mobile } from '../api/api';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import {UserContext, CartContext} from '../App'
import './MainHeader.css';
import logo from '../images/pataspare-logo.png'

class CartLink extends Component {
    constructor(props){
        super(props)
        this.state = {
            cart: props.cart
        }
    }
    static getDerivedStateFromProps = (props, state) => {
        if(props.cart !== state.cart){
            return {cart: props.cart}
        }
        return null
    }
    // let cartContext = useContext(CartContext)
    // let [cart, setCart] = useState(cartContext.cart)
    countItems = (cart) =>{
        let totalItems = 0
        if(Object.keys(cart).length > 0 && cart.items){
            if(cart.items.length > 0){
                let quantities = cart.items.map((item) => {return parseInt(item.quantity)})
                totalItems =  quantities.reduce((prev, next) => {
                    return prev + next
                })
            }
        }
        return totalItems
    }
    render = () =>{
        let cart = this.state.cart
        let total = this.countItems(cart)
        return (
            <Nav>
                <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingCart} /><span>{` (${total})`}</span></Nav.Link>
            </Nav>
        )
    }
}

function AuthButton(props) {
    const userContext = useContext(UserContext)
    let currentUser = userContext.user

    let roles = [];
    if(currentUser !== {} && currentUser.roles){
        roles = currentUser.roles.map((role) => {
            return role.name;
        });
    }
    return currentUser.id ? (
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
                    {/* <Nav.Link eventKey='logout'>Log Out</Nav.Link> */}
                    <a href="/#" onClick={(e) => {
                        e.preventDefault();
                        userContext.logoutUser(currentUser, props.history)
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
    toggleSearchBar = (event) =>{
        let searchBar = document.getElementById('searchBar')
        searchBar.style.display = searchBar.style.display == 'block'? 'none': 'block';
    }
    onSelect = (event)=>{
        let currentUser = this.props.user
        let roles = [];
        if(currentUser !== {} && currentUser.roles){
            roles = currentUser.roles.map((role) => {
                return role.name;
            });
        }
        if(roles.indexOf('dealer') > -1){
            this.props.history.push('/dealer')
        }else if(roles.indexOf('customer') > -1){
            this.props.history.push('/customer/account')
        }else{
            this.props.history.push('/dealer/register')
        }
    }
    render() {
        return (
            <Container id={`Header`} fluid  style={{
                padding: '0',
                position: 'fixed',
                top: '0',
                zIndex: '20',
            }}>
                <Navbar expand="lg" style={{
                    borderBottom: '5px solid #343a40',
                    backgroundColor: '#007bff',
                }}>
                <Navbar.Brand href="/">
                <img
                    src={logo}
                    width="100"
                    height="40"
                    className="d-inline-block align-top"
                    alt="Pataspare logo"
                />
                </Navbar.Brand>
                <Mobile><FontAwesomeIcon icon={faSearch} onClick={this.toggleSearchBar}/></Mobile>
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
                    <Nav.Link href='/contact'>Contact Us</Nav.Link>
                    </Nav>
                    <Nav onSelect={this.onSelect}>
                        <Nav.Item>
                        <Nav.Link eventKey='register'>Sell on PataSpare</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <CartContext.Consumer>
                        {value => {
                            return <CartLink history={this.props.history} cart={value.cart} />
                        }}
                    </CartContext.Consumer>
                    <AuthButton history={this.props.history} />
                </Navbar.Collapse>
                </Navbar>
                <SearchBar history={this.props.history} />
            </Container>

        );
    }
}

export default withRouter(Header);
