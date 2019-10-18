import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

export const UserContext = React.createContext({})
export const CartContext = React.createContext({})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{},
        cart: localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{}
    }
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
      let cart = this.state.cart
    return (
      <BrowserRouter>
      <UserContext.Provider value={{user: user, updateUser: this.updateUser}} >
        <CartContext.Provider value={{cart: cart, updateCart: this.updateCart}}>
        <Container fluid className="App" style={{
            padding: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <Main />
            <Footer />
        </Container>
        </CartContext.Provider>
      </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
