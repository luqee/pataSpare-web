import React from 'react';
import { Switch, Route } from 'react-router-dom'
import DealerDash from '../components/dealer/DealerDash';
import ManageShop from '../components/dealer/ManageShop';

function DealerPage(props){
    
    return (
        <Switch>
            <Route path={`${props.match.path}/shops/manage/:id`} render={routeProps => {
                return <ManageShop {...routeProps} userToken={props.userToken} />
            }}/>
            <Route path={`${props.match.path}`} render={routeProps => {
                return <DealerDash {...routeProps} userToken={props.userToken} />
            }}/>
        </Switch>
    );
}

export default DealerPage;