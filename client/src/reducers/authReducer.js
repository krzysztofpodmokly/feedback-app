import { FETCH_USER } from '../actions/types';

// state initialy must be an [], {} or null, it cannot be undefined!
// In our case we set state to null because we don't want to show either
// 'Login' or 'Logout' button until we fetch proper data that is why 
// we're not showing any button at all
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false // => User Model
            // empty string "" is a Falsy Value we have to set || false otherwise
            // we would get payload: "" from fetchUser action creator
        default:
            return state; // no change to the state is necessary just return state object
    }
}