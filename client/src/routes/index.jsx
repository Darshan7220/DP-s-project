import Login from "../pages/authentication/login";
import Logout from "../pages/authentication/logout";
import adminDashboard from "../pages/Dashboard/Admin/dashboard_admin";
import SubadminDashboard from "../pages/Dashboard/Admin/dashboard_sub_admin";
import superadminDashboard from "../pages/Dashboard/Admin/dashboard_superadmin";
import Dashboard from "../pages/Dashboard/Admin/dashboard";
import UserDashboard from "../pages/Dashboard/userDashboard";

export const authProtectedRoutes = [
  { path: "/", component: Dashboard },
  { path: "/admin", component: adminDashboard },
  { path: "/superadmin", component: superadminDashboard },
  { path: "/subadmin", component: SubadminDashboard },

  { path: "/dashboard", component: UserDashboard },
];

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];
