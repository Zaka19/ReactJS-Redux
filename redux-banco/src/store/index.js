import { applyMiddleware, createStore } from "redux";
import reducer from "../reducers";
import logger from "../middleware";

const store = createStore(reducer,applyMiddleware(logger));

export default store;