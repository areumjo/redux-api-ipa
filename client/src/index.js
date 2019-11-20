import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

function reducer() {
  return {
    title: 'Hello world! I\'m in the Redux store!',
  }
};

const store = createStore(reducer);

console.log('store: ', store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));


