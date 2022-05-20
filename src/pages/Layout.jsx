import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Layout(){

    const [headerHeight, setHeaderHeight] = useState(100)
    const handleResize = ()=> {
        let headerHeight = document.getElementById('Header').offsetHeight
        setHeaderHeight(headerHeight)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleResize)
        handleResize()
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    })
    return (
        <Container fluid className="App" style={{
            padding: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            
            <Container id={`Header`} fluid  style={{
                padding: '0',
                position: 'fixed',
                top: '0',
                zIndex: '20',
            }}>
              <Header />
            </Container>
            <Container style={{
              marginTop: `${headerHeight}px`,
              paddingBottom: '10px,',
              paddingTop: '10px',
              flex: '1'
            }} >
              <Outlet />
            </Container>
            <Container className='footer' fluid style={{
              paddingTop: '20px',
              backgroundColor: '#212529',
              color: '#ffffff',
            }}>
              <Footer />
            </Container>
        </Container>
    )
}

export default Layout