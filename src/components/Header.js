'use client'
import {Nav, NavDropdown, Container, Navbar}from 'react-bootstrap'
import './MainHeader.css';
import logo from '@/images/pataspare-logo.png'
import {CartLink} from '@/components/CartLink'
import {AuthButton} from '@/components/AuthButton'
import {SearchBar} from '@/components/SearchBar'
import Image from 'next/image'
import { autoAPI } from '@/config/axios'
import { SearchToggle } from "@/components/SearchToggle";
import { fetchCategories } from "@/actions/category";

export const Header = ({categories})=> {
    return (
        <Container id={`Header`} fluid style={{
            borderBottom: '5px solid #343a40',
            backgroundColor: '#007bff',
            padding: 0
        }}>
            <Navbar expand="lg">
            <Navbar.Brand href="/">
            <Image
                src={logo}
                width="100"
                height="40"
                className="d-inline-block align-top"
                alt="Pataspare logo"
            />
            </Navbar.Brand>
            {/* <SearchToggle /> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav id='siteNav' className="mr-auto flex-column flex-lg-row">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {
                        categories && categories.map((category, index) => {
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
                {/* <CartLink /> */}
                <AuthButton />
            </Navbar.Collapse>
            </Navbar>
            {/* <SearchBar /> */}
        </Container>

    )
}