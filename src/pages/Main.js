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
import SearchResults from './SearchResults';
import PartDetails from './PartDetails';
import UserCart from './UserCart';
import StoreView from './StoreView';

class Main extends Component {
    render() {
        return (
        <main style={{
            paddingTop: '100px',
            paddingBottom: '10px',
            flex: '1 0 auto'
        }}>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route exact path='/part-category/:category' component={PartCategory}/>
                <Route exact path='/parts/:id' component={PartDetails}/>
                <Route exact path='/shop' component={PartsShop}/>
                <Route exact path='/stores' component={Stores}/>
                <Route exact path='/stores/:id' component={StoreView}/>
                <Route exact path='/cart' component={UserCart}/>
                <Route exact path='/results' component={SearchResults}/>
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
  