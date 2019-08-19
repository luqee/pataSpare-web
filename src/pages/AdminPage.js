import React from 'react';
import { Switch, Route } from 'react-router-dom';


import AdminDash from '../components/admin/AdminDash';

function AdminPage({match}){
    
    return (
        <Switch>
            <Route exact path={`${match.path}`} component={AdminDash}/>
        </Switch>
    );
}

export default AdminPage;