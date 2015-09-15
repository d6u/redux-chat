// This file bootstraps the entire application.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp from './components/ChatApp.react';
import * as Actions from './actions';
import configureStore from './store/configureStore';

const store = configureStore();

store.dispatch(Actions.getAllMessages());

ReactDOM.render(
  <Provider store={store}>
    <ChatApp />
  </Provider>,
  document.getElementById('react')
);
