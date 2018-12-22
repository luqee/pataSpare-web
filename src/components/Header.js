import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthService from '../auth/auth';

const AuthButton = withRouter(
    ({ history }) =>
    AuthService.isAuthenticated ? (
        <p>
            Welcome!{" "}
            <button
            onClick={() => {
                AuthService.signout(() => history.push("/"));
            }}
            >
            Sign out
            </button>
        </p>
        ) : (
        <p>You are not logged in.</p>
        )
);

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
            <div className='Auth-buttons'>
                <AuthButton />
            </div>
        </header>
    );
  }
}

export default Header;
