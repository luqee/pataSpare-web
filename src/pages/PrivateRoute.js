import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../App';

export default function PrivateRoute({ component: Component, userRole, path, ...rest }) {
    let userContext = useContext(UserContext)
    return (
        <Route
        {...rest}
        render={props =>
            {
                
                if(!userContext.user.token){
                    return (
                        <Redirect
                            to={{pathname: "/user/login", state: { from: props.location }}}
                        />
                    )
                }
                const currentUser = userContext.user
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
                return (<Component {...props} user={userContext.user}/>)
            }
        }
        />
    );
}