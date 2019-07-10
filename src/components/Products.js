import React from 'react';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import TabCategory from './TabCategory';

function Products(props){
    return (
        <Container className='products' id='products'>
            <Row>
                <Col>
                <Tabs defaultActiveKey='featured' id='categoryTabs'>
                <Tab eventKey='featured' title='FEATURED PRODUCTS'>
                    featured products
                </Tab>
                <Tab eventKey='exterior' title='EXTERIOR'>
                    <TabCategory category={`Exterior`} />
                </Tab>
                <Tab eventKey='interior' title='INTERIOR'>
                    <TabCategory category={`Interior`} />
                </Tab>
                <Tab eventKey='performance' title='PERFORMANCE'>
                    <TabCategory category={`Performance`} />
                </Tab>
                <Tab eventKey='accessories' title='ACCESSORIES'>
                    <TabCategory category={`Accessories`} />
                </Tab>
                </Tabs>
                </Col>
            </Row>
        </Container>
    )
}
export default Products