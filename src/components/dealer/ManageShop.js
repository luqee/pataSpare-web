import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import ShopInventory from './ShopInventory';
import ShopDash from './ShopDash';
import ShopOrders from './ShopOrders';
import ShopInquiries from './ShopInquiries';
import CreatePart from './CreatePart';
import InquiryView from '../InquiryView';

function ManageShop(props){
    const sidebarStyle = {
        height: '100%',
        backgroundColor: '#111',
        overflowX: 'hidden',
        paddingTop: '20px'
    }
    const sideLinkStyle = {
        padding: '6px 8px 6px 16px',
        textDecoration: 'none',
        fontSize: '25px',
        color: '#818181',
        display: 'block',
    }
    const shop = props.location.state.shop
    return (
        <Container>
            <Row>
                <Col md={3}>
                <div id={ "manage-menu" } style={sidebarStyle}>
                    <Link to={{
                        pathname: `${props.match.url}`,
                        state: {shop: shop}
                    }} style={sideLinkStyle}>Details</Link>
                    <Link to={{
                        pathname: `${props.match.url}/parts`,
                        state: {shop: shop}
                    }} style={sideLinkStyle}>Parts</Link>
                    <Link to={{
                        pathname: `${props.match.url}/orders`,
                        state: {shop: shop}
                    }} style={sideLinkStyle}>Orders</Link>
                    <Link to={{
                        pathname: `${props.match.url}/inquiries`,
                        state: {shop: shop}
                    }} style={sideLinkStyle}>Inquiries</Link>
                </div>
                </Col>
                <Col md={9}>
                <div id='page-wrap'>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={ShopDash}/>
                    <Route exact path={`${props.match.path}/parts`} component={ShopInventory}/>
                    <Route exact path={`${props.match.path}/orders`} component={ShopOrders}/>
                    <Route exact path={`${props.match.path}/inquiries`} component={ShopInquiries}/>
                    <Route exact path={`${props.match.path}/inquiries/:id`} component={InquiryView}/>
                    <Route exact path={`${props.match.path}/parts/create`} render={(props)=>{
                        return <CreatePart shop={shop} {...props} />
                    }}/>
                </Switch>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManageShop;
