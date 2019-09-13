import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import ShopInventory from './ShopInventory';
import ShopDash from './ShopDash';
import ShopOrders from './ShopOrders';
import ShopInquiries from './ShopInquiries';
import CreatePart from './CreatePart';
import autoAPI from '../../api/api';
import urls from '../../config/config';

class ManageShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
            shop_id: props.match.params.id
            
        }
    }
    componentDidMount = () => {
        
        autoAPI.get(`${urls.dealerHome}/shops/${this.props.match.params.id}`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                
                this.setState({parts: response.data.data.parts})
                
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
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
            <Container>
                <Row>
                    <Col md={3}>
                    <div id={ "manage-menu" } style={sidebarStyle}>
                        <Link to={`${this.props.match.url}`} style={sideLinkStyle}>Details</Link>
                        <Link to={`${this.props.match.url}/parts`} style={sideLinkStyle}>Parts</Link>
                        <Link to={`${this.props.match.url}/orders`} style={sideLinkStyle}>Orders</Link>
                        <Link to={`${this.props.match.url}/inquiries`} style={sideLinkStyle}>Inquiries</Link>
                    </div>
                    </Col>
                    <Col md={9}>
                    <div id='page-wrap'>
                    <Switch>
                        <Route exact path={`${this.props.match.path}`} component={ShopDash}/>
                        <Route exact path={`${this.props.match.path}/parts`} render={(routerProps)=> {
                            return <ShopInventory {...routerProps} parts={this.state.parts} shopId={this.state.shop_id}/>
                        }}/>
                        <Route exact path={`${this.props.match.path}/orders`} component={ShopOrders}/>
                        <Route exact path={`${this.props.match.path}/inquiries`} component={ShopInquiries}/>
                        <Route exact path={`${this.props.match.path}/part/create`} component={CreatePart}/>
                    </Switch>
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ManageShop;
