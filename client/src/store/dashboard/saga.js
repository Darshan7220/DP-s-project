import { call, takeEvery, put, take } from "redux-saga/effects";
import { getCountSuccessful, getCountFail } from "./action";
import { GET_COUNT } from "./actionType";
import { dashboardCount, } from "../../helper/url_helper";


function* getCount() {
    try {
        const response = yield call(dashboardCount)

        yield put(getCountSuccessful(response.count))
    } catch (error) {
        yield put(getCountFail(error.message))
    }
}


function* dashboardSaga() {
    yield takeEvery(GET_COUNT, getCount)
}

export default dashboardSaga;