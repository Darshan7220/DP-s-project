import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, authProtectedRoutes } from "./routes/index";
import AdminLayout from "./components/adminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
        <Route element={<AdminLayout />}>
          {authProtectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
