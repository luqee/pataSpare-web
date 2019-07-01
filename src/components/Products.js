import React from 'react';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';

function Products(props){
    return (
        <Container className='products'>
            <Row>
                <Col>
                <Tabs defaultActiveKey='featured' id='categoryTabs'>
                <Tab eventKey='featured' title='FEATURED PRODUCTS'>
                    featured products
                </Tab>
                <Tab eventKey='exterior' title='EXTERIOR'>
                    filtered by exterior
                </Tab>
                <Tab eventKey='interior' title='INTERIOR'>
                    filtered by interior
                </Tab>
                <Tab eventKey='performance' title='PERFORMANCE'>
                    filtered by performance
                </Tab>
                <Tab eventKey='accessories' title='ACCESSORIES'>
                    filtered by accessories
                </Tab>
                </Tabs>
                </Col>
            </Row>
        </Container>
    )
}
export default Products