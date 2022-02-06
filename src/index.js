import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';
import { Provider } from 'react-redux';
import { thunk } from 'redux-middleware';
import { loggerMiddleware } from './redux/middlewares/fetchDataMiddleware';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './redux/reducers';
import App from './App';
import { createRenderMiddleware } from './redux/middlewares/WorkerMiddleware';

const middleware = [thunk];
middleware.push(loggerMiddleware);
middleware.push(createRenderMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

// Enable Webpack hot module replacement
if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });

  window.addEventListener('message', (e) => {
    if (process.env.NODE_ENV !== 'production' && e.data && e.data.type === 'webpackInvalid') {
      // eslint-disable-next-line
      console.clear();
    }
  });
}

render();
