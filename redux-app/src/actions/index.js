import { LOAD_USER, DELETE_USER, ADD_USER, EDIT_USER, EDIT_USER_FINAL } from "./action-types";

export function getDataUsers() {
    return function (dispatch) {
        return fetch("https://localhost:44366/api/Users")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: LOAD_USER, payload: json });
            });
    }
}

export function addUser(payload) {
    return function (dispatch) {
        let params = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
       
        return fetch('https://localhost:44366/api/Users', params)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: ADD_USER, payload: json });
            })
    }
}

export function editUser(payload) {
    return function (dispatch) {
        let params = {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        console.log("edit");
        return fetch("https://localhost:44366/api/Users/" + parseInt(payload.id), params)
            .then(response => response.text())
            .then(json => {
               
                dispatch({ type: EDIT_USER_FINAL, payload: json })
            })
    }
}

export function deleteUser(payload) {
    return function (dispatch) {
        let params = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        return fetch("https://localhost:44366/api/Users/" + payload, params)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: DELETE_USER, payload: json });
            });
    }
}

export function edit(payload) {
    console.log("execute edit");
    return { type: EDIT_USER, payload: payload }
}
