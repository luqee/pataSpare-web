import React, { Component } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import GA from './api/GoogleAnalytics';
import CartService from './api/cart';
import autoAPI from './api/api';

export const UserContext = React.createContext({})
export const tokenContext = React.createContext('')
export const CartContext = React.createContext({})

const cartService = new CartService();

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{},
            token: localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):'',
            cart: localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{},
            googleApi: '',
            googleAuth: ''
        }
    }

componentDidMount = ()=>{
    if(Object.keys(this.state.cart).length > 0){
      cartService.getCart(this.state.cart, (cart) => {
        if(cart){
          this.updateCart(cart)
        }else{
          this.updateCart({})
        }
      })
    }
    if(Object.keys(this.state.user).length > 0){
      autoAPI.get('/auth/user', {
        headers: {'Authorization': 'Bearer '+ this.state.token}
      })
      .then((response) => {
          if (response.data.status === 200){
              let user = response.data.data.user
              user['token'] = this.state.token
              this.updateUser(user)
          }else{
            this.updateUser({})
            this.updateToken('')

          }
      })
      .catch((error) => {
        console.log('Error getting user');
        console.log(error);
          this.updateUser({})
          this.updateToken('')
      })
    }
    if(!window.gapi){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://apis.google.com/js/platform.js`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.addEventListener('load', e => {
            this.initGoogleAuth();
        })
    }else{
        this.initGoogleAuth();
    }
}
initGoogleAuth = ()=>{
    window.gapi.load('auth2', ()=>{
        let googleAuth = window.gapi.auth2.init({
            client_id: process.env.REACT_APP_CLIENT_ID
        })
        this.setState({googleApi: window.gapi})
        this.setState({googleAuth: window.gapi.auth2})
        console.log('initgoogleAuth');
        console.log(window.gapi);
        console.log(window.gapi.auth2);
        
    })
}
updateToken = (token)=>{
    if(token !== ''){
        console.log('setting token');
        
        localStorage.setItem('token', JSON.stringify(token))
    }else{
        console.log('removing token');
        
        localStorage.removeItem('token')
    }
    this.setState({token: token})
}

updateUser = (user)=>{
    if(Object.keys(user).length > 0){
        console.log('setting user');
        
        localStorage.setItem('user', JSON.stringify(user))
    }else{
        console.log('removing user');
        
        localStorage.removeItem('user')
    }
    this.setState({user: user})
}
updateCart = (cart)=>{
    if(Object.keys(cart).length > 0){
        localStorage.setItem('cart', JSON.stringify(cart))
    }else{
        localStorage.removeItem('cart')
    }
    this.setState({cart: cart})
}

logoutUser = (currentUser, history)=>{
    if(currentUser.auth_provider == 'google'){
        let auth2 = this.state.googleAuth.getAuthInstance()
        auth2.signOut().then(()=>{
            autoAPI.post(`/auth/logout`,{},{
                headers: {
                    'Authorization': 'Bearer '+ this.state.token
                }
            })
            .then((response) => {
                if (response.data.status === 200){
                    history.push("")
                    history.push("/")
                    this.updateToken('')
                    this.updateUser({})
                }
            })
            .catch((error) => {
                console.log(error);
            })  
        })
    }else{
        autoAPI.post(`/auth/logout`,{},{
            headers: {
                'Authorization': 'Bearer '+ this.state.token
            }
        })
        .then((response) => {
            if (response.status === 200){
                this.updateUser({})
                this.updateToken('')
                history.push("")
                history.push("/")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    
    //logout from google then from app.
}

render() {
    let user = this.state.user
    let token = this.state.token
    let cart = this.state.cart
    let gAuth = this.state.googleAuth
    return (
        <UserContext.Provider value={{user: user, logoutUser: this.logoutUser, gAuth: gAuth, updateUser: this.updateUser, updateToken: this.updateToken, token: token}} >
        <CartContext.Provider value={{cart: this.state.cart, updateCart: this.updateCart}}>
        <Container fluid className="App" style={{
            padding: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            { GA.init() && <GA.RouteTracker /> }
            <UserContext.Consumer>
            {props => {
                return <Header user={props.user}/>
            }}
            </UserContext.Consumer>
            
            <Main />
            <Footer />
        </Container>
        </CartContext.Provider>
        </UserContext.Provider>
    );
    }
}

export default App;
