import {
    GET_SADMIN_USER,
    GET_SADMIN_USER_SUCCESSFUL,
    GET_SADMIN_USER_FAIL,
    ADD_NEW_SADMIN_USER,
    ADD_NEW_SADMIN_USER_SUCCESSFUL,
    ADD_NEW_SADMIN_USER_FAIL,
    UPDATE_SADMIN_USER,
    UPDATE_SADMIN_USER_SUCCESSFUL,
    UPDATE_SADMIN_USER_FAIL,
    DELETE_SADMIN_USER,
    DELETE_SADMIN_USER_SUCCESSFUL,
    DELETE_SADMIN_USER_FAIL,
    ACTIVEINACTIVE_SADMIN_USER,
    ACTIVEINACTIVE_SADMIN_USER_SUCCESSFUL,
    ACTIVEINACTIVE_SADMIN_USER_FAIL,
} from "./actionType"

export const getsSubAdminUser = () => ({
    type: GET_SADMIN_USER
})
export const getsSubAdminUserSuccessful = user => ({
    type: GET_SADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const getsSubAdminUserFail = user => ({
    type: GET_SADMIN_USER_FAIL,
    payload: user,
})
//-------------------------------------------------------------
export const addNewSubAdminUser = user => ({
    type: ADD_NEW_SADMIN_USER,
    payload: user,
})
export const addNewSubAdminUserSuccessful = user => ({
    type: ADD_NEW_SADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const addNewSubAdminUserFail = error => ({
    type: ADD_NEW_SADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const updateSubAdminUser = user => ({
    type: UPDATE_SADMIN_USER,
    payload: user,
})
export const updateSubAdminUserSuccessful = user => ({
    type: UPDATE_SADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const updateSubAdminUserFail = error => ({
    type: UPDATE_SADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const deleteSubAdminUser = user => ({
    type: DELETE_SADMIN_USER,
    payload: user
})
export const deleteSubAdminUserSuccessful = user => ({
    type: DELETE_SADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const deleteSubAdminUserFail = error => ({
    type: DELETE_SADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------
export const activeInactiveSubAdminUser = user => ({
    type: ACTIVEINACTIVE_SADMIN_USER,
    payload: user
})
export const activeInactiveSubAdminUserSuccessful = user => ({
    type: ACTIVEINACTIVE_SADMIN_USER_SUCCESSFUL,
    payload: user,
})
export const activeInactiveSubAdminUserFail = error => ({
    type: ACTIVEINACTIVE_SADMIN_USER_FAIL,
    payload: error,
})
//-------------------------------------------------------------