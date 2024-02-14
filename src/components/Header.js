'use client'
import React, { useEffect, useState } from 'react'
import {Nav, NavDropdown, Container, Navbar}from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './MainHeader.css';
import logo from '@/images/pataspare-logo.png'
import { getCategories } from '@/utils/api';
import { useRouter } from 'next/navigation';
import {Mobile} from '@/config/config'
import {CartLink} from '@/components/CartLink'
import {AuthButton} from '@/components/AuthButton'
import {SearchBar} from '@/components/SearchBar'
import Image from 'next/image'

export const Header =()=> {
    const [categories, setCategories] = useState([])
    const [ismobile, setIsmobile] = useState(false)
    useEffect(()=>{
        fetchCategories()
    }, [])

    const fetchCategories = ()=> {
        getCategories()
        .then((response) => {
            if (response.status === 200) {
                setCategories(response.data.data.categories)
            }
        })
        .catch((error) => {
            console.log('Woops an error '+error);
        })
    }

    const toggleSearchBar = (event) =>{
        let searchBar = document.getElementById('searchBar')
        searchBar.style.display = searchBar.style.display == 'block'? 'none': 'block';
    }

    return (
        <Container id={`Header`} fluid>
            <Navbar expand="lg" style={{
                borderBottom: '5px solid #343a40',
                backgroundColor: '#007bff',
            }}>
            <Navbar.Brand href="/">
            <Image
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
                <Nav id='siteNav' className="mr-auto flex-column flex-lg-row">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {
                        categories.map((category, index) => {
                            return (<NavDropdown.Item key={index} href={`/parts?category=${category.id}`}>{category.name}</NavDropdown.Item>)
                        })
                    }
                </NavDropdown>
                <Nav.Link href='/parts' onSelect={(event)=>{
                    event.stopPropagation()
                    console.log('selected')
                }}>Parts</Nav.Link>
                <Nav.Link href='/stores'>Store List</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href='https://vendor.pataspare.co.ke'>Sell on PataSpare</Nav.Link>
                </Nav>
                <CartLink />
                <AuthButton />
            </Navbar.Collapse>
            </Navbar>
            <SearchBar />
        </Container>

    )
}