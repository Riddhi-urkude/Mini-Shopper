import { useFormik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/schema/LoginSchema.js";
import { useState } from "react";
import { loginUser } from "../Services/User.Service.js";

//import { googleLogin } from "../services/user.service";
import { toast } from "react-toastify";
import { ROLES } from "../utils/roles";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
//import { GoogleLogin } from "@react-oauth/google";

export const Login = () => {
  document.title = "MINI-SHOPPER | Login";

  // Loading state for spinner
  const [loading, setLoading] = useState(false);

  // state to track selected user type
  const [selectedUserType, setSelectedUserType] = useState("normal");

  const navigate = useNavigate();

  // user context
 const userContext = useContext(UserContext);

  // Formik hook
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userId: "",
        password: "",
        role: "normal" // default role
      },
      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        //  Set loading state to true for spinner
        setLoading(true);
        loginUser(values)
          .then((res) => {
            //  reset form
            // console.log("response in login page "+res.data.message);
            // console.log("response in login page "+res.data.statusMessage);
            // console.log("response in login page "+res.data.status);
            console.log(res);
               
            if(res.status==200){
              toast.success("Login successfully!");
             
    
              navigate("/profile");
            }
             actions.resetForm();
             const { ...responseUser } = res.data.user;
            // console.log(responseUser);
              const tokens = {
               accessToken: res.data.accessToken,
               refreshToken: res.data.refreshToken,
              };
             //  set user data and login status in user context
             console.log(responseUser);
             console.log(tokens);
             userContext.doLogin(responseUser, tokens);
         

          
             // based on user role, redirect to dashboard or home page
             res.user.roles.forEach((role) => {
               if (role.roleName === ROLES.NORMAL) {
                 navigate("/");
               }
               if (role.roleName === ROLES.ADMIN) {
                 navigate("/");
               }
             });
           })
          .catch((err) => {
            // unauthorised login error
            console.log(err);
            if (err.response.status === 403) {
              toast.error("You have entered a Invalid UserId or password");
            } else {
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
    <Container fluid="sm" style={{ maxWidth: "900px" }}>
      <Row>
        <Col className="text-center mt-3">
          <div>
            <img
              src="/Asset/black-logo.png"
              width={50}
              fluid="true"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <div className="d-flex flex-column justify-content-center">
              <h4 className="m-0" style={{ fontSize: "1rem" }}>
               MINI-SHOPPER
              </h4>
              <small style={{ fontSize: "0.8rem" }}>
                Rapid Reflection, Swift Selection
              </small>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Login</h3>
        </Col>
      </Row>
      {/* Login Form */}
      <Form.Group controlId="role" className="mb-3">
        <Form.Label>Select Role</Form.Label>
        <Form.Select
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          name="role"
        >
          <option value="">Select Role</option>
          <option value="user">Normal User</option>
          <option value="shopkeeper">Shopkeeper</option>
        </Form.Select>
      </Form.Group>
      <Form noValidate className="mt-2" onSubmit={handleSubmit}>
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
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="on"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
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

     
    </Container>
  );
};

