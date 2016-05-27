import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Test from '../test';
import Cal from '../components/Calendar';
import Tmp from '../containers/template';

export default class Root extends Component {
  render() {
    return (
	  <div>
	  <Router history={hashHistory}>
	    <Route path="/" component={Test}>
		  <IndexRoute component={Cal}/>
		  <Route path="/test" component={Tmp} />
	    </Route>
	  </Router>
	  </div>
    );
  }
}