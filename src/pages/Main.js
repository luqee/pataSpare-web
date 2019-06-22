
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import DealerPage from './DealerPage';
import LangingPage from './LandingPage';
import DealerRegister from '../components/dealer/DealerRegister';
import DealerLogin from '../components/dealer/DealerLogin';
class Main extends Component {
    render() {
        return (
        <main>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route exact path='/dealer/register' component={DealerRegister}/>
                <Route exact path='/dealer/login' component={DealerLogin}/>
                <PrivateRoute path='/dealer' component={DealerPage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
  