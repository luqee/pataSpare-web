import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from './Dash';
import Shops from './Shops';
import Orders from './Orders';
import Inquiries from './Inquiries';
import Inventory from './Inventory';
import CreateShop from './CreateShop';
import InquiryView from '../InquiryView';
import InventoryItem from './InventoryItem'
import ViewShop from './ViewShop'
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

function  DealerDash(props){
    return (
        <Container>
            <Row>
                <Col md={3}>
                <div id={`sidebar`} className={`sidebar`} style={sidebarStyle}>
                    <Link to={`${props.match.url}`} style={sideLinkStyle}>Dashboard</Link>
                    <Link to={`${props.match.url}/shops`} style={sideLinkStyle}>Shops</Link>
                    <Link to={`${props.match.url}/inventory`} style={sideLinkStyle}>Inventory</Link>
                    <Link to={`${props.match.url}/orders`} style={sideLinkStyle}>Orders</Link>
                    <Link to={`${props.match.url}/inquiries`} style={sideLinkStyle}>Inquiries</Link>
                </div>
                </Col>
                <Col md={9}>
                <div id='page-wrap'>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={Dash}/>
                    <Route exact path={`${props.match.path}/shops`} render={routeProps =>{
                        return <Shops {...routeProps} user={props.user} />
                    }}/>
                    <Route exact path={`${props.match.path}/orders`} render={routeProps =>{
                        return <Orders {...routeProps} user={props.user} />
                    }}/>
                    <Route exact path={`${props.match.path}/inventory`} render={routeProps =>{
                        return <Inventory {...routeProps} user={props.user} />
                    }}/>
                    <Route exact path={`${props.match.path}/inventory/:id`} component={InventoryItem}/>
                    <Route exact path={`${props.match.path}/inquiries`} render={routeProps =>{
                        return <Inquiries {...routeProps} user={props.user} />
                    }}/>
                    <Route exact path={`${props.match.path}/inquiries/:id`} component={InquiryView}/>
                    <Route exact path={`${props.match.path}/shops/create`} render={routeProps =>{
                        return <CreateShop {...routeProps} user={props.user} />
                    }}/>
                    <Route exact path={`${props.match.path}/shops/:id`} render={routeProps =>{
                        return <ViewShop {...routeProps} user={props.user} />
                    }}/>
                </Switch>
                </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DealerDash;
