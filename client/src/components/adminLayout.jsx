import React from "react";
import Sidebar from "./sidebar";
import { Col, Container, Row } from "reactstrap";
import { Outlet } from "react-router-dom";
import Header from "./header";

const AdminLayout = () => {
  const role = JSON.parse(localStorage.getItem("authUser"));

  return (
    <div className="admin-layout">
      <Row className="gx-0 w-100">
        {role && role.role !== "user" && (
          <Col md={3} lg={2} className="sidebar-container">
            <Sidebar />
          </Col>
        )}
        <Col
          md={role && role.role !== "user" ? 9 : 12}
          lg={role && role.role !== "user" ? 10 : 12}
          className="content-container"
        >
          <Header />
          <Container fluid className="p-4">
            <Outlet /> {/* Loads the current route's component */}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLayout;
