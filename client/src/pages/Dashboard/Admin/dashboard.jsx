import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Spinner } from "reactstrap";
import { getCount } from "../../../store/dashboard/action";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const style = {
  // width: "4000px",
  height: "150px",
  background: "#34495e",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAline: "center",
  borderRadius: "40px",
  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem("authUser"));

  const navigate = useNavigate();

  const [reports, setReports] = useState([
    { title: "Admin", iconClass: "bx bxs-user-detail", description: "0" },
    { title: "Sub Admin", iconClass: "bx bxs-detail", description: "0" },
    { title: "User", iconClass: "bx bx-file", description: "0" },
  ]);

  const dashboardProperty = createSelector(
    (state) => state.Counts,
    (Counts) => ({
      count: Counts.count,
      loading: Counts.loading,
    })
  );

  const { count, loading } = useSelector(dashboardProperty);

  useEffect(() => {
    if (role && role.role === "user") {
      navigate("/dashboard");
    } else if (!role) {
      navigate("/login");
    }
  }, [role]);

  useEffect(() => {
    if (count) {
      dispatch(getCount());
    }
  }, [dispatch]);

  useEffect(() => {
    if (count) {
      setReports([
        {
          title: "Admin",
          iconClass: "bxs-user-detail",
          description: count.adminCount?.[0]?.count || 0,
        },
        {
          title: "Sub Admin",
          iconClass: "bxs-detail",
          description: count.subAdminCount?.[0]?.count || 0,
        },
        {
          title: "User",
          iconClass: "bx-file",
          description: count.userCount?.[0]?.count || 0,
        },
      ]);
    }
  }, [count]);

  return (
    <Container
      style={{
        display: "flex",
        gap: "50px",
        justifyContent: "flex-start",
        marginTop: "40px",
      }}
    >
      {loading ? (
        <div className="text-center my-5 w-100">
          <Spinner color="primary" style={{ width: "2rem", height: "2rem" }} />
        </div>
      ) : (
        <>
          {(reports || [])?.map((report, key) => (
            <Col>
              <Card style={style}>
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className=" fw-medium fs-2" style={{ color: "white" }}>
                        {report.title}
                      </p>
                      <h4 className="mb-0 fs-2" style={{ textAlign: "center" }}>
                        {report.description}
                      </h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx " + report.iconClass + " font-size-24"}
                        ></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
          {/* <Card style={style}>
            <CardBody>
              <h2>Admin</h2>
            </CardBody>
          </Card>
          <Card style={style}>
            <CardBody>
              <h2>Admin</h2>
            </CardBody>
          </Card>
          <Card style={style}>
            <CardBody>
              <h2>Admin</h2>
            </CardBody>
          </Card> */}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
