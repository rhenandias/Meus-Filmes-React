import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Search from './pages/search';
import Movies from './pages/movies';
import Info from './pages/info';

const Routes = () => (
	<BrowserRouter  basename="/Meus-Filmes-React">
		<Switch>
			<Route exact path="/" component={Search} />
			<Route path="/movies" component={Movies} />
			<Route path="/movie/:id" component={Info} />
		</Switch>
	</BrowserRouter>
);

export default Routes;