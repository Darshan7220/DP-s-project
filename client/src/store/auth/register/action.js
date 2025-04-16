import {
    LOGIN_USER,
    LOGIN_USER_SUCCESSFUL,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESSFUL
} from "./actionType"

export const loginUser = user => {
    return {
        type: LOGIN_USER,
        payload: user
    }
}
export const loginUserSuccessful = user => {
    return {
        type: LOGIN_USER_SUCCESSFUL,
        payload: user
    }
}
export const loginUserFail = error => {
    return {
        type: LOGIN_USER_FAIL,
        payload: error
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const logoutUserSuccessful = () => {
    return {
        type: LOGOUT_USER_SUCCESSFUL
    }
}