import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Root from './router/route';

import configureStore from './store/configureStore';

const store = configureStore();
var node = document.getElementById('app');

render(
 <Provider store={store}>
  <Root />
 </Provider>, node
 );