import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer'
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import thunk from 'redux-thunk'

library.add(faSpinner);

const store = createStore(rootReducer,compose(offline(offlineConfig),applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
