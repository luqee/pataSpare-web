import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import GarageOwnerRegister from '../components/garrage/GarageOwnerRegister';
import GarageOwnerLogin from '../components/garrage/GarageOwnerLogin';
import GarageOwnerDash from '../components/garrage/GarageOwnerDash';

class GarragePage extends Component {
    render(){
        return (
            <Switch>
                <Route exact path='/garrage' component={GarageOwnerDash}/>
                <Route path='/garrage/register' component={GarageOwnerRegister}/>
                <Route path='/garrage/login' component={GarageOwnerLogin}/>
            </Switch>
        );
    }
}

export default GarragePage;