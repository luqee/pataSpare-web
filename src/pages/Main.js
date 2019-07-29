
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import DealerPage from './DealerPage';
import LangingPage from './LandingPage';
import DealerRegister from '../components/dealer/DealerRegister';
import DealerLogin from '../components/dealer/DealerLogin';
import Stores from './Stores';
import PartCategory from './PartCategory';
import PartsShop from './PartsShop';
import PartDetails from './PartDetails';

class Main extends Component {
    render() {
        return (
        <main style={{
            paddingTop: '100px'
        }}>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route exact path='/part-category/:category' component={PartCategory}/>
                <Route exact path='/parts/:id' component={PartDetails}/>
                <Route exact path='/shop' component={PartsShop}/>
                <Route exact path='/stores' component={Stores}/>
                <Route exact path='/dealer/register' component={DealerRegister}/>
                <Route exact path='/dealer/login' component={DealerLogin}/>
                <PrivateRoute path='/dealer' component={DealerPage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
  