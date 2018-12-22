import AuthService from '../auth/auth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component: Component, path, ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
            AuthService.isAuthenticated ? (
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