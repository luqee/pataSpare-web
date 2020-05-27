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
import { CartContext, UserContext } from '../App';
import Privacy from './Privacy';
import Terms from './Terms';
import ContactPage from './ContactPage';
import Activate from './Activate';
import EmailSent from './EmailSent';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerHeight: '10px'
        }
    }
    componentDidMount = () =>{
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }
    componentWillMount = ()=>{
        window.removeEventListener('resize', this.handleResize)
    }
    handleResize = () =>{
        let headerHeight = document.getElementById('Header').offsetHeight
        this.setState({headerHeight: headerHeight})
    }
    render() {
        let height = this.state.headerHeight

        return (
        <main style={{
            marginTop: `${height}px`,
            paddingBottom: '10px,',
            paddingTop: '10px',
            flex: '1 0 auto'
        }}>
            <Switch>
                <Route exact path='/' component={LangingPage}/>
                <Route exact path='/part-category/:category' component={PartCategory}/>
                <Route exact path='/parts/:id' render={(routeProps)=>{
                    return <CartContext.Consumer>
                        {value => {
                            return <PartDetails {...routeProps} cartContext={value}/>
                        }}
                    </CartContext.Consumer>
                }}/>
                <Route exact path='/shop' component={PartsShop}/>
                <Route exact path='/contact' component={ContactPage}/>
                <Route exact path='/stores' component={Stores}/>
                <Route exact path='/stores/:id' render={routeProps => {
                    return <UserContext.Consumer>
                        {value => {
                            return <StoreView {...routeProps} user={value.user} />
                        }}
                    </UserContext.Consumer>
                }}/>
                <Route exact path='/cart' render={(routeProps)=>{
                    return (
                        <CartContext.Consumer>
                            {value =>{
                                return <UserCart {...routeProps} cartContext={value}/>
                            }}
                        </CartContext.Consumer>
                    )
                }}/>
                <Route exact path='/results' component={SearchResults}/>
                <Route exact path='/dealer/register' component={DealerRegister}/>
                <Route exact path='/customer/register' render={(routeProps)=>{
                    return <UserContext.Consumer>
                        {value => {
                            return <CustomerRegister {...routeProps} userContext={value} />
                        }}
                    </UserContext.Consumer>
                }}/>
                <Route exact path='/user/login' render={(routeProps)=>{
                    return <UserContext.Consumer>
                        {value => {
                            return <UserLogin {...routeProps} userContext={value} />
                        }}
                    </UserContext.Consumer>
                }}/>
                <Route exact path='/auth/activate' component={Activate}/>
                <Route exact path='/auth/email' component={EmailSent}/>
                <Route exact path='/privacy' component={Privacy}/>
                <Route exact path='/terms' component={Terms}/>
                <PrivateRoute path='/dealer' userRole='dealer' component={DealerPage}/>
                <PrivateRoute path='/customer' userRole='customer' component={CustomerPage}/>
                <PrivateRoute path='/admin' userRole='admin' component={AdminPage}/>
            </Switch>
        </main>
        );
    }
}

export default Main;
