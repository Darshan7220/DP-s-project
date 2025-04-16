import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { logoutUser } from "../../store/auth/register/action";

const Logout = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };
  return (
    <Button onClick={handleLogout} style={style}>
      Logout
    </Button>
  );
};

export default Logout;
