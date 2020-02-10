import React from 'react';
import { Switch, Route } from 'react-router-dom'
import CustomerDash from '../components/customer/CustomerDash';
import CreateOrder from '../components/customer/CreateOrder';
import { CartContext } from '../App';

function CustomerPage(props){
    
    return (
        <Switch>
            <Route path={`${props.match.path}`} render={
                roteProps =>{
                    return (
                        <CustomerDash user={props.user} userToken={props.userToken} {...roteProps}/>
                    )
                }
            }/>
            <Route exact path={`${props.match.path}/orders/create`} render={routeProps =>{
                return <CartContext.Consumer>
                    {value => {return <CreateOrder {...routeProps} userToken={props.userToken} cartContext={value} />}}
                </CartContext.Consumer>
            }}/>
        </Switch>
    );
}

export default CustomerPage;