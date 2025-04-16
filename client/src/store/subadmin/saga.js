import { call, takeEvery, put, take } from "redux-saga/effects";
import { getUserSuccessful, getUserFail, addNewUserSuccessful, addNewUserFail, updateUserSuccessful, updateUserFail, deleteUserFail, deleteUserSuccessful, activeInactiveUserFail, activeInactiveUserSuccessful } from "./action";
import { GET_USER, ADD_NEW_USER, UPDATE_USER, DELETE_USER, ACTIVEINACTIVE_USER } from "./actionType";
import { activeInactiveUsers, addUsers, deleteUsers, getUsers, updateUsers } from "../../helper/url_helper";


function* getUser() {
    try {
        const response = yield call(getUsers)

        yield put(getUserSuccessful(response.users))
    } catch (error) {
        yield put(getUserFail(error.message))
    }
}

function* addUser({ payload: user }) {
    try {
        const response = yield call(addUsers, user)
        console.log(response, "response from addUser saga");

        yield put(addNewUserSuccessful(response))

        const users = yield call(getUser);
        yield put(getUserSuccessful(users.admin))
    } catch (error) {
        yield put(addNewUserFail(error.message))
    }
}

function* updateUser({ payload: user }) {

    try {
        const response = yield call(updateUsers, user.id, user)

        yield put(updateUserSuccessful(response.user))
    } catch (error) {
        yield put(updateUserFail(error.message))
    }
}

function* activeInactiveUser({ payload: { user, status } }) {
    console.log(user, status, "payload from delete user saga");

    try {
        const response = yield call(activeInactiveUsers, user, status)
        console.log(response.user, "response from addUser saga");

        yield put(activeInactiveUserSuccessful(response.user))
    } catch (error) {
        yield put(activeInactiveUserFail(error.message))
    }
}

function* deleteUser({ payload: user }) {

    try {
        const response = yield call(deleteUsers, user)

        yield put(deleteUserSuccessful(response.user))

    } catch (error) {
        yield put(deleteUserFail(error.message))
    }
}

function* subAdminSaga() {
    yield takeEvery(GET_USER, getUser)
    yield takeEvery(ADD_NEW_USER, addUser)
    yield takeEvery(UPDATE_USER, updateUser)
    yield takeEvery(DELETE_USER, deleteUser)
    yield takeEvery(ACTIVEINACTIVE_USER, activeInactiveUser)
}

export default subAdminSaga;