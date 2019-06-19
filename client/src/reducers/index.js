import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys we provide to combineReducers are going to represent the keys
// that exist in our state object
export default combineReducers({
    auth: authReducer // responsible for whether or not the user is logged in
})