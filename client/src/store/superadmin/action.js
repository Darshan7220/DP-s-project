import {
    GET_ADMIN_USER,
    GET_ADMIN_USER_SUCCESSFUL,
    GET_ADMIN_USER_FAIL,
    ADD_NEW_ADMIN_USER,
    ADD_NEW_ADMIN_USER_SUCCESSFUL,
    ADD_NEW_ADMIN_USER_FAIL,
    UPDATE_ADMIN_USER,
    UPDATE_ADMIN_USER_SUCCESSFUL,
    UPDATE_ADMIN_USER_FAIL,
    DELETE_ADMIN_USER,
    DELETE_ADMIN_USER_SUCCESSFUL,
    DELETE_ADMIN_USER_FAIL,
    ACTIVEINACTIVE_ADMIN_USER,
    ACTIVEINACTIVE_ADMIN_USER_SUCCESSFUL,
    ACTIVEINACTIVE_ADMIN_USER_FAIL,
} from "./actionType"

export const getAdminUser = () => ({
    type: GET_ADMIN_USER
})
export const getAdminUserSuccessful = user => ({
    type: GET_ADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const getAdminUserFail = user => ({
    type: GET_ADMIN_USER_FAIL,
    payload: user,
})
//-------------------------------------------------------------
export const addNewAdminUser = user => ({
    type: ADD_NEW_ADMIN_USER,
    payload: user,
})
export const addNewAdminUserSuccessful = user => ({
    type: ADD_NEW_ADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const addNewAdminUserFail = error => ({
    type: ADD_NEW_ADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const updateAdminUser = user => ({
    type: UPDATE_ADMIN_USER,
    payload: user,
})
export const updateAdminUserSuccessful = user => ({
    type: UPDATE_ADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const updateAdminUserFail = error => ({
    type: UPDATE_ADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const deleteAdminUser = user => ({
    type: DELETE_ADMIN_USER,
    payload: user
})
export const deleteAdminUserSuccessful = user => ({
    type: DELETE_ADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const deleteAdminUserFail = error => ({
    type: DELETE_ADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const activeInactiveAdminUser = user => ({
    type: ACTIVEINACTIVE_ADMIN_USER,
    payload: user
})
export const activeInactiveAdminUserSuccessful = user => ({
    type: ACTIVEINACTIVE_ADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const activeInactiveAdminUserFail = error => ({
    type: ACTIVEINACTIVE_ADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------