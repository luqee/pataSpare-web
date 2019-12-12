import { Component, useContext, useState } from 'react';
import {withRouter} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Container}from 'react-bootstrap';
import autoAPI, { Mobile } from '../api/api';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import {UserContext, CartContext} from '../App'
/** @jsx jsx */
import { jsx } from '@emotion/core'

function CartLink(props){
    let cartContext = useContext(CartContext)
    let [cart, setCart] = useState(cartContext.cart)
    const countItems = (cart) =>{
        if(Object.keys(cart).length > 0 && cart.items){
            if(cart.items.length > 0){
                let quantities = cart.items.map((item) => {return parseInt(item.quantity)})
                let totalItems =  quantities.reduce((prev, next) => {
                    return prev + next
                })
                return totalItems
            }
        }else{
            return 0
        }
    }
    const total = countItems(cart)
    return (
        <Nav>
            <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingCart} /><span>{` (${total})`}</span></Nav.Link>
        </Nav>
    )
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
    const signOut = ()=>{
        autoAPI.post(`/auth/logout`,{},{
            headers: {
                'Authorization': 'Bearer '+ userContext.token
            }
        })
        .then((response) => {
            if (response.status === 200){
                userContext.updateUser({})
                userContext.updateToken('')
                props.history.push("/")
            }
        })
        .catch((error) => {
            console.log(error);
        })
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
                    <a href="/#" onClick={(e) => {
                        e.preventDefault();
                        signOut()
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
    render() {
        return (
            <Container id={`Header`} fluid  style={{
                padding: '0',
                position: 'fixed',
                top: '0',
                zIndex: '12'
            }}>
                <Navbar bg="dark" variant='dark' expand="lg" style={{
                    borderBottom: '5px solid #007bff'
                }}>
                <Navbar.Brand href="/">PataSpare</Navbar.Brand>
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
                    </Nav>
                    <Nav>
                    <Nav.Link href='/dealer/register'>Sell on PataSpare</Nav.Link>
                    </Nav>
                    {/* <CartContext.Consumer>
                        {value => {
                            return 
                        }}
                    </CartContext.Consumer> */}
                    <CartLink history={this.props.history} />
                    <AuthButton history={this.props.history} />
                </Navbar.Collapse>
                </Navbar>
                <SearchBar history={this.props.history} />
            </Container>

        );
    }
}

export default withRouter(Header);
