import { useFormik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/schema/LoginSchema.js";
import { useState } from "react";
import { loginUser, loginShopkeeper } from "../Services/User.Service.js";
import { toast } from "react-toastify";
import { ROLES } from "../utils/roles";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export const Login = () => {
  document.title = "MINI-SHOPPER | Login";

  // Loading state for spinner
  const [loading, setLoading] = useState(false);

  // state to track selected user type
  const [selectedUserType, setSelectedUserType] = useState("normal");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // user context
 const userContext = useContext(UserContext);

  // Formik hook
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userId: "",
        password: "",
        role: "" // default role
      },
      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        //  Set loading state to true for spinner
        setLoading(true);
        loginUser(values)
          .then((res) => {
            //  reset form
            if(res.status==200){
              toast.success("Login successfully!");
              // check if user profile details are present
            if (res.data.user.profileComplete) {
              navigate("/")
            } else {
              navigate("/profile");
            }
            //  navigate("/profile");
            }
             actions.resetForm();
             const { ...responseUser } = res.data.user;
              const tokens = {
               accessToken: res.data.accessToken,
               refreshToken: res.data.refreshToken,
              };
             //  set user data and login status in user context
             userContext.doLogin(responseUser, tokens);
             const userHasCompleteProfile = responseUser.address && responseUser.city && responseUser.state && responseUser.pinCode;
             navigate("/");         
             // based on user role, redirect to dashboard or home page
            //  res.data.user.role.forEach((role) => {
               if (res.data.user.role === ROLES.NORMAL) {
                 navigate("/");
               }
               if (res.data.user.role === ROLES.ADMIN) {
                 navigate("/");
               }
           })
          .catch((err) => {
            // unauthorised login error
            if (err.response.data.detail === "Invalid UserId!") {
              toast.error("You have entered a Invalid UserId");
            } else if (err.response.data.detail === "Bad credentials") {
              toast.error("You have entered wrong password");
            } else if (err.response.data.detail === "Invalid Credentials!") {
              toast.error("You have entered Invalid credentials");
            }  else {
              toast.error("Something went wrong! Please try again later");
            }
          })
          .finally(() => {
            //  Set loading state to false for spinner
            setLoading(false);
          });
      },
    });

 

  return (
    <Container fluid="sm" style={{ maxWidth: "900px" }} >
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col
          xs={12}
          md={6}
          className="text-center">
          <div>
            <img
              src="/Asset/online-logo.jpeg"
              width={400}
              fluid="true"
              className="d-inline-block align-top"
              alt="Logo"
              style={{ marginLeft: "-100px" }}
            />
            {/* <div className="d-flex flex-column justify-content-center">
              <h2 className="m-0" style={{ fontSize: "1rem" }}>
               MINI-SHOPPER
              </h2>
              <small style={{ fontSize: "0.8rem" }}>
                Rapid Reflection, Swift Selection
              </small>
            </div> */}
          </div>
        </Col>
      <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
      <Row>
        <Col>
          <h3>Login</h3>
        </Col>
      </Row>
      {/* Login Form */} 
      <Form noValidate className="mt-2" onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="role" className="mb-3">
        <Form.Label>Select Role</Form.Label>
        <Form.Select
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          name="role"
          isInvalid={touched.role && !!errors.role}

        >
          <option value="">Select Role</option>
          <option value="user">Normal User</option>
          <option value="shopkeeper">Shopkeeper</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
              {errors.role}
        </Form.Control.Feedback>
      </Form.Group>
      </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="userId">
            <Form.Label>UserId</Form.Label>
            <Form.Control
              type="Email/UserId"
              placeholder="Email/UserId"
              autoComplete="on"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userId}
              isInvalid={touched.userId && !!errors.userId}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userId}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <div style={{position: "relative"}}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="on"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={touched.password && !!errors.password}
            />
                <i
                 className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                 style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                 }}
                 onClick={() => setShowPassword(!showPassword)}
                ></i>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            </div>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" disabled={loading}>
          <Spinner
            animation="border"
            as="span"
            size="sm"
            className="me-2"
            // loading state for register button
            hidden={!loading}
          ></Spinner>
          <span>Login</span>
        </Button>
        <small className="text-left mt-2 mb-2 d-block">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-decoration-none">
            register
          </NavLink>
        </small>
      </Form>
     </Col>
    </Row>
    </Container>
  );
};
