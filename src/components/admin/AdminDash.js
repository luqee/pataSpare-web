import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from './Dash';
import Categories from './Categories';
import Brands from './Brands';
import Menu from 'react-burger-menu/lib/menus/slide';

function AdminDash(props){
    return (
        <Container>
            <Row>
            <Col>
            <Menu pageWrapId={ "admin-dash" }>
                <Link to={`${props.match.url}`}>Dashboard</Link>
                <Link to={`${props.match.url}/categories`}>Categories</Link>
                <Link to={`${props.match.url}/models`}>Brands</Link>
            </Menu>
            <div id='admin-dash'>
            <Switch>
                <Route exact path={`${props.match.path}`} component={Dash}/>
                <Route exact path={`${props.match.path}/categories`} component={Categories}/>
                <Route exact path={`${props.match.path}/models`} component={Brands}/>
            </Switch>
            </div>
            </Col>
            </Row>
        </Container>
    );
}

export default AdminDash;
