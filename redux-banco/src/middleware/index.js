//import { removeSaldo } from '../actions';

const logger = store => next => action =>{
    console.log(action.payload);
    next(action);
    //store.dispatch(removeSaldo(action.payload));
}

export default logger;