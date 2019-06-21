import axios from 'axios';
import { FETCH_USER } from './types';

// Before refactor
// export const fetchUser = () => {
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(res => dispatch({ type: FETCH_USER, payload: res }))
//     };
// };

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
}

// handling token given by Stripe after successful payment
export const handleToken = (token) => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    // same type because we want to receive from backend same user model
    dispatch({ type: FETCH_USER, payload: response.data })
}