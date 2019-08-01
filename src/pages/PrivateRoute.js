import AuthService from '../auth/auth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const autService = new AuthService();

export default function PrivateRoute({ component: Component, path, ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
            autService.isAuthenticated() ? (
            <Component {...props} />
            ) : (
            <Redirect
                to={{pathname: path + "/login", state: { from: props.location }}}
            />
            )
        }
        />
    );
}