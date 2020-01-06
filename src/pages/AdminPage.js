import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from '../components/admin/Dash';
import Categories from '../components/admin/Categories';
import Brands from '../components/admin/Brands';
import Users from '../components/admin/Users';

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
                <Route exact path={`${props.match.path}/users`} component={Users}/>
                <Route exact path={`${props.match.path}/categories`} component={Categories}/>
                <Route exact path={`${props.match.path}/brands`} component={Brands}/>
            </Switch>
            </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;
