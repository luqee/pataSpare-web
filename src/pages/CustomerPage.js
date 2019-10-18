import React from 'react';
import { Switch, Route } from 'react-router-dom'


import CustomerDash from '../components/customer/CustomerDash';

function CustomerPage(props){
    
    return (
        <Switch>
            <Route path={`${props.match.path}`} render={
                roteProps =>{
                    return (
                        <CustomerDash user={props.user} {...roteProps}/>
                    )
                }
            }/>
        </Switch>
    );
}

export default CustomerPage;