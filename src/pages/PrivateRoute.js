import AuthService from '../auth/auth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const autService = new AuthService();

export default function PrivateRoute({ component: Component, userRole, path, ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
            {
                
                if(!autService.isAuthenticated()){
                    return (
                        <Redirect
                            to={{pathname: "/user/login", state: { from: props.location }}}
                        />
                    )
                }
                const currentUser = autService.getCurrentUser();
                let roles = currentUser.roles.map((role) => {
                    return role.name;
                });
                if(userRole && roles.indexOf(userRole) === -1){
                    return (
                        <Redirect
                            to={{pathname: "/", state: { from: props.location }}}
                        />
                    )    
                }
                return (<Component {...props} />)
            }
        }
        />
    );
}