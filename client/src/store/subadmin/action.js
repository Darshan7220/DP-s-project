import {
    GET_USER,
    GET_USER_SUCCESSFUL,
    GET_USER_FAIL,
    ADD_NEW_USER,
    ADD_NEW_USER_SUCCESSFUL,
    ADD_NEW_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESSFUL,
    UPDATE_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESSFUL,
    DELETE_USER_FAIL,
    ACTIVEINACTIVE_USER,
    ACTIVEINACTIVE_USER_SUCCESSFUL,
    ACTIVEINACTIVE_USER_FAIL,
} from "./actionType"

export const getUser = () => ({
    type: GET_USER
})
export const getUserSuccessful = user => ({
    type: GET_USER_SUCCESSFUL,
    payload: user,
})
export const getUserFail = user => ({
    type: GET_USER_FAIL,
    payload: user,
})
//-------------------------------------------------------------
export const addNewUser = user => ({
    type: ADD_NEW_USER,
    payload: user,
})
export const addNewUserSuccessful = user => ({
    type: ADD_NEW_USER_SUCCESSFUL,
    payload: user,
})
export const addNewUserFail = error => ({
    type: ADD_NEW_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user,
})
export const updateUserSuccessful = user => ({
    type: UPDATE_USER_SUCCESSFUL,
    payload: user,
})
export const updateUserFail = error => ({
    type: UPDATE_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const deleteUser = user => ({
    type: DELETE_USER,
    payload: user
})
export const deleteUserSuccessful = user => ({
    type: DELETE_USER_SUCCESSFUL,
    payload: user,
})
export const deleteUserFail = error => ({
    type: DELETE_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const activeInactiveUser = user => ({
    type: ACTIVEINACTIVE_USER,
    payload: user
})
export const activeInactiveUserSuccessful = user => ({
    type: ACTIVEINACTIVE_USER_SUCCESSFUL,
    payload: user,
})
export const activeInactiveUserFail = error => ({
    type: ACTIVEINACTIVE_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------