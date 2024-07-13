import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../utils/schema/RegisterSchema.js";
import { registerUser,registerShopkeeper,  testHere } from "../Services/User.Service.js";
 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
 
export const Register = () => {
  document.title = "MINI-SHOPPER | Register";
 
  const navigate = useNavigate();
 // const [showPassword, setShowPassword] = useState(false);
  // Server side validation error
  const [serverError, setServerError] = useState(null);

  const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
 
  // Loading state for register button
  const [loading, setLoading] = useState(false);

  // state for address
  const [address, setAddress] = useState("")

  // methods for handling address changes
  const handleAddressInputChange = (event) => {
    const inputValue = event.target.value;
    setAddress(inputValue);
    setFieldValue("address", inputValue);
  };
 
  // handle address input blur
  const handleAddressInputBlur = (event) => {
    const inputValue = event.target.value;
    setAddress(inputValue);
    setFieldTouched("address", true);
    setFieldValue("address", inputValue);
  };
 
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } =
   
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        cpassword: "",
        userId: "",
        userType: "",
        address: "",
        city: "",
        street: "",
        state: "",
        pinCode: "",
      },
     
      validationSchema: registerSchema,
      onSubmit: (values, actions) => {
        const { address, city, street state, pinCode, ...otherValues } = values;
        // Transform the data as an array of obj
        const transformedData = {
          ...otherValues,
          userId: values.email,
          role: values.userType,
          address: [{
            address: values.address,
            city: values.city,
            state: values.state,
            street: values.street,
            pinCode: values.pinCode
          }]
        };
        
        //set loading to true for spinner
        console.log("printing in register "+values.userType);
        // let api;
        // if(values.userType=="user"){
        //    api = registerUser(values)
        // }else if(values.userType=="shopkeeper"){
        //    api = registerShopkeeper(values);
        // }
       // setLoading(true);
       registerUser(transformedData)
          .then((res) => {
            console.log(res);
            if(res.status===201){
             // navigate to login page
             toast.success("Registered successfully!");
             navigate("/login");
            // reset server error
            setServerError(null);
            // reset form
            actions.resetForm();
 
            }else if(res.status===208){
              toast.error("Entered Email address already exist, please try again with other Email address");
 
            }
          })
          .catch((err) => {
            if (
              err.response 
              //&&
              // err.response.data &&
              // err.response.data.message
            ) {
              setServerError("Error in Data Transfer");
            } else {
              toast.error("Something went wrong!");
            }
          })
          .finally(() => {
            //set loading to false for spinner
            setLoading(false);
          }); 
      },
    });
    const customHandleChange=(e)=>{
      handleChange(e);
      if(e.target.id==='email'){
        setFieldValue('userId', e.target.value);
      }

      const handleUserTypeChange =(e)=>{
        handleChange(e);
        setIsUserTypeSelected(!!e.target.value);
      }
       
      };
 
  return (
    <>
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
        {/* server side validation alert */}
        {serverError && (
          <Row>
            <Col>
              {typeof serverError === "string" ? (
                <Alert variant="danger" className="p-2 mt-2">
                  {serverError}
                </Alert>
              ) : (
                <Alert variant="danger" className="p-2 mt-2">
                  <ul>
                    {serverError.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}
            </Col>
          </Row>
        )}
 
        {/* Register Form */}
        <Row>
          <Col>
            <h3>Register</h3>
          </Col>
        </Row>
         <Form.Group as={Col} controlId="userType">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userType}
            name="userType"
            isInvalid={touched.firstName && !!errors.firstName}
          >
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="shopkeeper">Shopkeeper</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.userType}
          </Form.Control.Feedback>
        </Form.Group>
        <Form noValidate className="mt-2" onSubmit={handleSubmit}>
          <Row className="mb-3 justify-content-center" md={10}>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                isInvalid={touched.phoneNumber && errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
         
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <div style={{position: "relative"}}>
              <Form.Control
                type={ showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={touched.password && errors.password}
              />
              <i
                className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
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
          <Row className="mb-3">
            <Form.Group as={Col} controlId="cpassword">
              <Form.Label>Confirm Password</Form.Label>
              <div style={{position: "relative"}}>
              <Form.Control
                type={showCPassword ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpassword}
                isInvalid={touched.cpassword && !!errors.cpassword}
              />
              <i
                className={showCPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowCPassword(!showCPassword)}
                ></i>
              <Form.Control.Feedback type="invalid">
                {errors.cpassword}
              </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Row>
 
          <Row>
              <Form.Group
                as={Col}
                controlId="address"
                md={12}
                className="mb-3"
              >
              <Form.Label>Address</Form.Label>
                <Form.Control
                        type="text"
                        placeholder="Address"
                        autoComplete="address-line-1"
                        value={address}
                        onChange={handleAddressInputChange}
                        onBlur={handleAddressInputBlur}
                        isInvalid={touched.address && !!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      controlId="city"
                      md={4}
                      className="mb-3"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        autoComplete="address-level2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        isInvalid={touched.city && !!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="street"
                      md={4}
                      className="mb-3"
                    >
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Street"
                        autoComplete="address-level2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.street}
                        isInvalid={touched.street && !!errors.street}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="state"
                      md={4}
                      className="mb-3"
                    >
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        autoComplete="address-level1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        isInvalid={touched.state && !!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="pinCode"
                      md={4}
                      className="mb-3"
                    >
                      <Form.Label>PinCode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="PinCode"
                        autoComplete="pincode"
                        value={values.pinCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.pinCode && !!errors.pinCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pinCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
 
          {/* Register Button */}
          {/* Disable button while loading and show spinner as well */}
          <Button variant="primary" type="submit" disabled={loading} >
            <Spinner
              animation="border"
              as="span"
              size="sm"
              className="me-2"
              // loading state for register button
              hidden={!loading}
            ></Spinner>
            <span>Register</span>
          </Button>
          <small className="text-left mt-2 mb-2 d-block">
            Already have an account?{" "}
            <NavLink to="/login" className="text-decoration-none">
              login
            </NavLink>
          </small>
        </Form>
      </Container>
    </>
  );
};
