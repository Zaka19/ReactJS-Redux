import { ADD_SALDO, REMOVE_SALDO } from "./action-types";

export function addSaldo(payload){
    return { type: ADD_SALDO, payload}
}

export function removeSaldo(payload){
    return { type: REMOVE_SALDO, payload}
}