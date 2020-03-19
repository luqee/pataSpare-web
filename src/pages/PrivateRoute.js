import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../App';

export default function PrivateRoute({ component: Component, userRole, path, ...rest }) {
    let userContext = useContext(UserContext)
    let userToken = userContext.token
    return (
        <Route
        {...rest}
        render={props =>
            {
                if(!userToken){
                    return (
                        <Redirect
                            to={{pathname: "/user/login", state: { from: props.location }}}
                        />
                    )
                }else{
                    const currentUser = userContext.user
                    let roles = Object.keys(currentUser).length > 0 && currentUser.roles.map((role) => {
                        return role.name;
                    });
                    if(userRole && roles && roles.length > 0 && roles.indexOf(userRole) === -1){
                        return (
                            <Redirect
                                to={{pathname: "/", state: { from: props.location }}}
                            />
                        )    
                    }
                    console.log('returning private component');
                    console.log(currentUser);
                    console.log(roles);
                    
                    return (<Component {...props} userToken={userToken} user={currentUser} />)
                }
                
            }
        }
        />
    );
}