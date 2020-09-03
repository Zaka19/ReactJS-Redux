import React from 'react';
import './App.css'
import Counter from './Counter.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const Initial = {
  count : 0
}

function reducer(state = Initial,action){
  console.log("reduce",state,action);
  switch(action.type){
    case "Increment":
      return {
        count: state.count + 1
      };
    case "Descrement":
      return {
        count: state.count - 1
      };
    case "Reset":
      return {
        count: 0
      }; 
    default:
      return state; 
  }
  console.log("reducer", state, action);
}

const store = createStore(reducer);

function App(){
  return (
    <Provider store = {store}>
      <Counter />
    </Provider>
  );
}

export default App;
 
