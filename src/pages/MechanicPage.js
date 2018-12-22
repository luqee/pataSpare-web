import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import MechanicRegister from '../components/mechanic/MechanicRegister';
import MechanicLogin from '../components/mechanic/MechanicLogin';
import MechanicDash from '../components/mechanic/MechanicDash';

import PrivateRoute from './PrivateRoute';

class MechanicPage extends Component {
    render(){
        return (
            <Switch>
                <PrivateRoute exact path='/mechanic' component={MechanicDash}/>
                <Route path='/mechanic/register' component={MechanicRegister}/>
                <Route path='/mechanic/login' component={MechanicLogin}/>
            </Switch>
        );
    }
}

export default MechanicPage;