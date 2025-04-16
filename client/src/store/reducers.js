import { combineReducers } from "@reduxjs/toolkit";
import login from "./auth/register/reducer";
import adminUsers from "./superadmin/reducer";
import sadminUsers from "./admin/reducer";
import subUsers from "./subadmin/reducer";
import Counts from "./dashboard/reducer";

const rootReducers = combineReducers({
    login,
    adminUsers,
    sadminUsers,
    subUsers,
    Counts
})

export default rootReducers;