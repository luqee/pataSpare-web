import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import DealerPage from './DealerPage';
import CustomerPage from './CustomerPage';
import AdminPage from './AdminPage';
import LangingPage from './LandingPage';
import DealerRegister from './DealerRegister';
import CustomerRegister from './CustomerRegister';
import UserLogin from './UserLogin';
import Stores from './Stores';
import PartCategory from './PartCategory';
import PartsShop from './PartsShop';
import SearchParts from './SearchParts';
import PartDetails from './PartDetails';

class Main extends Component {
    render() {
        return (
        <main style={{
            paddingTop: '80px',
            paddingBottom: '10px',
            flex: '1 0 auto'
        }}>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route exact path='/part-category/:category' component={PartCategory}/>
                <Route exact path='/parts/:id' component={PartDetails}/>
                <Route exact path='/shop' component={PartsShop}/>
                <Route exact path='/stores' component={Stores}/>
                <Route exact path='/search/:term' component={SearchParts}/>
                <Route exact path='/dealer/register' component={DealerRegister}/>
                <Route exact path='/customer/register' component={CustomerRegister}/>
                <Route exact path='/user/login' component={UserLogin}/>
                <PrivateRoute path='/dealer' userRole='dealer' component={DealerPage}/>
                <PrivateRoute path='/customer' userRole='customer' component={CustomerPage}/>
                <PrivateRoute path='/admin' userRole='admin' component={AdminPage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
  