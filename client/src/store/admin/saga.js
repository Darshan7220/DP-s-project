import { call, takeEvery, put, take } from "redux-saga/effects";
import { getsSubAdminUserSuccessful, getsSubAdminUserFail, addNewSubAdminUserSuccessful, addNewSubAdminUserFail, updateSubAdminUserSuccessful, updateSubAdminUserFail, activeInactiveSubAdminUserSuccessful, activeInactiveSubAdminUserFail, deleteSubAdminUserSuccessful, deleteSubAdminUserFail } from "./action";
import { ACTIVEINACTIVE_SADMIN_USER, ADD_NEW_SADMIN_USER, DELETE_SADMIN_USER, GET_SADMIN_USER, UPDATE_SADMIN_USER } from "./actionType";
import { activeInactiveUsers, addUsers, deleteUsers, getUsers, updateUsers } from "../../helper/url_helper";


function* getUser() {
    try {
        const response = yield call(getUsers)
        console.log(response.sub_admin, "response from saga");


        yield put(getsSubAdminUserSuccessful(response.sub_admin))
    } catch (error) {
        yield put(getsSubAdminUserFail(error.message))
    }
}

function* addSubAdminUser({ payload: user }) {
    try {
        const response = yield call(addUsers, user)
        console.log(response, "response from addAdminUser saga");

        yield put(addNewSubAdminUserSuccessful(response))

        const users = yield call(getUser);
        yield put(getsSubAdminUserSuccessful(users.admin))
    } catch (error) {
        yield put(addNewSubAdminUserFail(error.message))
    }
}

function* updateSubAdminUser({ payload: user }) {

    try {
        const response = yield call(updateUsers, user.id, user)

        yield put(updateSubAdminUserSuccessful(response.user))
    } catch (error) {
        yield put(updateSubAdminUserFail(error.message))
    }
}

function* activeInactiveSubAdminUser({ payload: { user, status } }) {
    console.log(user, status, "payload from delete user saga");

    try {
        const response = yield call(activeInactiveUsers, user, status)
        console.log(response.user, "response from addAdminUser saga");

        yield put(activeInactiveSubAdminUserSuccessful(response.user))
    } catch (error) {
        yield put(activeInactiveSubAdminUserFail(error.message))
    }
}

function* deleteSubAdminUser({ payload: user }) {

    try {
        const response = yield call(deleteUsers, user)

        yield put(deleteSubAdminUserSuccessful(response.user))

    } catch (error) {
        yield put(deleteSubAdminUserFail(error.message))
    }
}

function* adminSaga() {
    yield takeEvery(GET_SADMIN_USER, getUser)
    yield takeEvery(ADD_NEW_SADMIN_USER, addSubAdminUser)
    yield takeEvery(UPDATE_SADMIN_USER, updateSubAdminUser)
    yield takeEvery(DELETE_SADMIN_USER, deleteSubAdminUser)
    yield takeEvery(ACTIVEINACTIVE_SADMIN_USER, activeInactiveSubAdminUser)
}

export default adminSaga;