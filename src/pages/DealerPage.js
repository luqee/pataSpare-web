import React from 'react';
import { Switch, Route } from 'react-router-dom'
import DealerDash from '../components/dealer/DealerDash';
import ManageShop from '../components/dealer/ManageShop';

function DealerPage({match}){
    
    return (
        <Switch>
            <Route path={`${match.path}/manage/:id`} component={ManageShop}/>
            <Route path={`${match.path}`} component={DealerDash}/>
        </Switch>
    );
}

export default DealerPage;