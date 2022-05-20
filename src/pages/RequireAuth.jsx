import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../App';

export default function RequireAuth({ children}) {
    const user = useContext(UserContext).user
    return (Object.keys(user).length > 0) ? children: <Navigate to={"/auth/login"} />
}