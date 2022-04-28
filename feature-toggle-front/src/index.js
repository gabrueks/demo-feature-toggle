import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import store from './redux/store';

import Router from './Router';

import reportWebVitals from './reportWebVitals';

import './index.css';

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate load={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
