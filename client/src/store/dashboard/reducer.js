import {
    GET_COUNT_SUCCESSFUL,
    GET_COUNT_FAIL,
} from "./actionType"

const initialState = {
    count: [],
    error: {},
    loading: true
}

const Counts = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNT_SUCCESSFUL:
            console.log(action.payload, "action.payload");

            return {
                ...state,
                count: action.payload,
                loading: false
            }
        case GET_COUNT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default Counts;