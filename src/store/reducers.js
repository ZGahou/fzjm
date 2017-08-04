import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from '../containers/home/modules/homeReducer'

export default combineReducers({
    home,
    routing: routerReducer
});