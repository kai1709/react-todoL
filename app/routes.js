import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from 'components/App';

let routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={require('components/searchBar')} />

  </Route>
)

export default routes;
