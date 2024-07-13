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

 // state for address
  const [addresses, setAddresses] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");

  const [editingAddress, setEditingAddress] = useState(null);

  const [showModal, setShowModal] = useState(false);


  // methods for handling address changes
  // const handleAddressInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setAddress(inputValue);
  //   setFieldValue("address", inputValue);
  // };

  // // handle address input blur
  // const handleAddressInputBlur = (event) => {
  //   const inputValue = event.target.value;
  //   setAddress(inputValue);
  //   setFieldTouched("address", true);
  //   setFieldValue("address", inputValue);
  // };

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
         .then((userRes) => {
            // console.log("in profile page");
            console.log(userRes);
          setUser(userRes);
          setAddresses(userRes.address);

          // setting the values of the form
          setValues({
            firstName: res.firstName,
            lastName: res.lastName,
            phoneNumber: userRes.phoneNumber,
            state: "",
            address: "",
            city: "",
            pinCode:"",
          });

          // setting the values of the address in useState
          //res.address == null ? setAddress("") : setAddress(res.address);

          // get the user's image if it exists for user otherwise set default image
          // if (res.image != null) {
          //   setImage(res.image);
          // } else {
          //   // get default image in case user does not have an image
          //   axios
          //     .get("../Asset/user-default.png", { responseType: "blob" })
          //     .then((response) => {
          //       const blob = response.data;
          //       const file = new File([blob], "default.png", {
          //         type: "image/png",
          //       });
          //       setImage(file);
          //     })
          //     .catch(() => {
          //       toast.error("Something went wrong! unable to load image");
        //       });
        //   }
        // })
        // .catch((err) => {
        //   toast.error("Something went wrong! Please try again later");
        });
    }
  };

  const handleEditAddress = (address) => {
    console.log("Editing Address: ", address);
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingAddress(null);
    setShowModal(false);
  };

  const handleModalSave = async (values) => {
    try {
    console.log("saved values: ", values);
    const updateAddress = { ...editingAddress, ...values };
    const updateAddresses = addresses.map((addr) =>
      addr._id === editingAddress._id ? { ...addr, ...values } : addr
    );
    setAddresses(updateAddresses);
    await updateUserAddresses(updateAddresses);
    setShowModal(false);
    toast.success("Address updated successfully");

    // Update the form values to reflect the save address
    setValues({
      ...values,
      phoneNumber: updateAddress.phoneNumber,
      address: updateAddress.address,
      city: updateAddress.city,
      state: updateAddress.state,
      pinCode: updateAddress.pinCode
    });
  } catch (error) {
    console.error("Error updating address:", error);
    toast.error("Failed to update address, Please try again later.")
  }
  }; 
  
  const updateUserAddresses = async (updateAddresses) => {
    const data = {
      ...user,
      address: updateAddresses,
    };
    await updateUser(userContext.userData.userId, data);
  };

  const handleSaveAddressSelect = (address) => {
    setShippingAddress(`${address.address}`);
    setValues({
      ...values,
      shippingAddress: `${address.address}`,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      phoneNumber: address.phoneNumber
    });
  };

  // Formik form for profile details
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
      // state: "",
      // address: "",
      // city: "",
      // street: "",
      // pinCode: "",
      // image: "",
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
      // setLoading(true);
      // updateUser(userContext.userData.userId, data)
      //   .then((res) => {
      //     // show success toast
      //     toast.success("Profile updated successfully");
      //     setServerError(null);
      //   })
      //   .catch((err) => {
      //     if (err?.response?.data?.errors) {
      //       setServerError(err.response.data.errors);
      //       window.scrollTo(0, 0); // scroll to top of page
      //     } else {
      //       toast.error("Something went wrong! Please try again later");
      //     }
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //  });
    },
 });

// formik form for editing address
 const addressFormik = useFormik({
  initialValues: {
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  },
  onSubmit: (values) => {
    handleModalSave(values);
  },
 });

 useEffect(() => {
  if (editingAddress) {
    addressFormik.setValues({
      phoneNumber: editingAddress.phoneNumber,
      address: editingAddress.address,
      city: editingAddress.city,
      state: editingAddress.state,
      pinCode: editingAddress.pinCode,
    });
  }
 }, [editingAddress]);

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

                  
{/*                 <Button
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
                </Button> */}

                  <hr />

                  <Row>
                  <Form.Group controlId="savedAddresses" className="mb-3">
                    <Form.Label>
                      <h3>Delivery Address</h3>
                    </Form.Label>
                    <div>
                      {Array.isArray(addresses) && addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Card.Text>
                                {address.phoneNumber}, {address.address}, {address.city}, {address.state}, {address.pinCode}
                              </Card.Text>
                              <Button
                                variant="secondary"
                                onClick={() => handleEditAddress(address)}
                               >
                                  Edit
                                </Button> 
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <p>No saved addresses found</p>
                      )}
                    </div>
                  </Form.Group>
                </Row>
              </Form>
            </>
          )}
        </Container>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={addressFormik.handleSubmit}>
          <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                value={addressFormik.values.phoneNumber}
                isInvalid={addressFormik.touched.phoneNumber && !!addressFormik.errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {addressFormik.errors.phoneNumber}
              </Form.Control.Feedback> 
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                value={addressFormik.values.address}
                isInvalid={addressFormik.touched.address && !!addressFormik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {addressFormik.errors.address}
              </Form.Control.Feedback> 
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                value={addressFormik.values.city}
                isInvalid={addressFormik.touched.city && !!addressFormik.errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {addressFormik.errors.city}
              </Form.Control.Feedback> 
            </Form.Group>

            <Form.Group controlId="state" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                value={addressFormik.values.state}
                isInvalid={addressFormik.touched.state && !!addressFormik.errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {addressFormik.errors.state}
              </Form.Control.Feedback> 
            </Form.Group>

            <Form.Group controlId="pinCode" className="mb-3">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pin Code"
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                value={addressFormik.values.pinCode}
                isInvalid={addressFormik.touched.pinCode && !!addressFormik.errors.pinCode}
              />
              <Form.Control.Feedback type="invalid">
                {addressFormik.errors.pinCode}
              </Form.Control.Feedback> 
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
