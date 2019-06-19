// state initialy must be an [] or {}, it cannot be undefined!
export default function(state = {}, action) {
    switch (action.type) {
        default:
            return state; // no change to the state is necessary just return state object
    }
}