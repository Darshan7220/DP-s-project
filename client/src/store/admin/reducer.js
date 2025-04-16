import {
    GET_SADMIN_USER_SUCCESSFUL,
    GET_SADMIN_USER_FAIL,
    ADD_NEW_SADMIN_USER_SUCCESSFUL,
    ADD_NEW_SADMIN_USER_FAIL,
    UPDATE_SADMIN_USER_SUCCESSFUL,
    UPDATE_SADMIN_USER_FAIL,
    DELETE_SADMIN_USER_SUCCESSFUL,
    DELETE_SADMIN_USER_FAIL,
    ACTIVEINACTIVE_SADMIN_USER_SUCCESSFUL,
    ACTIVEINACTIVE_SADMIN_USER_FAIL,
} from "./actionType"

const initialState = {
    user: [],
    error: {},
    loading: true
}

const sadminUsers = (state = initialState, action) => {
    switch (action.type) {
        case GET_SADMIN_USER_SUCCESSFUL:
            console.log(action.payload, "action.payload");

            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_SADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case ADD_NEW_SADMIN_USER_SUCCESSFUL:
            return {
                ...state,
                users: [action.payload, ...state.user],
                loading: false
            }
        case ADD_NEW_SADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case UPDATE_SADMIN_USER_SUCCESSFUL:
            return {
                ...state,
                user: state.user.map(user => user._id.toString() === action.payload._id.toString()
                    ? { ...user, ...action.payload } // Correct spread usage
                    : user
                ),
                loading: false
            };

        case UPDATE_SADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case DELETE_SADMIN_USER_SUCCESSFUL:
            console.log(action.payload, "action.payload");
            return {
                ...state,
                user: state.user.filter((user) => user._id !== action.payload._id)
            }
        case DELETE_SADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case ACTIVEINACTIVE_SADMIN_USER_SUCCESSFUL:
            return {
                ...state,
                user: state.user.map(user => user._id.toString() === action.payload._id.toString()
                    ? { ...user, ...action.payload } // Correct spread usage
                    : user
                ),
                loading: false
            };

        case ACTIVEINACTIVE_SADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default sadminUsers;