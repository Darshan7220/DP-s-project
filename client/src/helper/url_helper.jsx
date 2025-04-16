import { del, get, post, put } from "./api_helper";

export const loginUser = (data) => post("/auth/login", data);

export const getUsers = (data) => get("/user/list", data);

export const addUsers = (data) => post("/auth/register", data);

export const updateUsers = (id, data) => post(`/user/update/${id}`, data);
export const deleteUsers = (id, data) => post(`/user/delete/${id}`, data);
export const activeInactiveUsers = (id, status) =>
  post(`/user/activeinactive/${id}`, { status });

export const dashboardCount = (data) => get("/dashboard/count", data);
