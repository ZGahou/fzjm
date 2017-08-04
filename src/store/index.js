import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {createLogger} from 'redux-logger'
import rootReducer from './reducers'
import initStates from './initStates'

const history = createHistory();
const middleware = routerMiddleware(history);

import promiseMiddleware from './middlewares/promiseMiddleware'

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});
const isDev = process.env.NODE_ENV !== 'production';

let createStoreWithMiddleware;
if (isDev) {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']}),
        loggerMiddleware,
        middleware
    )(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']}),
        middleware
    )(createStore);
}

const store = createStoreWithMiddleware(rootReducer, initStates);

export default store