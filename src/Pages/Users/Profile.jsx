import React, { useContext } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { SideBar } from "../../Components/SideBar";
//import { AddressAutofill } from "@mapbox/search-js-react";
import { useFormik } from "formik";
import { UserContext } from "../../Context/UserContext";
import { profileSchema } from "../../utils/schema/ProfileSchema";
import { useEffect } from "react";
import { getUserById, updateUser } from "../../Services/User.Service";
import { toast } from "react-toastify";
import { ImageUpload } from "../../Components/Users/ImageUpload";



import axios from "axios";


const Profile = () => {
  document.title = "MINI-SHOPPER | Profile";
  const userContext = useContext(UserContext);

  //const userDetails= [...userContext];

  // state to show/hide sidebar
  const [show, setShow] = useState(false);

  // Loading state for save button
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  // Server side validation error
  const [serverError, setServerError] = useState(null);

  // state for image file (can be a string or file object)
  const [image, setImage] = useState(null);

  // state for address
  const [address, setAddress] = useState("");

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

  // methods for sidebar
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUserFromServer();
  }, [userContext.userData]);

  const getUserFromServer = () => {
    if (userContext.userData) {
      // get user id from context
      const userId = userContext.userData.userId;

      // get user data from database
      getUserById(userId)
        .then((res) => {
            // console.log("in profile page");
            // console.log(res);
          setUser(res);

          // setting the values of the form
          setValues({
            firstName: res.firstName,
            lastName: res.lastName,
            state: res.state == null ? "" : res.state,
            address: res.address == null ? "" : res.address,
            city: res.city == null ? "" : res.city,
            street: res.street == null ? "" : res.street,
            pinCode: res.pinCode == null ? "" : res.pinCode,
          });

          // setting the values of the address in useState
          res.address == null ? setAddress("") : setAddress(res.address);

          // get the user's image if it exists for user otherwise set default image
          if (res.image != null) {
            setImage(res.image);
          } else {
            // get default image in case user does not have an image
            axios
              .get("../Asset/user-default.png", { responseType: "blob" })
              .then((response) => {
                const blob = response.data;
                const file = new File([blob], "default.png", {
                  type: "image/png",
                });
                setImage(file);
              })
              .catch(() => {
                toast.error("Something went wrong! unable to load image");
              });
          }
        })
        .catch((err) => {
          toast.error("Something went wrong! Please try again later");
        });
    }
  };

  // Formik form
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      state: "",
      address: "",
      city: "",
      street: "",
      pinCode: "",
      image: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // set loading state to true
      setLoading(true);
      console.log("in profile jsx");
      console.log(values);
      const data = {
        ...values,
        email: userContext.userData.email,
        pincode: values.pinCode.replace(/\s+/g, ""), // removes all whitespace from postal code input
      };
      console.log(data);
      // update user data in database
      setLoading(true);
      updateUser(userContext.userData.userId, data)
        .then((res) => {
          // show success toast
          toast.success("Profile updated successfully");
          setServerError(null);
        })
        .catch((err) => {
          if (err?.response?.data?.errors) {
            setServerError(err.response.data.errors);
            window.scrollTo(0, 0); // scroll to top of page
          } else {
            toast.error("Something went wrong! Please try again later");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
 });

  return (
    <>
      {/* Sidebar */}
      <SideBar show={show} handleClose={handleClose}></SideBar>

      <Container>
        <Row>
          <Col>
            <h2 className="mt-3">
              <i
                className="fa-solid fa-bars me-2"
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              ></i>

            </h2>
            <h3>
              {userContext.userData.email}


            </h3>
            <hr />
          </Col>
        </Row>
        <Container>
          {/* show spinner if user is null and data is still being fetched otherwise show form with values */}
          {user == null ? (
            <div className="text-center mb-3">
              <Spinner animation="border" as="span" size="lg"></Spinner>
            </div>
          ) : (
            <>
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
              {/* Image upload component */}
              {/* {image == null ? (
                ""
              ) : (
                <ImageUpload image={image} userId={user.userId} />
              )} */}

              {/* Profile Form */}
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="firstName"
                    md={6}
                    className="mb-3"
                  >
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
                  <Form.Group
                    as={Col}
                    controlId="lastName"
                    md={6}
                    className="mb-3"
                  >
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
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="email"
                    md={6}
                    className="mb-3"
                  >
                    <Form.Label>Email</Form.Label>
                    <p
                      className="form-control mb-0 text-muted bg-light"
                      disabled
                    >
                      {user.email}
                    </p>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="state"
                    md={6}
                    className="mb-3"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      isInvalid={touched.state && !!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {/* Adding mapbox address autofill */}
                {/* <AddressAutofill
                  accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  options={{
                    country: "CA",
                    language: "en",
                  }}
                > */}
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
                        autoComplete="address-level1"
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
                {/* </AddressAutofill> */}
                <Button
                  variant="primary"
                  className="mb-3"
                  type="submit"
                  disabled={loading}
                >
                  <Spinner
                    animation="border"
                    as="span"
                    size="sm"
                    className="me-2"
                    // loading state for save button
                    hidden={!loading}
                  ></Spinner>
                  <span>Save</span>
                </Button>
              </Form>
            </>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Profile;
