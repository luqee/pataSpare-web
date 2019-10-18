import React from 'react';
import { Switch, Route } from 'react-router-dom'
import DealerDash from '../components/dealer/DealerDash';
import ManageShop from '../components/dealer/ManageShop';

function DealerPage(props){
    
    return (
        <Switch>
            <Route path={`${props.match.path}/shops/manage/:id`} render={routeProps => {
                return <ManageShop {...routeProps} user={props.user} />
            }}/>
            <Route path={`${props.match.path}`} render={routeProps => {
                return <DealerDash {...routeProps} user={props.user} />
            }}/>
        </Switch>
    );
}

export default DealerPage;