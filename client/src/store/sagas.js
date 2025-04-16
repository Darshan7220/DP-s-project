import { all, fork } from "redux-saga/effects"
import AuthSaga from "./auth/register/saga"
import superAdminSaga from "./superadmin/saga"
import adminSaga from "./admin/saga"
import subAdminSaga from "./subadmin/saga"
import dashboardSaga from "./dashboard/saga"

export default function* rootSaga() {
    yield all([
        fork(AuthSaga),
        fork(superAdminSaga),
        fork(adminSaga),
        fork(subAdminSaga),
        fork(dashboardSaga),
    ])
}