import { call, takeEvery, put, take } from "redux-saga/effects";
import history from "../../../helper/history";
import { LOGIN_USER, LOGOUT_USER } from "./actionType"
import { loginUserFail, loginUserSuccessful, logoutUserSuccessful } from "./action"
import { loginUser } from "../../../helper/url_helper";

function* login({ payload: user }) {
    try {
        console.log(user, "user from login saga");

        const response = yield call(loginUser, user)

        if (response.status && response.token) {
            localStorage.setItem("authToken", response.token)
            localStorage.setItem("authUser", JSON.stringify(response.user))

            yield put(loginUserSuccessful(response.user))
            console.log("login successful");

        } else {
            throw new Error(response?.message || "Login fail")
        }
    } catch (error) {
        yield put(loginUserFail(error.message))
    }
}

function* logout() {
    try {
        localStorage.removeItem("authUser")
        localStorage.removeItem("authToken")

        yield put(logoutUserSuccessful())
    } catch (error) {
        console.error(error.message);

    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, login)
    yield takeEvery(LOGOUT_USER, logout)
}

export default authSaga;