import {
    LOGIN_USER,
    LOGIN_USER_SUCCESSFUL,
    LOGIN_USER_FAIL,
    LOGOUT_USER_SUCCESSFUL
} from "./actionType"

const initialState = {
    error: "",
    loading: false,
}
const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {
                ...state,
                loading: true,
            }
            break
        case LOGIN_USER_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: false
            }
            break
        case LOGOUT_USER_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: false
            }
    }
    return state

}

export default login