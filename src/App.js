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
        cart: localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{}
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
          this.updateUser({})
          this.updateToken('')
      })
    }

  }
  updateToken = (token)=>{
    if(token !== ''){
      localStorage.setItem('token', JSON.stringify(token))
    }else{
      localStorage.removeItem('token')
    }
    this.setState({token: token})
  }

  updateUser = (user)=>{
    if(Object.keys(user).length > 0){
      localStorage.setItem('user', JSON.stringify(user))
    }else{
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

  render() {
      let user = this.state.user
      let token = this.state.token
      let cart = this.state.cart
    return (
      <UserContext.Provider value={{user: user, updateUser: this.updateUser, updateToken: this.updateToken, token: token}} >
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
