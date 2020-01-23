import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from '../components/admin/Dash';
import Categories from '../components/admin/Categories';
import Brands from '../components/admin/Brands';
import Users from '../components/admin/Users';
import Category from '../components/admin/Category';
import ManageUser from '../components/admin/ManageUser';
import Brand from '../components/admin/Brand';

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

function AdminPage(props){
    return (
        <Container>
            <Row>
            <Col md={3}>
            <div id={`sidebar`} className={`sidebar`} style={sidebarStyle}>
            <Link to={`${props.match.url}`} style={sideLinkStyle}>Dashboard</Link>
            <Link to={`${props.match.url}/users`} style={sideLinkStyle}>Users</Link>
            <Link to={`${props.match.url}/categories`} style={sideLinkStyle}>Categories</Link>
            <Link to={`${props.match.url}/brands`} style={sideLinkStyle}>Brands</Link>
            </div>
            </Col>
            <Col md={9}>
            <Switch>
                <Route exact path={`${props.match.path}`} component={Dash}/>
                <Route exact path={`${props.match.path}/users`} render={routeProps => {
                    return <Users {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/categories`} render={routeProps => {
                    return <Categories {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/brands`} render={routeProps => {
                    return <Brands {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/categories/:id`} render={routeProps => {
                    return <Category {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/users/:id`} render={routeProps => {
                    return <ManageUser {...routeProps} userToken={props.userToken} />
                }}/>
                <Route exact path={`${props.match.path}/brands/:id`} render={routeProps => {
                    return <Brand {...routeProps} userToken={props.userToken} />
                }}/>
            </Switch>
            </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;
