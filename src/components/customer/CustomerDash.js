import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import Dash from './Dash';
import Orders from './Orders';
import Inquiries from './Inquiries';
import Account from './Account';
import ViewOrder from './ViewOrder';
import Menu from 'react-burger-menu/lib/menus/slide';


function CustomerDash(props){
    var styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '70px'
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmItem: {
            // display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }
    return (
        <Container id='customer-dash' fluid>
            <Row>
            <Col>
            <Menu isOpen={true} styles={styles} pageWrapId={"customer-view"} outerContainerId={"customer-dash"}>
                <Link to={`${props.match.url}`} className="menu-item">Dashboard</Link>
                <Link to={`${props.match.url}/orders`} className="menu-item">Orders</Link>
                <Link to={`${props.match.url}/inquiries`} className="menu-item">Inquiries</Link>
                <Link to={`${props.match.url}/account`} className="menu-item">Acccount</Link>
            </Menu>
            <div id='customer-view'>
            <Switch>
                <Route exact path={`${props.match.path}`} component={Dash}/>
                <Route exact path={`${props.match.path}/orders`} component={Orders}/>
                <Route exact path={`${props.match.path}/orders/:id`} component={ViewOrder}/>
                <Route exact path={`${props.match.path}/inquiries`} component={Inquiries}/>
                <Route exact path={`${props.match.path}/account`} component={Account}/>
            </Switch>
            </div>
            </Col>
            </Row>
        </Container>
    );
}

export default CustomerDash;
