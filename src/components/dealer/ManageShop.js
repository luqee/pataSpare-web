import React, {useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import ShopInventory from './ShopInventory';
import ShopDash from './ShopDash';
import ShopOrders from './ShopOrders';
import ShopInquiries from './ShopInquiries';
import CreatePart from './CreatePart';
import InquiryView from '../InquiryView';
import autoAPI from '../../api/api';

function ManageShop(props){
    const fetchShop = () => {
        console.log('fetching shop none in location state');
        
        autoAPI.get('/dealer/shops/'+ props.match.params.id, {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                setShop(response.data.data.shop)
            }

        })
        .catch((error) => {
            console.log(error);

        })
    }
    let [shop, setShop] = useState(props.location.state ? props.location.state.shop : fetchShop())
    const sidebarStyle = {
        height: '100%',
        overflowX: 'hidden',
        paddingTop: '20px'
    }
    const sideLinkStyle = {
        padding: '6px 8px 6px 16px',
        textDecoration: 'none',
        fontSize: '20px',
        color: '#343a40',
        display: 'block',
        borderBottom: '3px solid #343a40',
    }
    
    
    return (
        <Container>
            <Row>
                <Col md={3}>
                <div id={ "manage-menu" } style={sidebarStyle}>
                <Link to={`/dealer`} style={sideLinkStyle}> Dealer Home</Link>
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
                    <Route exact path={`${props.match.path}/parts`} render={(routeProps)=>{
                        return <ShopInventory shop={shop} {...routeProps} userToken={props.userToken} />
                    }}/>
                    <Route exact path={`${props.match.path}/orders`} render={(routeProps)=>{
                        return <ShopOrders shop={shop} {...routeProps} userToken={props.userToken} />
                    }}/>
                    <Route exact path={`${props.match.path}/inquiries`} render={(routeProps)=>{
                        return <ShopInquiries shop={shop} {...routeProps} userToken={props.userToken} />
                    }}/>
                    <Route exact path={`${props.match.path}/inquiries/:id`} component={InquiryView}/>
                    <Route exact path={`${props.match.path}/parts/create`} render={(routeProps)=>{
                        return <CreatePart shop={shop} {...routeProps} userToken={props.userToken}/>
                    }}/>
                    {/* <Route exact path={`${props.match.path}/inventory/:id`} component={InventoryItem}/> */}
                </Switch>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManageShop;
