
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import DealerPage from './DealerPage';
import MechanicPage from './MechanicPage';
import GarragePage from './GarragePage';
import LangingPage from './LandingPage'

class Main extends Component {
    render() {
        return (
        <main>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route path='/dealer' component={DealerPage}/>
                <Route path='/mechanic' component={MechanicPage}/>
                <Route path='/garrage' component={GarragePage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
  