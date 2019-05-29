import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import DealerRegister from '../components/dealer/DealerRegister';
import DealerLogin from '../components/dealer/DealerLogin';
import CreateShop from '../components/dealer/CreateShop';
import DealerDash from '../components/dealer/DealerDash';
import PrivateRoute from './PrivateRoute';

class DealerPage extends Component {
    render(){
        return (
            <Switch>
                <PrivateRoute exact path='/dealer' component={DealerDash}/>
                <Route path='/dealer/register' component={DealerRegister}/>
                <Route path='/dealer/login' component={DealerLogin}/>
                <Route path='/dealer/shop/create' component={CreateShop}/>
            </Switch>
        );
    }
}

export default DealerPage;