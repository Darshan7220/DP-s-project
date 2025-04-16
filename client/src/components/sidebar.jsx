import React from "react";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("authUser"));

  const menuItem = [
    { path: "/", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/superadmin", name: "Super Admin", icon: <FaUserShield /> },
    { path: "/admin", name: "Admin", icon: <FaUser /> },
    { path: "/subadmin", name: "Sub Admin", icon: <FaUsers /> },
  ];

  return (
    <div className="sidebar">
      <h4>Admin Panel</h4>
      <ul>
        {menuItem.map(
          (item) =>
            (user?.role === "super_admin" ||
              (user?.role === "admin" && item.path !== "/superadmin") ||
              (user?.role === "sub_admin" && item.path === "/subadmin") ||
              item.path === "/") && (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
