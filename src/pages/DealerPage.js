import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import DealerRegister from '../components/dealer/DealerRegister';
import DealerLogin from '../components/dealer/DealerLogin';
import DealerDash from '../components/dealer/DealerDash';

class DealerPage extends Component {
    render(){
        return (
            <Switch>
                <Route exact path='/dealer' component={DealerDash}/>
                <Route path='/dealer/register' component={DealerRegister}/>
                <Route path='/dealer/login' component={DealerLogin}/>
            </Switch>
        );
    }
}

export default DealerPage;