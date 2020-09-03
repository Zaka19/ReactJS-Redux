import { ADD_MESSAGE, DATA_LOADED } from "../actions/action-types";
const initialState = { array: [] };

function rootReducer(state = initialState, action) {
    switch(action.type){
        case ADD_MESSAGE:
            return Object.assign({}, state, {
                array: state.array.concat({title: action.payload})
            }); 
        case DATA_LOADED:
            return Object.assign({}, state, {
                array: action.payload
            }); 
            default:
                return state;
    }
}

export default rootReducer;