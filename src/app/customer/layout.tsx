import type { Metadata, Viewport } from 'next'
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import { Col, Container, Row } from 'react-bootstrap'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {AuthProvider} from '@/context/AuthContext'
import {CartProvider} from '@/context/CartContext'
import Link from 'next/link';
import './customer.css'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pataspare.co.ke'),
  title: {
    default: 'PataSpare - User dashboard',
    template: '%s | PataSpare - Your one stop solution for your auto parts needs'
  },
  description: 'Keep track of your orders and enquiries.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'}
    ],
    shortcut: ['/favicon.ico'],
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <CartProvider>
          {/* { GA.init() && <GA.RouteTracker /> } */}
          <Container fluid className="App" style={{
            padding: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
          <Container fluid  style={{
                padding: '0',
                position: 'fixed',
                top: '0',
                zIndex: '20',
            }}>
              <Header />
            </Container>
            <Container style={{
              marginTop: `${100}px`,
              paddingBottom: '10px,',
              paddingTop: '10px',
              flex: '1'
            }} >
                <Container id='customer-dash'>
                    <Row>
                    <Col md={3}>
                    <div id={`sidebar`} className={`sidebar`} >
                        <Link id='sidebarLink' href={`/customer`} > Dashboard</Link>
                        <Link id='sidebarLink' href={`/customer/orders`} >Orders</Link>
                        <Link id='sidebarLink' href={`/customer/inquiries`} >Inquiries</Link>
                        <Link id='sidebarLink' href={`/customer/account`} >Acccount</Link>
                    </div>
                    </Col>
                    <Col md={9}>
                    <div id='customer-view'>
                    {children}
                    </div>
                    </Col>
                    </Row>
                </Container>
            </Container>
            <Container className='footer' fluid style={{
              paddingTop: '20px',
              backgroundColor: '#212529',
              color: '#ffffff',
            }}>
              <Footer />
            </Container>
        </Container>
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
