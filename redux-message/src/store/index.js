import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from '../middleware';
import rootReducer from '../reducers';
import prohibited from '../middleware/prohibited';

const store = createStore(rootReducer, applyMiddleware(logger, prohibited, thunk));

export default store;