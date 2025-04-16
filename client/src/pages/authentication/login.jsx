import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Alert,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../store/auth/register/action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter email or username."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: (value) => {
      dispatch(loginUser(value));
    },
  });

  const properties = createSelector(
    (state) => state.login,
    (login) => ({
      user: login.user,
      error: login.error,
    })
  );

  const { user, error } = useSelector(properties);

  useEffect(() => {
    if (user && user.role === "sub_admin") {
      navigate("/subadmin ");
    } else if (user && user.role === "admin") {
      navigate("/admin");
    } else if (user && user.role === "super_admin") {
      navigate("/superadmin");
    } else if (user && user.role === "user") {
      navigate("/dashboard");
    } else navigate("/login");
  }, [user, navigate]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#b5c5c9", maxWidth: "100%" }}
    >
      <Card
        style={{ width: "450px", backgroundColor: "#2c3e50", color: "white" }}
      >
        <CardBody>
          <h3 className="text-center mb-4">Login</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {error ? <Alert color="danger">{error}</Alert> : null}
            <FormGroup>
              <Label>Email</Label>
              <Input
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email or username..."
                type="email"
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
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                name="password"
                id="password"
                className="form-control mb-4"
                placeholder="Enter Password"
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password || ""}
                invalid={
                  validation.touched.password && validation.errors.password
                    ? true
                    : false
                }
              />
            </FormGroup>
            <button
              className="btn btn-primary btn-block d-grid mb-2"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
export default Login;
