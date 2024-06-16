import type { Metadata, Viewport } from 'next'
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import { Container } from 'react-bootstrap'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {AuthProvider} from '@/context/AuthContext'
import {CartProvider} from '@/context/CartContext'
import { fetchCategories } from '@/actions/category';

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
    default: 'Pataspare',
    template: '%s | PataSpare - Your one stop solution for your auto parts needs'
  },
  description: 'Find your nearest service provider. Source for your spareparts from a wide selection of auto part dealers. Quality parts, timely delivery and overall top service are our top priority.',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await fetchCategories()
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <CartProvider>
          {/* { GA.init() && <GA.RouteTracker /> } */}
          <div className="App" style={{
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
              <Header categories={categories} />
            </Container>
            <Container fluid style={{
              marginTop: `${100}px`,
              paddingBottom: '10px,',
              paddingTop: '10px',
              flex: '1'
            }} >
              <div>
              {children}
              </div>
            </Container>
            <Container className='footer' fluid style={{
              paddingTop: '20px',
              backgroundColor: '#212529',
              color: '#ffffff',
            }}>
              <Footer />
            </Container>
        </div>
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
