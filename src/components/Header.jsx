import React, { Fragment, useContext, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown, Container}from 'react-bootstrap';
import { Mobile } from '../api/config';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import {UserContext, CartContext} from '../App'
import './MainHeader.css';
import logo from '../images/pataspare-logo.png'
import { getCategories } from '../api/api';
import AuthButton from './AuthButton';

function CartLink() {
    let cartContext = useContext(CartContext)
    const countItems = (cart) => {
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
    return (
        <Nav>
            <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingCart} /><span>{` (${countItems(cartContext.cart)})`}</span></Nav.Link>
        </Nav>
    )
}

function Header(){
    const userContext = useContext(UserContext)
    const [categories, setCategories] = useState([])
    useEffect(()=> {
        fetchCats()
    }, [])

    const fetchCats = () => {
        getCategories((categories) => {
            setCategories(categories)
        })
    }

    const toggleSearchBar = (event) =>{
        let searchBar = document.getElementById('searchBar')
        searchBar.style.display = searchBar.style.display === 'block'? 'none': 'block';
    }
    const onSelect = (event)=>{
        let currentUser = userContext.user
        let roles = [];
        if(currentUser !== {} && currentUser.roles){
            roles = currentUser.roles.map((role) => {
                return role.name;
            });
        }
        // if(roles.indexOf('dealer') > -1){
        //     props.history.push('/dealer')
        // }else if(roles.indexOf('customer') > -1){
        //     props.history.push('/customer/account')
        // }else{
        //     props.history.push('/dealer/register')
        // }
    }
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" style={{
                borderBottom: '5px solid #343a40',
                backgroundColor: '#007bff',
            }}>
                <Container>
                    <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="100"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Pataspare logo"
                    />
                    </Navbar.Brand>
                    <Mobile><FontAwesomeIcon icon={faSearch} onClick={toggleSearchBar}/></Mobile>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex-column flex-lg-row">
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {
                                categories.map((category) => {
                                    return (<NavDropdown.Item key={category.id} href={`/part-category/${category.id}`}>{category.name}</NavDropdown.Item>)
                                })
                            }
                        </NavDropdown>
                        <Nav.Link href='/shop'>Shop</Nav.Link>
                        <Nav.Link href='/stores'>Store List</Nav.Link>
                        </Nav>
                        <Nav onSelect={onSelect}>
                            <Nav.Item>
                            <Nav.Link eventKey='register'>Sell on PataSpare</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <CartLink />
                        <AuthButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <SearchBar /> */}
        </Fragment>
    )
}

export default Header;