import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Test from '../test';
import Cal from '../components/Calendar';
import Tmp from '../containers/template';

import DevTools from './../DevTools';

export default class Root extends Component {
  render() {
    return (
	  <div>
	  <Router history={browserHistory}>
	    <Route path="/" component={Test}>
		  <IndexRoute component={Cal, Tmp}/>
		  <Route path="/test" component={Tmp} />
	    </Route>
	  </Router>
	  <DevTools />
	  </div>
    );
  }
}

