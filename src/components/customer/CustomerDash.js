import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from './Dash';
import Orders from './Orders';
import Inquiries from './Inquiries';
import Account from './Account';
import ViewOrder from './ViewOrder';
import InquiryView from '../InquiryView';


function CustomerDash(props){
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
    return (
        <Container id='customer-dash'>
            <Row>
            <Col md={3}>
            <div id={`sidebar`} className={`sidebar`} style={sidebarStyle}>
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
                <Route exact path={`${props.match.path}/orders`} component={Orders}/>
                <Route exact path={`${props.match.path}/orders/:id`} component={ViewOrder}/>
                <Route exact path={`${props.match.path}/inquiries`} component={Inquiries}/>
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
