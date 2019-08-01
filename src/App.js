import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Main />
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
