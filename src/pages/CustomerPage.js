import React from 'react';
import { Switch, Route } from 'react-router-dom'


import CustomerDash from '../components/customer/CustomerDash';

function CustomerPage({match}){
    
    return (
        <Switch>
            <Route path={`${match.path}`} component={CustomerDash}/>
        </Switch>
    );
}

export default CustomerPage;