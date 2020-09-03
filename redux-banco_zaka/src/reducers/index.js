import { ADD_SALDO, REMOVE_SALDO } from "../actions/action-types";

const initialState = { saldo: 50000, extra: 0, arrayMov: [{movement: 0, hour: 0, min: 0, second: 0, day: 0, month: 0, year: 0, milisecondYear: 0}], insufficientMoney: false, limitGet: false, lim: 1000};
function reducer(state = initialState, action){
    let new_object = {};
    var date = new Date();

    if(state.arrayMov.length === 20){
        state.arrayMov.shift();
    }

    switch(action.type){
         case ADD_SALDO:

            console.log("Actual: " + date.getTime() / 1000);
            state.arrayMov.forEach(x => console.log(x.milisecondYear));

            const extras_finish = state.arrayMov.filter(x => x.milisecondYear + 10 <= (date.getTime() / 1000) && x.pending === "Pending");
            
            const new_array_mov_plus = state.arrayMov.filter(x => x.milisecondYear + 10 >= (date.getTime() / 1000) && x.movement > 0);

            const Total = new_array_mov_plus.reduce((a, b) => a + b.movement , 0);

            console.log(Total);

           if(/*(action.payload + state.saldo) > (initialState.saldo + state.lim)*/Total >= state.lim){
               new_object = { 
                     saldo: state.saldo , 
                     extra: (action.payload + state.saldo + state.extra) - (initialState.saldo + state.lim),
                     arrayMov: state.arrayMov.concat({movement: action.payload, hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Pending"}),
                     insufficientMoney: state.insufficientMoney,
                     limitGet: true,
                     lim: state.lim
                 }
             }
             else{
                 new_object = { 
                     saldo: state.saldo + action.payload, 
                     extra: state.extra,
                     arrayMov: state.arrayMov.concat({movement: action.payload, hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Completed"}),
                     insufficientMoney: initialState.insufficientMoney,
                     limitGet: initialState.limitGet,
                     lim: initialState.lim
                 }
             }

            return Object.assign({}, state, new_object);

        case REMOVE_SALDO:

         /*   console.log("Actual: " + date.getTime() / 1000);
            state.arrayMov.forEach(x => console.log(x.milisecondYear));
            const new_array_mov = state.arrayMov.filter(x => x.milisecondYear + 10 >= (date.getTime() / 1000));
            const T = new_array_mov.filter(x => x.milisecondYear <= (date.getTime() / 1000)  &&  x.movement < 0);
            const TotalR = T.reduce((a, b) => Math.abs(a) + Math.abs(b.movement) , 0);
            console.log(TotalR);
        

            if(action.payload > state.saldo && TotalR >= state.lim){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: true, limitGet: true, totalRest: state.totalRest, arrayMov: new_array_mov}; 
            }
            else if (action.payload > state.saldo){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: true, limitGet: false, totalRest: state.totalRest, arrayMov: new_array_mov}; 
            }
            else if(TotalR >= state.lim){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: false, limitGet: true, totalRest: state.totalRest, arrayMov: new_array_mov}; 
            }
            else{
                new_object = {saldo: state.saldo - action.payload, extra: state.extra, insufficientMoney: false, limitGet: false, totalRes: state.totalRest + action.payload, arrayMov: new_array_mov.concat({movement: -action.payload , hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Completed"}),}; 
            }*/

            return Object.assign({}, state, new_object);

        default:

    }
    return state;
}

export default reducer;