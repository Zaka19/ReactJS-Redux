import { LOAD_USER, DELETE_USER, ADD_USER, EDIT_USER , EDIT_USER_FINAL} from "../actions/action-types";

const initialState = { array: [], object: {} };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            state.array = action.payload.map(element => {
                return ({
                    id: element.id,
                    url_photo: element.url_photo,
                    name: element.name,
                    email: element.email,
                    adress: element.adress
                });
            });
            return Object.assign({}, state, {
                array: state.array
            });
        case DELETE_USER:
            console.log("Delete completed.");
            return state;
        case ADD_USER:
            console.log("Add completed.");
            return state;
        case EDIT_USER:
            return Object.assign({}, state, {
                array: state.array,
                object: action.payload
            });
        case EDIT_USER_FINAL:
            console.log("Update completed.");
            return Object.assign({}, state, {
                array: state.array,
                object: initialState.object
            });
        default:
            return state;
    }
}

export default rootReducer;