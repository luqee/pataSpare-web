import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/dealer/register'>Dealer</Link></li>
                    <li><Link to='/mechanic/register'>Mech</Link></li>
                    <li><Link to='/garrage/register'>Garrage</Link></li>
                </ul>
            </nav>
        </header>
    );
  }
}

export default Header;
