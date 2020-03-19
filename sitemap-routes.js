import React from 'react';
import { Switch, Route } from 'react-router';

export default (
	<Switch>
		<Route path='/' />
		<Route path='/shop' />
		<Route path='/stores' />
		<Route path='/contact' />
		<Route path='/privacy' />
		<Route path='/terms' />
		<Route path='/dealer/register' />
		<Route path='/customer/register' />
        <Route path='/user/login' />
        <Route path='/dealer' />
        <Route path='/customer' />
	</Switch>
);