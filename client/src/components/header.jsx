import { useNavigate } from "react-router-dom";
import Logout from "../pages/authentication/logout";

const headerStyle = {
  background: "#34495e",
  padding: "15px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  position: "sticky",
  top: "0",
  width: "100%",
  zIndex: "1000",
};

const profileStyle = {
  backgroundColor: "#b5c5c9",
  color: "#34495e",
  padding: "8px 15px",
  borderRadius: "5px",
  fontWeight: "bolder",
};

const Header = () => {
  const user = localStorage.getItem("authUser");
  const navigate = useNavigate();

  return (
    <nav style={headerStyle}>
      <span
        style={{ fontSize: "1.6rem", fontWeight: "bolder", color: "white" }}
      >
        My App
      </span>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <Logout
              style={{
                backgroundColor: "#b5c5c9",
                color: "#34495e",
                padding: "8px 15px",
                borderRadius: "5px",
                fontWeight: "bolder",
              }}
            />
            {/* <button style={profileStyle} onClick={() => navigate("/")}>
              Profile
            </button> */}
          </>
        ) : (
          <button
            onClick={navigate("/login")}
            style={{
              backgroundColor: "#b5c5c9",
              color: "#fff",
              padding: "8px 15px",
              borderRadius: "5px",
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Header;
