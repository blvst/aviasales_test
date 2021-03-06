import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./reducers/root";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import './index.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);