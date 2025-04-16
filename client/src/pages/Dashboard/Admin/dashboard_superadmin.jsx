import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableContainer from "../../../components/tableContainer";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  activeInactiveAdminUser,
  addNewAdminUser,
  deleteAdminUser,
  getAdminUser,
  updateAdminUser,
} from "../../../store/superadmin/action";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Modal,
  Form,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

import { isEmpty } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteModal from "../../../components/Modal/DeleteModal";
import StatusModal from "../../../components/Modal/StatausModal";
import Logout from "../../authentication/logout";

const SuperadminDashboard = () => {
  const dispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem("authUser"));
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState();
  const [user, setUser] = useState();
  const [status, setStatus] = useState();

  const userProperty = createSelector(
    (state) => state.adminUsers,
    (Users) => ({
      users: Users.user,
      loading: Users.loading,
    })
  );

  const { users, loading } = useSelector(userProperty);
  console.log("Users Data:", users);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: (user && user.firstname) || "",
      lastname: (user && user.lastname) || "",
      username: (user && user.username) || "",
      email: (user && user.email) || "",
      phoneNumber: (user && user.phoneNumber) || "",
      birthdate: (user && user.birthdate) || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .matches(/^[A-Za-z]+$/, "Firstname should only contain letters.")
        .required("Please enter your firstname."),

      lastname: Yup.string()
        .matches(/^[A-Za-z]+$/, "Lastname should only contain letters.")
        .required("Please enter your lastname."),

      username: Yup.string()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username cannot exceed 20 characters.")
        .required("Please enter your username."),

      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Please enter your email."),

      phoneNumber: Yup.string()
        .matches(/^\d{10,15}$/, "Phone number must be between 10 to 15 digits.")
        .required("Please enter your phone number."),

      birthdate: Yup.date()
        .max(new Date(), "Birthdate cannot be in the future.")
        .required("Please enter your birthdate."),
    }),
    onSubmit: (value) => {
      if (isEdit) {
        const updateUSer = {
          id: user.id,
          firstname: value.firstname,
          lastname: value.lastname,
          username: value.username,
          email: value.email,
          birthdate: value.birthdate,
          phoneNumber: value.phoneNumber,
        };
        dispatch(updateAdminUser(updateUSer));
        validation.resetForm();
        setIsEdit(false);
        setModal(false);
      } else {
        const newUser = {
          role: "admin",
          firstname: value.firstname,
          lastname: value.lastname,
          username: value.username,
          email: value.email,
          birthdate: value.birthdate,
          phoneNumber: value.phoneNumber,
          password: value.password,
        };
        dispatch(addNewAdminUser(newUser));
        validation.resetForm();
      }

      toggle();
    },
  });

  useEffect(() => {
    dispatch(getAdminUser());
    setIsEdit(false);
  }, [dispatch]);

  useEffect(() => {
    setUser(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setUser(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (user) => {
    setUser({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthdate: user.birthdate,
    });
    setIsEdit(true);
    toggle();
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const onClickDelete = (users) => {
    setUser(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (user && user._id) {
      dispatch(deleteAdminUser(user._id));
    }
    setUser("");
    setDeleteModal(false);
  };

  const handleToggleStatus = (user) => {
    const updatedStatus = !user.isActive;
    setUser(user);
    // setStatus(updatedStatus);
    setStatusModal(true);
  };

  const handleClickToggleStatus = (user) => {
    const updatedStatus = !user.isActive;
    setStatus(updatedStatus);
    setUser(user);
    setStatusModal(true);
  };

  const handleActiveInactiveUser = () => {
    const status = !user.isActive;
    if (user && user._id) {
      dispatch(activeInactiveAdminUser({ user: user._id, status }));
    }
    setUser("");
    setStatusModal(false);
  };

  const handleUserClicks = () => {
    setUser("");
    setIsEdit(false);
    toggle();
  };

  useEffect(() => {
    if (role && role.role !== "super_admin") {
      if (role.role === "user") {
        console.log("11111111111111");

        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else if (!role) {
      navigate("/login");
    }
  }, [role]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        cell: ({ row, rowIndex }) => {
          const index = rowIndex + 1;
          return <div>{index}</div>;
        },
      },
      { header: "First Name", accessorKey: "firstname" },
      { header: "Last Name", accessorKey: "lastname" },
      { header: "Username", accessorKey: "username" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phoneNumber" },
      { header: "Birthday", accessorKey: "birthdate" },
      {
        header: "Status",
        accessorKey: "isActive",
        cell: ({ row }) => {
          const isActive = row.isActive;
          return (
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={row.isActive}
                onChange={() => handleToggleStatus(row)}
              />
            </div>
          );
        },
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="d-flex gap-3">
            <FaEdit
              size={20}
              color="green"
              style={{ cursor: "pointer" }}
              onClick={() => handleUserClick(row)}
            />
            <FaTrash
              size={20}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => onClickDelete(row)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const data = [
    "jfdgfjhdgf",
    "jfdgfjhdgf",
    "jfdgfjhdgf",
    "jfdgfjhdgf",
    "jfdgfjhdgf",
  ];

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <StatusModal
        show={statusModal}
        onActiveInactiveClick={handleActiveInactiveUser}
        onCloseClick={() => setStatusModal(false)}
      />
      <Container fluid className="py-4 ">
        <Row className="mb-4">
          <Col>
            <h3 className="text-Primary">Super Admin Dashboard</h3>
            <span className="text-muted">Manage Admin</span>
          </Col>
        </Row>
        {loading ? (
          <div className="text-center my-5">
            <Spinner
              color="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
        ) : (
          <Row>
            <Col>
              <Card className="shadow-sm border-0 ">
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isAddButton={role === "super_admin"}
                    isPagination={true}
                    handleUserClick={handleUserClicks}
                    text={"Admin"}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            {isEdit ? "Edit Admin" : "New Admin"}
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col xs={12}>
                  <div className="mb-3">
                    <Label>Firstname</Label>
                    <Input
                      name="firstname"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.firstname || ""}
                      invalid={
                        validation.touched.firstname &&
                        validation.errors.firstname
                          ? true
                          : false
                      }
                    />
                    {validation.touched.firstname &&
                    validation.errors.firstname ? (
                      <FormFeedback type="invalid">
                        {validation.errors.firstname}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Lastname</Label>
                    <Input
                      name="lastname"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.lastname || ""}
                      invalid={
                        validation.touched.lastname &&
                        validation.errors.lastname
                          ? true
                          : false
                      }
                    />
                    {validation.touched.lastname &&
                    validation.errors.lastname ? (
                      <FormFeedback type="invalid">
                        {validation.errors.lastname}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Usename</Label>
                    <Input
                      name="username"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      invalid={
                        validation.touched.username &&
                        validation.errors.username
                          ? true
                          : false
                      }
                    />
                    {validation.touched.username &&
                    validation.errors.username ? (
                      <FormFeedback type="invalid">
                        {validation.errors.username}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Phone Number</Label>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phoneNumber || ""}
                      invalid={
                        validation.touched.phoneNumber &&
                        validation.errors.phoneNumber
                          ? true
                          : false
                      }
                    />
                    {validation.touched.phoneNumber &&
                    validation.errors.phoneNumber ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phoneNumber}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Birthdate</Label>
                    <Input
                      name="birthdate"
                      type="date"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.birthdate || ""}
                      invalid={
                        validation.touched.birthdate &&
                        validation.errors.birthdate
                          ? true
                          : false
                      }
                    />
                    {validation.touched.birthdate &&
                    validation.errors.birthdate ? (
                      <FormFeedback type="invalid">
                        {validation.errors.birthdate}
                      </FormFeedback>
                    ) : null}
                  </div>
                  {!isEdit ? (
                    <div className="mb-3">
                      <Label>Password</Label>
                      <Input
                        name="password"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <Button type="submit" color="success" className="save-user">
                      {isEdit ? "Update" : "Add"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </React.Fragment>
  );
};

export default SuperadminDashboard;
