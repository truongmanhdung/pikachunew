import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import myReducer from "./Redux/Reducer";
import { Provider } from 'react-redux';
import mySaga from './Saga/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    myReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
