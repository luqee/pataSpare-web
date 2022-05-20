import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './api/auth';
import GA from './api/GoogleAnalytics';
import './App.css';
import Main from './pages/Main';


export const UserContext = React.createContext({})
export const CartContext = React.createContext({})

function App() {

  const [user, setUser] = useState({})

  const updateUser = (user)=>{
    setUser(user)
  }

  const [cart, setCart] = useState({})
  const updateCart = (cart)=>{
    setCart(cart)
  }

  const logoutUser = (currentUser)=>{
    if(currentUser.auth_provider === 'google'){
      if(!window.google){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://accounts.google.com/gsi/client`;
        s.setAttribute('async', '')
        s.setAttribute('defer', '')
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.addEventListener('load', e => {
          window.google.accounts.id.disableAutoSelect();
          signOut(currentUser)
        })
      }else{
        window.google.accounts.id.disableAutoSelect();
        signOut(currentUser)
      }
    }else{
      signOut(currentUser)
    }
  }

  let navigate = useNavigate()
  const signOut = (user) => {
    logout(user, (response) => {
      if (response.status === 200){
        setUser({})
        navigate("/")
      }
    })
  }

  return (
    <UserContext.Provider value={{user: user, logoutUser: logoutUser, updateUser: updateUser}} >
      <CartContext.Provider value={{cart: cart, updateCart: updateCart}}>
        { GA.init() && <GA.RouteTracker /> }
        <Main />
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
