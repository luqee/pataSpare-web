import React from 'react';
import { Switch, Route } from 'react-router-dom'


import CreateShop from '../components/dealer/CreateShop';
import CreatePart from '../components/dealer/CreatePart';
import DealerDash from '../components/dealer/DealerDash';
import ManageShop from '../components/dealer/ManageShop';

function DealerPage({match}){
    console.log(match);
    
    return (
        <Switch>
            <Route exact path='/dealer' component={DealerDash}/>
            <Route path={`${match.path}/shops/create`} component={CreateShop}/>
            <Route path={`${match.path}/shops/:id/manage`} component={ManageShop}/>
            <Route path={`${match.path}/shops/:id/part/create`} component={CreatePart}/>
        </Switch>
    );
}

export default DealerPage;