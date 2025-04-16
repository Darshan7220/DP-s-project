import { call, takeEvery, put, take } from "redux-saga/effects";
import { getAdminUserSuccessful, getAdminUserFail, addNewAdminUserSuccessful, addNewAdminUserFail, updateAdminUserSuccessful, updateAdminUserFail, deleteAdminUserFail, deleteAdminUserSuccessful, activeInactiveAdminUserFail, activeInactiveAdminUserSuccessful } from "./action";
import { GET_ADMIN_USER, ADD_NEW_ADMIN_USER, UPDATE_ADMIN_USER, DELETE_ADMIN_USER, ACTIVEINACTIVE_ADMIN_USER } from "./actionType";
import { activeInactiveUsers, addUsers, deleteUsers, getUsers, updateUsers } from "../../helper/url_helper";


function* getUser() {
    try {
        const response = yield call(getUsers)

        yield put(getAdminUserSuccessful(response.admin))
    } catch (error) {
        yield put(getAdminUserFail(error.message))
    }
}

function* addAdminUser({ payload: user }) {
    try {
        const response = yield call(addUsers, user)
        console.log(response, "response from addAdminUser saga");

        yield put(addNewAdminUserSuccessful(response))

        const users = yield call(getUser);
        yield put(getAdminUserSuccessful(users.admin))
    } catch (error) {
        yield put(addNewAdminUserFail(error.message))
    }
}

function* updateAdminUser({ payload: user }) {

    try {
        const response = yield call(updateUsers, user.id, user)

        yield put(updateAdminUserSuccessful(response.user))
    } catch (error) {
        yield put(updateAdminUserFail(error.message))
    }
}

function* activeInactiveAdminUser({ payload: { user, status } }) {
    console.log(user, status, "payload from delete user saga");

    try {
        const response = yield call(activeInactiveUsers, user, status)
        console.log(response.user, "response from addAdminUser saga");

        yield put(activeInactiveAdminUserSuccessful(response.user))
    } catch (error) {
        yield put(activeInactiveAdminUserFail(error.message))
    }
}

function* deleteAdminUser({ payload: user }) {

    try {
        const response = yield call(deleteUsers, user)

        yield put(deleteAdminUserSuccessful(response.user))

    } catch (error) {
        yield put(deleteAdminUserFail(error.message))
    }
}

function* superAdminSaga() {
    yield takeEvery(GET_ADMIN_USER, getUser)
    yield takeEvery(ADD_NEW_ADMIN_USER, addAdminUser)
    yield takeEvery(UPDATE_ADMIN_USER, updateAdminUser)
    yield takeEvery(DELETE_ADMIN_USER, deleteAdminUser)
    yield takeEvery(ACTIVEINACTIVE_ADMIN_USER, activeInactiveAdminUser)
}

export default superAdminSaga;