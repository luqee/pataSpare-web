
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import DealerPage from './DealerPage';
import LangingPage from './LandingPage'

class Main extends Component {
    render() {
        return (
        <main>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route path='/dealer' component={DealerPage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
  