import { ADD_ARTICLE, DELETE_ARTICLES, EDIT_ARTICLES, EDIT_ARTICLESPLUS , RESET_ARTICLES} from "../actions/action-types";

const initialState = {
    articles: [], lastId: 0, edit_title : {}
}
var date = new Date();
function rootReducer(state = initialState, action) {
    console.log(action);
    switch(action.type){
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                articles: state.arrayMov.concat({ title: action.payload, id: state.lastId + 1 }),
                lastId: state.lastId + 1,
                edit_title : state.edit_title
            });

        case RESET_ARTICLES:
            return Object.assign({}, state, initialState);
        
        case DELETE_ARTICLES:
            return Object.assign({}, state, {
                articles : state.arrayMov.filter(x => (x.id !== action.payload)),
                lastId : state.lastId,
                edit_title : state.edit_title
            });

        case EDIT_ARTICLES:
            return Object.assign({}, state, {
               articles : state.articles,
               lastId : state.lastId,
               edit_title : action.payload
            });
 
        case EDIT_ARTICLESPLUS:
            return Object.assign({}, state, {
                articles : state.articles.map(x => x.id === action.payload.id ? {id : x.id, title: action.payload.title} : {id : x.id, title: x.title}),
                lastId : state.lastId,
                edit_title : {}
            });
        
        default:
    }

    return state;
}

export default rootReducer;