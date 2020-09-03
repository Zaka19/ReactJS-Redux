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

            state.arrayMov.forEach(x => console.log(x.milisecondYear));

            let TotalI = state.arrayMov.filter(x => x.milisecondYear + 10 >= (date.getTime() / 1000) && x.pending === "Completed");
            TotalI = TotalI.reduce((a, b) => a + b.movement, 0);

            const extras_finish = state.arrayMov.filter(x => x.milisecondYear + 10 <= (date.getTime() / 1000) && x.pending === "Pending");

            const Total = extras_finish.reduce((a, b) => a + b.movement , 0);

            state.arrayMov = state.arrayMov.filter(x => x.milisecondYear + 10 >= (date.getTime() / 1000));

            if(TotalI >= state.lim){
                new_object = { 
                    saldo: state.saldo, 
                    extra: state.extra + action.payload,
                    arrayMov: state.arrayMov.concat({movement: action.payload, hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Pending"}),
                    insufficientMoney: state.insufficientMoney,
                    limitGet: true,
                    lim: state.lim
                } 
             }
             else{
                 new_object = { 
                     saldo: state.saldo + action.payload + Total, 
                     extra: state.extra - Total,
                     arrayMov: state.arrayMov.concat({movement: action.payload, hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Completed"}),
                     insufficientMoney: initialState.insufficientMoney,
                     limitGet: initialState.limitGet,
                     lim: initialState.lim
                 }
             }

            return Object.assign({}, state, new_object);

        case REMOVE_SALDO:

            state.arrayMov.forEach(x => console.log(x.milisecondYear));
            
            const new_array_mov = state.arrayMov.filter(x => x.milisecondYear + 10 >= (date.getTime() / 1000) &&  x.movement < 0);
            const TotalR = new_array_mov.reduce((a, b) => Math.abs(a) + Math.abs(b.movement) , 0);

            if(action.payload > state.saldo && TotalR >= state.lim){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: true, limitGet: true, totalRest: state.totalRest, arrayMov: state.arrayMov}; 
            }
            else if (action.payload > state.saldo){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: true, limitGet: false, totalRest: state.totalRest, arrayMov: state.arrayMov}; 
            }
            else if(TotalR >= state.lim){
                new_object = {saldo: state.saldo , extra: state.extra, insufficientMoney: false, limitGet: true, totalRest: state.totalRest, arrayMov: state.arrayMov}; 
            }
            else{
                new_object = {saldo: state.saldo - action.payload, extra: state.extra, insufficientMoney: false, limitGet: false, totalRes: state.totalRest + action.payload, arrayMov: state.arrayMov.concat({movement: -action.payload , hour: date.getHours(), min: date.getMinutes(), second: date.getSeconds(), day: date.getDay(), month: date.getMonth(), year: date.getFullYear(), milisecondYear: date.getTime() / 1000, pending: "Completed"}),}; 
            }

            return Object.assign({}, state, new_object);

        default:

    }
    return state;
}

export default reducer;