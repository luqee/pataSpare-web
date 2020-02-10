import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from './Dash';
import Orders from './Orders';
import Inquiries from './Inquiries';
import Account from './Account';
import ViewOrder from './ViewOrder';
import InquiryView from '../InquiryView';
import {Helmet} from 'react-helmet';

function CustomerDash(props){
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
    let roles = []
    const currentUser = props.user
    roles = Object.keys(currentUser).length > 0 && currentUser.roles.map((role) => {
        return role.name;
    });
    
    
    return (
        <Container id='customer-dash'>
            <Helmet>
            <title>PataSpare - User dashboard</title>
            <meta name="description" content="Keep track of your orders and enquiries." />
            </Helmet>
            <Row>
            <Col md={3}>
            <div id={`sidebar`} className={`sidebar`} style={sidebarStyle}>
                {
                    (roles.indexOf('dealer') > -1) && <Link to={`/dealer`} style={sideLinkStyle}> Dealer Home</Link>
                }
                <Link to={`${props.match.url}`} style={sideLinkStyle}> Dashboard</Link>
                <Link to={`${props.match.url}/orders`} style={sideLinkStyle}>Orders</Link>
                <Link to={`${props.match.url}/inquiries`} style={sideLinkStyle}>Inquiries</Link>
                <Link to={`${props.match.url}/account`} style={sideLinkStyle}>Acccount</Link>
            </div>
            </Col>
            <Col md={9}>
            <div id='customer-view'>
            <Switch>
                <Route exact path={`${props.match.path}`} component={Dash}/>
                <Route exact path={`${props.match.path}/orders`} render={routeProps =>{
                    return <Orders {...routeProps} userToken={props.userToken} />
                }}/>
                
                <Route exact path={`${props.match.path}/orders/:id`} component={ViewOrder}/>
                <Route exact path={`${props.match.path}/inquiries`} render={routeProps =>{
                    return <Inquiries {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/inquiries/:id`} component={InquiryView}/>
                <Route exact path={`${props.match.path}/account`} component={Account}/>
            </Switch>
            </div>
            </Col>
            </Row>
        </Container>
    );
}

export default CustomerDash;
