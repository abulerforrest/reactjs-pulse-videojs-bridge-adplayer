import 'babel-polyfill';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import {applyMiddleware, createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//import { logger } from 'redux-logger'; -- For logging while developing.


// applyMiddleware
const middleware = applyMiddleware(thunk);

// the store!
const store = createStore(allReducers, middleware);

// default actions..
store.dispatch({type : "PULSESDK_SELECTED", value: "", action : ""});
store.dispatch({type : "VIDEOJS_SELECTED", value: "", action : ""});
store.dispatch({type : "CONTRIBADS_SELECTED", value: "", action : ""});

// Put App into the provider and connect to store
const render = Component => { ReactDOM.render(
  <AppContainer>
  <Provider store={store}>
    <App />
  </Provider>
  </AppContainer>

  , document.getElementById('root')
)
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => {
    const App = require('./components/app').default;
    render(App);
  });
}
