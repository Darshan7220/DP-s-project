import {
    GET_COUNT,
    GET_COUNT_SUCCESSFUL,
    GET_COUNT_FAIL,
} from "./actionType"

export const getCount = () => ({
    type: GET_COUNT
})
export const getCountSuccessful = count => ({
    type: GET_COUNT_SUCCESSFUL,
    payload: count,
})
export const getCountFail = count => ({
    type: GET_COUNT_FAIL,
    payload: count,
})
//-------------------------------------------------------------